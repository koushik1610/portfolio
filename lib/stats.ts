// Canonical public stat table for koushik.io.
//
// This file previously also carried `statSets` / `getCurrentStats()` — four
// rotating StatItem sets with a second, uncanonical stat vocabulary. It had
// ZERO consumers (fully tree-shaken, never rendered) and sat above the
// canonical table, so anyone opening this file read the wrong one first.
// Deleted 2026-08. Its one figure not represented below, the 50+
// baselines line, was carried over as `baselines`.

/* ─────────────────────────────────────────────────────────────────────────────
   CANONICAL STAT TABLE — single source of truth
   Added 2026-08 during the hero rework. Before this, the only place these
   strings lived in shipped code was inside individual theme components, and
   the three themes carrying the fullest set (route, coverage, ide) are being
   retired. Four net-new themes authored from a gitignored planning doc, with
   nothing checking them against public/llms.txt, is how a scrubbed internal
   figure gets reintroduced by accident.

   Every value here is a PUBLIC figure and matches public/llms.txt. Values obey
   the 2026-07-01 number policy: GOAT is stated as a COUNT (32), never as a
   recall percentage; security reviews are 150+, not 120+; 1,400+ AWS accounts
   is the public CSPM detection scope, distinct from the 2,800+ AWS+GCP total.

   Themes MUST read stat strings from here rather than inlining them.
───────────────────────────────────────────────────────────────────────────── */

export interface CanonicalStat {
  /** The figure exactly as it must render. Safe to pass to <CountUp value=…>. */
  value: string;
  /** Short unit label. Stays VISIBLE beside a CountUp, never aria-hidden. */
  label: string;
  /** One sentence of context. Required: a bare number is not credible alone. */
  context: string;
}

export const STATS = {
  cloudAccounts: {
    value: "2,800+",
    label: "cloud accounts",
    context: "Secured across AWS and GCP, spanning every Yahoo business unit, by a small senior team.",
  },
  awsDetectionScope: {
    value: "1,400+",
    label: "AWS accounts",
    context: "The CSPM detection scope evaluated by the AWS Cloud Alerts Detection system.",
  },
  signatures: {
    value: "200+",
    label: "detection signatures",
    context: "Active Python and Lambda signatures producing the account and org security-posture scores the company is measured against.",
  },
  escalationPaths: {
    value: "65+",
    label: "escalation paths",
    context: "Covered by an AI-native IAM audit agent across 10 vulnerability classes, including policy injection, role chaining, and SCP bypass.",
  },
  goatFindings: {
    value: "32",
    label: "ground-truth findings",
    context: "The GOAT benchmark was built first (11 synthetic Terraform fixtures), then the agent was evaluated against all 32 before being trusted.",
  },
  toxicCombinations: {
    value: "62",
    label: "toxic combinations",
    context: "Catalogued across 8 attack categories, each with a minimum cut-set dissolution action that collapses an escalation chain.",
  },
  securityReviews: {
    value: "150+",
    label: "security reviews",
    context: "Paranoid Security Reviews threat-modelling and approving new cloud architectures before launch, across Mail, Sports, Finance, and Central Tech.",
  },
  knowledgeNodes: {
    value: "1,700+",
    label: "knowledge nodes",
    context: "A cross-ticket intelligence layer built from a large corpus of historical security review tickets.",
  },
  modelsOrchestrated: {
    value: "19",
    label: "models · 5 providers",
    context: "Orchestrated through a performance-weighted allocation router that reassigns models after every run.",
  },
  costPerRun: {
    value: "$1.40",
    label: "per research run",
    context: "Versus a $3.20 single-model baseline, a 55% reduction, across a 5-stage agentic pipeline.",
  },
  baselines: {
    value: "50+",
    label: "new baselines",
    context: "Shipped in the AWS security baseline program's largest control expansion, with Checkov parity analysis and severity re-scoring.",
  },
  experience: {
    value: "9 years",
    label: "experience",
    context: "Across detection engineering, IAM privilege analysis and identity governance, and multi-agent orchestration at enterprise scale.",
  },
} as const satisfies Record<string, CanonicalStat>;

export type StatKey = keyof typeof STATS;

/**
 * The theme-independent extractable floor. Every theme renders this once in a
 * visually hidden element inside <main>, so an agent or AI browsing extension
 * reading the DOM without llms.txt still gets the full story regardless of
 * which theme the week's rotation happens to serve.
 */
export const SR_SUMMARY =
  "Koushik Kotamraju is a Senior Technical Security Engineer at Yahoo (Paranoids), " +
  "a cloud security engineer building AI-native security platforms: production systems, not prototypes. " +
  "Nine years across detection engineering, IAM privilege analysis and identity governance, and multi-agent orchestration. " +
  "He secures 2,800+ cloud accounts across AWS and GCP, owns 200+ detection signatures evaluating 1,400+ AWS accounts, " +
  "built an IAM audit agent covering 65+ privilege-escalation paths across 10 vulnerability classes and evaluated it against " +
  "the 32 ground-truth findings of a benchmark he authored first, catalogued 62 IAM toxic combinations, " +
  "conducted 150+ Paranoid Security Reviews, and orchestrates 19 foundation models across 5 providers at $1.40 per research run. " +
  "He is open to Staff and Principal Security Engineer and AI Security Engineer roles.";
