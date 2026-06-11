import { getThemeIndex } from "@/lib/rotation";

export type LayoutVariant = "aethera" | "command" | "lumen" | "axiom" | "avatar" | "telemetry" | "solstice" | "casefile" | "briefing" | "monolith";

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
    name: "Command",
    id: "command",
    vars: { "--background": "#0a0a0c", "--surface": "rgba(255,255,255,0.04)", "--surface-2": "rgba(255,255,255,0.06)", "--text-primary": "#f4f4f6", "--text-muted": "#8b8b94", "--accent": "#818cf8", "--accent-dim": "#6366f1", "--border": "rgba(255,255,255,0.08)" },
    layout: "command",
    content: { tagline: "Sr. Security Engineer · Yahoo Paranoids", bio: "AI-native security platforms — production systems, not prototypes.", cta: "View Work" },
  },
  {
    name: "Lumen",
    id: "lumen",
    vars: { "--background": "#faf9f6", "--surface": "#ffffff", "--surface-2": "#f2f1ec", "--text-primary": "#111111", "--text-muted": "#525252", "--accent": "#2563eb", "--accent-dim": "#1d4ed8", "--border": "#e2e2dd" },
    layout: "lumen",
    content: { tagline: "Cloud security, set like a technical document.", bio: "Detection at account scale. IAM analysis at depth. Nine years across three organizations.", cta: "View Work" },
  },
  {
    name: "Axiom",
    id: "axiom",
    vars: { "--background": "#09090b", "--surface": "rgba(255,255,255,0.03)", "--surface-2": "rgba(255,255,255,0.05)", "--text-primary": "#ededf0", "--text-muted": "#9a9aa3", "--accent": "#b8483a", "--accent-dim": "#9a3328", "--border": "rgba(255,255,255,0.08)" },
    layout: "axiom",
    content: { tagline: "The whole attack graph converges on one name.", bio: "Cloud security engineer building AI-native security platforms.", cta: "View Work" },
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
    vars: { "--background": "#0d1117", "--surface": "rgba(255,255,255,0.03)", "--surface-2": "rgba(255,255,255,0.05)", "--text-primary": "#e6edf3", "--text-muted": "#9aa4af", "--accent": "#22d3ee", "--accent-dim": "#0e7490", "--border": "rgba(48,54,61,0.8)" },
    layout: "telemetry",
    content: { tagline: "An always-on operations console.", bio: "9 years uptime. 2,800+ cloud accounts monitored.", cta: "View Work" },
  },
  {
    name: "Solstice",
    id: "solstice",
    vars: { "--background": "#faf9f6", "--surface": "#ffffff", "--surface-2": "#f2f1ec", "--text-primary": "#1a1a18", "--text-muted": "#52524e", "--accent": "#5b4bd6", "--accent-dim": "#4636c0", "--border": "#e4e2da" },
    layout: "solstice",
    content: { tagline: "Security, set like a broadsheet.", bio: "Detection. IAM analysis. AI security. Architecture.", cta: "View Work" },
  },
  {
    name: "Casefile",
    id: "casefile",
    vars: { "--background": "#0b0c0b", "--surface": "rgba(255,255,255,0.03)", "--surface-2": "rgba(255,255,255,0.05)", "--text-primary": "#e7ece8", "--text-muted": "#98a39b", "--accent": "#82c79b", "--accent-dim": "#4f8f68", "--border": "rgba(231,236,232,0.09)" },
    layout: "casefile",
    content: { tagline: "A quiet incident-response session.", bio: "The hero is the artifact: a terminal transcript that resolves to one name.", cta: "Email me" },
  },
  {
    name: "Briefing",
    id: "briefing",
    vars: { "--background": "#0c0a09", "--surface": "rgba(255,255,255,0.035)", "--surface-2": "rgba(255,255,255,0.055)", "--text-primary": "#efece8", "--text-muted": "#a39d94", "--accent": "#ff7a5c", "--accent-dim": "#d05a3e", "--border": "rgba(255,255,255,0.09)" },
    layout: "briefing",
    content: { tagline: "An operations brief in bento form.", bio: "One dominant tile, one hire signal, the numbers around them.", cta: "Email me" },
  },
  {
    name: "Monolith",
    id: "monolith",
    vars: { "--background": "#0a0a0a", "--surface": "#131311", "--surface-2": "#1b1b18", "--text-primary": "#eceae4", "--text-muted": "#9d9a92", "--accent": "#ff3b1f", "--accent-dim": "#c52d12", "--border": "rgba(236,234,228,0.12)" },
    layout: "monolith",
    content: { tagline: "One name. One hairline. Nothing else.", bio: "The rotation's moment of restraint.", cta: "Email me" },
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
