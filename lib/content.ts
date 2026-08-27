// Central content source — all themes and sections read from here.
// Update this file only; components pick up changes automatically.
// Content rotates every 24h (independent of the 12h theme rotation).
// Facts trace to the master resume (locked 2026-07-01): GOAT is stated as a
// count (32 benchmarks), reviews are 150+, CSPM detection scope is 1,400+ AWS
// accounts. Variations reframe the same bullets per audience; they never add
// new claims.

export interface WorkSection {
  heading: string;
  body: string;
}

export interface ResearchProject {
  name: string;
  status: "In Research";
  tagline: string;
  body: string;
  hypothesis: string;
  tags: string[];
}

export interface ContentVariation {
  id: string;
  voice: string;
  work: {
    intro: string;
    sections: WorkSection[];
  };
  research: {
    intro: string;
    projects: ResearchProject[];
  };
}

// ── Shared across all variations ────────────────────────────────────────────

const RESEARCH_PROJECTS: ResearchProject[] = [
  {
    name: "Artemis",
    status: "In Research",
    tagline: "Multi-cloud attack path simulation at enterprise scale.",
    body: "A CNAPP-class multi-cloud attack path simulation platform spanning 2,800+ AWS and GCP accounts — unifying AWS Security Hub and GCP Security Command Center findings into an AI-enriched graph layer. Exports to BigQuery, applies Gemini enrichment, maps to business units via fuzzy crown-jewel matching, and tracks toxic combination persistence over time. The open engineering problem: turning simulation output into dissolution playbooks that actually execute — not just reports that sit in a dashboard.",
    hypothesis: "Most CNAPPs surface individual findings. Artemis surfaces the chain — and the minimum intervention that collapses it.",
    tags: ["Python", "GCP SCC", "AWS Security Hub", "Vertex AI", "Gemini", "BigQuery", "Databricks"],
  },
  {
    name: "Antitoxin",
    status: "In Research",
    tagline: "Graph-theoretic IAM toxic combination dissolution.",
    body: "A CIEM (Cloud Infrastructure Entitlement Management) research framework cataloguing 62 IAM toxic combinations across 8 attack categories, each mapped to MITRE ATT&CK techniques with a minimum cut-set dissolution action. Instead of enumerating toxic combinations one at a time, the cut-set method finds keystone permissions — the nodes whose removal collapses entire privilege escalation chains without disrupting legitimate access. Currently working on automated remediation path generation.",
    hypothesis: "Toxic combinations aren't fixed by removing one permission at random. The privilege graph has a keystone. Find it.",
    tags: ["IAM Analysis", "Graph Theory", "MITRE ATT&CK", "CloudTrail", "Python"],
  },
];

// ── Variation 1: Impact lens — hiring managers, security leadership ──────────
// "What problems can you solve for my team, right now?"

const V1: ContentVariation = {
  id: "impact",
  voice: "Hiring Manager",
  work: {
    intro: "I build AI-augmented security systems — agentic pipelines that eliminate manual review cycles, autonomous detection that operates at cloud account scale, and AI-native tooling that lets a small team achieve machine-speed detection and response across a large attack surface. Below is the current work.",
    sections: [
      {
        heading: "Detection Engineering",
        body: "Define and operate Yahoo's company-wide cloud security baselines — authoring and maintaining a detection system of 200+ Python/Lambda signatures that evaluates resource configurations across 1,400+ AWS accounts, producing per-resource findings and the account, business-unit, and org-level security-posture scores the company is measured against, each with CIS-style audit and remediation guidance. Coordinated the program's largest control expansion (50+ new baselines): researched new AWS services, ran Checkov parity analysis to close policy gaps, and re-scored every control's severity on a risk × likelihood × impact matrix. Also built the organization's first GenAI security guardrails and detection (Amazon Bedrock, SageMaker) from zero prior art.",
      },
      {
        heading: "Security Reviews at Scale",
        body: "Conducted 150+ cloud security reviews under Yahoo's Paranoid Security Review program — partnering with the Product Security, Network, and Identity teams to threat-model and approve new cloud services and architectures before launch, across business units from Mail and Sports to Finance and Central Tech. Behind the throughput: an agentic SOAR-style review platform with a 1,700+-node cross-ticket intelligence layer mined from a large corpus of historical reviews, passive detection rules, and bidirectional MCP integration with Jira and Confluence. Multi-week backlog eliminated; now the team's standard review methodology.",
      },
      {
        heading: "AI-Native IAM Auditing",
        body: "An AI-native tool-calling agent that enumerates live AWS IAM configurations, traverses the privilege graph across 65+ escalation paths and 10 vulnerability classes, and applies LLM semantic reasoning to surface transitive permission chains and policy conditions that rule-based tools cannot evaluate. Generates risk-ranked remediation reports with severity, source attribution, and escalation-path IDs. Built the benchmark before trusting the tool: GOAT, 11 synthetic Terraform fixtures with 32 ground-truth findings, evaluated against all 32 — then distributed org-wide through the internal security marketplace.",
      },
      {
        heading: "Autonomous Threat Intelligence Pipeline",
        body: "A multi-agent orchestration pipeline across 19 foundation models and 5 providers — a performance-weighted router dynamically assigns each stage (triage → analyze → decompose → peer review → synthesize) to the highest-performing model for that task, updating allocation weights after every run. Replaced a fully manual research process: 59 vetted security initiative proposals generated at $1.40/run — 55% cheaper than single-model approaches — with multi-persona peer review built into the evaluation chain.",
      },
      {
        heading: "AI Security Operations Tooling",
        body: "Two AI-augmented platforms in daily operational use. The Security Ops Platform (FastAPI + Databricks SQL, dozens of API endpoints) delivers autonomous alert triage and LLM-driven change request validation against policy baseline — a deterministic AI advisor trained on a large corpus of historical cloud security tickets, 4-signal scoring model (confidence clamped 5–95%), hard deny gate for 6 critical baseline categories — adopted as the team's primary operational workflow, eliminating manual review cycles at scale. The Autonomous Threat Intelligence Ingestion agent processes 21 security intelligence feeds daily through a 4-stage LLM-driven workflow (triage → analyze → draft → verify), reducing CIS/NIST baseline discovery-to-draft from days to under 30 minutes at under $0.05/run.",
      },
    ],
  },
  research: {
    intro: "Current research — problems I'm actively working through, not yet shipped.",
    projects: RESEARCH_PROJECTS,
  },
};

// ── Variation 2: Technical depth lens — FAANG technical recruiters ───────────
// "How does this compare to L5/L6? What's the ownership model?"

const V2: ContentVariation = {
  id: "technical",
  voice: "FAANG Technical Recruiter",
  work: {
    intro: "Three distinct engineering domains that converge: machine-speed detection at cloud account scale, agentic security workflows that eliminate analyst toil, and AI-native IAM audit tooling. Each informs the others — detection gaps become research targets; agentic pipeline output ships as new controls.",
    sections: [
      {
        heading: "Detection Fleet Ownership",
        body: "Full ownership of the detection system: 200+ active Python/Lambda signatures evaluating resource configurations across 1,400+ AWS accounts, producing per-resource findings and the account/BU/org posture scores (CSPM) the company is measured against — each signature shipping with CIS-style audit and remediation guidance, deployed via Terraform for reproducible rollout. Primary point of contact for the AWS security baselines program: coordinated the largest control expansion in program history (50+ new baselines), ran Checkov parity analysis to close policy gaps, and re-scored every control on a risk × likelihood × impact matrix. The core engineering challenge is evaluation logic precise enough to hold signal quality at account scale while covering per-service configuration nuance.",
      },
      {
        heading: "Agentic Security Review Platform",
        body: "150+ threat-model reviews delivered under the Paranoid Security Review program across AWS, GCP, and Azure — cross-account IAM, third-party vendor integrations, and AI/ML platforms — partnering with Product Security, Network, and Identity teams, with sign-off required before launch. Architecture behind the throughput: a large corpus of historical review tickets → 1,700+ knowledge nodes across many security domains, technology stacks, and application profiles → autonomous review agent with passive detection rules, multi-step skills, slash commands, and bidirectional MCP integration with Jira and Confluence. Scales security coverage without additional headcount.",
      },
      {
        heading: "AI-Native IAM Audit Agent",
        body: "Production tool-calling agent covering 65+ privilege escalation paths across 10 vulnerability classes: pass-role abuse, role-assumption chains, compute-to-data escalation, confused deputy, OIDC trust misconfiguration, persistence, and others. Enumerates live AWS IAM configurations; layers static policy graph traversal with LLM semantic interpretation to catch transitive chains and policy conditions rule-based tools cannot evaluate. Benchmark discipline built in: authored GOAT — 11 synthetic Terraform fixtures, 32 ground-truth findings — and evaluated the agent against all 32 before shipping. Distributed org-wide via the internal security marketplace.",
      },
      {
        heading: "Toxic-Combination Correlation Engine",
        body: "A correlation engine over CIS-based alert data that chains individual findings into privilege-escalation paths across three classes: misconfig+misconfig (public SSH/RDP without IMDSv2), misconfig+IAM (a public Lambda holding a privileged role, an exposed host with an over-permissioned instance profile), and IAM+IAM (cross-account assume-role into a privileged role, self-escalation via attach/put-policy). Catches the chains single-finding scanners miss — the difference between a list of findings and an attack path.",
      },
      {
        heading: "Production AI Security Platforms",
        body: "Two AI-augmented security platforms, both in daily operational use. Security Ops Platform: FastAPI + Databricks SQL, dozens of endpoints — autonomous alert triage and LLM-driven change request validation against policy baseline, powered by a deterministic AI advisor trained on a large corpus of historical cloud security tickets; 4-signal scoring (confidence clamped 5–95%), hard deny gate for 6 critical baseline categories where auto-remediation is never appropriate. Autonomous Threat Intelligence Ingestion agent: 4-stage LLM-driven workflow across 21 feeds — Haiku handles high-volume triage, Sonnet+Opus draft CIS/NIST-aligned baseline documents in exact registry shape, programmatic verifier gates delivery. 330+ items/day, baseline discovery-to-draft under 30 minutes, under $0.05/run.",
      },
    ],
  },
  research: {
    intro: "Active research — in-progress, not production.",
    projects: RESEARCH_PROJECTS,
  },
};

// ── Variation 3: Narrative lens — engineering leadership ────────────────────
// "How does he think? What's the arc? What does he prioritize?"

const V3: ContentVariation = {
  id: "narrative",
  voice: "Engineering Leadership",
  work: {
    intro: "I work at the boundary of what security tools currently do — where coverage gaps are exploitable, where human review is the bottleneck, where agentic workflows can eliminate analyst toil and scale security without headcount. Everything below was built in that space.",
    sections: [
      {
        heading: "Getting the Signal Right",
        body: "200+ detection signatures evaluating 1,400+ AWS accounts — each one a judgment call on whether a configuration pattern is genuinely risky, and at what threshold. The output isn't just alerts: it's the per-resource findings and posture scores the whole company is measured against, so signal quality is the product. When a false-positive storm hits, I root-cause it to the upstream AWS change — runtime deprecations, KMS evaluation changes, S3 policy format shifts — and rewrite the evaluation logic rather than suppress the noise. I coordinated the baseline program's largest control expansion (50+ new baselines) because the existing controls had coverage gaps I could map directly to real attack techniques from cloud incident response data. The forcing function: if we can't detect a known technique, that's a gap to close.",
      },
      {
        heading: "Scaling Reviews Without Scaling Headcount",
        body: "Threat modeling and security architecture reviews were a bottleneck — one engineer per review, institutional knowledge not captured anywhere, inconsistent coverage across business units. I approached it as a retrieval problem: could I make what the best reviewer knows accessible to any reviewer? The solution was cross-ticket intelligence: a large corpus of historical tickets became 1,700+ structured knowledge nodes powering an agentic SOAR-style review platform that sharply reduced per-review effort. 150+ reviews across every business unit — Mail, Sports, Finance, Central Tech — partnering with Product Security, Network, and Identity teams, with the multi-week backlog eliminated. The coverage is better, not just faster.",
      },
      {
        heading: "The IAM Problem",
        body: "IAM privilege escalation is a problem where the attack surface grows faster than detection capability. I built an AI-native tool-calling agent that enumerates live AWS IAM configurations and combines static policy graph traversal with LLM semantic reasoning to catch what rule-based tools miss — transitive chains, policy conditions, cross-service trust relationships. And I built the benchmark before trusting the tool: GOAT, 11 synthetic Terraform fixtures with 32 ground-truth findings, evaluated end to end before the agent shipped. The benchmark discipline matters — if you don't know where the boundaries are, you can't trust the tool.",
      },
      {
        heading: "Agentic Pipelines as Infrastructure",
        body: "The threat intelligence pipeline was designed to solve a throughput problem: how do you make security research faster and cheaper at scale? The answer required treating model selection as an engineering problem, not a one-time decision. I built a multi-agent orchestration pipeline with a performance-weighted router that tracks model output quality per task type and adjusts allocation weights after each run. 19 models, 5 providers, a system that autonomously improves its own selection over time. The insight isn't that AI is useful — it's that the meta-layer (which model, for what, when) is where the leverage is. 59 vetted proposals at $1.40/run, replacing a fully manual research process.",
      },
      {
        heading: "Building the Tools We Actually Need",
        body: "Two recurring bottlenecks in cloud security operations: too many CSPM alerts to manually triage, and too many security intelligence sources to track for baseline research. I built AI-augmented platforms for both. For autonomous alert triage, the interesting design choice was not using an LLM for the scoring itself — a deterministic heuristic advisor trained on a large corpus of historical cloud security tickets is more trustworthy, more auditable, and harder to manipulate than a live model call; LLM-driven change request validation handles the policy reasoning layer separately. For CIS/NIST baseline research, the cheapest model (Haiku) handles high-volume feed triage; the best model (Sonnet/Opus) does the drafting. Baseline discovery-to-draft: days to under 30 minutes. Both in daily operational use.",
      },
    ],
  },
  research: {
    intro: "Active research — architecture still evolving, not yet in production.",
    projects: RESEARCH_PROJECTS,
  },
};

// ── Variation 4: Direct/compact lens — high signal-to-noise ─────────────────
// "Give me the most important things, fast."

const V4: ContentVariation = {
  id: "direct",
  voice: "Pragmatic Realist",
  work: {
    intro: "Cloud detection. IAM analysis. AI security tooling. The work:",
    sections: [
      {
        heading: "200+ Signatures, 1,400+ AWS Accounts",
        body: "Own Yahoo's company-wide cloud security baselines and the detection system enforcing them: 200+ Python/Lambda signatures evaluating resource configurations across 1,400+ AWS accounts, producing the per-resource findings and posture scores (CSPM) the company is measured against. Coordinated the program's largest control expansion, 50+ new baselines, with Checkov parity analysis and severity re-scoring on a risk × likelihood × impact matrix. First GenAI security guardrails (Bedrock, SageMaker) built from zero prior art. Fleet managed via Terraform.",
      },
      {
        heading: "150+ Security Reviews, Small Team",
        body: "150+ threat-model reviews under the Paranoid Security Review program, partnering with Product Security, Network, and Identity — new cloud services and architectures approved before launch, across Mail, Sports, Finance, and Central Tech. Behind it: an agentic SOAR-style review platform — cross-ticket intelligence from a large corpus of historical tickets → 1,700+-node knowledge graph → autonomous review agent with passive detection rules, slash commands, and MCP integration with Jira and Confluence. Multi-week backlog eliminated. Scales security without additional headcount.",
      },
      {
        heading: "IAM Audit Agent — Benchmarked Before Trusted",
        body: "Production tool-calling agent: enumerates live AWS IAM configurations, privilege graph traversal covers 65+ escalation paths across 10 vulnerability classes, LLM semantic reasoning catches transitive chains rule-based tools miss. Generates risk-ranked remediation reports with severity, source attribution, and escalation-path IDs. Built the GOAT benchmark first — 11 synthetic Terraform fixtures, 32 ground-truth findings — and evaluated the agent against all 32 before shipping it org-wide.",
      },
      {
        heading: "Autonomous Threat Intelligence Pipeline — $1.40/Run",
        body: "Multi-agent orchestration across 19 models, 5 providers — performance-weighted router updates its own model allocations after each run. 5-stage agentic pipeline with peer review built in. Replaced a fully manual research process: 59 vetted proposals at $1.40/run, 55% cheaper than single-model equivalents.",
      },
      {
        heading: "AI Security Platforms — Production, Not Prototypes",
        body: "AI-augmented CSPM operations platform: FastAPI + Databricks, dozens of endpoints, autonomous alert triage and LLM-driven change request validation — deterministic AI advisor trained on a large corpus of cloud security tickets, hard deny gate for 6 critical baseline categories. Autonomous threat intelligence ingestion agent: 21 feeds, 330+ items/day, 4-stage LLM-driven workflow — CIS/NIST baseline discovery-to-draft in under 30 minutes, under $0.05/run. Both shipped. Both in daily use.",
      },
    ],
  },
  research: {
    intro: "In progress.",
    projects: RESEARCH_PROJECTS,
  },
};

export const contentVariations: ContentVariation[] = [V1, V2, V3, V4];

import { getThemeIndex } from "@/lib/rotation";

export function getCurrentContent(): ContentVariation {
  return contentVariations[getThemeIndex(contentVariations.length)];
}
