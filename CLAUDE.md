# CLAUDE.md — Koushik Kotamraju Portfolio (koushik.io)

## Deployment
- **Host:** GitHub Pages (static export). `npm run build` → `out/`. Deployed on push to `main` via `.github/workflows/deploy.yml`.
- **Domain:** `koushik.io` — `public/CNAME`. Do not change.
- **Images:** `images: { unoptimized: true }` in `next.config.ts` — required for static export.

## Video Files — Rules (READ BEFORE TOUCHING VIDEOS)

Videos are an important part of the portfolio. They live in git but MUST be compressed before committing.

### Hard limits
- **GitHub hard limit: 100MB per file.** Files over 100MB are rejected at push time.
- **GitHub recommended max: 50MB.** Files between 50–100MB trigger a warning and can corrupt the remote pack store, requiring full repo recreation. **Stay under 50MB per video.**
- **Target: under 15MB per video** — keeps the repo lean and avoids pack issues.

### Directory structure
- `videos/` — raw source files (large, gitignored). Keep originals here.
- `public/videos/` — compressed files only. These go to git and deploy.

### Always compress before committing
```bash
# Compress to 1080p 60fps H.264 (typical result: 6–15MB)
ffmpeg -y -i videos/source.mp4 \
  -vf "scale=-2:1080" -r 60 \
  -c:v libx264 -crf 30 -preset slow -an \
  -movflags +faststart \
  public/videos/output.mp4

# Extract poster frame at 2s
ffmpeg -y -i videos/source.mp4 \
  -ss 2 -vframes 1 -vf "scale=-2:1080" -update 1 \
  public/videos/output-poster.jpg
```

### Codec rules
- **MP4 only (H.264).** Do not create or commit WebM files — VP9 is larger than H.264 for fast-motion/particle content.
- No audio tracks (`-an` flag always).
- `+faststart` flag always — enables streaming before full download.

### Pre-commit size check — MANDATORY
Always run this before `git add` on any video:
```bash
ls -lh public/videos/
```
If any file is over 50MB, compress further (raise CRF to 33–35, or drop to 720p) before proceeding.

### What NOT to do
- Never `git add videos/` — source files are gitignored for a reason.
- Never commit a file over 50MB. Even if the push succeeds, it can corrupt GitHub's remote pack store and require deleting and recreating the repository (this happened — it cost an hour).
- Never serve WebM alongside MP4 for these videos — MP4 is universally supported and smaller.

## Stack
- Next.js 15 App Router, TypeScript, Tailwind CSS, `motion/react` (NOT framer-motion)
- Fonts: **Geist Sans + Geist Mono** via `geist` npm package. **No Google Fonts CDN.**
- No CMS, no MDX. All content lives directly in component files as typed constants.

## Personal Info (use these everywhere, don't ask)
- Name: Koushik Kotamraju
- Role: Sr. Security Engineer at Yahoo Paranoids
- GitHub: https://github.com/koushik1610
- LinkedIn: https://www.linkedin.com/in/koushikkotamraju/
- Email: mailto:koushik.kotamraju1610@gmail.com

## Theme System Architecture

### How it works
1. `lib/themes.ts` — `themes[]` array + `LayoutVariant` union type
2. `lib/rotation.ts` — `localStorage` offset, `getThemeIndex(total)`, `incrementOffset()`
3. `ThemeApplier.tsx` — sets `document.documentElement.dataset.layout = theme.layout` and applies CSS vars
4. `components/Hero.tsx` — switch on `theme.layout` → render the correct hero component
5. `app/globals.css` — all theme CSS, scoped with `html[data-layout="X"] .classname`

### Rotation order
I-themes first (indices 0–N), then C-themes. Currently:
- `i-theme-01` (personal) → `i-theme-02` (panel) → `i-theme-03` (prose) → `i-theme-04` (split) → ...
- Then 20 C-themes

### Adding a new I-theme (protocol)
1. `curl` + `WebFetch` the reference site — extract colors, layout, content structure
2. Create `components/layouts/<name>/` — one Hero component file
3. Add CSS scoped to `html[data-layout="<name>"]` in `globals.css`
4. Add `"<name>"` to `LayoutVariant` in `lib/themes.ts`
5. Insert theme entry in `themes[]` (after last I-theme, before `// ── C-themes`)
6. Add import + `case "<name>"` in `components/Hero.tsx`
7. `npm run build` — must pass clean
8. Commit and push. Confirm deploy before moving to next theme.

### Global nav hiding for self-contained layouts
```css
html[data-layout="<name>"] nav { display: none !important; }
```

## I-Themes — Design Intent

### What I-themes must be
- **Visually distinct from each other** — different layout paradigm each time, not just different colors
- **Sophisticated** — each should feel like a standalone design system, not a variation
- **Inspired by** the reference sites, but NOT a 1:1 copy — take the best structural/typographic ideas, apply to Koushik's brand
- **Each has a clear layout concept** — not just "looks different colors"

### Completed I-themes
| ID | Name | Layout concept | Reference inspiration |
|----|------|----------------|----------------------|
| 01 | personal | Warm dark, conversational, nav with Connect dropdown | Jackie Zhang (jackiezhang.co.za) |
| 02 | panel | Fixed left panel (sticky identity/nav), scrollable right content | Brittany Chiang (brittanychiang.com) |
| 03 | prose | Ultra-minimal light mode, centered narrow prose column, no decoration | Lee Robinson (leerob.com) |
| 04 | split | Dual-identity split screen, two halves expand on hover | Adham Dannaway (adhamdannaway.com) |

### I-theme design rules
- Each must use a genuinely different **layout structure** (not just different colors on the same layout)
- I-03 (prose) is our only light-mode theme — don't make more unless intentional
- No gradient text, no glassmorphism by default, no side-stripe borders
- Self-contained: each layout hides the global nav and owns its own navigation

### For I-themes 5–20: use council deliberation
Before building any new I-theme, run a multi-agent council (UI expert + web designer + visual designer) to analyze the reference sites and decide what design language to use. Don't just build from the reference URL directly. The council should synthesize across references, not produce a per-site copy.

## C-Themes (existing — do not modify without reason)
20 C-themes exist, named after visual styles (Sentinel HUD, Editorial Noir, etc.).
They use layout variants: terminal, editorial, dashboard, minimal, hud, cinematic, brutalist, neon, sidebar, poster, gallery, warhol.
Accent color convention for C-themes: `#818cf8` (indigo-400) is the base accent.

## Design Decisions Made (don't re-litigate these)
- **Rotation:** Pure sequential — click increments offset by 1, wraps at total. No time-based math.
- **Font:** Geist only. Don't propose Google Fonts or CDN fonts.
- **Stats:** `lib/stats.ts` + `CountUp` component — computed from hardcoded data.
- **No test suite** — verify by running `npm run build` (TypeScript + ESLint must pass clean).
- **No Tailwind in I-theme hero components** — all styling is in `globals.css` with BEM-style class names.

## Design Council (COUNCIL.md — gitignored)

**COUNCIL.md** defines 16 specialist reviewers. Before anything commits to git, the relevant council group must score it ≥95 composite with no single member below 80.

12-member UI+Design Council. Groups:
- **Theme visual**: members 1 (AI Product Design Director), 2 (Frontend Craft), 6 (SaaS Critic), 12 (Storytelling/Brand)
- **Engineering**: members 3 (Architect), 4 (AI Dev Architect), 11 (Principal Reviewer)
- **UX + Systems + A11y**: members 5 (AI UX), 7 (Design Systems), 8 (Performance), 9 (Accessibility), 10 (Conversion)

Spawn 3 agents in parallel for full review. Each embodies their group members, scores each separately. Final composite = mean of all 12.

**Gate rule: nothing merges to git without ≥95 composite and no single member below 80.**

## What Not To Do
- Don't ask what social links/email to use — they're above
- Don't use `framer-motion` — use `motion/react`
- Don't add `basePath` — custom domain serves from root
- Don't add Google Fonts CDN links
- Don't touch C-themes unless explicitly asked
- Don't build new I-themes one-per-URL from the reference list — use council deliberation for I-05+

## Reference Sites (gitignored as REFERENCES.md)
Full list in `REFERENCES.md`. Key pool: emmabostian/developer-portfolios + devportfolios.dev.
Notable references: jackiezhang.co.za, brittanychiang.com, leerob.com, adhamdannaway.com, samgoddard.co.uk, egstad.com, henry.codes, davideperozzi.com, thomas.wang, bonhomme.lol, tobiasahlin.com, rauno.me, delba.dev.
