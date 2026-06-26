# EKAM Icons

24 curated icons exported from the Figma "Icon" page (canvas `1:25`, file
`3FvNk9nK0ed9dlPPvbKMms`). These are the hand-built icon instances of the EKAM
system — **not** the full Material Symbols library that is also parked on that
page (3,612 glyphs, intentionally excluded).

All SVGs are 24×24 (`viewBox="0 0 24 24"`). On export each file carried Figma's
frame background (`#1E1E1E` rect) and the page background (1645×8152 white rect);
both have been stripped, leaving only the glyph artwork. Monochrome UI icons use
the ink fill `#14201A`; brand icons keep their native colours.

`manifest.json` maps every file to its Figma node id.

## Brand / social (9)
relume · google · facebook · apple · instagram · linkedin · x · youtube · dribbble

## Functional UI (15)
close · chevron_left · chevron_right · keyboard_arrow_up · keyboard_arrow_down ·
call · location_on · mail · tooltip · calendar_today · person · schedule ·
arrow_back · arrow_forward · check

## Usage
Import the raw SVG (with your bundler's SVG loader), reference by path, or inline
the markup. Example with a React SVGR-style loader:

```jsx
import CheckIcon from './icons/check.svg';
<CheckIcon width={20} height={20} />
```
