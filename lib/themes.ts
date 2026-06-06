import { getThemeIndex } from "@/lib/rotation";

export type LayoutVariant = "oracle" | "assembly" | "studio" | "avatar3d" | "aethera" | "orb" | "w1" | "w2" | "w3" | "w4" | "w5" | "w6" | "w7" | "w8" | "w9" | "w10";

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
  // ── W-themes (added after existing 6, rotate after them) ─────────────────
  {
    name: "W-Cloud Native Pro",
    id: "w-theme-01",
    vars: { "--background": "#09090b", "--surface": "#18181b", "--surface-2": "#1f1f23", "--text-primary": "#fafafa", "--text-muted": "#71717a", "--accent": "#6366f1", "--accent-dim": "#4f46e5", "--border": "#27272a" },
    layout: "w1",
    content: { tagline: "Securing what the internet runs on.", bio: "AI-native platforms protecting 2,800+ cloud accounts. Built for scale, built to last.", cta: "View Work" },
  },
  {
    name: "W-Midnight Signal",
    id: "w-theme-02",
    vars: { "--background": "#020617", "--surface": "#0f172a", "--surface-2": "#1e293b", "--text-primary": "#f8fafc", "--text-muted": "#94a3b8", "--accent": "#818cf8", "--accent-dim": "#6366f1", "--border": "#1e293b" },
    layout: "w2",
    content: { tagline: "Security at Yahoo's scale.", bio: "AI-native platforms across 2,800+ cloud accounts. Detection, IAM, and agentic security — production systems.", cta: "View Work" },
  },
  {
    name: "W-Nexus Dark",
    id: "w-theme-03",
    vars: { "--background": "#0d1117", "--surface": "#161b22", "--surface-2": "#21262d", "--text-primary": "#e6edf3", "--text-muted": "#8b949e", "--accent": "#2f81f7", "--accent-dim": "#1f6feb", "--border": "#30363d" },
    layout: "w3",
    content: { tagline: "2,800+ cloud accounts. 200+ signatures. $1.40/run.", bio: "9 years building AI-native cloud security platforms at enterprise scale.", cta: "View Work" },
  },
  {
    name: "W-Phantom Grid",
    id: "w-theme-04",
    vars: { "--background": "#080808", "--surface": "#111111", "--surface-2": "#1a1a1a", "--text-primary": "#f0f0f0", "--text-muted": "#5a5a5a", "--accent": "#ffffff", "--accent-dim": "#888888", "--border": "rgba(255,255,255,0.06)" },
    layout: "w4",
    content: { tagline: "Infrastructure. Precision. Security.", bio: "Yahoo · 2,800+ cloud accounts · 9 years.", cta: "→ View Work" },
  },
  {
    name: "W-Bento Dark",
    id: "w-theme-05",
    vars: { "--background": "#0a0a0a", "--surface": "rgba(255,255,255,0.03)", "--surface-2": "rgba(255,255,255,0.05)", "--text-primary": "#fafafa", "--text-muted": "#71717a", "--accent": "#3ecf8e", "--accent-dim": "#6366f1", "--border": "rgba(255,255,255,0.07)" },
    layout: "w5",
    content: { tagline: "Sr. Security Engineer · Yahoo · 2026", bio: "AI-native platforms protecting 2,800+ cloud accounts.", cta: "View Work" },
  },
  {
    name: "W-Horizon",
    id: "w-theme-06",
    vars: { "--background": "#070709", "--surface": "rgba(255,255,255,0.025)", "--surface-2": "rgba(255,255,255,0.05)", "--text-primary": "#f2f5f7", "--text-muted": "#9aa3ac", "--accent": "#22d3ee", "--accent-dim": "#0891b2", "--border": "rgba(255,255,255,0.1)" },
    layout: "w6",
    content: { tagline: "Cloud security engineer building AI-native security platforms.", bio: "A small team. 2,800+ cloud accounts. The math only works if you build the right systems.", cta: "View Work" },
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
    name: "W-Monolith",
    id: "w-theme-09",
    vars: { "--background": "#060606", "--surface": "#101010", "--surface-2": "#181818", "--text-primary": "#f4f4f2", "--text-muted": "#8a8a86", "--accent": "#ff4d2e", "--accent-dim": "#e23a1e", "--border": "rgba(255,255,255,0.1)" },
    layout: "w9",
    content: { tagline: "Securing what the internet runs on.", bio: "Detection. IAM. AI security. Built at enterprise scale.", cta: "View Work" },
  },
  {
    name: "W-Prism",
    id: "w-theme-10",
    vars: { "--background": "#0b0b10", "--surface": "rgba(255,255,255,0.04)", "--surface-2": "rgba(255,255,255,0.06)", "--text-primary": "#eef0f6", "--text-muted": "#a0a4bd", "--accent": "#60a5fa", "--accent-dim": "#a78bfa", "--border": "rgba(255,255,255,0.09)" },
    layout: "w10",
    content: { tagline: "Cloud security engineer building AI-native platforms.", bio: "Layered defense across 2,800+ cloud accounts. Production systems, not prototypes.", cta: "View Work" },
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
