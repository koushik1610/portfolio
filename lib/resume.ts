/* ─────────────────────────────────────────────────────────────────────────────
   THE RESUME DOCUMENT. Deliberately NOT merged into lib/profile.ts.

   A resume bullet and a portfolio sentence are different genres: bullets lead
   with the verb, carry the employer's framing, and answer to the ATS keyword
   pass; the profile layer answers to a hero's line budget. Forcing them through
   one string would make both worse, and this file has exactly one consumer.

   THE COST OF THAT DECISION, stated so nobody has to discover it: two facts are
   written in both places. The Artemis build state (GCP built, AWS designed) and
   the four career roles. If either changes, edit lib/profile.ts AND this file.
   Nothing enforces it, which is why it is written here rather than assumed.
───────────────────────────────────────────────────────────────────────────── */

/* Both AWS certifications lapsed (Solutions Architect Associate May 2023,
   Security Specialty Dec 2024). Displaying an expired cert undated reads as
   current and fails a background screen, so they are withheld until recertified
   rather than shown with a caveat. Restore this list the day either renews. */
export const certs: string[] = [];

/* Pruned 2026-08-29 against the depth ledger. Removed: "Go" (reading and
   modifying, never designing), "EKS" (appears in no source at all), and
   "Kubernetes" as a bare peer of AWS (control authorship and architecture
   review; he has not operated a cluster in production, and D1 of the extraction
   says so out loud). "Azure" left the AWS/GCP triple for the same reason: one
   substantial review is not parity, and a skills list that implies it is the
   kind of thing a technical screen finds in four minutes. A list this long only
   works if every entry survives being asked about. */
export const stack = [
  "AWS", "GCP", "IAM & CIEM", "Detection Engineering", "CSPM", "CNAPP",
  "AI/ML Security", "Threat Modeling", "MITRE ATT&CK", "DevSecOps",
  "Terraform", "Checkov", "Containers",
  "Python", "FastAPI", "Databricks",
  "Amazon Bedrock", "Vertex AI", "MCP", "Multi-Agent Orchestration",
];

// Bullets are lifted verbatim from the master resume (locked 2026-07-01).
// Per-surface edits select and reorder; they do not reword.
export const jobs = [
  {
    company: "Yahoo Inc. · Paranoids (Cloud Security)",
    title: "Senior Technical Security Engineer",
    period: "Feb 2022 – Present",
    current: true,
    bullets: [
      "Define and operate Yahoo's company-wide cloud security baselines, authoring and maintaining the Paranoids AWS Cloud Alerts Detection system of 200+ Python detection signatures on AWS Lambda that evaluate resource configurations across 1,400+ AWS accounts, producing per-resource findings and account/BU/org security-posture scores (CSPM) the company is measured against, each with CIS-style audit and remediation guidance.",
      "Conducted 100+ cloud security reviews under Yahoo's Paranoid Security Review (PSR), partnering with the Product Security, Network, and Identity teams and convening developers, leads, and managers to threat-model and approve new cloud services and architectures before launch across Mail, Sports, Finance, and Central Tech.",
      "Primary point of contact for Yahoo's AWS security baselines, coordinating the program's largest control expansion (50+ new baselines) by researching new AWS services, running Checkov parity analysis to close policy gaps, and re-scoring every control's severity on a risk × likelihood × impact matrix.",
      "Built security Claude Code skills to harden AI-assisted development: a package-hallucination detector flagging AI-invented dependency names before slopsquatting supply-chain exploitation, and a live AWS IAM audit skill (AWS CLI + IAM Access Analyzer) returning findings with severity, source attribution, and escalation-path IDs.",
      "Built a toxic-combination correlation engine over CIS-based alert data, chaining findings into privilege-escalation paths across three classes: misconfig+misconfig (public SSH/RDP without IMDSv2), misconfig+IAM (public Lambda with a privileged role, or an exposed host with an over-permissioned profile), and IAM+IAM (cross-account assume-role into a privileged role, or self-escalation via attach/put-policy), catching chains single-finding scanners miss.",
    ],
  },
  {
    company: "CYR3CON (Cyber Reconnaissance, Inc.)",
    title: "Cyber Security Architect",
    period: "May 2019 – Jan 2022",
    current: false,
    bullets: [
      "Designed and built the company's multi-account AWS foundation as code (reusable Prod, Dev, Staging, and Security account templates on a Transit Gateway hub-and-spoke with segmented IP ranges and centralized SSO), and hardened it to baseline hygiene with least-privilege IAM using reusable IAM role templates, VPN-gated cloud access, and AWS Systems Manager host access that removed public SSH and bastion hosts.",
      "Owned and secured the startup's self-hosted infrastructure, administering on-premise GitLab, Mattermost, and Taiga behind a data-center firewall, provisioning isolated VMs for dark-web research, and running the company's security-awareness program with internal CTFs and phishing simulations.",
      "Deployed a honeypot network (T-Pot, Cowrie, and others) that collected live attacker telemetry for the company's threat-intelligence product, and partnered with the data team to build the pipelines clients used to prioritize the vulnerabilities being actively exploited against their own assets.",
    ],
  },
  {
    company: "Cyber Reconnaissance",
    title: "Cyber Security Intern → Team Lead",
    period: "Dec 2017 – May 2019",
    current: false,
    bullets: [
      "Progressed from intern to team lead within the infrastructure and security function, leading the cloud migration, running security training, and configuring data-center network security (firewall policies, segmentation, and routing across Cisco and UniFi hardware).",
    ],
  },
  {
    company: "Infosys Limited",
    title: "Systems Engineer",
    period: "Dec 2015 – May 2017",
    current: false,
    bullets: [
      "Automated a US logistics client's B2B partner data exchange on Dell Boomi (iPaaS), re-architecting the EDI integration processes and tuning connector and runtime configuration to raise processing throughput about 80%.",
      "Built reusable, fault-tolerant integration patterns (connectors, maps, and sub-processes) for partner onboarding, with retries, alerting, and health monitoring that caught and recovered failed transactions to meet enterprise SLAs.",
    ],
  },
];

export const education = [
  { degree: "M.S. Software Engineering", school: "Arizona State University", period: "2017 – 2019" },
  { degree: "B.E. Computer Science", school: "Birla Institute of Technology, Mesra", period: "2011 – 2015" },
];

export const projects = [
  {
    name: "Artemis",
    description:
      "An operationalization layer over a native cloud platform's attack-path analysis, which computes the best signal in the estate and strands it in a console. Implemented on GCP: Security Command Center export, AI enrichment, business-context mapping, longitudinal tracking, and a coverage rotation that cycles resources through the platform's hard cap on how many can be simulated at once. AWS is designed, not built: an architecture and a written gap analysis of that platform's exposure findings. The risk analysis names its own obsolescence condition, which is the vendor raising the limit the rotation was built around.",
    tags: ["Python", "GCP SCC", "Vertex AI", "Gemini", "BigQuery", "Terraform"],
    wip: false,
    link: null,
  },
  {
    name: "Autonomous Threat Intelligence Pipeline",
    description:
      "Multi-agent orchestration pipeline across 19 foundation models and 5 providers with a performance-weighted router that autonomously assigns each stage (triage → analyze → decompose → peer review → synthesize) to the highest-performing model for that task. Replaced a fully manual research process, from $1.40 per full sweep on metered pricing. No single-model baseline run was recorded, so no comparison figure is claimed.",
    tags: ["Python", "Multi-Agent Orchestration", "OpenAI", "Anthropic", "Google", "Agentic Pipeline"],
    wip: false,
    link: null,
  },
  {
    name: "Security Ops Platform",
    description:
      "AI-augmented CSPM operations platform (FastAPI + Databricks SQL, dozens of API endpoints) enabling autonomous alert triage and LLM-driven change request validation against policy baseline. Deterministic AI advisor trained on a large corpus of historical cloud security tickets — 4-signal scoring, confidence clamped 5–95%, hard deny gate for 6 critical baselines where auto-remediation is never appropriate.",
    tags: ["Python", "FastAPI", "Databricks", "Jira API", "Deterministic AI"],
    wip: false,
    link: null,
  },
  {
    name: "Antitoxin",
    description:
      "CIEM research and design, no implementation yet. 62 toxic IAM combinations catalogued by hand across 8 attack categories, each mapped to MITRE ATT&CK and each carrying the keystone permission whose removal breaks that chain. The tool boundary was drawn before any code existed: it keeps granted-versus-used correlation, catalogue synthesis, and alert-to-trust-policy validation, and delegates asset resolution and escalation-path analysis to systems that already own them.",
    tags: ["IAM Analysis", "CIEM", "MITRE ATT&CK", "Research"],
    wip: true,
    link: null,
  },
  {
    name: "review-aws-iam-policies",
    description:
      "AI-native IAM audit agent — a production tool-calling skill using Boto3 to enumerate live AWS IAM configurations, traverse the privilege graph across 10 vulnerability classes, match findings against pathfinding.cloud (DataDog's public catalogue of 65+ documented escalation paths), and apply LLM semantic reasoning to surface transitive chains rule-based tools miss. Generates risk-ranked remediation reports. Built the GOAT benchmark first — 11 synthetic Terraform fixtures, 32 ground-truth findings — and evaluated the agent against all 32 before trusting it.",
    tags: ["Bash", "AWS CLI", "IAM Access Analyzer", "LLM Semantic Analysis", "GOAT Benchmarking"],
    wip: false,
    link: null,
  },
  {
    name: "Package Hallucination Detector",
    description:
      "Supply-chain defense skill targeting slopsquatting — the attack where adversaries register package names AI coding assistants hallucinate. Detects AI-invented dependency names across 6 package ecosystems (npm, PyPI, Go, Rust, Ruby, Maven) through registry verification and name-similarity analysis, flagging them before exploitation — an attack surface documented in USENIX Security research.",
    tags: ["Python", "Supply Chain Security", "Claude Code", "Registry Analysis"],
    wip: false,
    link: null,
  },
  {
    name: "AI Toolkit",
    description:
      "Personal AI-assisted development toolkit for Cursor, Claude Code, Codex, and Gemini CLI. Includes my-llm-council (10 built-in + 6 custom personas, configurable deliberation presets), ai-o11y (zero-config LLM tracer + cost/quality evaluators), scaffold-project, presentation-genie, and a pre-commit-review skill applying 13 engineering principles before every commit.",
    tags: ["Python", "Claude Code", "Cursor", "Multi-Model LLM", "Developer Tooling"],
    wip: false,
    link: null,
  },
  {
    name: "Security Review Workspace",
    description:
      "Agentic SOAR-style cloud security review platform — turns Claude Code into a purpose-built autonomous review agent with passive detection rules, multi-step skills, slash commands, and MCP integration with Jira and Confluence. Backed by a 1,700+-node knowledge graph from a large corpus of historical security review tickets across many security domains and technology stacks. 100+ reviews conducted across all business units; scales security coverage without additional headcount.",
    tags: ["Claude Code", "MCP", "Jira", "Obsidian", "Knowledge Graph", "Python"],
    wip: false,
    link: null,
  },
  {
    name: "Baseline Research Pipeline",
    description:
      "Autonomous threat intelligence ingestion agent using a 4-stage LLM-driven workflow (triage → analyze → draft → verify) across 21 security intelligence feeds daily. Haiku handles autonomous triage at volume; Sonnet+Opus draft CIS/NIST-aligned baseline documents in exact registry shape; a programmatic verifier gates Slack delivery. Processes ~330 items/day — reducing baseline discovery-to-draft from days to under 30 minutes at under $0.05/run.",
    tags: ["n8n", "Claude Haiku", "Claude Sonnet", "Slack Block Kit", "SHA-256 Dedup"],
    wip: false,
    link: null,
  },
  {
    name: "Security Intelligence Notifier",
    description:
      "Autonomous Jira triage agent for the cloud security team — LLM-driven workflow that classifies tickets for cloud infrastructure relevance using AI-assisted triage, performs deep security analysis with web research on flagged items, and posts structured attend/skip recommendations to Slack. Built from scratch in 5 commits with a deterministic keyword fallback for resilience.",
    tags: ["Python", "Claude CLI", "Jira REST API", "Slack Block Kit"],
    wip: false,
    link: null,
  },
  {
    name: "Data Ingestion POC",
    description:
      "Fully serverless Slack bot for natural language data analytics — Slack → API Gateway → Lambda → SQS FIFO → Bedrock Agent with Athena (SQL), DynamoDB (decisions + patterns), and S3 RAG tools. Includes a scheduled alert rule evaluation engine and campaign pause decision-making. All resources in a 744-line CloudFormation template. ~$5-15/month, no persistent hosts.",
    tags: ["AWS", "Amazon Bedrock", "Lambda", "Athena", "CloudFormation", "Slack API"],
    wip: false,
    link: null,
  },
  {
    name: "AWS Security Baselines",
    description:
      "Primary point of contact for Yahoo's AWS security baselines program — coordinated the largest control expansion in program history (50+ new baselines), by researching new AWS services, running Checkov parity analysis to close policy gaps, and re-scoring every control's severity on a risk × likelihood × impact matrix. Includes a full MITRE ATT&CK gap analysis against real-world techniques from cloud incident response data and a machine-readable control registry.",
    tags: ["AWS", "CIS Baselines", "MITRE ATT&CK", "Checkov", "Compliance"],
    wip: false,
    link: null,
  },
  {
    name: "ECS Signatures",
    description:
      "Maintained and extended a detection signature fleet of 200+ active Python/Lambda signatures evaluating AWS accounts against security baselines at scale. Fixed runtime errors, rewrote KMS alias evaluation logic to eliminate false positives, refactored S3 policy analysis for transitional account handling, and reactivated two long-disabled signatures.",
    tags: ["Python", "AWS Lambda", "boto3", "Elasticsearch", "Detection Engineering"],
    wip: false,
    link: null,
  },
];
