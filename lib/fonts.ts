import localFont from "next/font/local";

/* ─────────────────────────────────────────────────────────────────────────────
   EVERY FACE ON THE SITE, self-hosted from public/fonts (latin subsets from
   Fontsource, all SIL OFL 1.1). Never a CDN, never next/font/google, which
   fetches at build time and makes CI depend on a third party.

   `preload: false` is the line that matters. The default preloads every face
   on every page, which would download all five themes' type to render one. With
   it off, a browser fetches a face only when rendered text resolves to it, so a
   visitor pays for the active theme's faces and nothing else. The cost is a
   short swap on a cold load, softened by the metric-matched fallback.

   Each theme's tokens.css names its faces as
     --font-display: var(--nf-host-grotesk), "Host Grotesk", ui-sans-serif, ...
   keeping the literal family name so Hallmark's font gates can read it.
───────────────────────────────────────────────────────────────────────────── */

/* next/font requires literal options at every call, so display and preload
   are repeated rather than spread from a shared object. */

const hostGrotesk = localFont({ display: "swap", preload: false, src: "../public/fonts/HostGrotesk-var.woff2", weight: "300 800", variable: "--nf-host-grotesk" });
const atkinsonMono = localFont({ display: "swap", preload: false, src: "../public/fonts/AtkinsonHyperlegibleMono-var.woff2", weight: "200 800", variable: "--nf-atkinson-mono" });
const sofiaCondensed = localFont({ display: "swap", preload: false, src: "../public/fonts/SofiaSansExtraCondensed-var.woff2", weight: "100 900", variable: "--nf-sofia-condensed" });
const barlow = localFont({
  display: "swap",
  preload: false,
  src: [
    { path: "../public/fonts/Barlow-300.woff2", weight: "300" },
    { path: "../public/fonts/Barlow-400.woff2", weight: "400" },
  ],
  variable: "--nf-barlow",
});
const chakraPetch = localFont({ display: "swap", preload: false, src: "../public/fonts/ChakraPetch-600.woff2", weight: "600", variable: "--nf-chakra-petch" });
const plexSans = localFont({ display: "swap", preload: false, src: "../public/fonts/IBMPlexSans-var.woff2", weight: "100 700", variable: "--nf-plex-sans" });
const plexMono = localFont({
  display: "swap",
  preload: false,
  src: [
    { path: "../public/fonts/IBMPlexMono-400.woff2", weight: "400" },
    { path: "../public/fonts/IBMPlexMono-500.woff2", weight: "500" },
  ],
  variable: "--nf-plex-mono",
});
const epilogue = localFont({ display: "swap", preload: false, src: "../public/fonts/Epilogue-var.woff2", weight: "100 900", variable: "--nf-epilogue" });
const libreFranklin = localFont({ display: "swap", preload: false, src: "../public/fonts/LibreFranklin-var.woff2", weight: "100 900", variable: "--nf-libre-franklin" });

/** All font variable classes, for <html className>. */
export const fontVariables = [
  hostGrotesk, atkinsonMono, sofiaCondensed, barlow, chakraPetch, plexSans, plexMono, epilogue, libreFranklin,
].map((f) => f.variable).join(" ");
