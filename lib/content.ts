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
    intro: "I operate at the intersection of cloud security and applied AI — detection engineering at account scale, IAM privilege analysis, and AI systems that give a small team genuine leverage over a large attack surface. Below is the current work.",
    sections: [
      {
        heading: "Detection Engineering",
        body: "Own end-to-end lifecycle of 200+ active Python/Lambda detection signatures across 1,500+ AWS accounts — maintaining a sustained 0% false-positive rate while adding net-new controls as the threat landscape evolves. The v6 AWS security baseline release shipped 49 CIS-benchmarked controls across Lambda, ECS, S3, KMS, IAM, and VPC — the largest in program history — each grounded in a MITRE ATT&CK gap analysis against real-world attack techniques observed in cloud incident response. Detection fleet managed via Terraform-controlled infrastructure for reproducible, auditable deployment.",
      },
      {
        heading: "AI-Augmented Security Reviews",
        body: "Designed and shipped an agentic cloud security review process that reduced per-review effort by 80% — scaling threat modeling and security architecture review throughput to 123 reviews across all business units with a 4-person team. Built a cross-ticket intelligence layer from 1,400+ historical security review tickets — 1,767 knowledge nodes across 11 security domains and 411 technology stacks — wired into a Claude Code review agent with 14 passive detection rules, 16 slash commands, and bidirectional MCP integration with Jira and Confluence. Established as the team's standard review methodology, eliminating a 6-week backlog.",
      },
      {
        heading: "IAM Privilege Escalation Detection",
        body: "A detection skill covering 65+ privilege escalation paths across 10 vulnerability classes. Benchmarked against GOAT (open-source AWS IAM privilege escalation benchmark) fixtures: 32 ground-truth findings, 100% recall, 0% false positives. The skill layers static IAM policy inspection with LLM semantic analysis to surface escalation paths that rule-based tools miss. Deployed via the internal security skills marketplace.",
      },
      {
        heading: "Self-Learning Research Pipeline",
        body: "An AI research pipeline orchestrating 19 foundation models across 5 providers through a performance-weighted router that improves its own model selection over time. Output: vetted security initiative proposals at $1.40 per run — 55% cheaper than single-model approaches — with multi-persona peer review built into the evaluation chain.",
      },
      {
        heading: "AI Security Operations Tooling",
        body: "Two Claude-powered platforms in daily operational use. The Security Ops Platform (FastAPI + Databricks SQL, 45 API endpoints) replaced manual CSPM alert triage with a deterministic AI advisor trained on 2,171 historical cloud security tickets — 4-signal scoring model, confidence clamped 5–95%, hard deny gate for 6 critical baseline categories — adopted as the team's primary operational workflow. The Baseline Research Pipeline ingests 21 security intelligence feeds daily through a 4-stage Claude orchestration pipeline (triage → analyze → draft → verify), reducing CIS/NIST baseline discovery-to-draft from days to under 30 minutes at under $0.05/run.",
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
    intro: "Three distinct engineering domains that converge: detection at cloud account scale, AI tooling for security workflows, and IAM privilege graph analysis. Each informs the others — detection gaps become research targets; research output ships as new controls.",
    sections: [
      {
        heading: "Detection Fleet Ownership",
        body: "Full ownership of 200+ active Python/Lambda detection signatures across 1,500+ AWS accounts — maintaining a 0% false-positive rate while adding net-new controls as the threat landscape evolves. The v6 AWS security baseline release covered 49 CIS-benchmarked controls across Lambda, ECS, S3, KMS, IAM, and VPC — the largest single coverage expansion in program history — each mapped to a MITRE ATT&CK technique from cloud incident response data. Detection infrastructure managed via Terraform for reproducible deployment at scale; the core engineering challenge is evaluation logic that is zero-false-positive at account scale while expressive enough to cover per-service configuration nuance.",
      },
      {
        heading: "Security Review AI Agent",
        body: "Designed and shipped an agentic cloud security review process that reduced per-review effort by 80% and scaled threat modeling coverage to 123 reviews across all business units with four engineers. Built a cross-ticket intelligence layer: 1,400+ historical security review tickets → 1,767 knowledge nodes across 11 security domains and 411 technology stacks → autonomous Claude Code review agent with 14 passive detection rules, 6 multi-step skills, 16 slash commands, and bidirectional MCP integration with Jira and Confluence. Established as the team's standard methodology, eliminating a 6-week backlog.",
      },
      {
        heading: "IAM Escalation Detection",
        body: "Built a detection skill covering 65+ privilege escalation paths across 10 vulnerability classes: policy injection, role chaining, service role abuse, SCPs bypass patterns, and others. The detection model layers static policy graph analysis with LLM semantic interpretation to catch paths the static layer misses — reasoning about policy conditions and transitive permission chains. Validated on GOAT benchmark: 32 findings, 100% recall, 0 false positives.",
      },
      {
        heading: "Multi-Model Research Pipeline",
        body: "5-stage orchestration pipeline (triage → analyze → decompose → peer review → synthesize) across 19 models from 5 providers. A performance-weighted router assigns each stage to the model with the highest historical performance on that task type, with weights updated after each run. The system improves its own model selection over time. Operational at $1.40/run versus approximately $3.20 for a single-model equivalent.",
      },
      {
        heading: "Production AI Security Tools",
        body: "Two Claude-powered security platforms, both in daily operational use. Security Ops Platform: FastAPI + Databricks SQL, 45 endpoints — a deterministic heuristic advisor trained on 2,171 historical cloud security tickets handles CSPM alert triage, a 4-signal model with confidence clamping (5–95%) generates recommendations, and a hard deny gate overrides AI output for 6 critical baseline categories where suppression is never appropriate. Baseline Research Pipeline: 4-stage Claude orchestration (triage → analyze → draft → verify) across 21 feeds — Haiku handles triage, Sonnet+Opus draft CIS/NIST-aligned baseline documents in exact registry shape, programmatic verifier gates delivery. 330+ items/day, baseline discovery-to-draft under 30 minutes, under $0.05/run.",
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
    intro: "I work at the boundary of what security tools currently do — where coverage gaps are exploitable, where human review is the bottleneck, where AI can do the reasoning that rules can't. Everything below was built in that space.",
    sections: [
      {
        heading: "Getting the Signal Right",
        body: "200+ detection signatures across 1,500+ AWS accounts — each one a judgment call on whether a configuration pattern is genuinely risky, and at what threshold. The sustained 0% false-positive rate is deliberate: security engineers stop trusting tools that cry wolf. I authored the MITRE ATT&CK gap analysis for the v6 AWS security baseline program — 49 CIS-benchmarked controls across Lambda, ECS, S3, KMS, IAM, and VPC — because the existing controls had coverage gaps I could map directly to real attack techniques from cloud incident response data. The forcing function: if we can't detect a known technique, that's a gap to close.",
      },
      {
        heading: "Scaling Reviews Without Scaling Headcount",
        body: "Threat modeling and security architecture reviews were a bottleneck — one engineer per review, institutional knowledge not captured anywhere, inconsistent coverage across business units. I approached it as a retrieval problem: could I make what the best reviewer knows accessible to any reviewer? The solution was cross-ticket intelligence: 1,400+ historical tickets became 1,767 structured knowledge nodes wired into an agentic review process that reduced per-review effort by 80%. 123 reviews across all business units — eliminating a 6-week backlog. The coverage is better, not just faster.",
      },
      {
        heading: "The IAM Problem",
        body: "IAM privilege escalation is a problem where the attack surface grows faster than detection capability. I catalogued 65+ escalation paths across 10 vulnerability classes and built a detection skill that combines static policy analysis with LLM semantic reasoning to catch what rule-based tools miss. I benchmarked it against GOAT fixtures before shipping: 100% recall, 0 false positives. The benchmark discipline matters — if you don't know where the boundaries are, you can't trust the tool.",
      },
      {
        heading: "AI as Infrastructure",
        body: "The research pipeline was designed to solve a throughput problem: how do you make security research faster and cheaper at scale? The answer required treating model selection as an engineering problem, not a one-time decision. I built a performance-weighted router that tracks model output quality per task type and adjusts allocation weights after each run. 19 models, 5 providers, a system that improves its own selection over time. The insight isn't that AI is useful — it's that the meta-layer (which model, for what, when) is where the leverage actually is.",
      },
      {
        heading: "Building the Tools We Actually Need",
        body: "Two recurring bottlenecks in cloud security operations: too many CSPM alert tickets to manually triage, and too many security intel sources to track for baseline research. I built Claude-powered pipelines for both. For alert triage, the interesting design choice was not using an LLM for the scoring itself — a deterministic heuristic advisor trained on 2,171 historical cloud security tickets is more trustworthy, more auditable, and harder to manipulate than a live model call. For CIS/NIST baseline research, the cheapest model (Haiku) handles high-volume feed triage; the best model (Sonnet/Opus) does the drafting. Baseline discovery-to-draft: days to under 30 minutes. Both in daily operational use.",
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
        body: "Own end-to-end lifecycle of 200+ Python/Lambda detection signatures across 1,500+ AWS accounts — 0% false-positive rate sustained at account scale. v6 baseline release: 49 CIS-benchmarked controls across Lambda, ECS, S3, KMS, IAM, and VPC, grounded in a MITRE ATT&CK gap analysis from cloud incident response data. Fleet managed via Terraform.",
      },
      {
        heading: "123 Security Reviews",
        body: "Shipped an agentic review process that cut per-review effort by 80% — cross-ticket intelligence from 1,400+ historical tickets → 1,767-node knowledge graph → autonomous Claude Code agent with 14 passive detection rules, 16 slash commands, and MCP integration with Jira and Confluence. 123 threat modeling and architecture reviews across all business units. 6-week backlog eliminated. Coverage better than manual. Process reproducible.",
      },
      {
        heading: "IAM Escalation — 100% Recall, 0 False Positives",
        body: "Detection skill covering 65+ privilege escalation paths across 10 vulnerability classes. Static policy analysis plus LLM semantic reasoning to catch what rule-based tools miss. Validated on GOAT benchmark: 32 findings, every one found, none fabricated. Deployed internally.",
      },
      {
        heading: "AI Research Pipeline at $1.40/Run",
        body: "19-model, 5-provider orchestration pipeline with a performance-weighted router that updates its own model allocations after each run. 5-stage evaluation chain with peer review built in. 55% cheaper than single-model equivalents. The cost discipline was deliberate — a tool that costs $50/run only gets used occasionally.",
      },
      {
        heading: "AI Security Tools — Production, Not Prototypes",
        body: "Security Ops Platform: FastAPI + Databricks, 45 endpoints, deterministic AI advisor trained on 2,171 cloud security tickets — CSPM alert triage to primary workflow. Baseline Research Pipeline: 21 feeds, 330+ items/day, 4-stage Claude orchestration — CIS/NIST baseline discovery-to-draft in under 30 minutes, under $0.05/run. Both shipped. Both in use.",
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
