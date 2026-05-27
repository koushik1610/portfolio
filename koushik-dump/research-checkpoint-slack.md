# Slack Research Checkpoint
_Last updated: 2026-05-23 | Raw findings — will be synthesized into final MD_

---

## Key Slack Channels Identified

| Channel | ID | Notes |
|---|---|---|
| #paranoids-3c-sec | G1T2JS146 | Primary team channel — daily standup, 3C team comms |
| #cloud-security | C6G7K7GR2 | Broader cloud security org channel — baseline Q&A, community support |
| #data-all-psr-review-team | C059CDLJ3MZ | PSR review coordination for Data.all project |
| #dataall-security | C0558EJ58N9 | Data.all security review discussions |

---

## 2022 — Onboarding & Early Work (Feb–Jun 2022)

- **Feb 8-9, 2022**: Joined Yahoo. First contacts: Fanya Engler (manager), Nate Burton, John Kennedy, Namita Pingle (HR).
- First channel active in: **#paranoids-3c-sec** — said "Good morning!" on Feb 9 (Day 2).
- Onboarding: reviewing team overviews, paranoids slides, getting tooling access (Yubikey, WFA form).
- Manager was Fanya Engler; immediate team = Paranoids 3C Cloud Security.

---

## 2023 — Work Signals (June 2023 snapshot)

### SageMaker Security Research
- Researched SageMaker notebook security for a baseline/detection:
  - Amazon Linux 1 EOL (Feb 2023) — not applicable to SageMaker
  - KmsKeyId — encryption of notebooks
  - DirectInternetAccess — internet exposure of training/inference containers
  - RootAccess — flagged for warn-level alert
  - Used `describe-notebook-instance` API analysis
  - Noted SageMaker auto-applies updates on restart; detecting last-restart-time unclear
- Working with Nate Burton on this research

### Data.all Security Review (June 2023)
- Led/conducted PSR (Paranoids Security Review) for **Data.all** — Yahoo's internal data platform
- Created multiple JIRA tickets coordinating EREs (Exception Risk Evaluations) and PSR findings:
  - PRC-2449 — Central Tech: Big Data Platform: ERE for PivotRole on Data.all Account (Overly Broad Permissions) → linked to PSECBUGS-73755
  - PRC-2450 — Central Tech: ERE for Re-auth for Lateral Movement Within Environments → linked to PSECBUGS-71982
  - PRC-2447 — Request to enable AWS Cognito for data.all Staging account
  - PRC-2448 — Request to enable AWS Cognito for data.all Prod account
- Tracked pre-launch security issue resolution; MVP launch slated for Aug 2023
- Channel: #data-all-psr-review-team, #dataall-security

### AWS Baseline Work (SES / Email Security — June 2023)
- Worked on **AWS-6116 through AWS-6119** (SES baselines):
  - AWS-6116: Ensure only approved domains used with SES (Simple Email Service)
  - Defined approved domains: yahoo.net, aws.oath.cloud, aws.yahoo.cloud, yahooinc.com, oath.com
  - Fixed broken PSR links in baseline references (tracked in PCLOUD-8993)
  - Proposed title correction for AWS-6119: "Ensure SES identities are verified"
  - Flagged signature/baseline inconsistency for fixes
  - Handled questions from cloud security community (#cloud-security)
  - Investigated DKIM authentication for SES verified identities
- Working with community users responding to baseline questions — directing users to file PSRs for non-standard configurations

### GACCO ECR Terminator (June 2023)
- Investigated GACCO ECR Terminator issue raised in #cloud-security
- Reached out to Alex Verkhovtsev to find the right contact

---

## 2024 — Work Signals (June 2024 snapshot)

### AWS Baseline AWS-6125 (Bedrock Baseline)
- Updated **AWS-6125** baseline — related to Amazon Bedrock platform approval
- Investigated and documented Bedrock's approval status from ARC (Architecture Review Committee)
- Coordinated with Will Chilcutt on Bedrock framework ticket CLOUDSVCS-2581
- Clarified policy: "Bedrock approved as platform, but privacy reviews each model individually"
- PR #342 — updated audit steps for AWS-6125, removed confusing guidance; PR #343 — approved
- Coordinated with Namita Pingle for baseline publish + comms pipeline

### S-Bug / PSECBUGS Triage (June 2024)
- Reviewing and routing PSECBUGS (Security Bug) tickets: PSECBUGS-85296
- Coordinating with Emir McCullough on S-Bug reviews
- Understanding GACCO S-Bug creation cycle (runs every 24h; new S-Bug only if open alert exists with no open S-Bug)
- Working with Fanya Engler on S-Bug process questions

### Data.all Ongoing Security (June 2024)
- Continued involvement in Data.all security — data.all static code analysis question:
  - Evaluating AWS dev team's Python package for Checkov/SCA scanning
  - Recommended using IAM role with S3 restricted permissions for third-party access
  - Pointed to internal AWS Security FAQ guidance

### Onboarding New Engineer (June 2024)
- Adding Kyle Teahan to Yahoo Mail security syncs ("I'll look through and add you to all syncs with Mail")

---

## Channels / Community Work Observed

- **#cloud-security** — responds to community questions about baselines, SES, Bedrock; acts as SME
- **#data-all-psr-review-team** — led security reviews for internal platform launches
- Coordinating security review processes across Yahoo BUs

---

---

## 2022 — Baseline & Signature Ownership (May–Sep 2022)

### KEY FINDING: Primary org-wide baseline communicator from Month 3
Koushik was the person sending `<!here>` announcements to ALL of #aws, #cloud-community, and #cloud-security simultaneously for every AWS baseline/signature release. This started ~3 months after joining (May 2022).

### May 2022 — AWS Baseline 5.1 Launch
- Announced AWS Baseline 5.1 signatures going from WARN→OPEN across 9 baselines: AWS-1034, 2022, 4043, 5032, 6008, 6009, 6095, 6096, 6097
- PR for AWS-7001 (GACCO baseline) update + EH signature → pushed to EternalHarvest-ECS repo (PR #273)
- AWS-7001 GACCO min version bumped to 5.6.1, AMI date April 27, 2022

### June 2022 — New Baseline Requirements (AWS Accelerator)
Announced at AWS Accelerator, released to org:
- **AWS-3005** — Ensure IAM role "paranoids-fire-audit" is created and delegated
- **AWS-5033** — Ensure ECR enhanced scanning is enabled in all regions (new)
- **AWS-5034** — Ensure ECR lifecycle policy enforces images pushed every 30 days (new)
- AWS-6031 → OPEN status for non-compliance
- AWS-7001 updated to GACCO 5.7.0

### July 2022 — AWS-5034 Baseline Fix
- Found and fixed logic error in AWS-5034: tagStatus should be 'any' not 'untagged'
- Coordinated with team on effective date (8/16/22)
- AWS-7001 updated to GACCO 5.8.1

### Sep 2022 — GACCO 5.9.0 Incident & AWS-6027/6031 Dedup
- **GACCO 5.9.0 rollout incident**: EH signature update immediately after GACCO rollout triggered mass S1 S-Bugs. Koushik coordinated with #vcops-x-3c and #gacco-pcp teams to resolve. Proposed process improvement: delay signature update timing after GACCO releases.
- **AWS-6027 / AWS-6031 deduplication**: Identified these two baselines were exact duplicates. Phased out AWS-6031, kept AWS-6027.
  - PR to EternalHarvest-ECS: #314
  - PR to aws-baseline: #215
  - Created PSMON-4124 for VCops to update alert tables
  - Prepared comms for the change

### PSR Reviews — 2022
- **Insights Project PSR** (PCLOUD-7303, PCLOUD-7095): Cross-account SQS+KMS access design. Guided team to restrict KMS key principal to specific account IDs instead of wildcard. Coordinated with Nate Burton and Brittany Bahk.
- Actively researching and responding to questions in #cloud-security on baseline interpretation

---

## 2023 — PSR Reviews & Baseline Authoring

### June–Aug 2023 PSR Reviews
Active PSR review queue with multiple simultaneous reviews:
- **PCLOUD-8862** — Vijay Jain's project (kicked off June 15)
- **PCLOUD-8837** — Srinivas Bhagavatula's project (kicked off June 15)
- **PCLOUD-8972** — **The Flame Project** (Yahoo "Why Trending" using ChatGPT API)
  - One of Yahoo's FIRST GenAI product PSRs — flagged in #paranoids-infrasec
  - Coordinated legal/copyright approval through Bunny Smith and Priscilla Ng
  - Referenced yo/psai Confluence page for GenAI security policy tracking
- **PCLOUD-9000** — OpenSearch migration from on-prem (with Athenz cert review, coordinated with Noah Hamilton)
- **PCLOUD-9016** — EMR/BigData IaC security review (June go-live deadline)
- **PCLOUD-9030–9034** — 5 Flurry PSR reviews simultaneously
- **PCLOUD-9168** — Elasticache (Payal Patel's project)
- **PCLOUD-9503, 9586** — Data.all Cognito security review (Aug 2023)
- **PCLOUD-7162** — Closed out (Amar Kamat's project)

### Checkov / IaC Review Work (Nov 2023)
- Reviewed PSECBUGS-77638 — Checkov scan results for data.all CDK template
- Analyzed false positives in IaC scanning (CDK template line number references)
- Investigated KMS key access scope in CDK templates

### IaC Checkov Mapping Maintenance (May 2024)
- Identified IaC Checkov mapping discussion in internal channels
- Coordinating Checkov scan policy updates with team

---

## 2024 — Baseline Release DRI & Advanced Security Research

### KEY FINDING: Continued as primary release communicator for AWS Baselines 5.2
Sent simultaneous org-wide announcements to #aws, #cloud-community, #cloud-security for every release.

### Jan 25, 2024 — AWS Baseline 5.2 Batch Release
- **AWS-4047/4048 split**: Split baseline into Sbuggable vs non-Sbuggable (SSH/Calypso requirements)
- Signatures moved to OPEN: AWS-5037 (IAM cert expiry), AWS-6105 (Glue Default Encryption), AWS-6106 (Glue KMS), AWS-6116 (SES approved domains), AWS-6118 (SES DKIM)
- Fixed AWS-1030 (Athenz SSO) — logic fix for AWSFED2 release

### Feb 7, 2024 — Lambda Runtime + ACM Cert Release
- Coordinated full release: PRs for Lambda Runtime ECS (#479), ACM Cert ECS (#472), Baseline PRs #324 and #326
- **New baseline AWS-6129**: Lambda runtime for Amazon Linux (AL2/AL2023 supported)
- **Updated**: AWS-6077 (Python), 6078 (Node), 6079 (Ruby), 6080 (Java), 6081 (Go EOL), 6082 (.NET)
- **ACM cert changes**: AWS-5036, 5018, 5021 updated from 30→20 days for CKMS auto-renewal compatibility

### Mar 2024 — SageMaker Notebook Enforcement
- AWS-6127 S-Bugs activated: SageMaker notebook public access
- Coordinated AWS-4047 (Calypso SSH) comms via TheStreet announcement system

### Apr 2024 — IMDSv2 Enforcement
- AWS-4044 (IMDSv2) moved WARN→OPEN on April 15, 2024
- Referenced AWS Accelerator 02/20/2024 presentation

### Apr 2024 — Deep Checkov / Baseline Research
Research on new potential baselines from Checkov/Prisma policies (shared with Fanya):
- CKV_AWS_173: Lambda encryption for env variables
- CKV_AWS_136: ECR repository encryption (HIGH)
- CKV_AWS_109: IAM permissions management without constraint (mapped to existing AWS-1029 signature approach)
- CKV_AWS_107: Credentials exposure actions in IAM (researched cloudsplaining tool coverage)

### Amazon Q Baseline Work (Feb 2024)
- Building Amazon Q (AWS Connect) baseline and signature
- Investigated AccessDeniedException issues with paranoids-audit-access role for wisdom:ListAssistants — likely SCP block
- Coordinating with Peter Stephan on IAM permission scope

---

## 2025–2026 

### AWS Baselines v6 CSV + CIS Mapping (Oct 2025)
- Added S-levels, CIS mapping (cis_control_id, cis_benchmark_version), and Checkov controls to aws_baselines.csv
- PR #389 (S-levels) → closed, superseded by PR #392 (combined S-levels + CIS + Checkov)
- Found CIS Benchmark 6.0 gaps in Yahoo baselines:
  - 1.13: Single active IAM access key per user
  - 1.12: Credentials unused 45 days disabled (Yahoo uses 90 days)
  - 3.4, 3.5, 3.8, 3.9: CloudTrail S3 logging/encryption controls
  - 1.18: IAM instance roles for resource access
  - 2.1.2: MFA Delete on S3 buckets
  - 2.3.2: RDS Auto Minor Version Upgrade
- Found redundant/non-active baselines in Checkov mapping file → PR planned

### 3C Ingestor Adoption (Apr 2026)
- 3C-ingestor architecture shared with RAZR/GINSU team (Jason Jaissle/Jlarson) for internal adoption
- Suggested Bedrock-based alternative architecture (Slack + Bedrock + S3 + Step Functions) for AI workflow use case
- Provided immediate security fixes: enabled IMDSv2 (eliminated SSRF risk), recommended shell access restrictions

---

## Channels Confirmed Active In

| Channel | Purpose |
|---|---|
| #paranoids-3c-sec | Primary team channel |
| #cloud-security | Baseline/signature SME, community support |
| #aws | Org-wide baseline release announcements |
| #cloud-community | Org-wide baseline release announcements |
| #cloud-community | General engineering community |
| #paranoids-infrasec | Infrastructure security cross-team |
| #data-all-psr-review-team | Data.all PSR coordination |
| #dataall-security | Data.all security specifics |
| #pcp-security | PCP security (Gacco/compliance) |
| #vcops-x-3c | VCops / 3C cross-team coordination |
| #gacco-pcp | GACCO platform security |

---

## 2023 H2 — GenAI Security Pioneer Work (MAJOR GAP IN RESUME)

### Jul 2023 — Yahoo CLO GenAI Pause Coordination
- Yahoo CLO issued a company-wide pause on all GenAI products pending legal approval
- Koushik coordinated the pause across active PSR reviews — informed teams like Praneeta Chaudhary (The Flame Project) of the pause requirement
- Served as the 3C liaison for GenAI PSR escalation path through Bunny Smith

### Oct 2023 — AWS Bedrock & SageMaker JumpStart Detection (PCLOUD-9815)
- Built Yahoo's first detection capability for unauthorized GenAI service usage
- Personally deployed SageMaker JumpStart (Meta Llama 2-7b) in test account to reverse-engineer detection approach
- Researched and evaluated three detection strategies: CloudTrail invocation events, Cloudability cost signals, CloudWatch alarms
- Coordinated with Corey Boyd (Eternal Harvest platform team) to add Elasticsearch indexes for the new signature (PSEA-1105)
- Worked with Alex Verkhovtsev to unblock GACCO ECR dependency

### Oct–Dec 2023 — GenAI Baselines AWS-6125 & AWS-6126
- Authored two new GenAI security baselines:
  - **AWS-6125** — Ensure Amazon Bedrock is only used with Paranoids & Legal approval for each use case
  - **AWS-6126** — Ensure AWS SageMaker JumpStart is only used with Paranoids & Legal approval
- Built corresponding EH signatures for both
- Coordinated with VCops (#vcops-x-3c) on S-Bug workflow for GenAI suppression requests
- Coordinated with Gregg Beatty (VCops) on rollout timing

### Nov 2023 — Azure Search Chat PSR (PCLOUD-10111)
- Investigated Yahoo Search team's Microsoft Azure setup for "Search Chat" AI product
- Researched Microsoft EntraID authentication (new MSFT security requirement)
- Coordinated Azure Defender setup with Microsoft Pro Services
- Escalated findings to cross-functional group (Jason Jaissle, Namita Pingle, Will Chilcutt, Brian Twomey, Francis Hsu, Robert Hines)
- Ticket: WEBSEARCH-26255, PCLOUD-10111

---

## AWS Accelerator Presentations (Internal Tech Talks — MISSING FROM RESUME)

| Date | Talk | Audience |
|---|---|---|
| Dec 2023 | AWS Baseline release presentation (slides updated) | AWS Accelerator audience |
| **Feb 20, 2024** | **IMDSv2 (AWS-4044) migration** — full slide deck + recording | All Yahoo engineers on AWS |
| **Aug 2024** | **"Shift in Cloud Encryption"** tech talk | AWS Accelerator audience |
| **Mar 2025** | **Cloud Alerts Enforcement** — HIGH severity S-Bug policy | All Yahoo engineers on AWS |
| **May 2025** | Cloud Alerts Enforcement reminder comms | #aws, #cloud-security, #cloud-community |

### May 2025 — High Severity Alert Enforcement Policy Launch
- Designed and executed org-wide campaign: **ALL High Severity AWS alerts to be S-Bugged starting June 3, 2025**
- Published full list of newly-ticketed baselines to Confluence
- S-Bug severity mapping: S1 (7 days), S2 (30 days), S3 (60 days) based on risk
- "1 Account > 1 Baseline > Multiple Alerts = 1 S-Bug" — simplified model for engineers
- Simultaneous comms to all major channels

---

## Pagination Cursors (for continuation)
- 2022 page 2: `Q1VSUkVOVF9QQUdFOjI=`
- 2023 page 2: `Q1VSUkVOVF9QQUdFOjI=`
- 2024+ page 2: `Q1VSUkVOVF9QQUdFOjI=`
