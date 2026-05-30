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

  <img src="https://media.giphy.com/media/7j2hfyeVcDtf2/giphy.gif" alt="bird animation" width="200" />

  <p align="center">
    Personal portfolio for Koushik Kotamraju — Sr. Security Engineer building AI-native security platforms at enterprise scale. Features 20+ rotating visual themes, each a full layout redesign.
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

A personal portfolio that rotates through 20+ visually distinct themes — each one a full layout redesign with its own typography, color palette, animations, and feel. The theme badge in the top-right corner shows the active theme; click it to cycle to the next.

**I-Themes** (custom bespoke layouts):

| Theme | Concept |
|-------|---------|
| Aethera | Cinematic video hero, dark luxury editorial |
| Orb | Ambient orb background, name-forward identity |
| Oracle | PostgreSQL terminal UI — career data as query results |
| Assembly | x86 assembly code aesthetic |
| Avatar3d | 3D avatar with parallax scroll |
| Studio | Minimal studio/agency whitespace layout |

**C-Themes** (20 color/style variants across 10 layout archetypes):

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

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

* [![Next][Next.js]][Next-url]
* [![TypeScript][TypeScript]][TypeScript-url]
* [![Motion][Motion]][Motion-url]
* [![Tailwind][Tailwind]][Tailwind-url]

Deployed on **GitHub Pages** via GitHub Actions. Font: **Geist** (sans + mono). No CMS — all content lives in typed constants.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Theme System

Themes are defined in `lib/themes.ts`. Each specifies a layout variant, CSS custom property overrides (colors, fonts, spacing), animation config, and content.

The active theme is driven by a `localStorage` offset (`koushik_theme_offset`). Clicking the theme badge increments the offset by 1, cycling to the next theme. I-themes rotate first, then C-themes.

```
lib/themes.ts       — theme definitions + LayoutVariant union type
lib/rotation.ts     — localStorage offset logic, getThemeIndex()
components/Hero.tsx — switches on theme.layout → renders correct hero
app/globals.css     — all theme CSS, scoped with html[data-layout="X"]
```

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

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

<!-- USAGE -->
## Usage

**Cycling themes:** Click the theme badge (top-right corner) to advance to the next theme. The offset persists in `localStorage` — refreshing keeps you on the same theme.

**Jumping to a specific theme:** Navigate directly to `/theme/<name>`:
```
http://localhost:3000/theme/oracle
http://localhost:3000/theme/aethera
http://localhost:3000/theme/o-theme-01
```

**Adding a new I-theme:**
1. Create `components/layouts/<name>/` with a Hero component
2. Add scoped CSS to `app/globals.css` under `html[data-layout="<name>"]`
3. Add `"<name>"` to `LayoutVariant` in `lib/themes.ts`
4. Insert theme entry in `themes[]` (before C-themes)
5. Add `import` + `case "<name>"` in `components/Hero.tsx`
6. Run `npm run build` — must pass clean

**AI-readable content:** [`/llms.txt`](https://koushik.io/llms.txt) exposes a plain-text summary of career achievements optimized for LLM consumption.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

<!-- ROADMAP -->
## Roadmap

- [x] 6 custom I-themes (Aethera, Orb, Oracle, Assembly, Avatar3D, Studio)
- [x] 20 C-theme variants across 10 layout archetypes
- [x] Theme rotation with localStorage persistence
- [x] `llms.txt` for AI-readable career data
- [x] Ask AI — answer questions about the portfolio via LLM
- [ ] I-themes 7–10 (in design council deliberation)
- [ ] Resume PDF download
- [ ] Dark/light toggle for prose-style themes

See [open issues](https://github.com/koushik1610/portfolio/issues) for known issues and proposed features.

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
* [Motion (motion/react)](https://motion.dev)
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
[Motion]: https://img.shields.io/badge/Motion-000000?style=for-the-badge&logo=framer&logoColor=white
[Motion-url]: https://motion.dev/
[Tailwind]: https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white
[Tailwind-url]: https://tailwindcss.com/
