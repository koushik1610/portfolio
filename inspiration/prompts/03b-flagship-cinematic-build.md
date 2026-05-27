# PROMPT 03b — Cinematic Flagship Build (the dramatic showpiece)

The ONE theme allowed to break specific house rules. Run this as its own deep session.
Fill the [BRACKETS], paste into Claude Code from the repo root.

```
You are working in my portfolio repo (Next.js 15 App Router, static export to GitHub
Pages, koushik.io). Read CLAUDE.md, COUNCIL.md, inspiration/DESIGN-IDEAS-DISTILLED.md,
and koushik-dump/THEME-CULL-DECISION.md in full before writing any code.

THIS IS THE CINEMATIC FLAGSHIP. It is the ONE theme permitted to break specific house
rules, and the goal is deliberate drama — a standalone showpiece that proves range.
It occupies one of the kept 6–8 rotation slots, near the front of the order.

CONCEPT FIRST (do not skip — this is what separates cinematic from slop):
Before any code, propose 3 concepts that tie cinematic richness to MY domain (cloud
security / detection engineering / "reading signals others miss" / attack-path /
SOC command center / oscilloscope trace). Each must justify WHY it is cinematic — the
drama must MEAN something, not decorate nothing. Recommend one and wait for my pick,
OR build the concept I name here:
  - Chosen concept: [fill in, or leave blank to get 3 proposals first]
  - Designated subtle-United theme? [yes/no — if yes: accent #DA291C + ONE buried easter egg]

RULES RELAXED FOR THIS THEME ONLY (scope EVERYTHING to html[data-layout="<flagship>"]):
- A full-bleed MOTION BACKGROUND is allowed. STRONGLY PREFER a self-authored canvas or
  WebGL generative animation I own (threat-map sweep / particle-network field / phosphor
  oscilloscope trace), with the seamless boomerang/ping-pong loop applied to THAT. A real
  video is allowed ONLY if it is my own render in /public, with a poster frame, lazy load,
  and reduced-motion fallback. NEVER an external/stock video URL.
- Glass/backdrop-blur surfaces, a self-hosted display typeface, gradient text, grain
  overlay, and giant typography are all permitted here.
- Concentrate the Bucket B patterns from DESIGN-IDEAS-DISTILLED.md that COHERE with the
  concept — do not cram all of them in. Likely: motion background + glass HUD nav +
  scroll-driven reveal + sticky-stacking scaling project cards + a magnetic/parallax focal element.

RULES THAT STILL HOLD EVEN IN THE FLAGSHIP (non-negotiable):
- motion/react, never framer-motion.
- No external/stock asset URLs. Everything self-authored or in /public.
- Styling stays in app/globals.css scoped to this layout (NO Tailwind in the hero) — this
  keeps the codebase coherent for the design-systems + architecture reviewers. A display
  font must be self-hosted in /public, not a third-party CDN.
- Render the same four sections every hero renders — hero/about, experience, projects,
  contact — with MY real data (copy from lib/content.ts; MeridianHero is the structural
  reference for section ids + contact links). Drama is not an excuse to drop content or
  break nav.
- prefers-reduced-motion: the whole theme degrades to a STATIC but still dramatic
  composition (motion background freezes to a poster-quality still; scroll reveals resolve
  to final state). HARD a11y gate (member 9).
- WCAG AA contrast for all text — add a scrim/overlay over busy backgrounds so body text
  stays >=4.5:1. Visible keyboard focus states.

PERFORMANCE GUARDRAILS (member 8 enforces hard — cinematic must not mean slow):
- Motion background must NOT block first paint. Defer/lazy-init; cap frame rate, particle
  count, devicePixelRatio so it stays smooth on a laptop.
- Pause animation when the tab is hidden and when reduced-motion is set.
- Watch bundle weight if adding WebGL; justify any new dependency against package.json.

BUILD PROTOCOL (per CLAUDE.md "Adding a new I-theme"):
1. Add "<flagship>" to the LayoutVariant union in lib/themes.ts.
2. Create components/layouts/<flagship>/<Flagship>Hero.tsx — single component, all four
   sections, the self-authored motion background, motion/react choreography.
3. Add the theme entry to themes[] at the rotation position THEME-CULL-DECISION.md
   specifies (near front). Full token set in vars{}.
4. Add CSS to app/globals.css scoped to html[data-layout="<flagship>"], including the
   nav-hide rule. Mobile-first; verify 360px -> ultrawide.
5. Import + switch case in components/Hero.tsx.
6. npm run build — must pass clean (TypeScript + ESLint). Fix everything.

MANDATORY QA GATE (do not self-approve):
7. Convene the council per COUNCIL.md — 3 parallel agent groups (Visual 1/2/6/12,
   Engineering 3/4/11, UX+Systems 5/7/8/9/10). Judge cinematics on their own terms:
   members 1/6/12 reward intentional premium drama and must NOT penalize richness — but
   member 8 (performance) and member 9 (accessibility) gates remain HARD, never waived for
   being "cinematic." Composite >=95, no member <80.
8. If it fails: list blockers, fix, rebuild clean, re-convene. Iterate to a pass.
9. On a pass: show me final composite, per-member scores, a before/after of what changed
   during iteration, and the git diff summary. Then STOP and wait for my go-ahead before
   commit/push. Do not deploy on your own.

Work on THIS theme only. Do not touch other themes' CSS or the archived themes.
```
