# Royal Warehouse Tools Worker v2.2.6

Cloudflare Worker + D1 inventory database + static web app.

## v2.2.6 changes

- Item Data Matrix codes now encode `MANUFACTURER + SPACE + ITEM CODE` to match existing warehouse labels and WMS scanner expectations.
- Example: manufacturer `BPT` and item code `235I` encode as `BPT 235I`.
- Item-code database lookups still use the normalized catalog number only.
- Updated both single-label preview/printing and batch printing.
- Preserved visible manufacturer, item code, description, inventory import, and D1 workflows.
- Synchronized the header, footer, and About modal to version 2.2.6.

## Existing features

- Location labels with QR codes in 4 × 2 and 2 × 4 formats.
- Item labels with Data Matrix codes in 3 × 1 format.
- Single and batch label printing.
- Shared Cloudflare D1 inventory lookup, import, search, and manual item updates.
- Manufacturer and description lookup with uppercase label formatting.

Deploy through the existing Cloudflare Git integration with:

- Build command: `npm install`
- Deploy command: `npx wrangler deploy`
