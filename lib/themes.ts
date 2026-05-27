import { getThemeIndex } from "@/lib/rotation";

export type LayoutVariant = "oracle" | "assembly" | "studio" | "avatar3d" | "aethera" | "orb";

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
    name: "O-Oracle",
    id: "o-theme-01",
    vars: { "--background": "#0d1117", "--surface": "#161b22", "--surface-2": "#21262d", "--text-primary": "#e6edf3", "--text-muted": "#8b949e", "--accent": "#58a6ff", "--accent-dim": "#1f6feb", "--border": "#30363d" },
    layout: "oracle",
    content: { tagline: "SELECT * FROM career WHERE impact = 'high'", bio: "9 rows returned in 0.002s. Sorted by impact descending.", cta: "Run Query" },
  },
  {
    name: "O-Assembly",
    id: "o-theme-10",
    vars: { "--background": "#000000", "--surface": "#0a0a0a", "--surface-2": "#111111", "--text-primary": "#f0f0f0", "--text-muted": "#555555", "--accent": "#4ec9b0", "--accent-dim": "#3aaa96", "--border": "#1a1a1a" },
    layout: "assembly",
    content: { tagline: "; koushik_kotamraju.asm", bio: "; Security Engineer — 9 years, 3 orgs, 0 unresolved incidents.", cta: "objdump -d career" },
  },
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
