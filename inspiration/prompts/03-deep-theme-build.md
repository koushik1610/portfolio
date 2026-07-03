

---

# PROMPT 3 — Deep Single-Theme Build (reuse per theme; QA gate embedded)

Fill in the three [BRACKETS] at the top, then paste into Claude Code. Run this ONCE
per theme. Do not run it for two themes in the same session.

```
You are working in my portfolio repo (Next.js 15 App Router, static export to GitHub
Pages, koushik.io). Read CLAUDE.md, COUNCIL.md, and inspiration/DESIGN-IDEAS-DISTILLED.md
in full before writing any code. Also read ../koushik-docs/THEME-CULL-DECISION.md so you
know the final kept set and where this theme fits.

THEME TO BUILD THIS SESSION:
- Layout id / name: [e.g. "lattice" — a NEW layout, or an EXISTING one to upgrade]
- One-line concept: [e.g. "career as a dependency graph that resolves on scroll"]
- Distilled patterns to use from DESIGN-IDEAS-DISTILLED.md: [e.g. scroll word-reveal +
  sticky-stacking project cards]
- Accent: [hex — use #DA291C only if this is the designated subtle-United theme]

NON-NEGOTIABLE HOUSE RULES (violating any = automatic council fail):
- Stack is Next.js + motion/react (NEVER framer-motion) + Geist Sans/Mono (NEVER Google
  Fonts/CDN). No new heavy dependencies without justifying against package.json.
- This hero component uses NO Tailwind. All styling goes in app/globals.css, every rule
  scoped html[data-layout="<id>"] .cls (BEM-ish names). Content comes from typed
  constants in the component, matching the shape used by lib/content.ts / existing heroes.
- Self-contained layout: hide the global nav via
  html[data-layout="<id>"] nav { display:none !important; } and give the layout its own
  in-page nav to #experience / #projects / #contact.
- Must render the same four sections every hero renders: hero/about, experience,
  projects, contact — using MY real data (pull copy from lib/content.ts and the existing
  MeridianHero as the structural reference for section ids and contact links).
- Respect prefers-reduced-motion: every scroll/entrance animation degrades to a static
  state. This is both an a11y requirement and a council gate (member 9).
- No autoplay video, no glassmorphism default, no gradient text, no external asset URLs.

BUILD PROTOCOL (follow CLAUDE.md "Adding a new I-theme" exactly):
1. If NEW layout: add "<id>" to the LayoutVariant union in lib/themes.ts.
2. Create components/layouts/<id>/<Id>Hero.tsx (single file). Build all four sections.
   Use motion/react for entrance + scroll-driven motion. Keep the component readable and
   AI-extendable (council members 3 & 4 will check this).
3. Add the theme entry to themes[] in lib/themes.ts at the position THEME-CULL-DECISION.md
   specifies for rotation order. Set vars{} for the full token set
   (--background, --surface, --surface-2, --text-primary, --text-muted, --accent,
   --accent-dim, --border) with WCAG AA contrast — verify text/bg ratios ≥4.5:1 for body.
4. Add CSS to app/globals.css, all scoped to html[data-layout="<id>"]. Include the nav-
   hide rule. Mobile-first; verify it holds from 360px to ultrawide.
5. Add the import + switch case in components/Hero.tsx.
6. Run `npm run build`. It MUST pass clean (TypeScript + ESLint). Fix everything.
7. Take a self-review pass against the COUNCIL.md rubric BEFORE convening the council.

THEN — MANDATORY QA GATE (do not skip, do not self-approve):
8. Convene the council per COUNCIL.md: spawn the 3 parallel agent groups (Visual 1/2/6/12,
   Engineering 3/4/11, UX+Systems 5/7/8/9/10). Each agent scores ITS members individually
   against their rubrics, returns findings + blockers. Compute composite = mean of all 12.
9. GATE: composite ≥95 AND no single member <80. If it fails, list blockers, FIX them,
   rebuild (`npm run build` clean), and re-convene the council. Iterate until it passes.
   Do not commit a failing theme.
10. Only after a passing council: show me the final composite, the per-member scores, a
    short before/after of what changed during iteration, and the git diff summary. Then
    STOP and wait for my go-ahead before `git commit` / push. Do not deploy on your own.

Work on THIS theme only. Do not touch other themes' CSS or the archived themes. Keep every
change attributable to this one layout so a regression is trivial to bisect.
```
