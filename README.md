# Royal Warehouse Tools Worker v2.2.0

Cloudflare Worker + D1 inventory database + static web app.

## v2.2.0 changes

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
