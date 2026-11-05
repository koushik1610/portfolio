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
    Personal site for Koushik Kotamraju, Principal Technical Security Engineer at Yahoo. Six themes, each one a different design built from a Hallmark theme material, all reading from one content layer.
    <br />
    <br />
    <a href="https://koushik.io"><strong>View the live site</strong></a>
    &middot;
    <a href="https://koushik.io/resume/">Résumé</a>
    &middot;
    <a href="https://github.com/koushik1610/portfolio/issues/new?labels=bug">Report a bug</a>
  </p>
</div>

---

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#about-the-project">About the project</a>
      <ul>
        <li><a href="#built-with">Built with</a></li>
        <li><a href="#the-themes">The themes</a></li>
        <li><a href="#how-it-fits-together">How it fits together</a></li>
      </ul>
    </li>
    <li><a href="#getting-started">Getting started</a></li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

---

<!-- ABOUT THE PROJECT -->
## About the project

A personal site that shows one of six themes. A new visitor gets the week's theme and keeps it on later visits; "Next theme" in each theme's nav moves to the next one. Every theme carries the same facts: who he is and at what level, the AWS baseline he owns, the work with its honest build status, at least one decision record with the option he rejected, his career, and a way to reach him.

The themes were rebuilt in October 2026 with [Hallmark](https://github.com/nutlope/hallmark), a design skill whose linter fails the defaults generated pages fall into (eyebrows, tracked capitals, a centred template, invented numbers). A review council picked the five materials from the themes Hallmark dealt for this brief. Every page passes `sloplint --render` with zero FAIL, and every waiver is written into the page's own stylesheet with its reason.

### Design rules

- **One content layer.** Every sentence comes from `lib/profile.ts` and every number from `lib/stats.ts`. A theme never types a fact, so a correction lands everywhere at once.
- **Show the judgment.** Each theme renders a decision record with the rejected alternative at equal weight.
- **Honest status.** Research is labelled research and a half-built system says which half.
- **The action never moves.** Email first, Résumé second, on the first screen of every theme.
- **Accessible by construction.** One `<h1>`, a skip link, visible focus, 44px targets, computed contrast, reduced motion respected, and no content that waits on an animation.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built with

* [![Next][Next.js]][Next-url]
* [![TypeScript][TypeScript]][TypeScript-url]

Static export to GitHub Pages. Plain scoped CSS, no framework. Fonts are self-hosted woff2 files in `public/fonts` (all SIL OFL), loaded through `next/font/local` with preloading off, so a visitor downloads only the active theme's faces. There is no animation library; the little motion there is uses CSS.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### The themes

`lib/themes.ts` is the source of truth.

| Theme | Hallmark material | What carries it | Ground |
|---|---|---|---|
| `console` | Console | A decision as a versioned reading: the rejected option struck above the one chosen | Dark |
| `ink` | Ink | The project register with honest state pills and a status filter | Light |
| `darkroom` | Darkroom | His photograph printed as Plate 01, the figures set as an edition | Dark |
| `brutal` | Brutal | A boxed fact sheet, and the miss he has not yet closed, stated in full | Light |
| `blueprint` | Blueprint | the correlation engine's escalation path drawn as an elevation, his photo as a cyanotype in the title block | Mid |
| `status` | Wayfind | The career as a status page: real build states, one open known gap, decisions as changes, no invented uptime | Light |

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### How it fits together

```
lib/profile.ts, lib/stats.ts      every sentence and every number
lib/resume.ts                     generated from the Ascend master by scripts/sync-resume.py
lib/themes.ts                     the slugs, names, and Hallmark genres
lib/rotation.ts                   which theme a visitor sees, and the pre-paint <head> script
lib/fonts.ts                      every face, self-hosted
components/Hero.tsx               slug to theme component (a Record, so a missing theme fails the build)
components/SiteControls.tsx       "Next theme", "Copy email" and "Ask an AI about me"
components/icons/                 icon paths from itshover (Apache-2.0), animated with CSS
components/layouts/<slug>/        <Name>Hero.tsx, styles.css, tokens.css
app/globals.css                   the shared base every theme inherits
app/resume/                       one neutral, print-first résumé for all themes
```

Each theme's colours and faces live in its `tokens.css`, scoped to `:root[data-theme="<slug>"]`. All the token files load up front (about 2 KB each), so colours resolve the moment the head script sets `data-theme`, before the theme's own code arrives. Every rule in a theme's `styles.css` starts with its `[data-theme]` selector, because theme CSS stays loaded after a rotation.

`npm run check` runs `scripts/check-themes.mjs`, which fails on an unscoped selector, a colour or font literal outside `tokens.css`, a missing Hallmark stamp, or a theme missing the decision record, the action row, the controls, or the screen-reader summary. Then ESLint.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

<!-- GETTING STARTED -->
## Getting started

Node.js 18 or later.

```sh
git clone https://github.com/koushik1610/portfolio.git
cd portfolio
npm install
npm run dev        # http://localhost:3000
npm run check      # theme rules and lint
npm run build      # static export to out/
```

To lint a theme with Hallmark, build, serve `out/`, and point sloplint at the theme's route:

```sh
npx serve out -l 4173
node ~/.claude/skills/hallmark/scripts/sloplint.mjs components/layouts/ink --genre editorial --render --url http://localhost:4173/theme/ink/
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

<!-- USAGE -->
## Usage

**A specific theme:** `/theme/<slug>/`, for example `/theme/blueprint/`. These links are stable to share.

**Updating the résumé:** edit the bullet selection in `scripts/sync-resume.py`, then `npm run sync-resume`. Bullets are copied verbatim from the master; the script never rewords them.

**Adding a theme:**
1. Add the slug to `THEME_SLUGS` and an entry to `themes` in `lib/themes.ts`.
2. Create `components/layouts/<slug>/` with `<Name>Hero.tsx`, `styles.css`, and `tokens.css` (start from `theme.mjs scaffold <slug>` and scope the token block).
3. Add the component to `HEROES` in `components/Hero.tsx`, a face to `lib/fonts.ts` if needed, and the token import to `app/layout.tsx`.
4. `npm run check`, `npm run build`, then sloplint the route.

**AI-readable profile:** [`/llms.txt`](https://koushik.io/llms.txt) is a plain-text profile generated from the same master. The "Ask an AI about me" links open each tool with a prompt pointing at it.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

<!-- CONTACT -->
## Contact

**Koushik Kotamraju**, Principal Technical Security Engineer

[![LinkedIn][linkedin-shield]][linkedin-url]

- Email: [koushik.kotamraju1610@gmail.com](mailto:koushik.kotamraju1610@gmail.com)
- Site: [koushik.io](https://koushik.io)
- GitHub: [@koushik1610](https://github.com/koushik1610)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

* [nutlope/hallmark](https://github.com/nutlope/hallmark), the theme materials and the linter
* [itshover](https://github.com/itshover/itshover), icon paths (Apache-2.0)
* [Fontsource](https://fontsource.org) for the open-licensed font files
* [othneildrew/Best-README-Template](https://github.com/othneildrew/Best-README-Template)
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
