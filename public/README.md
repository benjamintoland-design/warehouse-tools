# Royal Warehouse Tools

Single-page warehouse label and inventory app, now including **CounterAssist** for staged Will Call orders.

## Included modules

- **Location Labels** — QR location labels, batch copies, and the compact `WC-` Will Call layout.
- **Item Labels** — item/manufacturer labels with Data Matrix output and inventory lookup.
- **CounterAssist** — one 4 × 2 label per box, Utah timestamp, device-local recent history, and reprint.
- **Inventory** — shared inventory search/edit entry point using the existing `/api/items` Worker routes.

## CounterAssist behavior

- Sales register number, customer name, and box count are required.
- Customer and other text entry is forced to uppercase.
- Box count starts at 1 and supports 1–200 labels per job.
- Print stays disabled until the form is valid.
- One label prints per box: `BOX 1 OF X`, `BOX 2 OF X`, and so on.
- The QR contains only the sales register number.
- The timestamp is captured once, at print time, and displayed in `America/Denver` time on every label in that job.
- Successful print initiation saves the order to browser `localStorage`, keeping the newest 50 orders.
- Reprint preserves the original timestamp and reprints every label in the order.
- A new print auto-clears the form, resets boxes to 1, and focuses Sales Register Number.

> Browser print dialogs do not expose whether paper physically printed. For that reason, the order is saved and the form clears when the print dialog opens.

## Deploy

Upload the contents of this repository to GitHub. The web root is `public/`; keep the existing Cloudflare Worker/API configuration unchanged. No database migration is needed for CounterAssist.

The page loads QRCode.js and bwip-js from public CDNs. The existing inventory Worker should continue to serve:

- `GET /api/items/:itemNumber`
- `GET /api/items?q=search-term`

## Printer setup

Use a 4 × 2 inch paper size, portrait orientation, 100% scale, and no browser headers or footers. The print stylesheet creates one page per label.

## Release

Version: **2.4.0 — CounterAssist**

### Suggested commit title

`Add CounterAssist staged-order label workflow`

### Suggested commit notes

- Add CounterAssist as a fourth Royal Warehouse Tools module
- Require register number, uppercase customer name, and valid box count
- Capture and lock an America/Denver timestamp at print time
- Encode only the sales register number in each QR code
- Print one 4 × 2 label per box with automatic BOX X OF Y numbering
- Save the newest 50 staged orders in device-local history
- Reprint complete orders while preserving their original timestamp
- Auto-clear, reset box count, and refocus after new print jobs
- Preserve location, Will Call, item-label, Data Matrix, and inventory workflows
