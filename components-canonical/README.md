# components-canonical/

> Single source of truth for EKAM mobile component primitives.

When designing a module or chapter, **link these CSS files** — do not redeclare the classes in a chapter folder. The eight primitives listed in `../EKAM Human Interface System.md` §7 live here, one file each.

## What's here

| File | Primitive | Status | Reference |
|---|---|---|---|
| `Card.css` + `Card.html` | The card surface (see HIS §7.4) | **Done** | Open `Card.html` |
| `Button.css` | Primary + secondary buttons (HIS §7.1, §7.2) | Not started | — |
| `Field.css` | Bottom-line input (HIS §7.3) | Not started | — |
| `Sheet.css` | Bottom sheet (HIS §7.5, Surface D) | Not started | — |
| `TabBar.css` | Persistent tab bar (HIS §7.6) | Not started | — |
| `Eyebrow.css` | Eyebrow utility (HIS §7.7) | Not started | — |
| `EmptyState.css` | Empty-state composition (HIS §7.8) | Not started | — |
| `_chapter-shell.css` | Phone bezel + page header + index grid (extract of S5/S6 from drift audit) | Not started | — |

## How to use

In any chapter HTML head:

```html
<link rel="stylesheet" href="colors_and_type.css" />
<link rel="stylesheet" href="components-canonical/Card.css" />
<!-- …and so on for the primitives you use -->
```

Then drop the documented markup (see each `*.html` reference page) into the chapter.

## Rules

1. **Do not redeclare these classes** in a chapter folder. If a chapter needs to deviate, scope the override: `.ekam-home .c-card { ... }`, and document the reason inline.
2. **Do not invent new classes** that duplicate primitive responsibility (e.g. a new `.trip-card` that is "almost" a Card). Compose, don't fork.
3. **Update the reference page** when you change the primitive. The reference is the test.
4. **Read `../EKAM Human Interface System.md` §7** before editing anything here.

## Hand-off

When a primitive is added or updated, update `../EKAM Module Rebuild Plan.md` § progress tracker. Next session reads that table first.
