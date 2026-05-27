# Portfolio Revamp Playbook — Cull, Intake, Build, QA

Four prompts, run in order, one theme at a time. Paste each into Claude Code from
the repo root (`/Users/koushik/Code/projects/portfolio`).

Confirmed decisions (Koushik):
- Direction: build ONE deep, dramatic CINEMATIC FLAGSHIP theme that concentrates the
  cinematic elements liked across the motionsite references. The rest of the kept themes
  stay strict house-style. The flagship is where the rule-breaking budget is spent.
- Target active rotation after cull: 6–8 themes (lean to the lower end if quality
  demands it). The flagship counts as one of these slots.
- Man United refs: subtle only — Old Trafford red `#DA291C` accent on one theme + one
  buried easter egg. Nothing overt.

The flagship deliberately breaks specific house rules (self-authored motion background,
glass surfaces, a self-hosted display font, gradient text MAY be used) — but ONLY inside
its own `html[data-layout="<flagship>"]` scope. Cinematic ≠ slop: every cinematic element
must be motivated by a concept, executed with craft, and built from OWN assets — never
stock video or external CloudFront/figma.site URLs. Everyday themes stay strict.
Build prompts: use 03 for everyday house-style themes, 03b for the cinematic flagship.

Hard house rules every prompt must respect (from CLAUDE.md):
- Next.js 15 static export → GitHub Pages. NOT Vite.
- `motion/react`, never `framer-motion`.
- Geist Sans + Geist Mono only. No Google Fonts / CDN fonts.
- I-theme heroes use NO Tailwind — all styling in `globals.css`, scoped
  `html[data-layout="X"] .cls`. Content from typed constants.
- Nothing merges to git until the council scores ≥95 composite, no member <80.
- Build verification = `npm run build` clean (TS + ESLint). No test suite.
