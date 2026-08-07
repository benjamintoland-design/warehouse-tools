# Royal Warehouse Tools

## v2.4.2 — Location Format Fix

This release restores the original warehouse-location label hierarchy while preserving all current Item Labels, CounterAssist, Inventory, Safari fixes, and print behavior.

### Location labels
- Standard warehouse QR codes still encode the full official location, e.g. `P-02-F-02`.
- Small text under the QR displays the full official location, e.g. `P-02-F-02`.
- Large human-readable warehouse text is condensed, e.g. `P2F-2`.
- `P-01-C-03` displays as `P1C-3`.
- Will Call locations remain uncondensed, e.g. `WC-07-01`.
- Preview and print output use the same formatting helper.

### Unchanged
- CounterAssist
- Item Labels and Data Matrix values
- Inventory lookup/import
- Recent labels/history
- Utah timestamps
- Safari item-label layout fixes
