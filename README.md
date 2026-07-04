<!-- back to top anchor -->
<a id="readme-top"></a>

<!-- PROJECT SHIELDS -->
[![Stargazers][stars-shield]][stars-url]
[![Forks][forks-shield]][forks-url]
[![Issues][issues-shield]][issues-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT HEADER -->
<br />
<div align="center">

<h3 align="center">koushik.io</h3>

  <p align="center">
    Personal portfolio for Koushik Kotamraju — Sr. Security Engineer building AI-native security platforms at enterprise scale. A rotating set of fully bespoke visual themes, each a complete layout redesign built around one security-engineering artifact.
    <br />
    <br />
    <a href="https://koushik.io"><strong>View Live Site »</strong></a>
    &middot;
    <a href="https://github.com/koushik1610/portfolio/issues/new?labels=bug">Report Bug</a>
    &middot;
    <a href="https://github.com/koushik1610/portfolio/issues/new?labels=enhancement">Request Feature</a>
  </p>
</div>

---

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
        <li><a href="#theme-system">Theme System</a></li>
        <li><a href="#the-live-themes">The Live Themes</a></li>
      </ul>
    </li>
    <li><a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

---

<!-- ABOUT THE PROJECT -->
## About The Project

A personal portfolio that rotates through a growing set of visually distinct themes — each one a full layout redesign with its own typography, color palette, animation, and structural conceit. Nothing is a template with new paint: every theme is a genuinely different layout, and most render the career itself *as* a recognizable engineering artifact (an IAM policy document, a detection-coverage matrix, a security advisory, an incident-response transcript) rather than a generic "about me" page.

The theme badge in the top-right corner shows the active theme; click it to cycle to the next one. Rotation is time-based (it shifts weekly for every visitor) plus a per-visitor click offset — see [Theme System](#theme-system).

### Design principles

- **Person-first, always.** Koushik Kotamraju is the visual subject of every hero — never a product name, a company, or a slogan.
- **One owned accent per theme.** Distinctiveness comes from a deliberately chosen accent color, not a house palette repeated everywhere.
- **The format carries the story.** Detection engineering, IAM analysis, and AI security platforms are told through document types security engineers actually produce — not generic portfolio sections.
- **Real accessibility, not retrofitted.** Every theme ships with a real `<h1>`, skip links, visible focus rings, 44px touch targets, `prefers-reduced-motion` support, and information that never depends on color alone.
- **No motion debt.** Animation is GSAP-driven, gated behind reduced-motion checks, and backed by a wall-clock "settle" failsafe so a throttled background tab can never leave content invisible.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

* [![Next][Next.js]][Next-url]
* [![TypeScript][TypeScript]][TypeScript-url]
* [![GSAP][GSAP]][GSAP-url]
* [![Tailwind][Tailwind]][Tailwind-url]

Deployed on **GitHub Pages** via GitHub Actions as a static export. Fonts: **Geist Sans + Geist Mono** exclusively (no CDN fonts). Animation: **GSAP** (`gsap`, `useGSAP`, `ScrollTrigger`, `SplitText`) via a single re-export module — never `framer-motion`. No CMS — all content lives in typed constants inside each theme's own component file.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Theme System

Every theme is exactly **two files**, fully self-contained:

```
components/layouts/<name>/<Name>Hero.tsx   — the entire page for that theme
components/layouts/<name>/styles.css       — every rule, scoped to that theme
```

Wiring a theme into the site touches exactly three shared files:

```
lib/themes.ts        — LayoutVariant union + themes[] registry (colors, content, accent)
lib/rotation.ts       — theme selection: ISO-week number + a persistent click offset
components/Hero.tsx  — switch (theme.layout) → renders the matching hero component
```

`components/Hero.tsx` uses an exhaustiveness guard on the `switch`, so adding a theme to the
`LayoutVariant` union without a matching `case` is a compile-time error, not a silent blank
page. `app/globals.css` holds only true globals (reset, the shared top-right widget stack,
the print-friendly `/resume` page) — it never carries theme-specific styling.

The active theme is chosen by `getThemeIndex()`: the current ISO week number picks a default
starting theme (so the site looks different to everyone, and shifts weekly), and clicking the
theme badge adds a persistent per-visitor offset on top via `localStorage`.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### The Live Themes

The canonical list is always `lib/themes.ts` — read it directly for the current count and
exact accent values; the table below is a snapshot and will drift.

| Theme | Concept | Mode |
|---|---|---|
| `aethera` | Cinematic video hero, dark luxury editorial | Light |
| `command` | Glass ⌘K command console | Dark |
| `lumen` | Technical spec-sheet document | Light |
| `axiom` | Live scroll-driven attack-path graph | Dark |
| `avatar` | Darkroom portrait, one develop beat | Dark |
| `telemetry` | SOC operations console | Dark |
| `solstice` | Kinetic broadsheet | Light |
| `casefile` | Incident-response terminal transcript | Dark |
| `briefing` | Bento operations brief | Dark |
| `monolith` | Ink poster of restraint, one motion beat | Dark |
| `advisory` | Security advisory (GHSA-style), "no patch available" | Dark |
| `intercept` | Packet capture dissecting to the name | Dark |
| `uptime` | Career status page, all systems operational | Dark |
| `dispatch` | Split-flap operations board | Dark |
| `waveform` | Oscilloscope signal bench | Dark |
| `policy` | AWS IAM policy document as an editor buffer | Dark |
| `coverage` | MITRE ATT&CK detection coverage matrix | Dark |
| `rfc` | An IETF RFC — a standards-track document for one engineer | Light |

More themes are built one at a time, each gated behind a multi-persona design-council review
(≥95 composite score, no single reviewer below 80) before it ships.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

<!-- GETTING STARTED -->
## Getting Started

### Prerequisites

Node.js 18+ and npm:

```sh
npm install npm@latest -g
```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/koushik1610/portfolio.git
   cd portfolio
   ```

2. Install dependencies
   ```sh
   npm install
   ```

3. Start the dev server
   ```sh
   npm run dev
   # → http://localhost:3000
   ```

4. Build for production
   ```sh
   npm run build
   # Static export → out/
   ```

There is no test suite. Verification is `npm run build` passing clean (TypeScript + ESLint +
static export).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

<!-- USAGE -->
## Usage

**Cycling themes:** Click the theme badge (top-right corner) to advance to the next theme.
The click offset persists in `localStorage` on top of the weekly default, so refreshing keeps
you on the same theme.

**Jumping to a specific theme:** Navigate directly to `/theme/<name>`, e.g.:
```
http://localhost:3000/theme/policy
http://localhost:3000/theme/coverage
http://localhost:3000/theme/rfc
```

**Adding a new theme:**
1. Create `components/layouts/<name>/<Name>Hero.tsx` + `styles.css` — nothing else.
2. Add `"<name>"` to the `LayoutVariant` union and a matching entry to `themes[]` in
   `lib/themes.ts` (all 8 CSS vars, `layout`, `id`, `name`, `content`).
3. Import the component and add `case "<name>": return <NameHero key={theme.id} theme={theme} />;`
   in `components/Hero.tsx`.
4. Run `npm run build` — must pass clean. The exhaustiveness guard will fail the build if the
   `case` is missing.

**AI-readable content:** [`/llms.txt`](https://koushik.io/llms.txt) exposes a plain-text
summary of career achievements optimized for LLM consumption — the mechanism behind the
"Ask AI about me" widget.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

<!-- ROADMAP -->
## Roadmap

- [x] 18 fully bespoke themes, each a distinct layout structure
- [x] Time-based + click-offset theme rotation with `localStorage` persistence
- [x] `llms.txt` for AI-readable career data
- [x] "Ask AI about me" — answer questions about the portfolio via LLM
- [ ] Additional themes (in active design-council pipeline)
- [ ] Dark/light toggle independent of theme rotation

See [open issues](https://github.com/koushik1610/portfolio/issues) for known issues and
proposed features.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

<!-- CONTACT -->
## Contact

**Koushik Kotamraju** — Sr. Security Engineer

[![LinkedIn][linkedin-shield]][linkedin-url]

- Email: [koushik.kotamraju1610@gmail.com](mailto:koushik.kotamraju1610@gmail.com)
- Portfolio: [koushik.io](https://koushik.io)
- GitHub: [@koushik1610](https://github.com/koushik1610)

Project Link: [https://github.com/koushik1610/portfolio](https://github.com/koushik1610/portfolio)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

* [othneildrew/Best-README-Template](https://github.com/othneildrew/Best-README-Template)
* [GSAP](https://gsap.com)
* [Vercel Geist Font](https://vercel.com/font)
* [shields.io](https://shields.io)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

<!-- MARKDOWN LINKS & IMAGES -->
[stars-shield]: https://img.shields.io/github/stars/koushik1610/portfolio.svg?style=for-the-badge
[stars-url]: https://github.com/koushik1610/portfolio/stargazers
[forks-shield]: https://img.shields.io/github/forks/koushik1610/portfolio.svg?style=for-the-badge
[forks-url]: https://github.com/koushik1610/portfolio/network/members
[issues-shield]: https://img.shields.io/github/issues/koushik1610/portfolio.svg?style=for-the-badge
[issues-url]: https://github.com/koushik1610/portfolio/issues
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/koushikkotamraju

[Next.js]: https://img.shields.io/badge/Next.js_15-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[TypeScript]: https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white
[TypeScript-url]: https://www.typescriptlang.org/
[GSAP]: https://img.shields.io/badge/GSAP-88CE02?style=for-the-badge&logo=greensock&logoColor=black
[GSAP-url]: https://gsap.com/
[Tailwind]: https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white
[Tailwind-url]: https://tailwindcss.com/
