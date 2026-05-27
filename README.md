# koushik.io

Personal portfolio site for Koushik Kotamraju — Senior Technical Security Engineer at Yahoo. Live at **[koushik.io](https://koushik.io)**.

## What it does

The site rotates through 20 distinct visual themes, switching every 12 hours. Each theme is a full redesign of the hero section: different layout, typography, color palette, animations, and feel. The theme badge in the top-right corner shows which one is currently active, and you can click it to cycle to the next.

**10 layout types, 2 themes each:**

| Layout | Themes |
|--------|--------|
| HUD | Sentinel HUD, Grafana Dark |
| Editorial | Editorial Noir, Serif Editorial |
| Dashboard | Fintech Prime, Risk Register |
| Minimal | Nordic Light, Typeset Book |
| Cinematic | Storm Cinematic, Cinema Poster |
| Brutalist | Brutalist Grid, Bauhaus Werk |
| Neon | Dark Web, Neon Tokyo |
| Terminal | Blueprint Technical, Index Sidebar |
| Sidebar | Aurora Glass, Iridescent |
| Poster | Cartographic, Zine Cutout |

## Stack

- **Next.js 15** (App Router, static export)
- **TypeScript**
- **Motion** (`motion/react`) for animations
- **Geist** font family (sans + mono)
- **GitHub Pages** via GitHub Actions

## Local development

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # builds to out/
```

## Theme system

Themes are defined in `lib/themes.ts`. Each theme specifies a layout type, CSS custom property overrides (colors, fonts), animation config, and content (bio copy, tagline, CTA text).

The active theme is derived from the current UTC time: `Math.floor(Date.now() / (12 * 60 * 60 * 1000)) + offset`, where `offset` is stored in `localStorage` under `koushik_theme_offset`. Clicking the theme badge increments the offset.

Stats (years of experience, CVEs found, etc.) rotate on the same 12-hour cycle via `lib/stats.ts`.

## Deployment

Pushes to `main` trigger the GitHub Actions workflow (`.github/workflows/deploy.yml`), which builds the static export and deploys to GitHub Pages. The custom domain `koushik.io` is wired via `public/CNAME`.
