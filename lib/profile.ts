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

/* REFRESHED 2026-10-31 from Ascend master v7. Promotion to Principal (Oct 2026),
   "10 years in engineering, 9 in cloud security", and the work named in v7
   (correlation engine, the security MCP, attack-research pipeline, GCP attack-path analysis). Every sentence below is a
   restatement of a master bullet or summary, never a new claim. */
export const IDENTITY = {
  name: "Koushik Kotamraju",
  /* The HR title. The master's `label` is the short form for resume headers. */
  title: "Principal Technical Security Engineer",
  shortTitle: "Principal Security Engineer",
  employer: "Yahoo",
  team: "Paranoids",
  /* THE HERO SENTENCE. Replaces the 2026-08 "AI-native security platforms"
     line, which no master v7 summary uses. Hallmark allows the hero one sentence of twelve words
     or fewer, and the recruiter has to learn level and employer in ten
     seconds, so the sentence carries both. Ten words. */
  lede: "Principal security engineer at Yahoo, owning the AWS security baseline.",
  /* The first line under the hero: what the work is, with AI as the method
     rather than the identity. Master S1, cut. */
  method: "I build the AI tooling that runs it, and keep deterministic gates wherever a decision touches access.",
  bio: assertProse("IDENTITY.bio", {
    short: "Principal security engineer. Owns the AWS security baseline.",
    medium:
      "Principal security engineer at Yahoo. I own the AWS security baseline for every engineering team, with 200+ detection signatures across 1,400+ accounts behind it.",
    full:
      "Ten years in engineering, nine of them in cloud security on AWS. I own the AWS security baseline for every engineering team at Yahoo, deciding which controls ship and when each is enforced. I build AI tooling for security work and the controls that keep it safe: models where they help, deterministic gates where a decision touches access, and a benchmark before any tool is trusted.",
  }),
  openTo: "Principal and Staff security engineering roles, and cloud security management",
  /* One line of position, used where a theme wants a sentence and not a name. */
  hook: "Models where they help. Deterministic gates where a decision touches access.",
} as const;

/* ── Contact ─────────────────────────────────────────────────────────────── */

export interface ContactLink {
  /** Short key. Themes render this as the label column. A closed set, so
   *  renaming one fails where its icon is mapped instead of losing the icon. */
  k: "Email" | "LinkedIn" | "GitHub";
  /** Display value. Never the raw URL where a handle reads better. */
  v: string;
  href: string;
  /** External links need rel/target; mailto does not. */
  ext: boolean;
}

export const CONTACT: ReadonlyArray<ContactLink> = [
  { k: "Email", v: "koushik.kotamraju1610@gmail.com", href: "mailto:koushik.kotamraju1610@gmail.com", ext: false },
  { k: "LinkedIn", v: "in/koushikkotamraju", href: "https://www.linkedin.com/in/koushikkotamraju/", ext: true },
  { k: "GitHub", v: "github.com/koushik1610", href: "https://github.com/koushik1610", ext: true },
] as const;

export const EMAIL = CONTACT[0].v;
export const EMAIL_HREF = CONTACT[0].href;

/** Canonical availability copy. Targets the role rather than stating a status. */
export const AVAILABILITY = "Open to Principal and Staff security roles, and security management";

/* ── Photographs ─────────────────────────────────────────────────────────── */

/* The two real images of him. Themes that carry a portrait read it from here so
   alt text is written once. */
export const PORTRAITS = {
  photo: { src: "/profile.jpeg", alt: "Koushik Kotamraju" },
  avatar: { src: "/my-3d-avatar.png", alt: "A 3D-rendered portrait of Koushik Kotamraju" },
} as const;

/* ── Projects ────────────────────────────────────────────────────────────── */

/** How much of the thing exists. Never flatten `research` into `shipped`. */
export type BuildStatus = "shipped" | "partial" | "research";

export interface Project {
  id: string;
  name: string;
  shortName?: string;
  /** What it is, at three lengths. */
  prose: Prose;
  /** The canonical figure this project is known by, by reference. Absent when
   *  the project has no figure of its own: borrowing a neighbour's is how a
   *  number ends up describing the wrong system. */
  stat?: CanonicalStat;
  statLabel?: string;
  stack: ReadonlyArray<string>;
  status: BuildStatus;
  /** Where the honest answer is not "it works". Never silently dropped. */
  caveat?: string;
}

/* Ordered by what a hiring manager should meet first. Master bullet ids in each
   comment are the provenance. */
export const PROJECTS: ReadonlyArray<Project> = [
  {
    id: "baseline", // PR1, PR6, Y4, Y5
    name: "The AWS security baseline",
    shortName: "AWS baseline",
    prose: assertProse("PROJECTS.baseline", {
      short: "Which controls ship, and when each is enforced.",
      medium:
        "Owned since month three in 2022. 200+ Python signatures across 1,400+ AWS accounts turn each failed control into a per-resource finding with the fix attached.",
      full:
        "I decide which controls ship for every engineering team on AWS, when each becomes enforced, and which are merged or retired. 200+ Python signatures check it across 1,400+ accounts. I designed the enforcement program behind it: a three-tier severity model set by what an attacker gains, and declining a fix means a written exception with an expiry. Metrics follow detection state, not ticket state, so suppressing a finding cannot improve the chart.",
    }),
    stat: STATS.signatures,
    stack: ["AWS", "Python", "IAM", "CSPM"],
    status: "shipped",
  },
  {
    id: "toxic-combinations", // PR7
    name: "correlation engine",
    prose: assertProse("PROJECTS.toxic-combinations", {
      short: "Low-severity alerts that form an escalation path together.",
      medium:
        "Correlates cloud alerts into toxic combinations, like a missing IMDSv2 requirement and an over-privileged role on one instance. 15 AWS combinations, from pathfinding.cloud.",
      full:
        "Two findings that are low severity alone can form a privilege-escalation path together: a missing IMDSv2 requirement and an over-privileged IAM role on the same instance is one. correlation engine correlates cloud alerts into those toxic combinations. I defined 15 AWS combinations from documented escalation paths in DataDog's public pathfinding.cloud catalog.",
    }),
    stat: STATS.awsToxicCombinations,
    statLabel: "AWS combinations",
    stack: ["AWS", "IAM", "Correlation"],
    status: "shipped",
    caveat: "The escalation paths are DataDog's public catalog. The combinations drawn from it are mine.",
  },
  {
    id: "security-mcp", // PR8, PR8p
    name: "security MCP",
    prose: assertProse("PROJECTS.security-mcp", {
      short: "Security baselines inside the coding assistant.",
      medium:
        "Extended the team's MCP server for Claude users to serve AWS, GCP, Kubernetes, and Docker baselines as tools, so the secure configuration arrives while code is written.",
      full:
        "The security team's MCP server for Claude users used to answer process questions. I extended it to serve the AWS, GCP, Kubernetes, and Docker security baselines as MCP tools, so engineers get the applicable controls where they build rather than at review. In evals that mimicked feature work across repositories, Terraform included, Claude identified and fetched the applicable baseline in every trial.",
    }),
    stat: STATS.mcpBaselines,
    stack: ["MCP", "Claude", "Evals", "Terraform"],
    status: "shipped",
  },
  {
    id: "iam-review", // Y9
    name: "review-aws-iam-policies",
    shortName: "IAM policy review",
    prose: assertProse("PROJECTS.iam-review", {
      short: "10 escalation classes, benchmarked before it was trusted.",
      medium:
        "IAM analysis over 10 privilege-escalation classes: deterministic checks plus a model pass, every finding tagged with its source, paths mapped to pathfinding.cloud.",
      full:
        "An IAM analysis tool covering 10 privilege-escalation classes. It pairs deterministic checks with a model pass, tags each finding with the source that produced it, and maps paths to DataDog's public pathfinding.cloud catalog of 65+. The benchmark came first: 32 ground-truth findings in 11 synthetic Terraform fixtures, written before the tool was evaluated against them.",
    }),
    stat: STATS.goatFindings,
    statLabel: "ground-truth findings",
    stack: ["Python", "AWS IAM", "Terraform", "LLM"],
    status: "shipped",
    caveat: "The benchmark measures the classes that were encoded, and nothing outside them.",
  },
  {
    id: "attack-research-pipeline", // PR2, PR2m
    name: "attack-research pipeline",
    prose: assertProse("PROJECTS.attack-research-pipeline", {
      short: "New attack research in, draft baseline controls out.",
      medium:
        "An LLM pipeline that turns new AWS, GCP, Docker, and Kubernetes attack techniques into draft controls. A cheap model triages, a stronger one analyzes, a human reviews every draft.",
      full:
        "I proposed and built attack-research pipeline, an LLM pipeline that reads public bulletins and research blogs for new AWS, GCP, Docker, and Kubernetes attack techniques and turns them into draft baseline controls. A cheap model triages, a stronger one analyzes, and every draft waits for human review. A partner detection team adopted its staged design for their own workflow, and I fixed two configuration weaknesses in their deployment during the handoff.",
    }),
    stack: ["Python", "LLM pipelines", "Human review"],
    status: "shipped",
  },
  {
    id: "attack-path-analysis", // PR5, PR5m
    name: "GCP attack-path analysis",
    prose: assertProse("PROJECTS.attack-path-analysis", {
      short: "Attack-path simulation that covers the full resource set.",
      medium:
        "Built on GCP (Cloud Run, Security Command Center, BigQuery, Terraform) to rotate resources through the platform's simulation limit, so results reach resource owners.",
      full:
        "GCP's attack-path simulation only covers a bounded set of resources at a time. I proposed and built GCP attack-path analysis on Cloud Run, Security Command Center, BigQuery, and Terraform to rotate resources through that limit, so simulation covers the full resource set and its results reach the people who own the resources. The AWS side is designed and not built.",
    }),
    stack: ["GCP", "Security Command Center", "BigQuery", "Terraform"],
    status: "partial",
    caveat: "GCP is built. AWS is designed, not built.",
  },
  {
    id: "iam-research", // P2
    name: "IAM research project",
    prose: assertProse("PROJECTS.iam-research", {
      short: "62 IAM toxic combinations, catalogued by hand.",
      medium:
        "Research and design, no code yet. 62 IAM toxic combinations across 8 attack categories, each with the keystone permission whose removal breaks the chain.",
      full:
        "A personal research project at the design stage. 62 IAM toxic combinations catalogued by hand across 8 attack categories, each carrying the keystone permission whose removal breaks the chain. There is no code yet, no graph and no solver: the keystones were worked out by hand as part of the catalogue.",
    }),
    stat: STATS.toxicCombinations,
    stack: ["IAM", "CIEM", "Research"],
    status: "research",
    caveat: "No code yet. The keystones are hand-authored.",
  },
] as const;

/* the correlation engine's worked example, from master bullet PR7 ("a missing IMDSv2 requirement
   and an over-privileged IAM role on the same instance"). Themes that draw it
   read it from here so the example exists once. */
export const TOXIC_COMBINATION_EXAMPLE = {
  resource: "One instance",
  findings: ["IMDSv2 not required", "Over-privileged IAM role"],
  findingNote: "Low severity alone",
  path: "Together, one privilege-escalation path",
} as const;

/** The revision every surface was written against: the Ascend master's lock. */
export const CONTENT_REVISION = { label: "Rev. Oct 2026", master: "Ascend master v7, locked 2026-10-31" } as const;

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

export const CAPABILITIES: ReadonlyArray<Capability> = [
  {
    id: "baseline",
    name: "Baseline ownership",
    prose: assertProse("CAPABILITIES.baseline", {
      short: "Deciding which controls ship, and enforcing them.",
      medium:
        "Owns the AWS baseline for every engineering team, its enforcement program, and metrics built so that suppressing a finding cannot improve the chart.",
      full:
        "Owns the AWS security baseline for every engineering team on AWS, a role taken at month three in 2022. Designed the high-severity enforcement program: a three-tier severity model based on what an attacker gains, the full control-to-tier mapping published a quarter before enforcement, and a written exception with an expiry for any declined fix.",
    }),
    stat: STATS.severityTiers,
  },
  {
    id: "detection",
    name: "Configuration-state detection",
    prose: assertProse("CAPABILITIES.detection", {
      short: "200+ signatures, owned down to the false positives.",
      medium:
        "200+ Python signatures across 1,400+ AWS accounts, owned as production software: correctness, false positives, and findings that never reached an owner.",
      full:
        "Deploys and maintains 200+ Python signatures across 1,400+ AWS accounts, covering AWS service controls and IAM. Owns their correctness: fixed two controls whose findings never reached the ticketing system for months, and a shared policy-evaluation helper that hid real access, then audited the fleet for the same pattern. Posture detection, not detection and response.",
    }),
    stat: STATS.signatures,
  },
  {
    id: "identity",
    name: "IAM and toxic combinations",
    prose: assertProse("CAPABILITIES.identity", {
      short: "Escalation paths found by combining findings.",
      medium:
        "correlation engine correlates alerts into 15 AWS toxic combinations. review-aws-iam-policies covers 10 escalation classes, benchmarked against 32 findings written first.",
      full:
        "correlation engine correlates low-severity alerts into 15 AWS toxic combinations drawn from DataDog's public pathfinding.cloud catalog. review-aws-iam-policies covers 10 privilege-escalation classes, pairs deterministic checks with a model pass, and was benchmarked against 32 ground-truth findings in 11 Terraform fixtures written before evaluation.",
    }),
    stat: STATS.awsToxicCombinations,
  },
  {
    id: "ai-tooling",
    name: "AI tooling with gates",
    prose: assertProse("CAPABILITIES.ai-tooling", {
      short: "Models where they help, rules where access is decided.",
      medium:
        "Baselines served to Claude over MCP, an AI-assisted review workspace, attack-research pipeline, and a deterministic suppression advisor. Human approval on every write.",
      full:
        "Serves AWS, GCP, Kubernetes, and Docker baselines to Claude through the security MCP. Runs reviews through an assistant workspace that drafts findings, with nothing written until I approve the exact text. Built a deterministic advisory engine for suppression requests, and chose rules over a model because the decision gates access.",
    }),
    stat: STATS.modelsOrchestrated,
  },
  {
    id: "review",
    name: "Architecture review",
    prose: assertProse("CAPABILITIES.review", {
      short: "100+ reviews, every objection tied to a written control.",
      medium:
        "100+ cloud security architecture reviews since 2021 across AWS, GCP, and Azure, for every business unit. Accepted risk always has an owner and an expiry.",
      full:
        "Led 100+ cloud security architecture reviews since 2021 across AWS, GCP, and Azure for every business unit. Each objection is tied to a named written control and each accepted risk gets an owner and an expiry. Control interpretation is self-service: when a question recurs, the control text gets rewritten until teams cite it correctly without asking.",
    }),
    stat: STATS.securityReviews,
  },
  {
    id: "leadership",
    name: "Team leadership",
    prose: assertProse("CAPABILITIES.leadership", {
      short: "Led infrastructure and security teams of up to 7.",
      medium:
        "Team lead at CYR3CON for the infrastructure and security teams, up to 7 engineers: sprint planning, project scope, and mentoring across AWS and on-prem.",
      full:
        "Team lead at CYR3CON for the infrastructure and security teams, up to 7 engineers. Ran sprint planning, defined project scope, and mentored both teams, which owned AWS infrastructure and security, on-prem data-center servers, firewalls, and shared engineering tooling. At Yahoo, taught assistant-driven development to a partner team that now ships into a platform I own.",
    }),
    stat: STATS.teamLed,
  },
] as const;

/* ── Career ──────────────────────────────────────────────────────────────── */

export interface Role {
  id: string;
  org: string;
  title: string;
  /** En-dash range, matching lib/resume.ts. */
  period: string;
  note: string;
  current?: boolean;
}

/* Matches master v7's `work` block. CYR3CON is one entry from Dec 2017 with the
   intern period noted, as the master sets it (v7.1). */
export const CAREER: ReadonlyArray<Role> = [
  {
    id: "yahoo-principal",
    org: "Yahoo, Cloud Security",
    title: "Principal Technical Security Engineer",
    period: "Oct 2026 – now",
    note: "Owns the AWS security baseline and the 200+ signatures behind it. Built correlation engine, extended the security MCP, and runs attack-research pipeline and GCP attack-path analysis.",
    current: true,
  },
  {
    id: "yahoo-senior",
    org: "Yahoo, Cloud Security",
    title: "Senior Technical Security Engineer",
    period: "Feb 2022 – Sep 2026",
    note: "Took the baseline at month three. Designed the high-severity enforcement program and led 100+ architecture reviews.",
  },
  {
    id: "cyr3con",
    org: "CYR3CON",
    title: "Cyber Security Architect, Team Lead",
    period: "Dec 2017 – Jan 2022",
    note: "Led infrastructure and security teams of up to 7. Designed the multi-account AWS foundation as code and ran the on-prem data center. Intern until Apr 2019.",
  },
  {
    id: "infosys",
    org: "Infosys",
    title: "Systems Engineer",
    period: "Dec 2015 – May 2017",
    note: "Partner data exchange for a US logistics client on Dell Boomi. Throughput up about 80%.",
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

/** A published record by id. Throws at module load on a missing or held id, so
 *  a theme that names a record cannot silently render a different one, and a
 *  record that is later held cannot leak its unpublished fields. */
export const decisionById = (id: string): Decision & Required<Pick<Decision, "decided" | "rejected">> => {
  const d = DECISIONS.find((x) => x.id === id);
  if (!d) throw new Error(`profile.ts: no decision "${id}". Ids: ${DECISIONS.map((x) => x.id).join(", ")}`);
  if (!d.published || !d.decided || !d.rejected) throw new Error(`profile.ts: decision "${id}" is held; only published records render.`);
  return d as Decision & Required<Pick<Decision, "decided" | "rejected">>;
};
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
  /** One line a theme can head the record with. */
  title: string;
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
  title: "Two controls ran correctly and delivered nothing",
  supposedToCatch: "Two configuration controls, evaluated continuously across the estate. One covers key management on a secrets store, the other covers end-of-life language runtimes on serverless functions. Both had working detections, both were enabled, and both appeared healthy in every operational view.",
  whyItDidnt: "During earlier debugging of each detection, the call that delivers findings to the consuming system had been commented out and a debug print left in its place. The commenting was never reverted. Both detections then ran on schedule, executed correctly, and produced correct findings, which went to a log stream and nowhere else. The mechanism is not \"we had no coverage\". The mechanism is that the pipeline's health signal was \"the detection ran\", and nothing anywhere checked \"the detection's output arrived\". A detection producing zero delivered findings is indistinguishable from a detection covering a clean estate, and there was no control that could tell the difference.",
  howFound: "By me, and not by looking. I was doing an unrelated hygiene pass across the detection fleet, cleaning up module-level imports that were only needed by test paths, and read the production path of these two while I was in the file. Nothing surfaced it. Nothing would have.",
  blastRadius: "Two controls, no enforcement coverage, for a period measured in months rather than weeks, and the two periods differed. Bounded honestly: the findings were being generated correctly the whole time, so nothing was mis-evaluated and no wrong conclusion was drawn. What was lost is that no remediation obligation was ever created for any finding either control produced during that window, so the underlying conditions persisted with nobody assigned to them and no record that they existed.",
  structuralFix: "Restored the delivery path in both. Then, because the failure mode was scaffolding surviving into production rather than a bug in either detection, audited the same pattern across the rest of the fleet: separating test-only imports from the production path in every detection where the two were mixed, so that a debug modification is visibly a debug modification rather than a one-character difference from correct.",
  stillExposed: "The audit was manual and one-time. There is still no automated check that a detection which ran actually delivered, and no alert on a detection whose delivered volume drops to zero. The same failure can happen again tomorrow in a different detection and would be found the same way, which is to say by accident. The metric that would close this does not exist yet.",
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
