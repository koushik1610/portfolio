# UI guidelines

Rules every theme on koushik.io follows, on top of Hallmark's Floor and `.hallmark/BUILD-SPEC.md`.
Where this file and the Floor disagree, the Floor wins.

Sources, read 2026-11-20:

- Charles Liu ([@charles.unemployed](https://www.instagram.com/charles.unemployed/)), design-engineering reels: AI slop indicators, design hacks, animation rules, design terms, backgrounds, typography rules, fonts parts 1 and 2, accent colour, UX and animation laws.
- [@louyi.ux](https://www.instagram.com/louyi.ux/) on portfolio heroes and the five layouts that got the most interview invites.
- The owner's saved "Portfolio/UI" collection on Instagram (11 reels; templates and effects listed at the end).

Each rule is a paraphrase, with the CSS where there is a real one. "Here" notes say how it lands on this site.

## 1. Slop to avoid

These read as machine-made. A theme may break one only on purpose, with the reason in its stamp.

1. Tags and pills everywhere.
2. Italics used for emphasis all over a page.
3. Instrument Serif (and the other faces in section 4's skip list).
4. Negative letter-spacing on every heading.
5. Over-detailed UI: ornaments, counters and meta strings that say nothing.
6. A divider between every block.
7. Many shades and opacities of the same colour.
8. Every block in a bordered container.
9. Diagrams more detailed than the point they make.
10. Verbose, repeated copy.
11. Code-style breadcrumbs (`src / auth / file.py`) as decoration.
12. Section numbering (01, 02, 03).
13. Eyebrows: the small label above a heading.
14. Dithering as decoration.
15. ASCII images.
16. Squircles.
17. Mono type used for everything.
18. ALL CAPS subtitles.
19. Gradient backgrounds.
20. Periods at the end of headings.

Here: 12, 13 and 18 are already Floor rules. Status uses mono throughout because its material asks for it; no other theme may.

## 2. Typography

- **Tabs and toggles:** reserve the bold width so selecting one does not shift the layout. Stack a hidden bold copy in the same grid cell: `.tab { display: inline-grid } .tab::after { content: attr(data-text); font-weight: 700; visibility: hidden; grid-area: 1 / 1 }`.
- **Buttons and labels:** `text-box: trim-both cap alphabetic` so the text sits truly centred.
- **Links:** `text-underline-offset: 0.2em` so underlines clear the descenders.
- **Superscripts:** `sup { line-height: 0; position: relative; vertical-align: baseline; top: -0.5em }` so they do not push lines apart.
- **Headlines:** fluid size, `font-size: clamp(2rem, 1rem + 5vw, 4rem)`, not jumps at breakpoints.
- **Acronyms:** `font-variant-caps: all-small-caps` in running prose instead of full caps. Never on labels (Floor 9).
- **Quotes and apostrophes:** curly, always.
- **File names:** truncate in the middle so the extension stays visible.
- **Narrow columns:** `hyphens: auto` with `lang="en"` on `<html>`.
- **Card titles:** clamp at two lines (`-webkit-line-clamp: 2`).
- **Numbers that line up:** `font-variant-numeric: tabular-nums`.
- **Widows and orphans:** no lone word on a heading's last line (`text-wrap: balance` on headings, `pretty` on paragraphs).
- **Line length:** 60 to 75 characters for body text.

## 3. Colour and accent

- **One accent, used sparingly.** Put it on the thing you are selling. Here that is the email CTA and the one live signal, not decoration.
- **Warm page, cool accent. Cool page, warm accent.** Pick the accent from across the colour wheel from the ground.
- **Never pick an accent because you like it.** It has to come from the material or the content.
- **Tinted neutrals:** greys carry a hint of the ground's hue, so they look chosen.
- **Palettes in OKLCH,** so equal lightness looks equal.
- **Gradients `in oklch`** (`linear-gradient(90deg in oklch, ...)`) so they do not go grey in the middle. Gradient backgrounds stay banned (section 1); this is for a necessary ramp only.
- **Borders in alpha** (`rgb(0 0 0 / 0.12)`), so they sit on any surface.
- **Dark mode depth:** show elevation with lighter surfaces, not shadows.
- **Product shots on white:** `mix-blend-mode: multiply` removes the white box.

Here: colours live only in each theme's `tokens.css`. Compute contrast with `scripts/contrast.py`.

## 4. Fonts

Faces that do not look AI-made (Charles Liu's lists, grouped by feel):

| Feel | Faces |
|---|---|
| Clean Swiss | ABC Diatype, TWK Lausanne, Switzer, Saans, Areal, Strichpunkt Sans |
| Friendly | Studio Feixen Sans, PP Mori, Aeonik, Degular, GT Walsheim, Circular |
| Some personality | Apfel Grotezk, Aktiv Grotesk, ABC Favorit, Familjen Grotesk, ABC Monument Grotesk, ABC Oracle |
| Technical | ABC Diatype Mono, Söhne Mono, GT America Mono, IBM Plex Mono, Commit Mono, Departure Mono |
| Vintage | Editorial New, ABC Arizona, ABC Marist, Concrette, GT Super, Blazeface |
| Modern serif | Tiempos Fine, Reckless, Signifier, Canela, Luperca, Domaine Display |
| Soft serif | EB Garamond, Exposure, GT Alpina, Mioya, Tiempos Text, Lyon Text |
| Fun | Gautreaux, Hobeaux, Obviously, Absans, GT Maru, 5by7 |

Skip: Inter, Roboto, Arial, Instrument Serif, Fraunces, Playfair Display, Geist, Space Grotesk, Bricolage Grotesque, Instrument Sans, JetBrains Mono, Space Mono.

Here: most of the list is commercial. Only open-licence faces ship (SIL OFL, or Fontshare's ITF licence for Switzer), self-hosted through `lib/fonts.ts`. Open faces from the list: Switzer, Familjen Grotesk, IBM Plex Mono, Commit Mono, Departure Mono, EB Garamond.

## 5. Layout and surfaces

- **Concentric radius:** inner radius = outer radius minus the padding between them.
- **Icon weight matches text weight:** the icon's stroke follows the weight of the text beside it.
- **Masked edges:** fade a scrolling row out at its ends with `mask: linear-gradient(90deg, transparent, black 15% 85%, transparent)` instead of a hard cut.
- **Full-height sections:** `100dvh` (or `svh`), never `100vh`, which breaks in Safari.
- **Layout stability:** reserve the space for anything that loads; nothing jumps.
- **Safe area:** respect `env(safe-area-inset-*)` on phones.
- **Optical centre:** a lone object sits slightly above the true centre.
- **Touch targets:** at least 44px, and the hit area can be bigger than what it looks like.
- **Film grain over any large tone field,** to stop banding. Fine noise, not a texture show.

## 6. Motion

- **Entrances:** ease-out, from `scale(0.97)` and `opacity: 0`, never from `scale(0)`.
- **Press:** `button:active { scale: 0.97 }` with `transition: scale 150ms ease-out`.
- **Dropdowns and popovers:** 150 to 250ms, starting at `scale(0.95)`, growing from the thing you pressed (origin-aware).
- **Exits:** about 20% shorter than entrances, and toward what triggered them.
- **Moves on screen:** ease-in-out, along arcs, using `transform` only, never `top` or `left`.
- **Lists:** stagger rows by about 30ms.
- **Errors:** shake the field (`translateX` 0, -10, 10, -6, 6, -3, 0px over 360ms) as well as turning it red.
- **Steppers:** slide the next step in from the direction of travel; do not crossfade.
- **Accordions:** `:root { interpolate-size: allow-keywords }` so `height: auto` animates.
- **Theme switches:** turn transitions off while the theme changes (`.theme-switching * { transition: none !important }`).
- **Tooltips:** delay only the first; once one is open, show the rest instantly.
- **Icon swaps:** crossfade with a small blur on the outgoing icon (`filter: blur(4px)`).
- **Masks for reveals** rather than sliding whole blocks.
- **Interruptible:** a new input retargets a running animation; nothing waits for one to finish.
- **No bounce on everyday UI.** Springs only for things the user throws or drags, and they keep the release velocity.
- **Rubber band past bounds,** with resistance that grows, then spring back.
- **Shared element transitions:** the same object grows into the next view instead of being replaced.
- **Frequency of use:** the more often something is used, the less it animates.
- **Under 300ms** for UI; respond within 400ms (Doherty threshold).

Here: motion is CSS only (CLAUDE.md 3.2), `prefers-reduced-motion` is honoured, and the resting state is the revealed state.

## 7. UX laws to design with

- **Fitts:** big, close targets are faster to hit.
- **Hick:** more choices mean slower decisions. One primary CTA per screen.
- **Miller:** chunk information; people hold about seven things at once.
- **Jakob:** people expect your site to work like the sites they already use.
- **Postel:** accept messy input, give back clean output.
- **Recognition over recall:** offer choices to pick from instead of an empty box.
- **Progressive disclosure:** show the summary, put the detail one click away (`<details>`).
- **Labor illusion:** showing the work behind a result raises trust in it.
- **Optimistic update:** show the result now, sync after.
- **Brushing and linking:** hover or focus one item and light up everything connected to it.
- **Reward early, punish late:** show progress as soon as someone acts, hold errors until they finish.
- **Primacy:** most people only see the first screen. The hook, the proof and the best piece go there.
- **Social proof:** a number with its crowd ("from 5.6M ratings") reads as fact, a bare number as a claim. Here: only numbers from `lib/stats.ts`.
- **Mere exposure:** reuse what the reader already knows (here, the formats a security engineer recognises).
- **Materiality:** a texture needs a reason.

## 8. Backgrounds that are not flat

Felt, fluted glass, thermal gradients, water ripples, speckled graphite, single-hue landscapes, blueprint grids, halftone, grainy gradients, grass, dithered images, paper, contour lines, cloud sky, pixel mosaics, lens distortion, stippled gradients, square-dot grids, blurred photos, iridescent shapes, impressionist paintings, ASCII and pixels.

Here: a background must come from the theme's material and stay behind the content. Dithering and ASCII are on the slop list unless the material is a data artifact.

## 9. The portfolio hero

From @louyi.ux. The hero has one job: make it easy to see who you are, what you do, and why the work is worth a look.

1. **A clear headline.** Say what you do, not "welcome to my world". Here: `IDENTITY.name` as the h1 and `IDENTITY.lede` as the sentence.
2. **Proof straight away.** A project, a result or a specialty on the first screen.
3. **One obvious CTA.** Here: Email me first, Résumé second, never reordered.
4. **Real credibility only.** Logos, outcomes and experience you can stand behind.

The five layouts that got the most interview invites:

| Layout | Shape |
|---|---|
| Sandwich | Name above, a row of work in the middle, the role below |
| Bento | A large showcase tile with smaller tiles for proof and contact |
| Showcase | One-line positioning, then the work straight away |
| Editorial | Very large type, high personality |
| Split | Statement on one side, the work on the other |

## 10. What was in the saved Portfolio/UI collection

| Reel | What it shows | Use here |
|---|---|---|
| sl.devspace | A portrait hero whose eyes and head follow the cursor (AI character turned into frames) | Possible, with real photos of the owner only; never a generated face |
| design4me__ | Free templates: "storm lab" (huge outlined type over a cut-out photo on red), "Mondragon" (stacked service words in a condensed face), "Mondragon 4" (huge name bottom-left, a fan of tilted image cards) | Editorial and poster directions |
| aswinpanengal | Black-and-white page, huge condensed caps title around a cut-out portrait, ©2026, a "Let's talk" footer with an animated city | Monochrome poster direction |
| dododididaw | Dark page with condensed white caps and red, a recognition list with years down the right | Ranked record direction |
| avi_vashishta29 | 3D card carousels, interactive 3D objects as CTAs, blob-mask scroll reveals, a wall of project tiles | Ideas only; heavy WebGL is out unless a theme earns it |
| louyi.ux | The hero rules and five layouts above | Section 9 |
| saban.talks, jam.with.ai, aiwithsanskar, cindiezhu | Tools: icon sets, component libraries, design skills, repos as reference code | Process, not a theme |
| life.of.zehan | The "portfolio wheel": show new concepts or redesigns, and explain the why twice | Content framing for decisions |
| sl.devspace (Ddfw40BqrqG) | Same cursor-tracking hero | See first row |

## 11. Wider Instagram research: person-led, interactive heroes

The owner's reference is the sl.devspace reel ([Ddfw40BqrqG](https://www.instagram.com/reel/Ddfw40BqrqG/), 2.2M views): a portrait hero that follows the cursor. Searched 2026-11-20: all 45 of sl.devspace's reels, `#herosection` and `#portfoliowebsite`.

| Pattern | Seen in | Views | Can it be done honestly here |
|---|---|---|---|
| Portrait as a 3D dot sculpture that turns to the cursor, then dissolves into the photo on click | sl.devspace DfSNfcsIAlG | 458K | Yes: sample the dots from the real photo |
| Huge name behind a cut-out of the person, who stands in front of it; ink-bleed dark/light toggle | sl.devspace DfuX-9xoDjt, Dd_rIaZC1ay, DfmwFIboKm- | 11K to 883K | Yes: `PORTRAITS.cutout` is a local person mask of the owner's photo |
| Cinematic dark page, figure under a spotlight, the work as a stacked 3D deck | sl.devspace DcFd8Z7CZDT | 917K | Yes without video; the cutout under CSS light |
| Talking hero video, flipping ID card, periodic table of skills, sideways achievements | sl.devspace Dd_rIaZC1ay | 883K | Partly: no video of the owner exists |
| Lanyard ID badge that swings, drags and flips to the contact side | chanjun.kwon, Vercel Ship badge | n/a | Yes, as 2D canvas physics with the photo on the card |
| The portfolio as a hardware object: keycaps that spell a word, a synth | ui.debbie, midlife.engineering | 5.5K to 6.8K likes | Yes, HTML and CSS |
| A low-poly folded-paper face that tilts to the hand | marina_uiux | 65K likes | Yes: triangulate the photo |
| Generative fibres that bend to the cursor | skvortsov.design | 11K likes | Yes, canvas |
| A drivable 3D world or a city of buildings | Sébastien Lempens, persona-studio | 918K, 201K | No: a game, heavy WebGL, retired here |
| AI-generated character of the person, animated | sl.devspace, several | 2.2M | Only with real photos of the owner turned into frames; never an invented face |

What the best of these share: the person is the hero object, not a headshot in a box; one interaction rewards the first mouse move; the name is set huge and the figure overlaps it; the page underneath stays calm.

## 12. Saved templates (Free portfolio templates PT.3)

A Notion list the owner saved from a reel, opened 2026-11-20. Studied for composition and motion only; nothing is copied.

| Template | What carries it | Theme here |
|---|---|---|
| [Mondragon 4](https://mondragon4.framer.website/) | Swiss light grey; a huge grotesk name with a small B&W portrait; a fan of tilted 3D cards; labels that settle from scrambled letters; a services marquee; a rotating ring of logos | `deck` |
| [Mondragon](https://mondragon.framer.website/) | A twisting ribbon of image tiles across the hero over a huge condensed name; statement set in mono capitals; a drifting stack cloud | `helix` |
| [Foldfolio](https://foldfolio.framer.website/) | A closed foldable phone with a lock-screen portrait and notifications, the name huge behind it; scroll unfolds it into the site | `fold` |
| [Nika Stern](https://nikastern.framer.media/) | Drenched red with scanlines and thin column rules; the name split huge; a portrait card; paragraphs that darken word by word as they scroll | `depth` (with the owner's reel) |
| [motionsites: Prompt](https://motionsites.ai/?prompt=prompt-hero), [Shadow 3D](https://motionsites.ai/?prompt=shadow-3d) | A cut-out figure over a distorted wordmark; a split screen with a large figure standing across both halves | the figure-over-name move in `depth` |

The five themes built from sections 10 to 12: `depth` (the owner's reel), `fold`, `helix`, `deck`, and `badge` (chanjun.kwon, from `#portfoliowebsite`).
