import { getThemeIndex } from "@/lib/rotation";

export type LayoutVariant = "studio" | "avatar3d" | "aethera" | "orb" | "w7" | "w8" | "w11" | "w12" | "w13" | "w14";

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
    name: "I-Studio",
    id: "i-theme-studio",
    vars: {
      "--background": "#0c0c0c",
      "--surface": "#161616",
      "--surface-2": "#222222",
      "--text-primary": "#e8e8e8",
      "--text-muted": "#888888",
      "--accent": "#B8CDD9",
      "--accent-dim": "#8aaabb",
      "--border": "#2a2a2a",
    },
    layout: "studio",
    content: { tagline: "Security. At scale.", bio: "Sr. Security Engineer. 9 years. Building systems that hold.", cta: "See work" },
  },
  {
    name: "I-Avatar3D",
    id: "i-theme-avatar3d",
    vars: {
      "--background": "#0c0c0c",
      "--surface": "#161616",
      "--surface-2": "#222222",
      "--text-primary": "#d7e2ea",
      "--text-muted": "#888888",
      "--accent": "#bbccd7",
      "--accent-dim": "#8aaabb",
      "--border": "#1e1e1e",
    },
    layout: "avatar3d",
    content: { tagline: "Hi, I'm Koushik", bio: "Sr. Security Engineer. Detection at scale.", cta: "View Work" },
  },
  {
    name: "I-Aethera",
    id: "i-theme-aethera",
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
    name: "I-Orb",
    id: "i-theme-orb",
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
    layout: "orb",
    content: { tagline: "Beyond noise, I build what holds.", bio: "Detection at scale. IAM analysis at depth. AI tooling that compounds.", cta: "View Work" },
  },
  {
    name: "W-Command",
    id: "w-theme-07",
    vars: { "--background": "#0a0a0c", "--surface": "rgba(255,255,255,0.04)", "--surface-2": "rgba(255,255,255,0.06)", "--text-primary": "#f4f4f6", "--text-muted": "#8b8b94", "--accent": "#818cf8", "--accent-dim": "#6366f1", "--border": "rgba(255,255,255,0.08)" },
    layout: "w7",
    content: { tagline: "Sr. Security Engineer · Yahoo Paranoids", bio: "AI-native security platforms — production systems, not prototypes.", cta: "View Work" },
  },
  {
    name: "W-Lumen",
    id: "w-theme-08",
    vars: { "--background": "#faf9f6", "--surface": "#ffffff", "--surface-2": "#f2f1ec", "--text-primary": "#111111", "--text-muted": "#525252", "--accent": "#2563eb", "--accent-dim": "#1d4ed8", "--border": "#e2e2dd" },
    layout: "w8",
    content: { tagline: "Cloud security, set like a technical document.", bio: "Detection at account scale. IAM analysis at depth. Nine years across three organizations.", cta: "View Work" },
  },
  {
    name: "W-Axiom",
    id: "w-theme-11",
    vars: { "--background": "#09090b", "--surface": "rgba(255,255,255,0.03)", "--surface-2": "rgba(255,255,255,0.05)", "--text-primary": "#ededf0", "--text-muted": "#9a9aa3", "--accent": "#9a3328", "--accent-dim": "#7d271e", "--border": "rgba(255,255,255,0.08)" },
    layout: "w11",
    content: { tagline: "The whole attack graph converges on one name.", bio: "Cloud security engineer building AI-native security platforms.", cta: "View Work" },
  },
  {
    name: "W-Aperture",
    id: "w-theme-12",
    vars: { "--background": "#060606", "--surface": "#101010", "--surface-2": "#181818", "--text-primary": "#f3f1ea", "--text-muted": "#9a978d", "--accent": "#e0a44d", "--accent-dim": "#c08a36", "--border": "rgba(255,255,255,0.1)" },
    layout: "w12",
    content: { tagline: "Developed in the darkroom.", bio: "Cloud security engineer building AI-native security platforms.", cta: "View Work" },
  },
  {
    name: "W-Telemetry",
    id: "w-theme-13",
    vars: { "--background": "#0d1117", "--surface": "rgba(255,255,255,0.03)", "--surface-2": "rgba(255,255,255,0.05)", "--text-primary": "#e6edf3", "--text-muted": "#9aa4af", "--accent": "#22d3ee", "--accent-dim": "#0891b2", "--border": "rgba(48,54,61,0.8)" },
    layout: "w13",
    content: { tagline: "An always-on operations console.", bio: "9 years uptime. 2,800+ cloud accounts monitored.", cta: "View Work" },
  },
  {
    name: "W-Solstice",
    id: "w-theme-14",
    vars: { "--background": "#faf9f6", "--surface": "#ffffff", "--surface-2": "#f2f1ec", "--text-primary": "#1a1a18", "--text-muted": "#52524e", "--accent": "#5b4bd6", "--accent-dim": "#4636c0", "--border": "#e4e2da" },
    layout: "w14",
    content: { tagline: "Security, set like a broadsheet.", bio: "Detection. IAM analysis. AI security. Architecture.", cta: "View Work" },
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
