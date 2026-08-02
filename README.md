# Royal Warehouse Tools Worker v2.2.1

Cloudflare Worker + D1 inventory database + static web app.

## v2.2.1 changes

- Item-label descriptions automatically load from the shared D1 inventory database.
- Missing items show an editable description field.
- **Add to Inventory** saves a missing item and description to D1.
- Existing descriptions can be edited and updated.
- Single and batch item-label printing include descriptions when available.
- Batch printing warns before printing item codes that have no description.
- Primary-bin information is not displayed on item labels.

Deploy through the existing Cloudflare Git integration with:

- Build command: `npm install`
- Deploy command: `npx wrangler deploy`


## v2.2.1
- Refined 3 x 1 item-label layout to match the existing warehouse labels more closely.
- Tightened spacing and moved content toward the upper-left.
- Reduced item-code size to leave room for two description lines.
- Increased Data Matrix size slightly while preserving scan reliability.
