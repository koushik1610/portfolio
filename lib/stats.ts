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
  /* REFRESHED 2026-10-31 against Ascend master v7 (locked 2026-10-31). Removed:
     cloudAccounts "2,800+" (the master never states it), knowledgeNodes "1,700+"
     (the review corpus it describes is a never-ship item), and baselines "50+"
     (on the master's never_ship list as unsourced). Added: the correlation engine's 15, the
     CYR3CON team of up to 7, and the engineering / cloud-security year split. */
  awsDetectionScope: {
    value: "1,400+",
    label: "AWS accounts",
    context: "Monitored against the AWS security baseline by the detection signatures I deploy and maintain.",
  },
  signatures: {
    value: "200+",
    label: "detection signatures",
    context: "Python signatures covering AWS service controls and IAM, each turning a failed control into a per-resource finding with remediation steps the owner can act on.",
  },
  awsToxicCombinations: {
    value: "15",
    label: "toxic combinations in correlation engine",
    context: "AWS findings that are low severity alone but form a privilege-escalation path together, defined from documented paths in DataDog's public pathfinding.cloud catalog.",
  },
  escalationPaths: {
    value: "65+",
    label: "escalation paths",
    /* ATTRIBUTION. The path catalogue is pathfinding.cloud, a public project
       maintained by DataDog. Every sentence using this count says "mapped to"
       or "matched against", never "built" or "discovered". */
    context: "Mapped from pathfinding.cloud, DataDog's public escalation-path catalog, by review-aws-iam-policies across 10 privilege-escalation classes.",
  },
  escalationClasses: {
    value: "10",
    label: "privilege-escalation classes",
    context: "The classes review-aws-iam-policies checks, pairing deterministic checks with a model pass and tagging every finding with its source.",
  },
  goatFindings: {
    value: "32",
    label: "ground-truth findings",
    context: "The benchmark came first: 11 synthetic Terraform fixtures and 32 ground-truth findings, written before the tool was evaluated against them.",
  },
  toxicCombinations: {
    value: "62",
    label: "IAM toxic combinations",
    /* IAM research project is research and design with no code. Each keystone permission
       was determined by hand; there is no graph and no solver. */
    context: "IAM research project: catalogued by hand across 8 attack categories, each with the keystone permission whose removal breaks the chain. Research and design, no code yet.",
  },
  securityReviews: {
    /* 100+ is the honest tier from the 2026-08-29 counting rule. Never 150+. */
    value: "100+",
    label: "architecture reviews",
    context: "Cloud security architecture reviews since 2021 across AWS, GCP, and Azure for every business unit, each objection tied to a named written control.",
  },
  modelsOrchestrated: {
    value: "19",
    label: "models, 5 providers",
    context: "A personal research pipeline: cheap-model triage, a mid-tier evaluation council, and anonymized peer review before a final synthesis.",
  },
  costPerRun: {
    /* "$3.20 baseline, 55% reduction" stays withdrawn: no baseline run exists. */
    value: "$1.40",
    label: "per full sweep, from",
    context: "The low end of the observed range for one full sweep of the personal research pipeline on metered pricing.",
  },
  mcpBaselines: {
    value: "4",
    label: "baselines served as MCP tools",
    context: "AWS, GCP, Kubernetes, and Docker. In evals mimicking feature work, Claude fetched the applicable baseline in every trial.",
  },
  severityTiers: {
    value: "3",
    label: "severity tiers",
    context: "The enforcement program's model, set by what an attacker gains. Declining a fix is a written exception with an expiry.",
  },
  teamLed: {
    value: "7",
    label: "engineers led, at peak",
    context: "Team lead for the infrastructure and security teams at CYR3CON: sprint planning, project scoping, and mentoring.",
  },
  experience: {
    value: "10 years",
    label: "in engineering",
    context: "Nine of them in cloud security on AWS, from CYR3CON to Yahoo.",
  },
  cloudYears: {
    value: "9 years",
    label: "in cloud security",
    context: "Infrastructure and security at a threat-intelligence startup, then the AWS baseline at Yahoo.",
  },
} as const satisfies Record<string, CanonicalStat>;

export type StatKey = keyof typeof STATS;

/**
 * The theme-independent extractable floor. Every theme renders this once in a
 * visually hidden element inside <main>, so an agent or AI browsing extension
 * reading the DOM without llms.txt still gets the full story regardless of
 * which theme the week's rotation happens to serve.
 */
const S = STATS;
export const SR_SUMMARY =
  "Koushik Kotamraju is a Principal Technical Security Engineer at Yahoo, on the cloud security team (the Paranoids). " +
  `${S.experience.value} in engineering, ${S.cloudYears.value} of them in cloud security on AWS. ` +
  `He owns the AWS security baseline for every engineering team on AWS and deploys and maintains ${S.signatures.value} detection signatures across ${S.awsDetectionScope.value} AWS accounts. ` +
  `He built correlation engine, which correlates alerts into ${S.awsToxicCombinations.value} AWS toxic combinations drawn from DataDog's public pathfinding.cloud catalog; ` +
  `extended the security MCP to serve ${S.mcpBaselines.value} baselines (AWS, GCP, Kubernetes, Docker) to Claude; proposed and built attack-research pipeline and GCP attack-path analysis; ` +
  `and benchmarked review-aws-iam-policies against ${S.goatFindings.value} ground-truth findings he wrote first. ` +
  `He has led ${S.securityReviews.value} cloud security architecture reviews since 2021, and earlier led infrastructure and security teams of up to ${S.teamLed.value} engineers at CYR3CON. ` +
  "He is open to Principal and Staff security engineering roles and to cloud security management.";

/** The meta description, used by the home page and the résumé. */
export const SITE_DESCRIPTION =
  `Principal security engineer at Yahoo. Owns the AWS security baseline for every engineering team, with ${S.signatures.value} detection signatures across ${S.awsDetectionScope.value} AWS accounts, and builds AI tooling for security work with deterministic gates where access is decided.`;
