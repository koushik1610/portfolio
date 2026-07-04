import { getThemeIndex } from "@/lib/rotation";

export type LayoutVariant = "aethera" | "command" | "lumen" | "axiom" | "avatar" | "telemetry" | "solstice" | "casefile" | "briefing" | "monolith" | "advisory" | "intercept" | "uptime" | "dispatch" | "waveform" | "policy" | "coverage" | "rfc" | "reference";

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
  {
    name: "Advisory",
    id: "advisory",
    vars: { "--background": "#0b0a0d", "--surface": "rgba(255,255,255,0.03)", "--surface-2": "rgba(255,255,255,0.05)", "--text-primary": "#eeeaf2", "--text-muted": "#a8a2b3", "--accent": "#d946ef", "--accent-dim": "#a21caf", "--border": "rgba(238,234,242,0.1)" },
    layout: "advisory",
    content: { tagline: "Severity: critical. No patch available.", bio: "A security advisory whose vulnerability is the engineer.", cta: "Email me" },
  },
  {
    name: "Intercept",
    id: "intercept",
    vars: { "--background": "#0b0a06", "--surface": "rgba(255,255,255,0.03)", "--surface-2": "rgba(255,255,255,0.05)", "--text-primary": "#edeae0", "--text-muted": "#a6a190", "--accent": "#eab308", "--accent-dim": "#a16207", "--border": "rgba(237,234,224,0.1)" },
    layout: "intercept",
    content: { tagline: "Nine years on the wire, decoded.", bio: "A packet capture that dissects to one name.", cta: "Email me" },
  },
  {
    name: "Uptime",
    id: "uptime",
    vars: { "--background": "#070b09", "--surface": "rgba(255,255,255,0.03)", "--surface-2": "rgba(255,255,255,0.05)", "--text-primary": "#e8ede9", "--text-muted": "#97a39b", "--accent": "#34d399", "--accent-dim": "#0f9d6b", "--border": "rgba(232,237,233,0.1)" },
    layout: "uptime",
    content: { tagline: "All systems operational. Nine years uptime.", bio: "A career as a status page — every incident resolved.", cta: "Email me" },
  },
  {
    name: "Dispatch",
    id: "dispatch",
    vars: { "--background": "#0c0c0c", "--surface": "#161613", "--surface-2": "#1e1e1a", "--text-primary": "#f2efe6", "--text-muted": "#8f8d85", "--accent": "#f2efe6", "--accent-dim": "#c9c6bd", "--border": "rgba(242,239,230,0.1)" },
    layout: "dispatch",
    content: { tagline: "Every system shipped. On time.", bio: "A split-flap operations board that flips to one name.", cta: "Email me" },
  },
  {
    name: "Waveform",
    id: "waveform",
    vars: { "--background": "#070708", "--surface": "rgba(255,255,255,0.025)", "--surface-2": "rgba(255,255,255,0.05)", "--text-primary": "#ecebe8", "--text-muted": "#93928c", "--accent": "#fb4d6d", "--accent-dim": "#c93350", "--border": "rgba(236,235,232,0.1)" },
    layout: "waveform",
    content: { tagline: "Reading the signals others miss.", bio: "An oscilloscope trace that resolves to one name.", cta: "Email me" },
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
    name: "Reference",
    id: "reference",
    vars: { "--background": "#fbfaf7", "--surface": "#ffffff", "--surface-2": "#f2f0ea", "--text-primary": "#151417", "--text-muted": "#5c5a63", "--accent": "#635bff", "--accent-dim": "#4f46e5", "--border": "rgba(21,20,23,0.10)" },
    layout: "reference",
    content: { tagline: "GET /koushik — 200 OK.", bio: "An API reference with one resource: the engineer.", cta: "Email me" },
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
