export const certs = [
  "AWS Certified Security – Specialty",
  "AWS Certified Solutions Architect – Associate",
];

export const stack = [
  "AWS", "GCP", "CNAPP", "CSPM", "Zero Trust", "DevSecOps",
  "Python", "FastAPI", "Databricks", "Terraform",
  "Amazon Bedrock", "LLM Security", "Semgrep",
  "Splunk", "ElasticStack", "MITRE ATT&CK",
  "Checkov", "Docker", "Kubernetes",
];

export const jobs = [
  {
    company: "Yahoo!",
    title: "Senior Technical Security Engineer",
    period: "Feb 2022 – Present",
    current: true,
    bullets: [
      "Own end-to-end lifecycle of 200+ active Python/Lambda detection signatures across 1,500+ AWS accounts — maintaining a sustained 0% false-positive rate while adding net-new controls as the threat landscape evolves. The v6 AWS security baseline release shipped 49 CIS-benchmarked controls across Lambda, ECS, S3, KMS, IAM, and VPC — the largest single coverage expansion in program history — each grounded in a MITRE ATT&CK gap analysis against 74 real-world attack techniques from cloud incident response data. Detection fleet managed via Terraform-controlled infrastructure for reproducible, auditable deployment at scale.",
      "Built an IAM privilege escalation detection skill covering 65+ escalation paths across 10 vulnerability classes — 100% recall (32/32 findings), 0% false positives on GOAT (open-source AWS IAM privilege escalation benchmark) fixtures. Layers static IAM policy graph traversal with LLM semantic interpretation to catch transitive permission chains and policy conditions rule-based tools cannot evaluate. Deployed via the internal security skills marketplace.",
      "Designed and shipped an agentic cloud security review process that reduced per-review effort by 80% — scaling threat modeling and security architecture review throughput to 123 reviews across all business units with a 4-person team. Engineered a cross-ticket intelligence layer from 1,400+ historical security review tickets — 1,767 knowledge nodes across 11 security domains, 411 technology stacks, and 1,055 application profiles — wired into an autonomous review agent with 14 passive detection rules, 16 slash commands, and bidirectional MCP integration with Jira and Confluence. Established as the team's standard review methodology, eliminating a 6-week backlog.",
      "Built a self-learning security research pipeline orchestrating 19 foundation models across 5 providers through a performance-weighted model router — generating 59 vetted initiative proposals at $1.40/run with 55% cost savings over single-model approaches.",
      "Shipped a full-stack security operations platform (FastAPI + Databricks SQL, 45 API endpoints) automating cloud security ticket validation and alert suppression lifecycle management — adopted as the team's primary operational workflow. Deterministic heuristic AI advisor trained on 2,171 historical tickets, 4-signal scoring model with confidence clamped 5–95%, hard deny gate for 6 critical baseline categories.",
      "Pioneered a graph-theoretic framework for IAM toxic combination dissolution — cataloguing 62 toxic combinations across 8 attack categories with MITRE ATT&CK mappings, and developing the minimum cut-set method that identifies the keystone permission whose removal collapses an entire privilege escalation chain without disrupting legitimate access.",
      "Designed and shipped Artemis — a CNAPP-class multi-cloud attack path simulation platform spanning 2,500+ AWS and GCP accounts — unifying AWS Security Hub, GCP Security Command Center, and Kubernetes/EKS workload findings into an AI-enriched graph layer. Surfaces toxic IAM combinations, crown-jewel exposure, and CWPP-level workload risk trends across business units; maps findings to MITRE ATT&CK techniques and generates prioritized remediation backlogs consumed by 4 engineering teams.",
    ],
  },
  {
    company: "Cyber Reconnaissance Inc",
    title: "Cyber Security Architect",
    period: "May 2019 – Jan 2022",
    current: false,
    bullets: [
      "Designed multi-account cloud infrastructure using AWS Transit Gateway, VPC Peering, and AWS SSO for API, ML, and data-crawling applications.",
      "Built secure CI/CD pipelines with AWS Step Functions, GitLab, and CodeCommit across accounts using robust IAM roles.",
      "Managed GuardDuty, Security Hub, and Inspector for SecOps while aligning hybrid cloud infrastructure with compliance standards.",
      "Built cloud-based honeypots (Cowrie, ssh-honeypot, MongoDB) feeding threat intelligence data for client security programs.",
    ],
  },
  {
    company: "Cyber Reconnaissance",
    title: "Cyber Security Intern → Team Lead",
    period: "Dec 2017 – May 2019",
    current: false,
    bullets: [
      "Led cloud infrastructure and security teams through cloud migration, security training, and product development.",
      "Configured complex network routing for physical data center environments using CISCO Firewalls, Unifi routers, and CISCO switches.",
    ],
  },
  {
    company: "Infosys Limited",
    title: "Systems Engineer",
    period: "Dec 2015 – May 2017",
    current: false,
    bullets: [
      "Developed Dell Boomi cloud integration workflows for EDI-JSON mapping for a US logistics client.",
      "Optimized integration workflows to run 80% faster through automated ingestion of transactional EDI data.",
    ],
  },
];

export const education = [
  { degree: "M.S. Software Engineering", school: "Arizona State University", period: "2017 – 2019" },
  { degree: "B.Tech Computer Science", school: "Birla Institute of Technology, MESRA", period: "2011 – 2015" },
];

export const projects = [
  {
    name: "Artemis",
    description:
      "CNAPP-class multi-cloud attack path simulation platform spanning 2,500+ AWS and GCP accounts — unifying AWS Security Hub, GCP Security Command Center, and Kubernetes/EKS workload findings into an AI-enriched graph layer. Surfaces toxic IAM combinations, crown-jewel exposure, and CWPP-level workload risk; maps to MITRE ATT&CK and generates prioritized remediation backlogs consumed by 4 engineering teams.",
    tags: ["Python", "GCP SCC", "AWS Security Hub", "Vertex AI", "Gemini", "BigQuery", "Databricks"],
    wip: false,
    link: null,
  },
  {
    name: "Cloud Security Researcher",
    description:
      "Self-learning security research pipeline orchestrating 19 foundation models across 5 providers through a performance-weighted router. 5-stage multi-model evaluation (triage → analyze → decompose → peer review → synthesize). 59 vetted proposals generated at $1.40/run with 55% cost savings.",
    tags: ["Python", "Multi-Model LLM", "OpenAI", "Anthropic", "Google", "Self-Learning Router"],
    wip: false,
    link: null,
  },
  {
    name: "Security Ops Platform",
    description:
      "Full-stack security operations platform (FastAPI + Databricks SQL) automating cloud security ticket validation. 45 API endpoints. Deterministic AI advisor trained on 2,171 historical tickets — 4-signal scoring, confidence clamped 5–95%, hard deny gate for 6 critical baselines.",
    tags: ["Python", "FastAPI", "Databricks", "Jira API", "Deterministic AI"],
    wip: false,
    link: null,
  },
  {
    name: "Antitoxin",
    description:
      "Graph-theoretic IAM toxic combination research framework. 62 toxic combinations across 8 attack categories, each with MITRE ATT&CK mappings and a minimum cut-set dissolution action — identifying the keystone permissions whose removal collapses entire privilege escalation chains.",
    tags: ["IAM Analysis", "Graph Theory", "MITRE ATT&CK", "CloudTrail", "Python"],
    wip: false,
    link: null,
  },
  {
    name: "review-aws-iam-policies",
    description:
      "Claude Code / Cursor security skill reviewing live AWS IAM configurations for 10 vulnerability classes and 65+ escalation paths. Benchmarked on GOAT (open-source AWS IAM privilege escalation benchmark) fixtures: 32 ground-truth findings, 100% recall, 0% false positives. Deployed via the internal security marketplace.",
    tags: ["Bash", "AWS CLI", "IAMOK", "LLM Semantic Analysis", "GOAT Benchmarking"],
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
      "AI-augmented cloud security review workstation turning Claude Code into a purpose-built review agent — 14 passive rules, 6 multi-step skills, 16 slash commands, MCP integration with Jira and Confluence. Backed by a 1,767-note Obsidian knowledge graph built from 1,400+ historical security review tickets across 11 security domains and 411 technology cards. 123 reviews conducted across all business units.",
    tags: ["Claude Code", "MCP", "Jira", "Obsidian", "Knowledge Graph", "Python"],
    wip: false,
    link: null,
  },
  {
    name: "Baseline Research Pipeline",
    description:
      "Automated cloud security content pipeline ingesting 21 feeds daily through a 4-stage LLM pipeline (triage → analyze → draft → verify). Haiku handles triage, Sonnet+Opus draft CIS-aligned baseline documents in exact registry shape, and a programmatic verifier gates Slack delivery. Processes ~330 items/day, reducing baseline discovery-to-draft from days to minutes.",
    tags: ["n8n", "Claude Haiku", "Claude Sonnet", "Slack Block Kit", "SHA-256 Dedup"],
    wip: false,
    link: null,
  },
  {
    name: "Security Intelligence Notifier",
    description:
      "Weekly Jira triage bot for the cloud security team — classifies tickets for cloud infrastructure relevance using Claude CLI, performs deep security analysis with web research on flagged items, and posts structured attend/skip recommendations to Slack. Built from scratch in 5 commits with a keyword fallback for resilience.",
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
    name: "AWS Baselines v6",
    description:
      "Authored the AWS security baselines program v6 release — 49 CIS-benchmarked controls spanning Lambda, ECS, S3, KMS, IAM, and VPC, the largest single release in program history — including a full MITRE ATT&CK gap analysis against 74 real-world techniques from cloud incident response data, a machine-readable CSV registry, and a 724-line human summary.",
    tags: ["AWS", "CIS Baselines", "MITRE ATT&CK", "Compliance", "Markdown"],
    wip: false,
    link: null,
  },
  {
    name: "ECS Signatures",
    description:
      "Maintained and extended a detection signature fleet of 200+ active Python/Lambda signatures evaluating AWS accounts against security baselines at scale. Fixed runtime errors, rewrote KMS alias evaluation logic to eliminate false positives, refactored S3 policy analysis for transitional account handling, and reactivated two disabled signatures across 237 commits.",
    tags: ["Python", "AWS Lambda", "boto3", "Elasticsearch", "Detection Engineering"],
    wip: false,
    link: null,
  },
];
