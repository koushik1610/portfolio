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
   recall percentage; 1,400+ AWS accounts is the public CSPM detection scope,
   distinct from the 2,800+ AWS+GCP total.

   PROVENANCE PASS, 2026-08-29. Every figure below was re-checked against the
   primary sources on the work machine. Four did not survive unchanged, and each
   correction is recorded on the stat it belongs to. The rule that produced them:
   a number is publishable only if a reference or a reader could check it and
   find the same thing. `securityReviews`, `costPerRun`, `escalationPaths`, and
   `toxicCombinations` all failed that test as previously written.

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
    /* ATTRIBUTION, 2026-08-29. The path catalogue is pathfinding.cloud, a public
       project maintained by DataDog. The agent fetches its definitions and
       matches findings against them. The count is theirs, so every sentence
       using it says "matched against", never "built" or "discovered". What is
       his here is the ten-class taxonomy, the semantic layer that reasons across
       objects, and the GOAT benchmark. */
    context: "Matched against pathfinding.cloud, DataDog's public escalation-path catalogue, by an IAM audit agent organised around 10 vulnerability classes: critically permissive policies, role assumption chains, compute-to-data escalation, unused access, long-lived credentials, cross-account confused deputy, federated trust misconfiguration, identity persistence, AI/ML service escalation, and logging evasion.",
  },
  goatFindings: {
    value: "32",
    label: "ground-truth findings",
    context: "The GOAT benchmark was built first (11 synthetic Terraform fixtures), then the agent was evaluated against all 32 before being trusted.",
  },
  toxicCombinations: {
    value: "62",
    label: "toxic combinations",
    /* CORRECTION, 2026-08-29. This previously read "minimum cut-set dissolution
       action", which implies a solver running over a live graph. There is no
       graph and no solver: Antitoxin is research and design, no code, and each
       keystone permission was determined by hand as part of the catalogue work.
       The hand-authored version is still a strong claim. The computed one was a
       claim a Staff technical round would open by asking where the graph is
       stored. The catalogue is also a draft pending citation re-verification. */
    context: "Catalogued by hand across 8 attack categories, each entry carrying the keystone permission whose removal breaks that chain. Research and design; the catalogue is a draft pending citation review.",
  },
  securityReviews: {
    /* CORRECTION, 2026-08-29. Published as "150+", which no source supports. The
       counting rule (assigned reviewer, ticket, written outcome; consultations
       and contributed findings excluded) yields a figure whose honest tier is
       100+. This is the one number on the site a reference could be asked to
       confirm, so it is the one that had to come down. */
    value: "100+",
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
    /* CORRECTION, 2026-08-29. The "$3.20 single-model baseline, 55% reduction"
       comparison is withdrawn. No baseline run was ever recorded and no document
       defines the baseline configuration; $3.20 is the arithmetic result of
       dividing $1.40 by the complement of a percentage that traces to a
       published property of cheap-executor/expensive-advisor routing rather than
       to a measurement of this pipeline. $1.40 itself is the low end of an
       observed range on metered pricing, so it is stated as "from". One baseline
       sweep would make the comparison real; until then it is not published. */
    value: "$1.40",
    label: "per run, at the low end",
    context: "The low end of the observed range for one full sweep of the 5-stage pipeline on metered pricing.",
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
  "built an IAM audit agent organised around 10 IAM vulnerability classes and matched against DataDog's public 65+ escalation-path catalogue, evaluated it against " +
  "the 32 ground-truth findings of a benchmark he authored first, catalogued 62 IAM toxic combinations by hand, " +
  "conducted 100+ Paranoid Security Reviews, and orchestrates 19 foundation models across 5 providers from $1.40 per research run. " +
  "He is open to Staff and Principal Security Engineer and AI Security Engineer roles.";
