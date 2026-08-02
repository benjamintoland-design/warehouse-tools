# Royal Warehouse Tools Worker v2.2.2

Cloudflare Worker + D1 inventory database + static web app.

## v2.2.2 changes

- Added a separate Manufacturer field to single item-label lookup and entry.
- Manufacturer and description automatically load from shared D1 inventory.
- Missing items can be added with item code, manufacturer, and description.
- Existing manufacturer/description details can be updated.
- Item labels now combine manufacturer + item code on the bold title line.
- Description prints separately below the title and may wrap to two lines.
- Removed the duplicate tiny item code beneath the Data Matrix on item labels.
- Batch labels also load manufacturer and description from D1.
- Primary-bin information remains excluded from item labels.

Deploy through the existing Cloudflare Git integration with:

- Build command: `npm install`
- Deploy command: `npx wrangler deploy`
