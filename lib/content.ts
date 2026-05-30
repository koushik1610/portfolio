// Central content source — all themes and sections read from here.
// Update this file only; components pick up changes automatically.
// Content rotates every 24h (independent of the 12h theme rotation).

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
    body: "A CNAPP-class multi-cloud attack path simulation platform spanning 2,500+ AWS and GCP accounts — unifying AWS Security Hub, GCP Security Command Center, and Kubernetes/EKS workload findings into an AI-enriched graph layer. Exports to BigQuery, applies Gemini enrichment, maps to business units via fuzzy crown-jewel matching, and tracks toxic combination persistence over time. The open engineering problem: turning simulation output into dissolution playbooks that actually execute — not just reports that sit in a dashboard.",
    hypothesis: "Most CNAPPs surface individual findings. Artemis surfaces the chain — and the minimum intervention that collapses it.",
    tags: ["Python", "GCP SCC", "AWS Security Hub", "Vertex AI", "Gemini", "BigQuery", "Databricks"],
  },
  {
    name: "Antitoxin",
    status: "In Research",
    tagline: "Graph-theoretic IAM toxic combination dissolution.",
    body: "A research framework cataloguing 62 IAM toxic combinations across 8 attack categories, each mapped to MITRE ATT&CK techniques with a minimum cut-set dissolution action. The cut-set method finds keystone permissions — the nodes whose removal collapses entire privilege escalation chains without disrupting legitimate access. Currently working on automated remediation path generation.",
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
        body: "Own end-to-end lifecycle of 200+ active Python/Lambda detection signatures across 1,500+ AWS accounts — sustaining a 0% false-positive rate at account scale while continuously expanding coverage as the threat landscape evolves. Authored the v6 AWS security baseline release: 49 CIS-benchmarked controls across Lambda, ECS, S3, KMS, IAM, and VPC — the largest single coverage expansion in program history — each grounded in a MITRE ATT&CK gap analysis against 74 real-world attack techniques sourced from cloud incident response data. Detection fleet deployed via Terraform-controlled infrastructure, enabling machine-speed detection and response across the full cloud account estate.",
      },
      {
        heading: "Agentic Security Reviews",
        body: "Designed and shipped an agentic SOAR-style cloud security review platform that reduced per-review effort by 80% — scaling threat modeling and security architecture review throughput to 123 reviews across all business units with a 4-person team, eliminating a 6-week backlog. Built a cross-ticket intelligence layer from 1,400+ historical security review tickets — 1,767 knowledge nodes across 11 security domains, 411 technology stacks, and 1,055 application profiles — as the retrieval backbone for an autonomous review agent with 14 passive detection rules, 16 slash commands, and bidirectional MCP integration with Jira and Confluence. Scales security coverage without additional headcount.",
      },
      {
        heading: "AI-Native IAM Audit Agent",
        body: "An AI-native tool-calling agent using Boto3 to enumerate live AWS IAM configurations, traverse the privilege graph across 65+ escalation paths and 10 vulnerability classes, and apply LLM semantic reasoning to surface transitive permission chains and policy conditions that rule-based tools cannot evaluate. Generates risk-ranked remediation reports. Benchmarked against GOAT (open-source AWS IAM privilege escalation benchmark): 100% recall (32/32 findings), 0% false positives — eliminating the manual IAM review cycle.",
      },
      {
        heading: "Autonomous Threat Intelligence Pipeline",
        body: "A multi-agent orchestration pipeline across 19 foundation models and 5 providers — a performance-weighted router dynamically assigns each stage (triage → analyze → decompose → peer review → synthesize) to the highest-performing model for that task, updating allocation weights after every run. Replaced a fully manual research process: 59 vetted security initiative proposals generated at $1.40/run — 55% cheaper than single-model approaches — with multi-persona peer review built into the evaluation chain.",
      },
      {
        heading: "AI Security Operations Tooling",
        body: "Two AI-augmented platforms in daily operational use. The Security Ops Platform (FastAPI + Databricks SQL, 45 API endpoints) delivers autonomous alert triage and LLM-driven change request validation against policy baseline — a deterministic AI advisor trained on 2,171 historical cloud security tickets, 4-signal scoring model (confidence clamped 5–95%), hard deny gate for 6 critical baseline categories — adopted as the team's primary operational workflow, eliminating manual review cycles at scale. The Autonomous Threat Intelligence Ingestion agent processes 21 security intelligence feeds daily through a 4-stage LLM-driven workflow (triage → analyze → draft → verify), reducing CIS/NIST baseline discovery-to-draft from days to under 30 minutes at under $0.05/run.",
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
        body: "Full ownership of 200+ active Python/Lambda detection signatures across 1,500+ AWS accounts — sustaining a 0% false-positive rate while continuously adding net-new controls. The v6 AWS security baseline release covered 49 CIS-benchmarked controls across Lambda, ECS, S3, KMS, IAM, and VPC — the largest single coverage expansion in program history — each mapped to a MITRE ATT&CK technique from cloud incident response data. Detection infrastructure managed via Terraform for reproducible deployment; the core engineering challenge is evaluation logic that achieves zero-false-positives at account scale while remaining expressive enough to cover per-service configuration nuance. Enables machine-speed detection and response across the full cloud estate.",
      },
      {
        heading: "Agentic Security Review Platform",
        body: "Designed and shipped an agentic SOAR-style cloud security review platform that reduced per-review effort by 80% and scaled threat modeling coverage to 123 reviews across all business units with four engineers, eliminating a 6-week backlog. Architecture: 1,400+ historical security review tickets → 1,767 knowledge nodes across 11 security domains, 411 technology stacks, and 1,055 application profiles → autonomous review agent with 14 passive detection rules, 6 multi-step skills, 16 slash commands, and bidirectional MCP integration with Jira and Confluence. Scales security coverage without additional headcount.",
      },
      {
        heading: "AI-Native IAM Audit Agent",
        body: "Production tool-calling agent covering 65+ privilege escalation paths across 10 vulnerability classes: policy injection, role chaining, service role abuse, SCP bypass patterns, and others. Uses Boto3 to enumerate live AWS IAM configurations; layers static policy graph traversal with LLM semantic interpretation to catch transitive chains and policy conditions that rule-based tools cannot evaluate. Generates risk-ranked remediation reports. Validated on GOAT benchmark: 32 findings, 100% recall, 0 false positives — eliminating the manual IAM review cycle.",
      },
      {
        heading: "Autonomous Threat Intelligence Pipeline",
        body: "Multi-agent orchestration pipeline across 19 models from 5 providers — a performance-weighted router assigns each stage (triage → analyze → decompose → peer review → synthesize) to the model with the highest historical performance on that task type, with allocation weights updated after each run. Replaced a fully manual research process. Operational at $1.40/run (55% savings over single-model) with multi-persona peer review built into the evaluation chain.",
      },
      {
        heading: "Production AI Security Platforms",
        body: "Two AI-augmented security platforms, both in daily operational use. Security Ops Platform: FastAPI + Databricks SQL, 45 endpoints — autonomous alert triage and LLM-driven change request validation against policy baseline, powered by a deterministic AI advisor trained on 2,171 historical cloud security tickets; 4-signal scoring (confidence clamped 5–95%), hard deny gate for 6 critical baseline categories where auto-remediation is never appropriate. Autonomous Threat Intelligence Ingestion agent: 4-stage LLM-driven workflow across 21 feeds — Haiku handles high-volume triage, Sonnet+Opus draft CIS/NIST-aligned baseline documents in exact registry shape, programmatic verifier gates delivery. 330+ items/day, baseline discovery-to-draft under 30 minutes, under $0.05/run.",
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
        body: "200+ detection signatures across 1,500+ AWS accounts — each one a judgment call on whether a configuration pattern is genuinely risky, and at what threshold. The sustained 0% false-positive rate is deliberate: security engineers stop trusting tools that cry wolf. I authored the MITRE ATT&CK gap analysis for the v6 AWS security baseline program — 49 CIS-benchmarked controls across Lambda, ECS, S3, KMS, IAM, and VPC — because the existing controls had coverage gaps I could map directly to real attack techniques from cloud incident response data. The forcing function: if we can't detect a known technique with machine-speed detection and response, that's a gap to close.",
      },
      {
        heading: "Scaling Reviews Without Scaling Headcount",
        body: "Threat modeling and security architecture reviews were a bottleneck — one engineer per review, institutional knowledge not captured anywhere, inconsistent coverage across business units. I approached it as a retrieval problem: could I make what the best reviewer knows accessible to any reviewer? The solution was cross-ticket intelligence: 1,400+ historical tickets became 1,767 structured knowledge nodes powering an agentic SOAR-style review platform that reduced per-review effort by 80%. 123 reviews across all business units — eliminating a 6-week backlog. The coverage is better, not just faster. Security scales without additional headcount.",
      },
      {
        heading: "The IAM Problem",
        body: "IAM privilege escalation is a problem where the attack surface grows faster than detection capability. I built an AI-native tool-calling agent that uses Boto3 to enumerate live AWS IAM configurations and combines static policy graph traversal with LLM semantic reasoning to catch what rule-based tools miss — transitive chains, policy conditions, cross-service trust relationships. I benchmarked it against GOAT fixtures before shipping: 100% recall, 0 false positives. The benchmark discipline matters — if you don't know where the boundaries are, you can't trust the tool.",
      },
      {
        heading: "Agentic Pipelines as Infrastructure",
        body: "The threat intelligence pipeline was designed to solve a throughput problem: how do you make security research faster and cheaper at scale? The answer required treating model selection as an engineering problem, not a one-time decision. I built a multi-agent orchestration pipeline with a performance-weighted router that tracks model output quality per task type and adjusts allocation weights after each run. 19 models, 5 providers, a system that autonomously improves its own selection over time. The insight isn't that AI is useful — it's that the meta-layer (which model, for what, when) is where the leverage is. 59 vetted proposals at $1.40/run, replacing a fully manual research process.",
      },
      {
        heading: "Building the Tools We Actually Need",
        body: "Two recurring bottlenecks in cloud security operations: too many CSPM alerts to manually triage, and too many security intelligence sources to track for baseline research. I built AI-augmented platforms for both. For autonomous alert triage, the interesting design choice was not using an LLM for the scoring itself — a deterministic heuristic advisor trained on 2,171 historical cloud security tickets is more trustworthy, more auditable, and harder to manipulate than a live model call; LLM-driven change request validation handles the policy reasoning layer separately. For CIS/NIST baseline research, the cheapest model (Haiku) handles high-volume feed triage; the best model (Sonnet/Opus) does the drafting. Baseline discovery-to-draft: days to under 30 minutes. Both in daily operational use.",
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
        heading: "200+ Active Detection Signatures",
        body: "Own end-to-end lifecycle of 200+ Python/Lambda detection signatures across 1,500+ AWS accounts — 0% false-positive rate sustained at account scale, enabling machine-speed detection and response. v6 baseline release: 49 CIS-benchmarked controls across Lambda, ECS, S3, KMS, IAM, and VPC, grounded in a MITRE ATT&CK gap analysis from cloud incident response data. Fleet managed via Terraform.",
      },
      {
        heading: "123 Security Reviews, 4-Person Team",
        body: "Shipped an agentic SOAR-style review platform that cut per-review effort by 80% — cross-ticket intelligence from 1,400+ historical tickets → 1,767-node knowledge graph → autonomous review agent with 14 passive detection rules, 16 slash commands, and MCP integration with Jira and Confluence. 123 threat modeling and architecture reviews across all business units. 6-week backlog eliminated. Scales security without additional headcount.",
      },
      {
        heading: "AI-Native IAM Audit Agent — 100% Recall, 0 False Positives",
        body: "Production tool-calling agent: Boto3 enumerates live AWS IAM configurations, privilege graph traversal covers 65+ escalation paths across 10 vulnerability classes, LLM semantic reasoning catches transitive chains rule-based tools miss. Generates risk-ranked remediation reports. Validated on GOAT benchmark: 32 findings, every one found, none fabricated. Eliminates manual IAM review cycle.",
      },
      {
        heading: "Autonomous Threat Intelligence Pipeline — $1.40/Run",
        body: "Multi-agent orchestration across 19 models, 5 providers — performance-weighted router updates its own model allocations after each run. 5-stage agentic pipeline with peer review built in. Replaced a fully manual research process: 59 vetted proposals at $1.40/run, 55% cheaper than single-model equivalents.",
      },
      {
        heading: "AI Security Platforms — Production, Not Prototypes",
        body: "AI-augmented CSPM operations platform: FastAPI + Databricks, 45 endpoints, autonomous alert triage and LLM-driven change request validation — deterministic AI advisor trained on 2,171 cloud security tickets, hard deny gate for 6 critical baseline categories. Autonomous threat intelligence ingestion agent: 21 feeds, 330+ items/day, 4-stage LLM-driven workflow — CIS/NIST baseline discovery-to-draft in under 30 minutes, under $0.05/run. Both shipped. Both in daily use.",
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
