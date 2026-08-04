# Royal Warehouse Tools

## v2.3.1

### Changed
- Will Call location labels now display the full official code with dashes, such as `WC-07-01`.
- Pallet and standard warehouse locations continue using the condensed large-print format, such as `P01A-1`.
- QR codes continue encoding the full official location value.
- Preserved Safari QR rendering fix and larger label font sizes from v2.3.0.
- Preserved item Data Matrix format as `MANUFACTURER + SPACE + ITEM CODE`.

### Location display standard
- Will Call: encoded `WC-07-01`, displayed `WC-07-01`
- Pallet location: encoded `P-01-A-01`, displayed `P01A-1`
