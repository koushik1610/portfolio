import { getThemeIndex } from "@/lib/rotation";

export type LayoutVariant = "aethera" | "avatar" | "briefing" | "coverage" | "rfc" | "route" | "ide" | "swiss";

export interface ThemeContent {
  tagline: string;
  bio: string;
  cta: string;
}

/**
 * Per-theme CSS custom properties applied to <html> by ThemeApplier.
 *
 * `--on-accent` is the text/glyph color that sits ON an accent-filled surface
 * (the mandatory "Email me" button, the skip link). It is a function of the
 * accent, so it lives beside it rather than being re-derived in each theme's
 * stylesheet. Every value below is measured against its own accent at >= 4.5:1:
 *   aethera  #ffffff on #4a7c59 = 4.86:1
 *   avatar   #1a1204 on #e0a44d = 8.47:1
 *   briefing #260d06 on #ff7a5c = 7.17:1
 *   coverage #04121f on #7cb8f7 = 9.05:1
 *   rfc      #ffffff on #0f766e = 5.47:1
 *   route    #04141a on #22d3ee = 10.37:1
 *   ide      #14101f on #9d7bff = 5.97:1
 *
 * `--border-strong` is the boundary color for a control whose only affordance
 * is its border (the ghost "Résumé" CTA), governed by WCAG 1.4.11 non-text
 * contrast at 3:1. `--border` is a decorative hairline and is NOT sufficient:
 * rgba(255,255,255,0.09) composites to 1.22:1 on a near-black ground.
 *
 * Composited against each theme's own background. All clear 3:1; the worst case
 * is aethera, with only 0.04 of margin:
 *   aethera  3.04:1   avatar 3.72:1   briefing 3.77:1   coverage 3.37:1
 *   rfc      3.36:1   route  3.48:1   ide      3.48:1
 * (An earlier revision of this comment claimed "worst case ide at 3.80:1".
 * That was computed against pure white at 0.4 alpha rather than ide's actual
 * rgba(238,240,244,0.4) over #0d0e14, and named the wrong theme besides.)
 */
export interface Theme {
  name: string;
  id: string;
  vars: Record<string, string>;
  layout: LayoutVariant;
  content: ThemeContent;
}

export const themes: Theme[] = [
  {
    name: "Aethera",
    id: "aethera",
    vars: {
      "--background": "#ffffff",
      "--surface": "#f8f8f6",
      "--surface-2": "#f0f0ee",
      "--text-primary": "#000000",
      "--text-muted": "#6f6f6f",
      "--accent": "#4a7c59",
      "--accent-dim": "#3a6347",
      "--on-accent": "#ffffff",
      "--border": "#e5e5e3",
      "--border-strong": "#949490",
    },
    layout: "aethera",
    content: { tagline: "Cloud security. Built to hold.", bio: "Detection engineering at account scale. IAM analysis at depth. Nine years across three organizations.", cta: "View Work" },
  },
  {
    name: "Avatar",
    id: "avatar",
    vars: { "--background": "#060606", "--surface": "#101010", "--surface-2": "#181818", "--text-primary": "#f3f1ea", "--text-muted": "#9a978d", "--accent": "#e0a44d", "--accent-dim": "#c08a36", "--on-accent": "#1a1204", "--border": "rgba(255,255,255,0.1)", "--border-strong": "rgba(255,255,255,0.4)" },
    layout: "avatar",
    content: { tagline: "Sr. Security Engineer · Yahoo Paranoids", bio: "Cloud security engineer building AI-native security platforms.", cta: "View Work" },
  },
  {
    name: "Briefing",
    id: "briefing",
    vars: { "--background": "#0c0a09", "--surface": "rgba(255,255,255,0.035)", "--surface-2": "rgba(255,255,255,0.055)", "--text-primary": "#efece8", "--text-muted": "#a39d94", "--accent": "#ff7a5c", "--accent-dim": "#d05a3e", "--on-accent": "#260d06", "--border": "rgba(255,255,255,0.09)", "--border-strong": "rgba(255,255,255,0.4)" },
    layout: "briefing",
    content: { tagline: "An operations brief in bento form.", bio: "One dominant tile, one hire signal, the numbers around them.", cta: "Email me" },
  },
  {
    name: "Coverage",
    id: "coverage",
    vars: { "--background": "#07090d", "--surface": "rgba(255,255,255,0.03)", "--surface-2": "rgba(255,255,255,0.05)", "--text-primary": "#e9edf3", "--text-muted": "#97a1ae", "--accent": "#7cb8f7", "--accent-dim": "#3a7dd6", "--on-accent": "#04121f", "--border": "rgba(233,237,243,0.09)", "--border-strong": "rgba(233,237,243,0.4)" },
    layout: "coverage",
    content: { tagline: "Detection coverage, mapped.", bio: "An ATT&CK matrix heat-mapped by nine years of detection depth.", cta: "Email me" },
  },
  {
    name: "RFC",
    id: "rfc",
    vars: { "--background": "#fcfbf8", "--surface": "#ffffff", "--surface-2": "#f3f1ea", "--text-primary": "#191817", "--text-muted": "#5d5b55", "--accent": "#0f766e", "--accent-dim": "#115e59", "--on-accent": "#ffffff", "--border": "rgba(25,24,23,0.14)", "--border-strong": "rgba(25,24,23,0.5)" },
    layout: "rfc",
    content: { tagline: "RFC 9161: the Kotamraju protocol.", bio: "A standards-track document for one engineer.", cta: "Email me" },
  },
  {
    name: "Route",
    id: "route",
    vars: { "--background": "#070a10", "--surface": "rgba(238,242,246,0.03)", "--surface-2": "rgba(238,242,246,0.05)", "--text-primary": "#eef2f6", "--text-muted": "#90a0ae", "--accent": "#22d3ee", "--accent-dim": "#0e7490", "--on-accent": "#04141a", "--border": "rgba(238,242,246,0.09)", "--border-strong": "rgba(238,242,246,0.4)" },
    layout: "route",
    content: { tagline: "The career, one line at a time.", bio: "Five stops, one line, nine years built.", cta: "Email me" },
  },
  {
    name: "IDE",
    id: "ide",
    vars: { "--background": "#0d0e14", "--surface": "rgba(238,240,244,0.03)", "--surface-2": "rgba(238,240,244,0.05)", "--text-primary": "#eef0f4", "--text-muted": "#8b93a3", "--accent": "#9d7bff", "--accent-dim": "#7458d1", "--on-accent": "#14101f", "--border": "rgba(238,240,244,0.08)", "--border-strong": "rgba(238,240,244,0.4)" },
    layout: "ide",
    content: { tagline: "The career, open in an editor.", bio: "Five files, one editor, nine years of production code.", cta: "Email me" },
  },
  {
    name: "Swiss",
    id: "swiss",
    vars: {
      "--background": "#f2f0eb",
      "--surface": "#ffffff",
      "--surface-2": "#e9e6df",
      "--text-primary": "#191817",
      "--text-muted": "#5d5b55",          /* 5.96:1 on #f2f0eb */
      "--accent": "#9a3328",              /* 6.41:1 on #f2f0eb */
      "--accent-dim": "#7a2318",
      "--on-accent": "#ffffff",           /* 7.29:1 on #9a3328 */
      "--border": "rgba(25,24,23,0.14)",
      "--border-strong": "#8a857c",       /* 3.22:1 on #f2f0eb — WCAG 1.4.11 */
    },
    layout: "swiss",
    content: {
      tagline: "The career, typeset.",
      bio: "Four roles, nine years, and a fixed instrument applied 150+ times.",
      cta: "Email me",
    },
  },
];

export function getCurrentTheme(): Theme {
  if (typeof window !== "undefined") {
    const match = window.location.pathname.match(/^\/theme\/([^/]+)/);
    if (match) {
      const slug = match[1];
      const forced = themes.find(t => t.layout === slug || t.id === slug);
      if (forced) return forced;
    }
  }
  return themes[getThemeIndex(themes.length)];
}
