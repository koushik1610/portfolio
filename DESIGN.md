# DESIGN.md — koushik.io

The design system for a site whose concept is **many design systems**. This file holds the
invariants every theme obeys and the contract for how a theme is allowed to differ. It does
not describe one look, because there isn't one.

Read with `PRODUCT.md`. Format modelled on the reference systems in `~/.claude/design-md`.

> **Every rule here is stated as a grammar to follow, not a prohibition to avoid.** That is
> deliberate and evidence-based: measured constraint compliance is 99%+ for conventional
> positive constraints and 10–100% (i.e. a coin flip) for constraints that oppose a model's
> defaults. A prohibition requires suppressing an already-activated path. A named grammar
> replaces it. Where a "don't" appears below, it is always paired with the thing to do
> instead.

---

## Overview

Eight themes, one career. Each theme is a complete, self-contained visual system: its own
structure, surface language, accent, and one signature motion. They share only a floor
(accessibility, action grammar, type family) and a spine (the artifact layer).

The organizing principle, in one sentence: **the format is the argument.** A theme earns its
place when its structure says something true about the work that prose would have to assert.
A theme that could hold a different person's career is a container, not a design.

**Key characteristics**
- Type family is fixed (Geist Sans + Geist Mono). Distinctiveness comes from structure, never
  from a new typeface.
- Every theme renders **real artifacts drawn from real data**, not typographic descriptions
  of data. This is the single highest-leverage rule in the file. See *Artifacts*.
- One signature move per theme. Everything around it is quiet.
- Surface languages are allocated, not chosen freely: no two themes share one.
- Accents are allocated as a set, with measured contrast, and spent to a written budget.

---

## The three AI-default clusters, and our position relative to them

Anthropic's own `frontend-design` skill names the three visual clusters that LLM design
collapses into:

1. Warm cream ground (~`#F4F1EA`), high-contrast serif display, terracotta accent.
2. **Near-black ground, one bright acid or vermilion accent.**
3. **Broadsheet layout: hairline rules, zero border-radius, dense newspaper columns.**

**Five of the current eight themes are cluster 2. `rfc` is cluster 3.** The house style in
the private `CLAUDE.md` §4 ("dark by default, near-black grounds, one bespoke accent per
theme") describes cluster 2 almost exactly. The brief has been steering toward the mean.

**Position:** a near-black ground with one accent is not banned, it is *no longer sufficient*.
A theme sitting in cluster 2 must earn its distinctiveness somewhere other than palette, and
must say in its header comment where. New themes should actively explore grounds and
structures outside all three clusters.

---

## Colors

Colour is a **token contract**, not a palette. `ThemeApplier` writes each theme's `vars` onto
`documentElement` as inline styles; every theme reads the same token names.

### Required tokens, per theme

| token | role |
|---|---|
| `--background` | the ground. Never `#000000` or `#ffffff`. |
| `--surface`, `--surface-2` | surface ladder, if the theme uses surfaces at all |
| `--text-primary` | headlines and body |
| `--text-muted` | secondary. **≥4.5:1 on the ground**, and never dimmer than ~`#8A8A93` on near-black |
| `--accent` | the one chromatic. **≥4.5:1 on the ground** |
| `--accent-dim` | the accent's darker partner, same hue |
| `--on-accent` | text on an accent-filled surface. **≥4.5:1 against `--accent` AND `--accent-dim`** |
| `--border` | decorative hairline only |
| `--border-strong` | any boundary that is a control's only affordance. **≥3:1** (WCAG 1.4.11) |

### Rules

- **Compute every ratio and record it** in a trailing comment in `lib/themes.ts`. Two
  published ratios in this repo have been wrong; both were caught by recomputation, not by
  review.
- **A theme never re-declares `--accent`, `--on-accent`, or `--border-strong` locally.** Read
  the registry token. Local aliases are how the two values drift apart.
- **Accents are allocated as a set**, checked for hue spread across the whole rotation. One
  theme's choice is not independent of the others.
- **Every accent carries a written placement budget** in the theme's header comment: the
  number of *discretionary* placements beyond the five the shared primitives already spend
  (skip-link background, focus ring, primary button fill, ghost hover border, availability
  dot). None of the reference sites studied uses colour for hierarchy.

---

## Typography

**Geist Sans and Geist Mono. Nothing else, ever.** `Instrument_Serif` survives only in the
two frozen legacy themes and does not extend.

This is a hard constraint and also an advantage: it forces distinctiveness into structure,
where it is harder to fake and harder to accidentally converge.

- Hierarchy comes from **weight and size jumps**, never from colour. Target ≥1.25 ratio
  between adjacent steps; three near-identical sizes separated by opacity is a wash, not a
  hierarchy.
- Display density is recovered with weight (800–900), negative tracking (to about `-0.045em`
  at display sizes), and tight leading (0.86–0.90). **Never `transform: scaleX()`** to fake a
  condensed face: horizontal strokes stay heavy while verticals thin, and the optical weight
  breaks at exactly the size display type lives at.
- Geist Mono carries metadata, labels, code, and technical texture. Use it liberally; it is
  the closest thing this system has to a second voice.
- Body measure caps at 65–75ch.
- Emphasis inside a headline uses **italic or bold of the same family**. Mixing families for
  emphasis reads as amateur.

---

## Artifacts

**The rule that matters most.** Every reference system studied is dominated by real visual
artifacts. Linear's own design doc states it: *"Product UI screenshots dominate the page. The
marketing chrome is a dark frame for the app."* A dataset of 3,000 real pages averages 23
media elements each.

Every theme in this rotation has been type-only. That is the defect.

### The contract

1. **An artifact draws real data or it does not ship.** Data comes from `lib/stats.ts` or the
   artifact's own typed `as const` dataset. This is the line between a chart, which is
   legitimate, and decorative SVG, which is not.
2. **Never fabricate values.** A bar chart with invented widths shipped on this site once. A
   reader who catches one invented number has no way to tell which of the others are real.
3. **Never fill the artifact gap with AI-generated imagery.** Users who merely *suspect* AI
   generation rate the whole page lower, and this holds even when real photographs are
   misidentified. On a credibility page, a fabricated artifact is worse than none.
4. **Prefer HTML to SVG** for anything that is really a table or a grid of labelled boxes.
   SVG-unit type ignores browser text zoom and minimum-font-size and never reflows; measured,
   it renders at ~3px on a 320px viewport with no recourse for the reader.
5. **SVG unit convention:** 1 user unit = 1 CSS px at the artifact's design width, capped at
   that width, so type sizes are real px values.
6. **Resting state is the revealed state.** Any hidden/undrawn state is applied by
   `gsap.set()` inside the non-reduced-motion branch only.
7. **The `<svg>` is `aria-hidden` + `focusable="false"`, with a real text equivalent as a
   sibling** that carries the data, not a summary of it.
8. **An encoding renders a visible key**, and carries a second non-colour channel. Opacity and
   fill both flatten to one system colour under `forced-colors: active`.

Library: `components/artifacts/`.

---

## Layout

- Breakpoints: **640px and 1024px** only. Author the 320px case explicitly; it is a
  verification breakpoint and a fixed-px grid will overflow it.
- `min-height: 100dvh`, never `100vh`.
- `overflow-x: clip` on a theme root, never `hidden`. `hidden` on one axis forces the other
  to `auto`, silently making the root a scroll container, which breaks sticky descendants and
  hands ScrollTrigger a second scroller.
- The fixed `WidgetStack` occupies roughly 250×130 at `top: 1rem; right: 1rem`. Reserve
  **300px** on any top bar at ≥640px, or place a low-content element in that corner. Do not
  pad the whole page.
- Mobile collapse is **authored per theme**, not left to fall out of a media query.

---

## Elevation, depth, and surface language

Surface language is **allocated across the rotation** so no two themes share one. Four dark
themes all using `rgba(255,255,255,0.03–0.07)` plus `backdrop-filter` read as one theme in
four costumes.

Available languages, one theme each: flat blocks with hairline borders · no surfaces at all
(ground plus marks) · dark glass (`backdrop-filter`, capped at 3 blurred surfaces per
viewport, and `WidgetStack`'s own glass counts) · paper/print · photographic frame ·
inverted/light.

Radius is **one scale per theme**, stated in the header comment, and internally consistent.
Radius 0 throughout is a legitimate and strong choice.

---

## Motion

- **One signature move per theme.** Name it in the header comment. Everything else is a plain
  settle-protected fade-up. Boldness is spent in exactly one place.
- The signature move must be **motivated in one sentence**: hierarchy, storytelling, feedback,
  or state transition. "It looked cool" is not one.
- Use `lib/settle.ts`. A throttled rAF ticker in a background tab leaves `autoAlpha: 0`
  content permanently invisible; a wall-clock timer still fires when rAF does not.
- **No element's visibility, opacity, or in-flow position may depend on a non-completing
  animation.** This classifies the cases: a CSS marquee starting at `translate: 0` is legal, a
  GSAP reveal from `autoAlpha: 0` needs a settle timer, a physics tick is illegal outright.
- One animation owner per element. GSAP and `motion/react` never animate the same property on
  the same element; comment the boundary.
- `prefers-reduced-motion` is checked at hook entry with an early return. ScrollTrigger
  reveals are `once: true`.

---

## Components

Shared, identical in every theme, imported from `components/layouts/_shared/`:

- `<CtaRow />` — accent-filled primary, ghost secondary, same order, 44px minimum. A returning
  visitor sees a different site each week; the constant has to be the action. Themes position
  it and never restyle it.
- `<SkipLink />` + `skipTarget()` — the target needs `tabIndex={-1}` or fragment navigation
  sets the focus starting point without moving focus.
- `<AvailabilityChip />` — once per page, in the masthead. Dot is decorative; text carries it.
- `<SrSummary />` — last child of `<main>`, never first.

A theme that opts into `th-root` declares **none** of these itself.

---

## Do's and Don'ts

### Do

- Draw the subject's own world: its materials, instruments, artifacts, and vernacular. This is
  where distinctiveness actually comes from.
- Make structural devices encode something true. Numbering is right when the content *is* a
  sequence.
- Spend boldness in one place and keep everything around it quiet.
- Name the one thing this theme will be remembered by, in the header comment, before building.
- Compute and record contrast ratios.

### Don't (each paired with the instead)

- Don't abstract a reference into a checklist of mechanics. **Instead:** analyze the actual
  site, and name the one structural move you are taking and why it carries meaning here.
- Don't ship a typographic description of data. **Instead:** render the data.
- Don't stack four type treatments per section. **Instead:** three adjacent steps, maximum.
- Don't reach for a near-black ground with one accent by default. **Instead:** choose the
  ground from the theme's subject, and if it lands in cluster 2 anyway, say in the header
  where the distinctiveness comes from instead.

---

## Responsive behavior

Author three states per theme: ≥1024, 640–1023, <640. The <640 state is not a fallback; it is
the version most visitors see. A layout whose idea only exists at one viewport has not been
designed, it has been composed.

Verify with a same-origin iframe at real widths. `resize_window` in the browser tooling does
**not** change the viewport here; it reported 1800px throughout while claiming success.

---

## Iteration guide

1. Work **one theme at a time**, and one section at a time within it. Section-level review
   raises detection of visual defects substantially over whole-page review; localized errors
   are invisible in a full-page screenshot.
2. Before writing code, write the theme's header comment: subject, one structural move,
   surface language, accent and budget, signature motion, and the one memorable element.
3. **Run the self-collision test.** Write what a generic prompt for "a modern security
   engineer portfolio" would produce. Revise every axis where your plan matches it.
4. **Keep the tried-list** (`theme-plans/TRIED.md`). Twenty-two themes have been built here
   with no anti-repeat ledger, which is how the rotation drifted into one cluster.
5. Judge **rendered pixels**, not source. Code review is blind to visual fidelity by
   construction.
6. Verify at 320 / 390 / 768 / 1440, and through the rotate button, not only the direct URL.

---

## Known gaps

- **No public artifacts exist yet.** The strongest possible artifact is a screenshot of real
  tooling running. Until repos are published, artifacts are drawn from data rather than
  captured from systems, which is second best.
- **The headline position is unresolved.** See `PRODUCT.md`.
- **Two frozen themes (`avatar`, `aethera`) predate this document** and do not comply with it.
  They are kept as-is deliberately and are not evidence of the system.
- **An LLM review council cannot be the sole gate on distinctiveness.** LLM judges reward
  low-perplexity output, which means they reward being on-distribution: the exact property
  this document exists to fight. A council is useful for correctness, accessibility, and
  craft. It is structurally unsuited to certifying novelty, and must be paired with an
  adversarial check and a human decision.
