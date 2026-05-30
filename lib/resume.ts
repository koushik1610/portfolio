export const certs = [
  "AWS Certified Security – Specialty",
  "AWS Certified Solutions Architect – Associate",
];

export const stack = [
  "AWS", "GCP", "CNAPP", "CSPM", "AI-SPM", "Zero Trust", "DevSecOps",
  "Python", "FastAPI", "Databricks", "Terraform",
  "Amazon Bedrock", "Multi-Agent Orchestration", "LLM Security", "Semgrep",
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
      "Own end-to-end lifecycle of 200+ active Python/Lambda detection signatures across 1,500+ AWS accounts — sustaining a 0% false-positive rate at account scale while continuously expanding coverage as the threat landscape evolves. Authored the v6 AWS security baseline release: 49 CIS-benchmarked controls across Lambda, ECS, S3, KMS, IAM, and VPC — the largest single coverage expansion in program history — each grounded in a MITRE ATT&CK gap analysis against 74 real-world attack techniques sourced from cloud incident response data. Detection fleet deployed via Terraform-controlled infrastructure for reproducible, auditable rollout — enabling machine-speed detection and response across the full cloud account estate.",
      "Architected an AI-native IAM audit agent — a production tool-calling skill that uses Boto3 to enumerate live AWS IAM configurations, traverses the privilege graph across 65+ escalation paths and 10 vulnerability classes, and applies LLM semantic reasoning to surface transitive permission chains and policy conditions that rule-based tools cannot evaluate. Generates risk-ranked remediation reports. Benchmarked against GOAT (open-source AWS IAM privilege escalation benchmark): 100% recall (32/32 findings), 0% false positives — eliminating the manual IAM review cycle.",
      "Designed and shipped an agentic SOAR-style cloud security review platform that reduced per-review effort by 80% — scaling threat modeling and security architecture review throughput to 123 reviews across all business units with a 4-person team, eliminating a 6-week backlog. Engineered a cross-ticket intelligence layer from 1,400+ historical security review tickets — 1,767 knowledge nodes across 11 security domains, 411 technology stacks, and 1,055 application profiles — as the retrieval backbone for an autonomous review agent with 14 passive detection rules, 16 slash commands, and bidirectional MCP integration with Jira and Confluence. Established as the team's standard review methodology; scales security coverage without additional headcount.",
      "Architected an autonomous threat intelligence pipeline using multi-agent orchestration across 19 foundation models and 5 providers — a performance-weighted model router dynamically assigns each stage (triage → analyze → decompose → peer review → synthesize) to the highest-performing model for that task, updating allocation weights after every run. Replaced a fully manual research process: 59 vetted security initiative proposals generated at $1.40/run — 55% cheaper than single-model approaches — with multi-persona peer review built into the evaluation chain.",
      "Shipped a full-stack AI-augmented CSPM operations platform (FastAPI + Databricks SQL, 45 API endpoints) enabling autonomous alert triage and LLM-driven change request validation against policy baseline — adopted as the team's primary operational workflow. A deterministic AI advisor trained on 2,171 historical cloud security tickets powers a 4-signal scoring model (confidence clamped 5–95%) with a hard deny gate for 6 critical baseline categories where auto-remediation is never appropriate; auto-validates security configuration changes and eliminates manual review cycles at scale.",
      "Pioneered a graph-theoretic framework for AI-driven IAM toxic combination dissolution — cataloguing 62 toxic combinations across 8 attack categories with MITRE ATT&CK mappings, and developing the minimum cut-set method that identifies the keystone permission whose removal collapses an entire privilege escalation chain without disrupting legitimate access. Enables deterministic security controls for AI agents operating on IAM configurations, providing a policy-as-code enforcement foundation for auto-remediation workflows.",
      "Designed and shipped Artemis — a CNAPP-class AI Security Posture Management (AI-SPM) platform spanning 2,500+ AWS and GCP accounts — unifying AWS Security Hub, GCP Security Command Center, and Kubernetes/EKS workload findings into an AI-enriched attack path graph. Surfaces toxic IAM combinations, crown-jewel exposure, and CWPP-level workload risk trends across business units; maps findings to MITRE ATT&CK techniques and generates prioritized AI-driven remediation backlogs consumed by 4 engineering teams — delivering AI-powered posture management at enterprise scale.",
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
      "CNAPP-class AI Security Posture Management (AI-SPM) platform spanning 2,500+ AWS and GCP accounts — unifying AWS Security Hub, GCP Security Command Center, and Kubernetes/EKS workload findings into an AI-enriched attack path graph. Surfaces toxic IAM combinations, crown-jewel exposure, and CWPP-level workload risk; maps to MITRE ATT&CK and generates prioritized AI-driven remediation backlogs consumed by 4 engineering teams.",
    tags: ["Python", "GCP SCC", "AWS Security Hub", "Vertex AI", "Gemini", "BigQuery", "Databricks"],
    wip: false,
    link: null,
  },
  {
    name: "Autonomous Threat Intelligence Pipeline",
    description:
      "Multi-agent orchestration pipeline across 19 foundation models and 5 providers with a performance-weighted router that autonomously assigns each stage (triage → analyze → decompose → peer review → synthesize) to the highest-performing model for that task. Replaced a fully manual research process: 59 vetted proposals generated at $1.40/run with 55% cost savings over single-model approaches.",
    tags: ["Python", "Multi-Agent Orchestration", "OpenAI", "Anthropic", "Google", "Agentic Pipeline"],
    wip: false,
    link: null,
  },
  {
    name: "Security Ops Platform",
    description:
      "AI-augmented CSPM operations platform (FastAPI + Databricks SQL, 45 API endpoints) enabling autonomous alert triage and LLM-driven change request validation against policy baseline. Deterministic AI advisor trained on 2,171 historical cloud security tickets — 4-signal scoring, confidence clamped 5–95%, hard deny gate for 6 critical baselines where auto-remediation is never appropriate.",
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
      "AI-native IAM audit agent — a production tool-calling skill using Boto3 to enumerate live AWS IAM configurations, traverse the privilege graph across 65+ escalation paths and 10 vulnerability classes, and apply LLM semantic reasoning to surface transitive chains rule-based tools miss. Generates risk-ranked remediation reports. Benchmarked on GOAT: 100% recall (32/32 findings), 0% false positives.",
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
      "Agentic SOAR-style cloud security review platform — turns Claude Code into a purpose-built autonomous review agent with 14 passive detection rules, 6 multi-step skills, 16 slash commands, and MCP integration with Jira and Confluence. Backed by a 1,767-node knowledge graph from 1,400+ historical security review tickets across 11 security domains and 411 technology stacks. 123 reviews conducted across all business units; scales security coverage without additional headcount.",
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
