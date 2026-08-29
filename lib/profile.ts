import { STATS, type CanonicalStat } from "@/lib/stats";

/* ─────────────────────────────────────────────────────────────────────────────
   PROFILE — the shared content layer every theme reads from.

   WHY THIS EXISTS. On 2026-08-29 a provenance pass found seven published claims
   that no primary source supported. Correcting them meant editing eight hero
   files, `lib/resume.ts`, `lib/themes.ts`, `app/layout.tsx`, and `llms.txt`,
   because each theme had inlined its own paraphrase of the same fact. That is
   not eight bugs. It is one fact stored eight times, which is a data model
   problem wearing a copywriting costume. `lib/stats.ts` already solved it for
   numbers. This file does the same for the sentences around them.

   THE PART THAT ACTUALLY MATTERS: THE LENGTH LADDER.
   A single string per fact does not work, and pretending otherwise is why the
   copy drifted in the first place. Briefing needs roughly fifty characters in a
   table cell; Aethera needs four hundred in a feature panel. Given one string,
   a theme author writes a second one, and the second one is where the overclaim
   creeps back in. So every piece of prose here ships at three lengths, written
   together, saying the same thing:

     short   a label. Table cell, card subtitle, chip.
     medium  a card body. Project tile, station description, list item.
     full    a paragraph. Feature panel, expanded section.

   Writing them together is the whole mechanism. A correction lands on one
   object and all three tiers move, because they are in the same edit.

   THE BUDGETS ARE ENFORCED, NOT SUGGESTED. `assertProse` runs at module load in
   development and throws on an over-length tier. A comment asking for fifty
   characters gets a hundred and twenty the first time someone is in a hurry,
   and the layout breaks somewhere nobody is looking. A throw does not.

   WHAT DOES NOT LIVE HERE. Numbers stay in `lib/stats.ts`, which is imported
   rather than duplicated: a project cites its figure by reference, so the stat
   table stays the only place a number is written down. Resume bullets stay in
   `lib/resume.ts`, which is a different document with different length rules and
   one consumer. Theme-specific framing (an RFC's requirements language, an IDE's
   syntax tokens) stays in its theme, because it is voice, not fact.

   PROVENANCE. Every claim below traces to koushik-docs/extraction/, which is the
   ceiling on what may be said, not a starting point to build on.
───────────────────────────────────────────────────────────────────────────── */

/** One fact at three lengths, written together so a correction cannot land on
 *  only one of them. */
export interface Prose {
  /** ≤ 64 chars. A label: table cell, card subtitle, chip. */
  short: string;
  /** ≤ 220 chars. A card body: project tile, station description. */
  medium: string;
  /** ≤ 480 chars. A paragraph: feature panel, expanded section. */
  full: string;
}

const BUDGET = { short: 64, medium: 220, full: 480 } as const;

/* Dev-only, and deliberately a throw rather than a warning. An over-length tier
   does not fail visibly: it wraps to a fourth line, pushes a grid row, and looks
   like a CSS bug three themes away from the string that caused it. */
function assertProse(where: string, p: Prose): Prose {
  if (process.env.NODE_ENV !== "production") {
    for (const tier of ["short", "medium", "full"] as const) {
      const n = p[tier].length;
      if (n > BUDGET[tier]) {
        throw new Error(
          `profile.ts — ${where}.${tier} is ${n} chars, over the ${BUDGET[tier]} budget. ` +
            `Tighten it rather than raising the budget: the budget is what keeps the ` +
            `three tiers genuinely different lengths instead of three copies of the same ` +
            `paragraph.`
        );
      }
    }
  }
  return p;
}

/* ── Identity ────────────────────────────────────────────────────────────── */

export const IDENTITY = {
  name: "Koushik Kotamraju",
  /* The HR title, not the public-facing variant. F1 of the extraction flags that
     the two differ and that a verification service returns the HR one, so every
     surface uses it and none of them has to be reconciled later. */
  title: "Senior Technical Security Engineer",
  employer: "Yahoo",
  team: "Paranoids",
  /* Yahoo is context. The site markets the person. */
  bio: assertProse("IDENTITY.bio", {
    short: "Cloud security engineer building AI-native security platforms.",
    medium:
      "Cloud security engineer building AI-native security platforms: production systems, not prototypes. Nine years across detection engineering, IAM privilege analysis, and multi-agent orchestration.",
    full:
      "Nine years of security engineering across three organizations, focused on detection at cloud account scale, IAM privilege analysis, and agentic security workflows. The through-line is building the measurement before trusting the tool, which is why the benchmark exists, why the metric is defined against gaming, and why the claims here are narrower than they used to be.",
  }),
  openTo: "Staff and Principal Security Engineer, and AI Security Engineer roles",

  /* THE HOOK. Council-approved, and not to be re-litigated per theme. It was
     written into six heroes as a literal, which meant the 2026-07 edit that
     removed the team headcount ("Four engineers.") had to be made six times and
     the number inside it is a scrubbed figure that must track lib/stats.ts. It
     is one sentence, so it lives in one place. */
  hook: `A small team. ${STATS.cloudAccounts.value} cloud accounts. The math only works if you build the right systems.`,

  /* The kicker line above the name. Two themes typed it out and both had drifted
     to an abbreviated title that matches neither the HR record nor the resume. */
  eyebrow: `${"Senior Technical Security Engineer"} · Yahoo Paranoids · ${STATS.experience.value}`,
} as const;

/* ── Contact ─────────────────────────────────────────────────────────────── */

export interface ContactLink {
  /** Short key. Themes render this as the label column. */
  k: string;
  /** Display value. Never the raw URL where a handle reads better. */
  v: string;
  href: string;
  /** External links need rel/target; mailto does not. */
  ext: boolean;
}

/* This block was byte-identical in five heroes. Nothing about a contact row is
   theme-specific, and a stale address in one of five is the failure mode. */
export const CONTACT: ReadonlyArray<ContactLink> = [
  { k: "Email", v: "koushik.kotamraju1610@gmail.com", href: "mailto:koushik.kotamraju1610@gmail.com", ext: false },
  { k: "LinkedIn", v: "in/koushikkotamraju", href: "https://www.linkedin.com/in/koushikkotamraju/", ext: true },
  { k: "GitHub", v: "github.com/koushik1610", href: "https://github.com/koushik1610", ext: true },
] as const;

export const EMAIL = CONTACT[0].href;

/* ── Projects ────────────────────────────────────────────────────────────── */

/** How much of the thing exists. Themes that show status must not flatten
 *  `research` into `shipped`: the distinction is the correction that cost the
 *  most to make, and it is the one most likely to be lost in a redesign. */
export type BuildStatus = "shipped" | "partial" | "research";

export interface Project {
  id: string;
  name: string;
  /** Set only where the full name does not fit a tight rail or a table cell.
   *  Themes should prefer `name` and fall back to this, never the reverse: an
   *  abbreviation that leaks into a spacious layout reads as a different
   *  project from the one the resume names. */
  shortName?: string;
  /** What it is, at three lengths. */
  prose: Prose;
  /** The canonical figure this project is known by. Referenced, never inlined,
   *  so `lib/stats.ts` stays the only place a number is written down. */
  stat: CanonicalStat;
  /** Overrides the stat's own label where the project frames it differently.
   *  Kept short: it renders under a large number. */
  statLabel?: string;
  stack: ReadonlyArray<string>;
  status: BuildStatus;
  /** Set where the honest answer is not "it works". Rendered by themes that
   *  have room; never silently dropped when it is present. */
  caveat?: string;
}

export const PROJECTS: ReadonlyArray<Project> = [
  {
    id: "artemis",
    name: "Artemis",
    prose: assertProse("PROJECTS.artemis", {
      short: "Attack-path operationalization over a native platform.",
      medium:
        "Attack-path operationalization on GCP Security Command Center: export, AI enrichment, business-context mapping, longitudinal tracking, and coverage rotation under a hard platform cap.",
      full:
        "A native cloud platform computes the best attack-path signal in the estate and strands it in a console: no structured export, no cross-finding correlation, no history past the retention window. Artemis is the layer around it, implemented on GCP. The shaping constraint is a hard cap on how many resources can be simulated at once, so coverage is a rotation rather than a fixed set, and the risk analysis names its own obsolescence condition: the vendor raising that limit.",
    }),
    stat: STATS.cloudAccounts,
    statLabel: "accounts",
    stack: ["Python", "GCP SCC", "Vertex AI", "BigQuery", "Terraform"],
    status: "partial",
    caveat: "GCP is built. AWS is designed, not built, so the cross-cloud view does not exist yet.",
  },
  {
    id: "iam-audit-agent",
    name: "IAM Audit Agent",
    prose: assertProse("PROJECTS.iam-audit-agent", {
      short: "10 IAM vulnerability classes, benchmarked before trusted.",
      medium:
        "A Boto3 tool-calling agent across 10 IAM vulnerability classes, matched against a public escalation-path catalogue, with semantic interpretation of the transitive chains rule-based tools miss.",
      full:
        "A production tool-calling agent that enumerates live AWS IAM configurations across 10 vulnerability classes, matches findings against pathfinding.cloud (DataDog's public catalogue of 65+ paths), and layers semantic interpretation over static graph traversal to catch transitive chains that rules cannot evaluate. The benchmark came first: GOAT, 11 synthetic Terraform fixtures, 32 ground-truth findings, written before the agent was measured against them.",
    }),
    stat: STATS.goatFindings,
    statLabel: "GOAT findings",
    stack: ["Python", "Boto3", "IAM Access Analyzer", "LLM tool-use"],
    status: "shipped",
    caveat: "The 65+ path catalogue is DataDog's, consumed and cited. The taxonomy and the semantic layer are not.",
  },
  {
    id: "threat-intel",
    name: "Autonomous Threat Intelligence Pipeline",
    shortName: "Autonomous Threat Intel",
    prose: assertProse("PROJECTS.threat-intel", {
      short: "19 models, 5 providers, a router that retunes itself.",
      medium:
        "A 5-stage agentic pipeline behind a performance-weighted router that reassigns models after every run, delivering analyst-ready security proposals from $1.40 per sweep.",
      full:
        "Ingest, triage, decompose, peer-review, synthesize: five stages across 19 foundation models from 5 providers, behind a router that tracks output quality per task type and updates its own allocation weights after each run. It replaced a fully manual weekly research process. The claim stops at the observed cost, because no single-model baseline sweep was ever recorded and a comparison without one is arithmetic, not measurement.",
    }),
    stat: STATS.modelsOrchestrated,
    statLabel: "models · 5 providers",
    stack: ["Python", "Multi-Agent Orchestration", "Claude", "Gemini", "GPT"],
    status: "shipped",
    caveat: "No single-model baseline run exists, so no cost comparison is claimed.",
  },
  {
    id: "detection-engine",
    name: "Detection Engine",
    prose: assertProse("PROJECTS.detection-engine", {
      short: "Terraform-deployed signature fleet, ATT&CK-mapped.",
      medium:
        "200+ Python and Lambda signatures evaluating 1,400+ AWS accounts, producing the per-resource findings and posture scores the company is measured against.",
      full:
        "The AWS Cloud Alerts Detection system: 200+ Python and Lambda signatures evaluating resource configurations across 1,400+ AWS accounts, each with CIS-style audit and remediation guidance, deployed via Terraform. Behind it sits an enforcement program that converts every high-severity finding into a routed remediation ticket with a deadline, so not remediating became an explicit decision with an owner and an expiry rather than something that happened by inaction.",
    }),
    stat: STATS.signatures,
    statLabel: "active signatures",
    stack: ["Python", "AWS Lambda", "Terraform", "MITRE ATT&CK"],
    status: "shipped",
  },
  {
    id: "antitoxin",
    name: "Antitoxin",
    prose: assertProse("PROJECTS.antitoxin", {
      short: "CIEM research. 62 toxic combinations, catalogued by hand.",
      medium:
        "CIEM research, no implementation yet. 62 toxic IAM combinations catalogued by hand across 8 attack categories, each carrying the keystone permission whose removal breaks that chain.",
      full:
        "A CIEM research project at the design stage. 62 toxic IAM combinations catalogued by hand across 8 attack categories, each mapped to MITRE ATT&CK and each carrying the keystone permission whose removal breaks that chain. The part worth stating is that the tool boundary was drawn before any code existed: it keeps granted-versus-used correlation, catalogue synthesis, and alert validation, and delegates asset resolution and path analysis to systems that own them.",
    }),
    stat: STATS.toxicCombinations,
    statLabel: "toxic combinations",
    stack: ["IAM Analysis", "CIEM", "MITRE ATT&CK", "Research"],
    status: "research",
    caveat: "No code yet, and the keystones are hand-authored. There is no graph and no solver.",
  },
] as const;

export const projectById = (id: string): Project => {
  const p = PROJECTS.find((x) => x.id === id);
  if (!p) throw new Error(`profile.ts: no project "${id}". Ids: ${PROJECTS.map((x) => x.id).join(", ")}`);
  return p;
};

/* ── Capabilities ────────────────────────────────────────────────────────── */

export interface Capability {
  id: string;
  name: string;
  prose: Prose;
  stat: CanonicalStat;
}

/* The five lanes the work actually divides into. Themes that number their
   sections take the array order; themes that show three take the first three,
   which is why detection leads. */
export const CAPABILITIES: ReadonlyArray<Capability> = [
  {
    id: "detection",
    name: "Detection Engineering",
    prose: assertProse("CAPABILITIES.detection", {
      short: "Posture evaluation at account scale, not incident response.",
      medium:
        "200+ Python and Lambda signatures evaluating 1,400+ AWS accounts on a schedule, producing the posture scores the company is measured against, CIS-benchmarked and ATT&CK-mapped.",
      full:
        "Configuration-state evaluation across the account estate: 200+ signatures on a schedule, producing per-resource findings, CIS-style audit guidance, and the posture scores the business is measured against, deployed via Terraform. This is posture evaluation, not detection and response: it does not stream, does not page, and does not claim time-to-detect. What it owns is whether a control is enforceable, whether its detection is correct, and whether its findings reach anyone.",
    }),
    stat: STATS.signatures,
  },
  {
    id: "identity",
    name: "IAM Privilege Analysis",
    prose: assertProse("CAPABILITIES.identity", {
      short: "10 vulnerability classes, and a benchmark written first.",
      medium:
        "An AI-native audit agent across 10 IAM vulnerability classes, matched against a public escalation-path catalogue, with the GOAT benchmark authored before the agent was trusted.",
      full:
        "Effective-permission analysis over live IAM configurations, organised around 10 vulnerability classes and matched against DataDog's public catalogue of 65+ escalation paths. A security tool that reports findings cannot tell a user whether an empty result means a clean environment or a broken tool, so the fixtures and the ground truth came first: 11 synthetic Terraform fixtures, 32 findings, and the blind spots published beside the result rather than after it.",
    }),
    stat: STATS.goatFindings,
  },
  {
    id: "review",
    name: "Security Architecture Review",
    prose: assertProse("CAPABILITIES.review", {
      short: "100+ reviews, and a method that survives without me.",
      medium:
        "100+ Paranoid Security Reviews across every business unit, backed by a 1,700+-node corpus mined from historical tickets and an agent that drafts the first pass.",
      full:
        "100+ cloud security reviews across every business unit, threat-modelling and approving new architectures before launch. Two things were tried to make it scale, and only the second worked: a searchable corpus of 1,700+ knowledge nodes mined from closed reviews makes one reviewer faster but does not make a second reviewer exist, so the first pass moved off my hours entirely. Every objection cites a written control by name, which is what stops review from being seniority.",
    }),
    stat: STATS.securityReviews,
  },
  {
    id: "ai-platforms",
    name: "AI Security Platforms",
    prose: assertProse("CAPABILITIES.ai-platforms", {
      short: "Production systems with deterministic bounds, not demos.",
      medium:
        "A self-learning research router across 19 models, an MCP-integrated agentic review platform, and a deterministic CSPM advisor with hard deny gates. All in daily use.",
      full:
        "Multi-agent systems with the safety bounds written in rather than added: schema validation on every model call so an unparseable response is discarded instead of acted on, confidence clamped so a recommendation can never read as certain, hard-gated categories where automation is never permitted to recommend, and human approval on every write path. The advisor that gates access exceptions is deterministic on purpose, in a codebase where every other pipeline calls a model.",
    }),
    stat: STATS.modelsOrchestrated,
  },
  {
    id: "research",
    name: "Security Research",
    prose: assertProse("CAPABILITIES.research", {
      short: "CIEM research and benchmark work, published with limits.",
      medium:
        "Antitoxin catalogues 62 toxic IAM combinations by hand, each with its keystone permission. GOAT is the benchmark, and its known limits ship with it.",
      full:
        "Antitoxin, at the design stage, catalogues 62 toxic IAM combinations by hand across 8 attack categories, each carrying the keystone permission whose removal breaks that chain. GOAT is the evaluation, and its limits are published with it: recall is bounded by the taxonomy that was encoded, the fixtures are static where several classes depend on runtime state, and nothing has been graded by anyone other than the person who wrote the tool.",
    }),
    stat: STATS.toxicCombinations,
  },
] as const;

/* ── Career ──────────────────────────────────────────────────────────────── */

export interface Role {
  id: string;
  org: string;
  title: string;
  /** En-dash range, matching lib/resume.ts. An em-dash here would render as one
   *  in four themes and violate the house style everywhere at once. */
  period: string;
  note: string;
  current?: boolean;
}

/* Dates and the intern/architect split match lib/resume.ts and the live site.
   F1 of the extraction records the same tenure as a single 2017-12 to 2022-01
   block and flags an unresolved intern end-date conflict (May vs Apr 2019).
   Keeping the split: it is what the site already published, it shows the
   progression, and an employment date is not something to change from an
   ambiguous secondary reading. Resolve it against the portal, then edit here. */
export const CAREER: ReadonlyArray<Role> = [
  {
    id: "yahoo",
    org: "Yahoo · Paranoids",
    title: "Senior Technical Security Engineer",
    period: "Feb 2022 –",
    note: "Owns the company-wide cloud security baselines and the AWS Cloud Alerts Detection system behind the posture scores the business is measured against. Took org-wide ownership of baseline releases three months in and has held it since.",
    current: true,
  },
  {
    id: "cyr3con",
    org: "CYR3CON",
    title: "Cyber Security Architect",
    period: "May 2019 – Jan 2022",
    note: "Built the multi-account AWS foundation as code: hub-and-spoke transit routing, segmented ranges, centralised SSO, and least-privilege IAM that removed public SSH entirely. No static credentials anywhere in the deployment path.",
  },
  {
    id: "cyrecon",
    org: "Cyber Reconnaissance",
    title: "Security Intern → Team Lead",
    period: "Dec 2017 – May 2019",
    note: "Cloud migration, network security, and data-centre work, alongside an M.S. in Software Engineering at Arizona State.",
  },
  {
    id: "infosys",
    org: "Infosys",
    title: "Systems Engineer",
    period: "Dec 2015 – May 2017",
    note: "Where the nine years start. Production systems first, security second. That order still shows in how the work gets built.",
  },
] as const;
