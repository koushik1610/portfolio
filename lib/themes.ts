import { getThemeIndex } from "@/lib/rotation";

export type LayoutVariant = "aethera" | "avatar";

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
