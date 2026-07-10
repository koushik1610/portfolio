import { getThemeIndex } from "@/lib/rotation";

export type LayoutVariant = "aethera" | "avatar" | "telemetry" | "briefing" | "policy" | "coverage" | "rfc" | "wrapped";

export interface ThemeContent {
  tagline: string;
  bio: string;
  cta: string;
}

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
      "--border": "#e5e5e3",
    },
    layout: "aethera",
    content: { tagline: "Cloud security. Built to hold.", bio: "Detection engineering at account scale. IAM analysis at depth. Nine years across three organizations.", cta: "View Work" },
  },
  {
    name: "Avatar",
    id: "avatar",
    vars: { "--background": "#060606", "--surface": "#101010", "--surface-2": "#181818", "--text-primary": "#f3f1ea", "--text-muted": "#9a978d", "--accent": "#e0a44d", "--accent-dim": "#c08a36", "--border": "rgba(255,255,255,0.1)" },
    layout: "avatar",
    content: { tagline: "Sr. Security Engineer · Yahoo Paranoids", bio: "Cloud security engineer building AI-native security platforms.", cta: "View Work" },
  },
  {
    name: "Telemetry",
    id: "telemetry",
    vars: { "--background": "#0d1117", "--surface": "rgba(255,255,255,0.03)", "--surface-2": "rgba(255,255,255,0.05)", "--text-primary": "#e6edf3", "--text-muted": "#9aa4af", "--accent": "#e0524a", "--accent-dim": "#b8443c", "--border": "rgba(48,54,61,0.8)" },
    layout: "telemetry",
    content: { tagline: "An always-on operations console.", bio: "9 years uptime. 2,800+ cloud accounts monitored.", cta: "View Work" },
  },
  {
    name: "Briefing",
    id: "briefing",
    vars: { "--background": "#0c0a09", "--surface": "rgba(255,255,255,0.035)", "--surface-2": "rgba(255,255,255,0.055)", "--text-primary": "#efece8", "--text-muted": "#a39d94", "--accent": "#ff7a5c", "--accent-dim": "#d05a3e", "--border": "rgba(255,255,255,0.09)" },
    layout: "briefing",
    content: { tagline: "An operations brief in bento form.", bio: "One dominant tile, one hire signal, the numbers around them.", cta: "Email me" },
  },
  {
    name: "Policy",
    id: "policy",
    vars: { "--background": "#0a0908", "--surface": "rgba(255,255,255,0.03)", "--surface-2": "rgba(255,255,255,0.05)", "--text-primary": "#f0ede6", "--text-muted": "#a49d8f", "--accent": "#ff9900", "--accent-dim": "#c77700", "--border": "rgba(240,237,230,0.09)" },
    layout: "policy",
    content: { tagline: "Effect: Allow. Principal: one name.", bio: "An IAM policy document whose principal is the engineer.", cta: "Email me" },
  },
  {
    name: "Coverage",
    id: "coverage",
    vars: { "--background": "#07090d", "--surface": "rgba(255,255,255,0.03)", "--surface-2": "rgba(255,255,255,0.05)", "--text-primary": "#e9edf3", "--text-muted": "#97a1ae", "--accent": "#7cb8f7", "--accent-dim": "#3a7dd6", "--border": "rgba(233,237,243,0.09)" },
    layout: "coverage",
    content: { tagline: "Detection coverage, mapped.", bio: "An ATT&CK matrix heat-mapped by nine years of detection depth.", cta: "Email me" },
  },
  {
    name: "RFC",
    id: "rfc",
    vars: { "--background": "#fcfbf8", "--surface": "#ffffff", "--surface-2": "#f3f1ea", "--text-primary": "#191817", "--text-muted": "#5d5b55", "--accent": "#0f766e", "--accent-dim": "#115e59", "--border": "rgba(25,24,23,0.14)" },
    layout: "rfc",
    content: { tagline: "RFC 9161: the Kotamraju protocol.", bio: "A standards-track document for one engineer.", cta: "Email me" },
  },
  {
    name: "Wrapped",
    id: "wrapped",
    vars: { "--background": "#0a0b12", "--surface": "rgba(255,255,255,0.03)", "--surface-2": "rgba(255,255,255,0.05)", "--text-primary": "#f4f1e8", "--text-muted": "#b9b5a8", "--accent": "#2743e0", "--accent-dim": "#1c31a8", "--border": "rgba(244,241,232,0.12)" },
    layout: "wrapped",
    content: { tagline: "Nine years, wrapped.", bio: "Five numbers you'll repeat in the debrief.", cta: "Email me" },
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
