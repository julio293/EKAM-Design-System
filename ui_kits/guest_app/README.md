# EKAM Guest App — UI Kit

A high-fidelity recreation of the in-cabin tablet experience and pre-arrival mobile companion for EKAM guests, drawn from the **BOS Volume VIII (Rituals & Journey)** and **Volume VI (The Cabin · Offering)** plus the founder's **Sustainability Roadmap §7 (Responsible Guest Journey)**.

## Open

Open `index.html` — it renders inside a static iOS frame and lets you walk through the major screens: Welcome → Today → Programs → Chai → Settings. Tap the bottom tab bar to switch.

## What this kit covers

- **`AppFrame`** — iPhone-15-style bezel + status bar + bottom tab bar, scoped to the cabin tablet.
- **`WelcomeScreen`** — एकम् arrival card, host name, the site exposure declaration entry point.
- **`TodayScreen`** — weather, sunrise/sunset, what's flowering, what's passing through. Quiet, list-based, no graphs.
- **`ProgramsScreen`** — naturalist program list (bird walks, foraging, night sky), bookable, paid add-on.
- **`ChaiScreen`** *(formerly OrderScreen)* — chai, fire-time tea, hot-water schedule, late checkout — the cabin's services, surfaced through the Chai hospitality layer without staff phone calls.
- **`TabBar`** — four tabs, Inter caps labels, hairline divider.

## Source rules applied
- Tablet is the *single guest interface* — no phone calls to staff unless the guest wants human contact (SR §7.2).
- Five guest-facing messages per stay, no more.
- Carbon offset toggle is **default-on** and frames value-add, not guilt.
- No emoji. Devanagari only at section openers.
- The hairline + bone surface vocabulary is identical to the BOS.

## What's *not* here
- Real payments — every order ends with a "noted" toast.
- A real eKYC flow — the check-in declaration is a one-screen acknowledgement.
- Naturalist program photography — placeholders only.
