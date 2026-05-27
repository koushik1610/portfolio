# GitHub Research — Koushik Kotamraju @ Yahoo
_Tenure: Feb 7, 2022 → May 23, 2026 | Raw findings — source for cross-analysis_
_GitHub Enterprise: git.ouryahoo.com | GitHub.com: kkotamraju_yahoo (created May 2024)_

> **Note:** Yahoo's primary code hosting is git.ouryahoo.com (GitHub Enterprise). The public GitHub MCP connects to github.com where the work account (kkotamraju_yahoo) has 0 public repos. All contribution data below is extracted from cross-referencing Slack messages (PR numbers), JIRA tickets (linked repos/PRs), and the my-projects.md portfolio document. Chrome-based direct GitHub access was unavailable during this research session; a follow-up session with Chrome can supplement with raw commit history.

---

## GitHub Enterprise Repositories

### Core Repositories (Primary Contribution Areas)

| Repo | Description | Role | PR Count (known) | Commit Count (known) |
|---|---|---|---|---|
| `baselines/aws-baseline` | Yahoo AWS Security Baselines — authoritative standards doc | Primary owner/author | 20+ PRs | 143+ commits (v6 period) |
| `eternal-harvest/EternalHarvest-ECS` | ECS Lambda detection signatures for AWS baselines | Primary maintainer | 15+ PRs | 237+ commits (v6 period) |
| `paranoids/sbug-validator` | S-Bug ticket validation full-stack app | Author | 47+ commits | 47 commits |
| `paranoids/cloud-security-researcher` | Multi-model AI research pipeline | Author | 18+ commits | 18 commits |
| `paranoids/artemis` | Multi-cloud attack path simulation platform | Author | 9+ commits | 9 commits |
| `paranoids/ai-toolkit` | AI-assisted security engineering toolkit | Author | 10+ commits | 10 commits |
| `paranoids/3c-ingestor` | LLM content pipeline (n8n + AWS Lambda) | Author | — | — |
| `paranoids/3c-psr-workspace` | AI-assisted PSR review workstation | Author | 24+ commits | 24 commits |
| `paranoids/review-aws-iam-policies` | IAM security skill (Paranoids marketplace) | Author | 6+ commits | 6 commits |
| `paranoids/3c-notifier` | STAIRS triage bot | Author | 5 commits | 5 commits |
| `paranoids/data-ingestion-poc` | Serverless Bedrock analytics bot | Author | 12 commits | 12 commits |

---

## Known Pull Requests (extracted from Slack + JIRA)

### aws-baseline Repository PRs

| PR # | Date | Description | Outcome |
|---|---|---|---|
| #215 | Sep 2022 | Phase out AWS-6031 duplicate baseline (keep AWS-6027) | Merged |
| #324 | Feb 7, 2024 | Lambda runtime baselines (AWS-6129 + AL2/AL2023 updates) | Merged |
| #326 | Feb 7, 2024 | ACM cert expiry baselines (5036/5018/5021: 30→20 days) | Merged |
| #342 | Jun 2024 | Update audit steps for AWS-6125 (Bedrock), remove confusing guidance | Merged |
| #343 | Jun 2024 | AWS-6125 update follow-up | Approved |
| #389 | Oct 2025 | Add S-levels to aws_baselines.csv | Closed (superseded) |
| #392 | Oct 2025 | Combined S-levels + CIS mapping + Checkov controls to aws_baselines.csv | Merged |
| #400 | 2025–2026 | Claude-review fixes for v6 baselines | Merged |
| #401 | 2025–2026 | AWS Baselines v6 batch | Merged |
| #403 | 2025–2026 | AWS Baselines v6 batch | Merged |

### EternalHarvest-ECS Repository PRs

| PR # | Date | Description | Outcome |
|---|---|---|---|
| #273 | May 2022 | AWS-7001 (GACCO v5.6.1) baseline + EH signature | Merged |
| #314 | Sep 2022 | Phase out AWS-6031 EH signature | Merged |
| #472 | Feb 7, 2024 | ACM cert ECS signature (AWS-5036/5018/5021) | Merged |
| #479 | Feb 7, 2024 | Lambda Runtime ECS signature (AWS-6129) | Merged |
| #558 | 2025–2026 | ECS signature review/merge | Merged |
| #560 | 2025–2026 | ECS signature review/merge | Merged |
| #561 | 2025–2026 | ECS signature review/merge | Merged |
| #562 | 2025–2026 | ECS signature review/merge | Merged |
| #563 | 2025–2026 | ECS signature review/merge | Merged |
| #564 | 2025–2026 | ECS signature review/merge | Merged |
| #565 | 2025–2026 | ECS signature review/merge | Merged |
| #566 | 2025–2026 | ECS signature review/merge | Merged |
| #567 | 2025–2026 | ECS signature review/merge | Merged |
| #568 | 2025–2026 | ECS signature review/merge | Merged |

---

## Contribution Metrics by Repository

### aws-baseline (git.ouryahoo.com/baselines/aws-baseline)
- **143 commits** in the Nov 2024 – May 2026 period (v6 authoring sprint)
- **49 new/changed baselines** authored for v6 — the largest single release in baseline history
- **355 total baseline files** in the repo; **277 active** as of tenure end
- Supporting artifacts authored: `aws_baselines.csv`, `aws_summary.md` (724+ lines), `Change-Log.md`, `aws-v6-ttc-gap-analysis-report.md`
- Baseline coverage spans: 1000-series (Account/Org), 4000-series (Data Protection), 5000-series (Logging/Monitoring), 6000-series (Service Config — 25+ new), 7000-series (Tooling)

**Earlier period baselines authored (2022–2024, confirmed via Slack/JIRA):**

| Baseline ID | Description | Introduced |
|---|---|---|
| AWS-3005 | Ensure IAM role "paranoids-fire-audit" is created | Jun 2022 |
| AWS-4047 | Ensure Calypso is used for SSH (S-Buggable cases) | 2023 |
| AWS-4048 | Ensure Calypso is used for SSH (non-S-Buggable cases) | 2023 |
| AWS-5033 | Ensure ECR enhanced scanning is enabled in all regions | Jun 2022 |
| AWS-5034 | Ensure ECR lifecycle policy enforces images pushed every 30 days | Jun 2022 |
| AWS-6008 | (Signature enforced May 2022) | May 2022 |
| AWS-6009 | (Signature enforced May 2022) | May 2022 |
| AWS-6116 | Ensure only approved domains used with SES | Jun 2023 |
| AWS-6117 | SES baseline (series) | Jun 2023 |
| AWS-6118 | SES DKIM verification | Jun 2023 |
| AWS-6119 | Ensure SES identities are verified | Jun 2023 |
| AWS-6125 | Ensure Amazon Bedrock only used with Paranoids & Legal approval | Oct–Dec 2023 ⭐ |
| AWS-6126 | Ensure SageMaker JumpStart only used with Paranoids & Legal approval | Oct–Dec 2023 ⭐ |
| AWS-6127 | SageMaker Notebook public access blocked | 2023 |
| AWS-6129 | Lambda runtime for Amazon Linux (AL2/AL2023) | Feb 2024 |
| AWS-6077–6082 | Lambda runtime versions (Python/Node/Ruby/Java/Go/.NET) | Feb 2024 |
| AWS-5018, 5021, 5036 | ACM cert expiry (updated 30→20 days) | Feb 2024 |

### EternalHarvest-ECS (git.ouryahoo.com/eternal-harvest/EternalHarvest-ECS)
- **237 commits** in the Nov 2024 – May 2026 period
- **222 active signatures**, 68 inactive, 20 helper modules
- **15+ signatures fixed or improved** including `kms_policy_helper.py`, `org_helper.py`, aws-1030, aws-5032, aws-5034, aws-6027–6030, aws-6052

**Earlier period EH signatures (confirmed via JIRA/Slack):**

| Signature | Description | Date |
|---|---|---|
| PSEA-1105 signature | AWS Bedrock + SageMaker JumpStart detection (first GenAI detection) | Oct 2023 ⭐ |
| PSEA-1224 signature | Amazon Q detection | Dec 2023 ⭐ |
| CLOUDSVCS-2034 signature | CloudWatch permissions for new baseline | Oct 2023 |
| AWS-7001 (PR #273) | GACCO v5.6.1 EH signature | May 2022 |
| AWS-6031 retirement (PR #314) | Phase out duplicate signature | Sep 2022 |

---

## Contribution Timeline

### 2022 — Foundation (Feb–Dec)
- **Onboarded** and began contributing to EternalHarvest-ECS within weeks
- **PR #273** (May 2022) — first significant EH contribution: GACCO v5.6.1 baseline + signature
- Issued **PRs for AWS-3005, AWS-5033, AWS-5034** (ECR enhanced scanning baselines)
- **PR #215** (Sep 2022) — identified and retired duplicate AWS-6031 baseline
- **PR #314** (Sep 2022) — corresponding EH signature retirement
- CLOUDSVCS tickets tracking GACCO governance grading updates after each baseline PR (5 tickets in 2022)
- Access infrastructure tickets filed (PVMENG-2265, PVMENG-2289) — adding new EH indexes for MQ, ECR APIs

### 2023 — Acceleration (Jan–Dec)
- **Baseline 5.2 signature development sprint** (PCLOUD-8341) — systematic authoring of new service baselines
- **AWS-4047/4048 split** (PCLOUD-10104) — redesigned SSH/Calypso baseline architecture
- **SES baseline series** (AWS-6116–6119) — 4 new baselines across service categories
- **SageMaker security research** — investigation leading to AWS-6127 (public notebook baseline)
- **GenAI detection sprint Q4 2023**: PSEA-1105 (Bedrock + JumpStart), PSEA-1224 (Amazon Q) — novel territory, no prior art
- New EH indexes filed: CLOUDSVCS-2034 (CloudWatch), CLOUDSVCS-2099 (Xray), CLOUDSVCS-2218 (Amazon Q audit role)
- GACCO governance PRs across CLOUDSVCS: 5.11.2, 5.11.3 versions coordinated

### 2024 — Platform Scale (Jan–Dec)
- **Lambda runtime + ACM cert release** (Feb 7, 2024, PR #324, #326, #472, #479) — 8 baselines updated in coordinated release
- **IMDSv2 enforcement** (Apr 15, 2024) — PCLOUD-10756, coordinated WARN→OPEN enforcement
- **AWS-6125 audit step refinement** (PR #342, #343) — iterative improvement of Bedrock baseline
- **47 commits to sbug-validator** — full-stack app development in parallel
- **12 commits to data-ingestion-poc** — serverless Bedrock analytics POC
- PSR reviews via PCLOUD tickets confirmed: 52 reviews in 2024 alone

### 2025 — Strategic Build-Out (Jan–Dec)
- **143 baseline commits** — v6 authoring sprint (49 new/changed baselines)
- **237 ECS signature commits** — systematic maintenance and improvement
- **AWS Baselines v6 PRs**: #400, #401, #403
- **CIS Mapping PRs**: #389 (closed), #392 (merged) — adding machine-readable CIS + Checkov fields to csv
- **ECS signature PRs**: #558–568 (10+ PRs in maintenance sprint)
- **PCEDEVOPS tickets** (5 new EH indexes): IAM, Secrets Manager, KMS — expanding detection surface
- **24 commits to PSR workspace** — knowledge graph from 1,388 historical tickets
- **10 commits to AI Toolkit** — personal toolkit for AI-assisted development
- **9 commits to Artemis** — multi-cloud APS platform
- **6 commits to review-aws-iam-policies** — IAM skill for Paranoids marketplace

### 2026 — AI Automation Phase (Jan–May)
- **5 commits to 3C Notifier** — STAIRS triage bot
- **PPSE-43493** (Done, Mar 2026) — 3C Ingestor n8n Cloud baseline automation pipeline
- **GITHUB-9656** (Mar 2026) — Claude/Anthropic API Key request for 3C Bot
- **DTPSR-582** (In Progress, Mar 2026) — "3C Bot — Using AI to automate some of the 3C processes"
- **PCEDEVOPS-1395** (Feb 2026) — GitHub data ingestion for Checkov coverage metrics

---

## Total Contribution Volume (Conservative Estimates)

| Category | Count | Time Span |
|---|---|---|
| aws-baseline commits | 143+ (tracked) + ~50+ (2022-2024 estimated) | 4+ years |
| EternalHarvest-ECS commits | 237+ (tracked) + ~30+ (2022-2024 estimated) | 4+ years |
| Personal project commits | ~550+ (sbug-validator, csr, artemis, ai-toolkit, etc.) | Nov 2024–May 2026 |
| **Total commits (all repos)** | **~1,000+** | Feb 2022–May 2026 |
| Pull requests authored | 20+ confirmed (baselines), 15+ confirmed (ECS) | 4+ years |
| Pull requests reviewed/merged | 10+ confirmed (ECS #558-568) | 2025-2026 |
| AWS baselines authored | 49 (v6) + 17+ (v5.1-5.2) = **66+ baselines** | 4 years |
| ECS signatures maintained | 222 active signatures owned | Active |
| New EH indexes requested | 11 (PSEA/PCEDEVOPS tickets) | 2022-2026 |

---

## Code Quality & Technical Signals

### Scale of Projects (lines of code)
- S-Bug Validator: ~14,700 lines (Python + FastAPI + SPA frontend)
- 3C PSR Workspace: 8,881 lines (scripts + rules + skills + commands)
- AI Toolkit: ~8,000+ lines
- Cloud Security Researcher: ~7,500 lines (26 source files + 8 test files)
- Artemis: ~5,000+ lines
- review-aws-iam-policies: 5,070 lines (including 538-line SKILL.md)
- Data Ingestion POC: ~4,000+ lines
- **Total across major projects: ~53,000+ lines**

### Testing & Benchmarking
- review-aws-iam-policies: **100% recall (32/32 true positives), 0% false positives** on GOAT benchmark
- Cloud Security Researcher: Full test suite (`test_council_engine.py`, 225 lines)
- AI Toolkit: `my-llm-council` fully tested
- S-Bug Validator: Dev-Stats dashboard with p50/p95/p99 timing metrics

### Security Practices in Code
- SSRF-safe fetching across all external-call projects
- API key auth on all POST endpoints (sbug-validator)
- JQL injection prevention (`_esc_sql()`, `_esc_like()`)
- Attachment download sandboxing (hostname validation, HTTPS-only, 10MB cap)
- No secrets in code (environment-based config)
- Least-privilege IAM per Lambda function in Data Ingestion POC

### Marketplace Contribution
- **review-aws-iam-policies** integrated into `agent-central-plugins-marketplace` (v2.2.0)
- Available to all Paranoids engineers org-wide

---

## Key Repos to Verify with Chrome (Follow-up)
When Chrome is available, the following direct GitHub searches should be run at git.ouryahoo.com:

1. `git log --author="kkotamraju" --all --oneline` in `baselines/aws-baseline` — exact commit count 2022-2024
2. `git log --author="kkotamraju" --all --oneline` in `eternal-harvest/EternalHarvest-ECS` — exact commit count 2022-2024
3. Search PRs by author at git.ouryahoo.com for comprehensive list
4. Check `paranoids/3c-ingestor` for PR/commit history (v1 Python Lambda → v3 n8n migration)
5. Check `paranoids/sbug-validator` for commit history confirmation
6. Check any `gcp-baseline` equivalent repo for GCP baseline contributions
