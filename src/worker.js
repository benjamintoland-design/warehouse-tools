const JSON_HEADERS = { "content-type": "application/json; charset=utf-8" };

function json(data, status = 200) {
  return new Response(JSON.stringify(data), { status, headers: JSON_HEADERS });
}

async function ensureSchema(db) {
  await db.prepare(`
    CREATE TABLE IF NOT EXISTS inventory (
      item_code TEXT PRIMARY KEY,
      manufacturer TEXT NOT NULL DEFAULT '',
      description TEXT NOT NULL DEFAULT '',
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `).run();

  await db.prepare(`
    CREATE INDEX IF NOT EXISTS idx_inventory_manufacturer
    ON inventory(manufacturer)
  `).run();

  await db.prepare(`
    CREATE TABLE IF NOT EXISTS inventory_meta (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL
    )
  `).run();
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (!url.pathname.startsWith("/api/")) {
      return env.ASSETS.fetch(request);
    }

    try {
      await ensureSchema(env.DB);

      if (request.method === "GET" && url.pathname === "/api/inventory/status") {
        const countRow = await env.DB.prepare("SELECT COUNT(*) AS count FROM inventory").first();
        const updated = await env.DB.prepare(
          "SELECT value FROM inventory_meta WHERE key = 'updated_at'"
        ).first();
        return json({ count: Number(countRow?.count || 0), updated_at: updated?.value || null });
      }

      if (request.method === "GET" && url.pathname.startsWith("/api/inventory/item/")) {
        const code = decodeURIComponent(url.pathname.slice("/api/inventory/item/".length)).trim().toUpperCase();
        const row = await env.DB.prepare(
          "SELECT item_code, manufacturer, description FROM inventory WHERE item_code = ?"
        ).bind(code).first();
        return row ? json(row) : json({ error: "Item not found" }, 404);
      }

      if (request.method === "GET" && url.pathname === "/api/inventory/search") {
        const q = (url.searchParams.get("q") || "").trim();
        if (q.length < 2) return json({ items: [] });
        const like = `%${q}%`;
        const result = await env.DB.prepare(`
          SELECT item_code, manufacturer, description
          FROM inventory
          WHERE item_code LIKE ? COLLATE NOCASE
             OR manufacturer LIKE ? COLLATE NOCASE
             OR description LIKE ? COLLATE NOCASE
          ORDER BY CASE WHEN item_code = ? COLLATE NOCASE THEN 0 ELSE 1 END, item_code
          LIMIT 30
        `).bind(like, like, like, q).all();
        return json({ items: result.results || [] });
      }

      if (request.method === "POST" && url.pathname === "/api/inventory/reset") {
        await env.DB.exec("DELETE FROM inventory;");
        return json({ ok: true });
      }

      if (request.method === "POST" && url.pathname === "/api/inventory/import") {
        const body = await request.json();
        const items = Array.isArray(body.items) ? body.items : [];
        if (!items.length || items.length > 250) {
          return json({ error: "Send between 1 and 250 items per batch." }, 400);
        }
        const statements = items.map((item) =>
          env.DB.prepare(`
            INSERT INTO inventory (item_code, manufacturer, description, updated_at)
            VALUES (?, ?, ?, CURRENT_TIMESTAMP)
            ON CONFLICT(item_code) DO UPDATE SET
              manufacturer = excluded.manufacturer,
              description = excluded.description,
              updated_at = CURRENT_TIMESTAMP
          `).bind(
            String(item.item_code || "").trim().toUpperCase(),
            String(item.manufacturer || "").trim(),
            String(item.description || "").trim()
          )
        );
        await env.DB.batch(statements);
        return json({ ok: true, imported: statements.length });
      }

      if (request.method === "POST" && url.pathname === "/api/inventory/finish") {
        const body = await request.json().catch(() => ({}));
        const now = new Date().toISOString();
        await env.DB.batch([
          env.DB.prepare(`
            INSERT INTO inventory_meta (key, value) VALUES ('updated_at', ?)
            ON CONFLICT(key) DO UPDATE SET value = excluded.value
          `).bind(now),
          env.DB.prepare(`
            INSERT INTO inventory_meta (key, value) VALUES ('item_count', ?)
            ON CONFLICT(key) DO UPDATE SET value = excluded.value
          `).bind(String(body.count || ""))
        ]);
        return json({ ok: true, updated_at: now });
      }

      return json({ error: "Not found" }, 404);
    } catch (error) {
      return json({ error: error instanceof Error ? error.message : "Unexpected error" }, 500);
    }
  }
};
