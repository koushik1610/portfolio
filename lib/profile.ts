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

/** mailto: href. The above-fold CTA is mandatory in every theme, and all eight
 *  had typed the address into the button by hand, which is twelve literals for
 *  one mailbox. */
export const EMAIL = CONTACT[0].v;
export const EMAIL_HREF = CONTACT[0].href;

/** Canonical availability copy. Targets the role rather than stating a status,
 *  because a status goes stale silently and a target does not. */
export const AVAILABILITY =
  "Open to Staff & Principal Security Engineer roles · AI Security";

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
    id: "attack-path-analysis",
    name: "GCP attack-path analysis",
    prose: assertProse("PROJECTS.attack-path-analysis", {
      short: "Attack-path operationalization over a native platform.",
      medium:
        "Attack-path operationalization on GCP Security Command Center: export, AI enrichment, business-context mapping, longitudinal tracking, and coverage rotation under a hard platform cap.",
      full:
        "A native cloud platform computes the best attack-path signal in the estate and strands it in a console: no structured export, no cross-finding correlation, no history past the retention window. GCP attack-path analysis is the layer around it, implemented on GCP. The shaping constraint is a hard cap on how many resources can be simulated at once, so coverage is a rotation rather than a fixed set, and the risk analysis names its own obsolescence condition: the vendor raising that limit.",
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
    id: "iam-research",
    name: "IAM research project",
    prose: assertProse("PROJECTS.iam-research", {
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
        "IAM research project catalogues 62 toxic IAM combinations by hand, each with its keystone permission. GOAT is the benchmark, and its known limits ship with it.",
      full:
        "IAM research project, at the design stage, catalogues 62 toxic IAM combinations by hand across 8 attack categories, each carrying the keystone permission whose removal breaks that chain. GOAT is the evaluation, and its limits are published with it: recall is bounded by the taxonomy that was encoded, the fixtures are static where several classes depend on runtime state, and nothing has been graded by anyone other than the person who wrote the tool.",
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

/* ── Decision records ────────────────────────────────────────────────────── */

/* WHY THESE ARE IN THE SHARED LAYER RATHER THAN IN ONE THEME.
   PRODUCT.md says Staff hiring assesses scope, influence and judgment; that this
   site demonstrates scope well, asserts influence, and shows almost no judgment;
   and that judgment is the one of the three a portfolio is actually good at
   demonstrating. Twelve decision records existed and appeared on zero surfaces.

   The first-principles seat made the argument that settled where they live: if
   the judgment evidence sits in one theme, then five weeks out of seven
   `getThemeIndex` decides whether a stranger sees the single thing the site most
   needs to prove. So this is a rotation-wide requirement, not a theme feature.
   EVERY theme renders at least one decision record with its rejected
   alternative, the way every theme already carries the above-fold Email and
   Resume CTA.

   PROVENANCE. Every string below was parsed out of
   koushik-docs/extraction/extract-2026-08-29.md by script, not retyped, and each
   record carries the source id it came from. That file is the ceiling on what
   may be claimed. Do not edit these strings to read better: edit the extraction,
   re-run the parse, and keep the two in step.

   CLEARANCE. The extraction marks each record with the surfaces it is cleared
   for, and ten of the twelve were interview-and-post only. The owner reviewed
   the held records against CLAUDE.md section 7 on 2026-08-29 and cleared five
   more plus the miss. ITEM-2, 6, 7, 8 and 9 remain HELD: they render as title
   and problem, and nothing else. A held record is not a teaser. It is the
   sanitization policy being visible instead of pretended away, which is the
   honest presentation of a real constraint. */

export interface Decision {
  id: string;
  /** Source record in the extraction. Traceability, and it renders nowhere. */
  source: string;
  title: string;
  /** Held records render title and problem only. Never silently promote one. */
  published: boolean;
  problem: string;
  decided?: string;
  rejected?: string;
  /** The rejected option argued in its own favour. The hardest field to fake,
   *  and the reason the equal-weight presentation is honest rather than a
   *  rhetorical device. */
  whyTempting?: string;
  cost?: string;
  limitation?: string;
  /** Present only where it went worse than expected. */
  outcome?: string;
  wouldRedo?: string;
  /** Only text Koushik actually typed. Five survived verification across the
   *  whole extraction; four of them are here. Absent means restated, and a
   *  restated line must never be rendered inside quotation marks. */
  quote?: { text: string; fidelity: "verbatim" | "trimmed" };
}

export const DECISIONS: ReadonlyArray<Decision> = [
  {
    id: "d-01",
    source: "ITEM-1",
    title: "Freeze the tree before the run",
    published: true,
    problem: "A long serialized experiment was going to run out of a working directory that was still being edited. Any mid-run change would have split early sessions from late ones with nothing in the record to show it.",
    decided: "Copy the tree to a frozen snapshot first and run the arm out of the copy, leaving the working directory free.",
    rejected: "Snapshot after the run finished, which is what had been proposed and what the schedule assumed.",
    whyTempting: "A post-run snapshot captures the same files with one less step, and if nobody touches the tree during the run it is identical.",
    cost: "Two frozen trees now exist and have to be kept, and a bug found mid-run cannot be fixed in the arm that is running. The run either finishes with the bug in it or gets thrown away.",
    limitation: "The snapshot proves the code was constant. It proves nothing about the environment around it: model versions, upstream services, and network conditions are still free to move under a run that takes hours.",
    quote: { text: "Take it before, and run the arm from it.", fidelity: "trimmed" },
  },
  {
    id: "d-02",
    source: "ITEM-2",
    title: "Three verdicts, not two",
    published: false,
    problem: "A replication was going to be judged on whether one arm's confidence interval contained the other's point estimate. At that sample size the intervals were wide enough that almost any result would land inside one.",
  },
  {
    id: "d-03",
    source: "ITEM-3",
    title: "Deterministic scoring for suppression advice",
    published: true,
    problem: "Reviewers were approving and denying exception requests by cross-referencing a ticket system, a data warehouse, and a spreadsheet. The judgement was consistent only because the same small group made it.",
    decided: "Score each request with a deterministic engine over four signals, clamp the confidence so it can never read as certain in either direction, and hard-gate a set of control categories where an exception is never appropriate.",
    rejected: "Send the request and its history to a model and use the model's recommendation, which was the obvious build given every other pipeline in the same codebase already called one.",
    whyTempting: "The rules had to be derived by hand from a large corpus of historical tickets. A model would have absorbed that corpus directly and shipped in a fraction of the time.",
    cost: "The rule set is now a maintained artifact. Every time the control registry changes, the rules drift and have to be re-derived against the corpus by hand. Nothing about that is automatic.",
    limitation: "The engine only reproduces judgements that were already being made. It cannot recognize a request shape that has no precedent in the corpus, and on those it returns a low-confidence score rather than an abstention, which reads as weak evidence instead of no evidence.",
  },
  {
    id: "d-04",
    source: "ITEM-4",
    title: "Model as one source among five",
    published: true,
    problem: "A tool that reasons about relationships between identity objects cannot be built from pattern matching alone, and a tool built entirely on model output cannot be trusted with an access decision.",
    decided: "Treat the model as one of five detection sources, tag every finding with the source that produced it, and let the deterministic sources carry the findings that gate action.",
    rejected: "A single semantic pass over the whole configuration, which is simpler to build and reads better in a demonstration.",
    whyTempting: "One pass over everything catches cross-object relationships that per-object rules structurally cannot see, and that gap is the entire reason the tool exists.",
    cost: "Five sources have to be kept in agreement. The same finding can arrive from two of them and has to be reconciled, and the source-attribution field has to be maintained on every finding for the life of the tool.",
    limitation: "Findings from the deterministic sources reproduce exactly. The semantic source does not, so the tool as a whole is not reproducible run to run, and its own validation report says so.",
  },
  {
    id: "d-05",
    source: "ITEM-5",
    title: "Benchmark before trusting the tool",
    published: true,
    problem: "A security tool that reports findings has no way to tell a user whether an empty result means the environment is clean or the tool is broken.",
    decided: "Write the fixtures and the ground-truth file first, then measure the tool against them, and publish the blind spots alongside the result.",
    rejected: "Validate by running against real environments and having an engineer confirm the findings, which is how the adjacent tooling was validated.",
    whyTempting: "Real environments are free, already available, and produce findings that are obviously real. Synthetic fixtures have to be written, and someone has to decide what counts as a finding.",
    cost: "The fixtures are a second codebase. Every change to the detection path means re-running the benchmark and re-arguing the ground truth, and the ground-truth file is now a thing that can be wrong.",
    limitation: "The result measures coverage of the taxonomy that was encoded. It says nothing about classes that were never enumerated, and nothing about how the tool behaves on a real environment, which the validation report lists as untested.",
  },
  {
    id: "d-06",
    source: "ITEM-6",
    title: "Rotation under a hard platform cap",
    published: false,
    problem: "The platform's attack-path simulation only evaluates a bounded set of designated high-value resources, and the bound is a hard product limit. Above that size, most resources are never simulated at all.",
  },
  {
    id: "d-07",
    source: "ITEM-7",
    title: "Build the layer, do not wait",
    published: false,
    problem: "The platform generated the highest-signal data available and exposed it only through a console. No structured export, no cross-finding correlation, no history beyond the retention window.",
  },
  {
    id: "d-08",
    source: "ITEM-8",
    title: "Delete the first pipeline instead of hardening it",
    published: false,
    problem: "A security review of my own pipeline surfaced findings against a first-generation implementation that had already been superseded but was still in the repository, still deployable, and still carried embedded copies of control documents.",
  },
  {
    id: "d-09",
    source: "ITEM-9",
    title: "Unmasking a suppressed detection path",
    published: false,
    problem: "A shared policy-evaluation helper had a cleanup step that discarded one class of evaluation result when another matched. Under the platform's own evaluation semantics, that discard was wrong, and it was hiding real access.",
  },
  {
    id: "d-10",
    source: "ITEM-10",
    title: "Rewriting the experiment after bad rounds",
    published: true,
    problem: "An experiment testing whether a coding assistant would pull the right security control into context at the right moment produced rounds whose conclusions rested on assumptions that had not actually held during the runs.",
    decided: "Throw out the methodology document, rewrite it from what the failed rounds had shown, and re-run the experiment against simulated developer behaviour rather than against the tasks that had been convenient to script.",
    rejected: "Keep the existing runs, annotate the assumptions that did not hold, and report the result with caveats.",
    whyTempting: "The runs were already paid for. A caveated result is still a result, and the direction it pointed was the direction that had been expected.",
    cost: "Every round completed to that point stopped being usable evidence. The re-run cost the full compute again and pushed the report out by rounds, not days.",
    limitation: "Simulated developer behaviour is still simulated. The measure is how often the assistant retrieved the right control under prompts written to provoke it, which is an upper bound on what real developers, writing their own prompts, would trigger.",
    outcome: "The first methodology was wrong in a way that invalidated the conclusions rather than weakening them. Rounds that looked like progress were measuring conditions that had not occurred.",
    wouldRedo: "Write down, before the first round, the specific things that must be true during a run for the result to mean anything, and check those during the run instead of inferring them afterwards. This is the same lesson as ITEM-1 and ITEM-2, learned in the wrong order.",
    quote: { text: "based on what we learned, we made a lot of mistakes and assumed things that didnt happen", fidelity: "verbatim" },
  },
  {
    id: "d-11",
    source: "ITEM-11",
    title: "Keep the signal, narrow the check",
    published: true,
    problem: "A certificate-expiry control fired constantly on one class of certificate whose lifetime is shorter than the window the control measures. Those certificates are rotated automatically and sit inside the window permanently, by design.",
    decided: "Split the check by certificate class. The affected class passes only while renewal is demonstrably still running, and alerts if renewal has stalled.",
    rejected: "Exclude that certificate class from the control, which is what the noise was pushing everyone toward and what a suppression would have done in one line.",
    whyTempting: "The alerts were all false. Excluding the class removes every one of them immediately and nobody has to think about the control again.",
    cost: "A class-specific branch now lives in the detector permanently. It has to be understood by anyone who touches that control, and it depends on a property of the issuing system that could change without notice.",
    limitation: "The branch detects that renewal stopped. It does not detect that renewal is running but producing certificates that are wrong in some other way.",
    quote: { text: "This keeps the broken-renewal signal instead of blanket-suppressing.", fidelity: "verbatim" },
  },
  {
    id: "d-12",
    source: "ITEM-12",
    title: "One file per review",
    published: true,
    problem: "Each review was spread across several files in a folder. The authoritative state of a review was whichever file had been updated most recently, and nothing enforced that they agreed.",
    decided: "Collapse each review to a single authoritative file with fixed sections, and add placeholder sections for an integration that does not exist yet so the template does not need restructuring when it arrives.",
    rejected: "Keep the folder layout and add an index that tracks which file is current.",
    whyTempting: "The folder layout separates concerns cleanly, and an index is a smaller change than migrating every open review.",
    cost: "Every open review had to be migrated by hand. The single file also grows without bound over a long review, and the sections that were added for a future integration are dead weight until that integration exists, if it ever does.",
    limitation: "A single authoritative file makes the state consistent. It does not make it correct, and nothing validates that the evidence section still matches the ticket it was captured from.",
    quote: { text: "Add Slack integration placeholders now so future Slack MCP support can be incorporated without restructuring the template.", fidelity: "verbatim" },
  },
] as const;

export const publishedDecisions = () => DECISIONS.filter((d) => d.published);
export const heldDecisions = () => DECISIONS.filter((d) => !d.published);

/* ── The miss ────────────────────────────────────────────────────────────── */

/* Deliberately NOT a Decision. E1 is not a choice between two options, it is a
   failure the system could not have surfaced, and forcing it into the decision
   shape would have required inventing a rejected alternative that never existed.
   It gets its own type instead.

   Cleared in full by the owner on 2026-08-29. The extraction's own note is that
   it costs nothing to publish, because every detail is a detection-engineering
   failure mode with no incident, no service and no team attached. It is the
   highest trust-per-word item in the document: the general problem it names is a
   health signal that measured whether a detection RAN rather than whether its
   output ARRIVED, and the reason it is credible is `stillExposed`, where he
   found the class of bug and then did not build the control that catches it next
   time, and says so. Do not soften that field. It is the whole point. */

export interface Miss {
  source: string;
  supposedToCatch: string;
  whyItDidnt: string;
  howFound: string;
  blastRadius: string;
  structuralFix: string;
  /** Never edit this to sound resolved. It is not resolved. */
  stillExposed: string;
}

export const THE_MISS: Miss = {
  source: "E1",
  supposedToCatch: "Two configuration controls, evaluated continuously across the estate. One covers key management on a secrets store, the other covers end-of-life language runtimes on serverless functions. Both had working detections, both were enabled, and both appeared healthy in every operational view.",
  whyItDidnt: "During earlier debugging of each detection, the call that delivers findings to the consuming system had been commented out and a debug print left in its place. The commenting was never reverted. Both detections then ran on schedule, executed correctly, and produced correct findings, which went to a log stream and nowhere else. The mechanism is not \"we had no coverage\". The mechanism is that the pipeline's health signal was \"the detection ran\", and nothing anywhere checked \"the detection's output arrived\". A detection producing zero delivered findings is indistinguishable from a detection covering a clean estate, and there was no control that could tell the difference.",
  howFound: "By me, and not by looking. I was doing an unrelated hygiene pass across the detection fleet, cleaning up module-level imports that were only needed by test paths, and read the production path of these two while I was in the file. Nothing surfaced it. Nothing would have.",
  blastRadius: "Two controls, no enforcement coverage, for a period measured in months rather than weeks, and the two periods differed. Bounded honestly: the findings were being generated correctly the whole time, so nothing was mis-evaluated and no wrong conclusion was drawn. What was lost is that no remediation obligation was ever created for any finding either control produced during that window, so the underlying conditions persisted with nobody assigned to them and no record that they existed.",
  structuralFix: "Restored the delivery path in both. Then, because the failure mode was scaffolding surviving into production rather than a bug in either detection, audited the same pattern across the rest of the fleet: separating test-only imports from the production path in every detection where the two were mixed, so that a debug modification is visibly a debug modification rather than a one-character difference from correct.",
  stillExposed: "The audit was manual and one-time. There is still no automated check that a detection which ran actually delivered, and no alert on a detection whose delivered volume drops to zero. The same failure can happen again tomorrow in a different detection and would be found the same way, which is to say by accident. The metric that would close this is the last row in C4, and it does not exist.",
};
/* ── Depth boundaries ────────────────────────────────────────────────────── */

/* The limits, in his own framing, said out loud rather than left for an
   interviewer to discover twenty minutes in. PRODUCT.md's rule is show, do not
   assert; this is the same rule applied to what he cannot do.

   Rendered WITHOUT a recovery sentence, and that is load-bearing. The
   extraction's note on D1 is explicit: a recovery sentence about how quickly he
   learns is what turns an honest limitation into an excuse. Do not add one, and
   do not soften "that is not me". */

export interface Boundary { id: string; source: string; text: string; }

export const BOUNDARIES: ReadonlyArray<Boundary> = [
  { id: "containers", source: "D1", text: "My container work is centred on the managed non-Kubernetes scheduler: control authorship, task-role escalation paths, registry hygiene, and admission control at the platform level. Kubernetes I have authored controls for and reviewed as an architecture, but I have not operated a cluster in production. If the role needs someone who has run Kubernetes at scale, that is not me, and I would rather say that now than in month two." },
  { id: "detection", source: "D2", text: "I build posture evaluation, not detection and response. My detections evaluate configuration state on a schedule and produce compliance findings, and my identity work reasons about effective permissions statically. Where I cross into behaviour it is retrospective and query-driven: correlating what a principal was granted against what it actually called, and validating whether an alert's claim is consistent with the trust relationships in the account. I have not built streaming detection, I have not carried a detection and response pager, and I do not claim time-to-detect as a metric I own. What I do own is the question of whether a control is enforceable, whether its detection is correct, and whether its findings reach anyone." },
] as const;
