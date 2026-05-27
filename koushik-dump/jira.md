# JIRA Research — Koushik Kotamraju @ Yahoo
_Tenure: Feb 7, 2022 → May 23, 2026 | Raw findings — source for cross-analysis_
_Account ID: 63b3ab1778aabbefa9d42709 | Cloud: ouryahoo.atlassian.net_

---

## Summary Statistics

| Project | 2022 | 2023 | 2024 | 2025 | 2026 | Total |
|---|---|---|---|---|---|---|
| PCLOUD (assigned) | 14 | 21+ | 70+ | 29 | — | 134+ |
| PCLOUD (reported) | 9 | 43 | 6 | 61 | 3 | 122+ |
| CLOUDSVCS | 7 | 7 | 4 | 1 | — | 19 |
| PSMON | 4 | 6 | 2 | 12 | 3 | 27 |
| PSEA / PCEDEVOPS | 3 | 3 | — | 5 | 1 | 12 |
| PSECBUGS | — | 4 | 1 | 1 | — | 6 |
| PVMOPS/PVMENG/DEO | 7 | 1 | — | — | — | 8 |
| Other projects | — | 2 | 5+ | 4 | 3 | 14+ |

**Rough total across all projects: ~340+ tickets spanning 4+ years**

---

## Key Themes Across JIRA Tenure

1. **AWS Security Baseline Lifecycle** — authoring, releasing, fixing, enforcing (PCLOUD, dominant theme)
2. **EH (EternalHarvest) Signature Development** — new indexes, detection logic, maintenance (PSEA/PCEDEVOPS)
3. **PSR Reviews** — security review of Yahoo product launches across AWS/GCP (PCLOUD)
4. **Monthly VCOps Compliance Audits** — systematic monthly audit of alert suppression requests (PCLOUD, 2024–2026)
5. **Monitoring Infrastructure** — Splunk/Databricks dashboard updates, data pipelines (PSMON)
6. **GenAI Security Pioneering** — first Yahoo detections for Bedrock, SageMaker JumpStart, Amazon Q (PSEA, PCLOUD)
7. **IaC / Checkov** — scanning infrastructure, metrics, CI/CD integration (PCLOUD, PSMON, PCEDEVOPS)
8. **Cross-team IAM/Permissions** — audit role permissions, SCP policies (CLOUDSVCS, CLOUDSEC)

---

## PCLOUD — Assigned Tickets (2022–2023)

### 2022 Assigned
- **PCLOUD-7303** | PSR Review — Insights Project (cross-account SQS+KMS design)
- **PCLOUD-7095** | PSR Review — Insights Project (KMS key principal restriction)
- **PCLOUD-7499** | Closed | 2022-07-07 | PCLOUD Review for Salesforce DataX Integration
- **PCLOUD-7892** | Validation | 2022-10-06 | Consider new baseline for blocking public access to EMR Clusters

### 2023 Assigned (PSR Reviews — High Volume)
- **PCLOUD-8862** | Vijay Jain's project PSR (kicked off June 15)
- **PCLOUD-8837** | Srinivas Bhagavatula's project PSR (kicked off June 15)
- **PCLOUD-8972** | **The Flame Project** — Yahoo "Why Trending" using ChatGPT API (one of Yahoo's FIRST GenAI PSRs)
- **PCLOUD-9000** | OpenSearch migration from on-prem (Athenz cert review)
- **PCLOUD-9016** | EMR/BigData IaC security review (June go-live deadline)
- **PCLOUD-9030** | Flurry PSR review #1
- **PCLOUD-9031** | Flurry PSR review #2
- **PCLOUD-9032** | Flurry PSR review #3
- **PCLOUD-9033** | Flurry PSR review #4
- **PCLOUD-9034** | Flurry PSR review #5
- **PCLOUD-9168** | Elasticache PSR (Payal Patel's project)
- **PCLOUD-9503** | Data.all Cognito security review
- **PCLOUD-9586** | Data.all Cognito security review #2
- **PCLOUD-7162** | Closed — Amar Kamat's project
- **PCLOUD-9815** | AWS Bedrock & SageMaker JumpStart GenAI detection ⭐
- **PCLOUD-10111** | Azure Search Chat PSR — Yahoo Search AI product (WEBSEARCH-26255)
- **PCLOUD-8993** | Fix broken PSR links in baseline references

---

## PCLOUD — Reported Tickets (Baseline Authoring & Infrastructure)

### 2022 Reported
- **PCLOUD-7208** | Closed | 2022-04-22 | Setup baselines for AWS Workspaces
- **PCLOUD-7209** | Closed | 2022-04-22 | Research on AWS Workspaces best practices
- **PCLOUD-7253** | Closed | 2022-05-04 | Suggested Baselines for AWS Workspaces
- **PCLOUD-7499** | Closed | 2022-07-07 | PCLOUD Review for Salesforce DataX Integration
- **PCLOUD-7892** | Validation | 2022-10-06 | Consider new baseline for blocking public access to EMR Clusters
- **PCLOUD-8009** | Closed | 2022-11-11 | Setup baselines for AWS Kinesis
- **PCLOUD-8010** | Closed | 2022-11-11 | Setup baselines for AWS Comprehend
- **PCLOUD-8011** | Deferred | 2022-11-11 | Research on Security Configurations in new AWS services
- **PCLOUD-8062** | Closed | 2022-11-28 | AWS-1034 needs to be modified to check for Action

### 2023 Reported (Major baseline authoring year)
- **PCLOUD-8232** | Closed | 2023-01-12 | Update AWS-6064 to reflect newer versions of Memcached which support encryption
- **PCLOUD-8306** | Open | 2023-01-27 | Investigate AWS-6021 edge case
- **PCLOUD-8341** | Closed | 2023-02-02 | Signature development for 5.2
- **PCLOUD-8419** | Closed | 2023-02-16 | Alert suppression Request for AWS-6064
- **PCLOUD-8480** | Closed | 2023-03-02 | AWS-5020 needs to be updated to check TLS listeners only and for latest SSL security Policies
- **PCLOUD-8481** | Closed | 2023-03-02 | Update AWS Baseline 5.1.md
- **PCLOUD-8499** | Closed | 2023-03-06 | GACCO 5.11.3 release support
- **PCLOUD-8504** | Closed | 2023-03-07 | Update Baselines to reflect up to date email addresses
- **PCLOUD-8761** | Closed | 2023-04-28 | Rewrite AWS-6106 so that it only detects accounts which have AWS Glue data catalog being actively used
- **PCLOUD-8815** | Closed | 2023-05-08 | Create a baseline requiring use of Calypso for SSH (→ AWS-4047/4048)
- **PCLOUD-8965** | Closed | 2023-06-01 | Consider new baseline for blocking public access to AWS SageMaker Notebooks (→ AWS-6127)
- **PCLOUD-8984** | Validation | 2023-06-05 | Consider new baseline checks for AWS SageMaker
- **PCLOUD-9079** | Closed | 2023-06-20 | Audit AWS-6105 for false positives
- **PCLOUD-9114** | Closed | 2023-06-27 | Move AWS-6104 to Not Monitored
- **PCLOUD-9721** | Closed | 2023-08-28 | New baseline for AWS CloudShell
- **PCLOUD-9744** | Closed | 2023-08-31 | Update AWS-5032 to include note about GACCO org SCP and exception tag
- **PCLOUD-9828** | Closed | 2023-09-15 | Investigate drop in alerts for AWS-6084
- **PCLOUD-9850** | Closed | 2023-09-21 | Switch 5.2 baselines to open status for baselines that have GACCO support added
- **PCLOUD-9878** | Open | 2023-09-27 | Combine GACCO required feature baselines (7002-7040) into 1 baseline
- **PCLOUD-9881** | Closed | 2023-09-28 | Debug Lightsail Baseline+Signature
- **PCLOUD-9890** | Closed | 2023-10-02 | False positives for AWS-6098 — Ensure X-Ray uses KMS CMK for encryption at rest
- **PCLOUD-9968** | Blocked | 2023-10-17 | Update Effective date for 5.2 baselines and any other baselines missing dates
- **PCLOUD-10089** | Closed | 2023-11-15 | Consider new baselines for RDS, Neptune, DynamoDB, DocumentDB minimum versions
- **PCLOUD-10090** | Validation | 2023-11-15 | Create baselines to detect authentication methods used in cloud based database services
- **PCLOUD-10099** | Closed | 2023-11-17 | Switch 5.2 baselines to open status for baselines based on Audit
- **PCLOUD-10100** | Closed | 2023-11-17 | Create baselines to detect authentication methods used in cloud based database services
- **PCLOUD-10101** | Closed | 2023-11-17 | Combine Glue 6107, 6108, 6109 signatures into one
- **PCLOUD-10104** | Closed | 2023-11-20 | Split SSHCA Baseline into AWS-4047 and AWS-4048 ⭐
- **PCLOUD-10110** | Closed | 2023-11-27 | Investigate AWS-5036 alerts inconsistency
- **PCLOUD-10144** | Closed | 2023-12-04 | 12/04/23 — Master Billing Audit results
- **PCLOUD-10145** | Closed | 2023-12-04 | 10/01/23 — Master Billing Audit Results
- **PCLOUD-10146** | Closed | 2023-12-04 | 11/06/23 — Master Billing Audit results
- **PCLOUD-10154** | Open | 2023-12-05 | Support for Windows Logging standards enforced by FIRE
- **PCLOUD-10187** | Closed | 2023-12-11 | Analyze Checkov resource scans and determine if new baselines are required
- **PCLOUD-10196** | Closed | 2023-12-13 | Create SBUG templates for AWS-6125 and AWS-6126 ⭐ (GenAI baselines)
- **PCLOUD-10232** | Closed | 2023-12-19 | Modify AWS-1030 to include checks for Athenz domain to account-number mapping
- **PCLOUD-10253** | Closed | 2023-12-22 | Improve reporting of AWS-1029 with more precise details

### 2024 Reported
- **PCLOUD-10391** | Closed | 2024-01-31 | Enable GuardDuty for RADAR (LAT) accounts
- **PCLOUD-10396** | Closed | 2024-01-31 | Evaluate changes to Cert expiry baselines (→ AWS-5018/5021/5036: 30→20 days)
- **PCLOUD-10410** | Closed | 2024-02-05 | Identify any public exposure baselines and verify S-Bug Status
- **PCLOUD-10539** | In Progress | 2024-02-26 | Modify/Update signatures for State of Security dashboard widgets
- **PCLOUD-10584** | Closed | 2024-03-06 | Analyze reporting of alert_details in different baselines and optimize information
- **PCLOUD-10596** | Closed | 2024-03-07 | Modify AWS-5033 to accept 90-day scanning timeframe because of AWS issue
- **PCLOUD-10603** | Closed | 2024-03-08 | Audit EH_whitelist_lookup.csv lookup for inactive alert suppression
- **PCLOUD-10648** | Closed | 2024-03-19 | Explore alert suppression based on tags for AWS-4047
- **PCLOUD-10663** | Closed | 2024-03-21 | VCOPs 3C Baseline Task — AWS-6125
- **PCLOUD-10756** | Closed | 2024-04-15 | Move AWS-4044 (IMDSv2) to OPEN for 04/15 release ⭐
- **PCLOUD-10758** | In Progress | 2024-04-15 | VCOPs 3C Documentation Task — S-Bug Template for AWS-4047
- **PCLOUD-10794** | Closed | 2024-04-22 | VCOPs 3C Baseline Task — Correct Baseline reference in AWS-6105 tickets
- **PCLOUD-10864** | Closed | 2024-05-08 | AWS-6125 False positive fix
- **PCLOUD-10879** | Closed | 2024-05-09 | Investigate missing alerts/errors for 6023 and 6025
- **PCLOUD-10934** | Closed | 2024-05-17 | Clarify AWS-6125 Audit steps
- **PCLOUD-10982** | Closed | 2024-05-30 | 3C-VCOps Monthly Audit — [Month, Year] (template)
- **PCLOUD-10983** | Closed | 2024-05-30 | 3C-VCOps Monthly Audit — May 2024

### 2025 Reported (Strategic Initiatives & Baseline v6)
- **PCLOUD-11695** | Closed | 2025-01-08 | 01/05/25 — Master Billing Audit results
- **PCLOUD-11719** | Closed | 2025-01-10 | Clarity on AWS-6039 and AWS-6040
- **PCLOUD-11725** | In Progress | 2025-01-13 | Identify Costly AWS API calls and suggest alternatives
- **PCLOUD-11732** | Deferred | 2025-01-14 | Refactor AWS-6053
- **PCLOUD-11813** | Closed | 2025-01-30 | 3C-VCOps Monthly Audit — January 2025
- **PCLOUD-11826** | Open | 2025-01-31 | State of Cloud Security — Enhancing Visibility & Adoption of Security Controls ⭐
- **PCLOUD-11827** | Open | 2025-01-31 | Normalize Security Baselines for Flexibility and less prescriptive guidance ⭐
- **PCLOUD-11829** | Open | 2025-01-31 | AWS Baseline Version 6.0 Rollout & Checkov Controls Mapping ⭐
- **PCLOUD-11830** | Open | 2025-01-31 | Transition and Enhancement of Checkov Security Scanning Tool
- **PCLOUD-11837** | Closed | 2025-02-03 | Clarify AWS-4007 and AWS-4008
- **PCLOUD-11838** | Closed | 2025-02-03 | Implement Federated Cloud Alerts Access Control ⭐
- **PCLOUD-11846** | Closed | 2025-02-05 | Milestone 1: Transition Ownership of Checkov Intelligence Layer
- **PCLOUD-11847** | In Progress | 2025-02-05 | Milestone 2: Implement Monitoring and Metrics Collection
- **PCLOUD-11848** | Open | 2025-02-05 | Milestone 3: Integration with CI/CD and GitHub Advanced Security
- **PCLOUD-11849** | In Progress | 2025-02-05 | Milestone 1: Define and Prioritize Key Security Controls for Visibility
- **PCLOUD-11850** | Open | 2025-02-05 | Milestone 2: Develop and Implement Custom Cloud Security Dashboard
- **PCLOUD-11851** | Open | 2025-02-05 | Milestone 3: Dashboard Rollout and Scaling Across Organization
- **PCLOUD-11852** | Open | 2025-02-05 | Milestone 1: Review and Identify Prescriptive Controls
- **PCLOUD-11853** | Open | 2025-02-05 | Milestone 2: Redefine Baselines to Focus on Outcomes
- **PCLOUD-11854** | Open | 2025-02-05 | Milestone 3: Rollout and Measure Effectiveness of Outcome-Based Controls
- **PCLOUD-11869** | In Progress | 2025-02-06 | Consider new baseline for all OIDC providers
- **PCLOUD-11899** | Closed | 2025-02-12 | Update ECR Enhanced Scanning Unsupported regions list in AWS-5033
- **PCLOUD-11915** | Closed | 2025-02-14 | Slack Comms for AWS baseline severity corrections
- **PCLOUD-11934** | In Progress | 2025-02-24 | Align GACCO S3 and ECR policy checks with EH
- **PCLOUD-11936** | Closed | 2025-02-25 | Xosphere Instance Orchestrator review
- **PCLOUD-11945** | Closed | 2025-02-27 | 3C-VCOps Monthly Audit — February 2025
- **PCLOUD-12047** | Closed | 2025-03-27 | 3C-VCOps Monthly Audit — March 2025
- **PCLOUD-12128** | Closed | 2025-04-24 | 3C-VCOps Monthly Audit — April 2025
- **PCLOUD-12254** | Closed | 2025-05-22 | Mock Project for AI Build Day — Learnings
- **PCLOUD-12268** | Closed | 2025-05-29 | 3C-VCOps Monthly Audit — May 2025
- **PCLOUD-12372** | Closed | 2025-06-26 | 3C-VCOps Monthly Audit — June 2025
- **PCLOUD-12498** | Closed | 2025-07-31 | 3C-VCOps Monthly Audit — July 2025
- **PCLOUD-12539** | Closed | 2025-08-13 | AWS Bedrock — AWS-6125 Alert Suppression Request
- **PCLOUD-12588** | Closed | 2025-08-28 | 3C-VCOps Monthly Audit — August 2025
- **PCLOUD-12903** | Closed | 2025-10-30 | IAMOK bugfix
- **PCLOUD-12907** | Closed | 2025-10-30 | 3C-VCOps Monthly Audit — September 2025
- **PCLOUD-12908** | Closed | 2025-10-30 | 3C-VCOps Monthly Audit — October 2025
- **PCLOUD-13067** | Closed | 2025-11-25 | 3C-VCOps Monthly Audit — November 2025
- **PCLOUD-13194** | Closed | 2025-12-24 | 3C-VCOps Monthly Audit — December 2025

### 2026 Reported
- **PCLOUD-13318** | Closed | 2026-01-30 | 3C-VCOps Monthly Audit — January 2026
- **PCLOUD-13459** | Closed | 2026-02-27 | 3C-VCOps Monthly Audit — February 2026
- **PCLOUD-13568** | Closed | 2026-03-26 | 3C-VCOps Monthly Audit — March 2026

---

## PCLOUD — 2024 Assigned (PSR Reviews + Baseline Enforcement)

- **PCLOUD-10584** | Closed | 2024-03-06 | Analyze reporting of alert_details in different baselines
- **PCLOUD-10596** | Closed | 2024-03-07 | Modify AWS-5033 to accept 90 days scanning timeframe
- **PCLOUD-10609** | Closed | 2024-03-11 | Self hosted Hasura application in AWS/GCP PSR
- **PCLOUD-10614** | Closed | 2024-03-11 | Self hosted Apollo GraphQL Router in AWS/GCP PSR
- **PCLOUD-10637** | Closed | 2024-03-15 | Ad effectiveness studies — SageMaker migration PSR
- **PCLOUD-10640** | Closed | 2024-03-18 | Payroll Server Data PSR
- **PCLOUD-10648** | Closed | 2024-03-19 | Explore alert suppression based on tags for AWS-4047
- **PCLOUD-10685** | Closed | 2024-03-29 | Sports Gen-AI team newsletters — Cloud review ⭐
- **PCLOUD-10694** | Closed | 2024-04-01 | CLONE — Self hosted Hasura application in AWS/GCP
- **PCLOUD-10695** | Closed | 2024-04-01 | CLONE — Self hosted Apollo GraphQL Router application
- **PCLOUD-10744** | Closed | 2024-04-10 | S3 Public Bucket — Whitelist Renewals autoblog-old-images
- **PCLOUD-10756** | Closed | 2024-04-15 | Move AWS-4044 (IMDSv2) to OPEN for 04/15 release ⭐
- **PCLOUD-10759** | Closed | 2024-04-15 | Cloud Security Review of Innervate Creative platform integration
- **PCLOUD-10785** | Closed | 2024-04-19 | GDM copy data to/from AWS for Identity Graph
- **PCLOUD-10792** | Closed | 2024-04-22 | Security review for Artifact AWS Infrastructure
- **PCLOUD-10823** | Closed | 2024-04-28 | Review of favicon pipeline for Search
- **PCLOUD-10864** | Closed | 2024-05-08 | AWS-6125 False positive fix
- **PCLOUD-10879** | Closed | 2024-05-09 | Investigate missing alerts/errors for 6023 and 6025
- **PCLOUD-10882** | Closed | 2024-05-13 | ECData Api system migration to AWS PSR
- **PCLOUD-10918** | Closed | 2024-05-15 | CDEDTO-14 Data.all for AWS PSR
- **PCLOUD-10934** | Closed | 2024-05-17 | Clarify AWS-6125 Audit steps
- **PCLOUD-10935** | Closed | 2024-05-17 | Credible Data Copy from AWS to GCP PSR
- **PCLOUD-10937** | Closed | 2024-05-17 | Netbox Cloud Review (production) PSR
- **PCLOUD-10955** | Closed | 2024-05-21 | Alerts in yo/cloud-alerts for AWS and GCP account
- **PCLOUD-10982** | Closed | 2024-05-30 | 3C-VCOps Monthly Audit — [Month, Year] (template)
- **PCLOUD-10983** | Closed | 2024-05-30 | 3C-VCOps Monthly Audit — May 2024
- **PCLOUD-11062** | Closed | 2024-06-20 | DataX Batch API AWS Migration PSR
- **PCLOUD-11069** | Deferred | 2024-06-24 | Create a baseline requiring use of Calypso for SSH for on-premise hosts
- **PCLOUD-11075** | Closed | 2024-06-25 | Retire relevant AWS baselines, deactivate relevant signatures
- **PCLOUD-11077** | Closed | 2024-06-25 | Edit EH signatures as needed for new requirements
- **PCLOUD-11088** | Closed | 2024-06-27 | Collaborate with YPE on GACCO changes
- **PCLOUD-11089** | Closed | 2024-06-27 | Cloud Security: Review of new integration Yahoo! Payments to Braintree
- **PCLOUD-11102** | Closed | 2024-07-01 | Calypso AWS-4047 initial ticketing — Code 201
- **PCLOUD-11103** | Closed | 2024-07-01 | EC api-portal AWS Omega migration PSR
- **PCLOUD-11130** | Closed | 2024-07-10 | DT Migration — KVC runtime component for search
- **PCLOUD-11133** | Closed | 2024-07-12 | Migrating Evaluate Serving from Onprem to AWS Omega PSR
- **PCLOUD-11149** | Closed | 2024-07-17 | Calypso AWS-4047 ticketing — Remaining S-Buggable codes
- **PCLOUD-11179** | Closed | 2024-07-23 | Search keyword history system review PSR
- **PCLOUD-11192** | Closed | 2024-07-24 | Review usage of PaddleOCR (and doctr) ⭐ (AI/ML library security review)
- **PCLOUD-11197** | Closed | 2024-07-24 | MAB DynamoDB IAC PSR
- **PCLOUD-11199** | Closed | 2024-07-25 | Commerce RMP DT PSR
- **PCLOUD-11203** | Closed | 2024-07-25 | LambdaTest Tunnel Setup in AWS PSR
- **PCLOUD-11204** | Closed | 2024-07-25 | 3C-VCOps Monthly Audit — July 2024
- **PCLOUD-11223** | Closed | 2024-07-31 | Review API Gateway (sagw) AWS migration PSR
- **PCLOUD-11227** | Closed | 2024-08-01 | CommerceBoss Cronjob migration to AWS PSR
- **PCLOUD-11229** | Closed | 2024-08-01 | Global commerce consumer for content enrichment PSR
- **PCLOUD-11231** | Closed | 2024-08-01 | AWS Accelerator and MBR presentations ⭐
- **PCLOUD-11267** | Closed | 2024-08-13 | Evaluate ability to create and monitor configurations via custom checks
- **PCLOUD-11295** | Closed | 2024-08-20 | MarketPsych SENT Integration PSR
- **PCLOUD-11301** | Closed | 2024-08-21 | YFinance Content Ingestion Pipeline PSR
- **PCLOUD-11303** | Deferred | 2024-08-21 | Possible false positive for AWS-6053 secret rotation
- **PCLOUD-11314** | Closed | 2024-08-22 | EC Horizontal Affiliate migration to AWS Omega PSR
- **PCLOUD-11325** | Closed | 2024-08-23 | Feedback for AWS-6053 — Consider LastChangedDate along with LastRotatedDate
- **PCLOUD-11338** | Closed | 2024-08-27 | Move uid service from on-prem omega to AWS omega PSR
- **PCLOUD-11345** | Closed | 2024-08-28 | Move category/pricing services to AWS omega PSR
- **PCLOUD-11346** | Closed | 2024-08-28 | Engadget PSR
- **PCLOUD-11351** | Closed | 2024-08-29 | Evaluate ability to create and monitor configurations via custom checks
- **PCLOUD-11353** | Closed | 2024-08-29 | 3C-VCOps Monthly Audit — August 2024
- **PCLOUD-11445** | Closed | 2024-09-26 | Review Radar integration with Lantern PSR
- **PCLOUD-11448** | Closed | 2024-09-26 | 3C-VCOps Monthly Audit — September 2024
- **PCLOUD-11450** | Closed | 2024-09-26 | One Reporting infrastructure — standalone AWS accounts PSR
- **PCLOUD-11515** | Closed | 2024-10-23 | Athenz x.509 Certificate Identity Provider for Harness PSR
- **PCLOUD-11520** | Closed | 2024-10-25 | Google Analytics 360 for User Engagement PSR
- **PCLOUD-11527** | Closed | 2024-10-30 | SSHCA Certificate for GitHub Actions Workflow PSR
- **PCLOUD-11551** | Closed | 2024-10-31 | 3C-VCOps Monthly Audit — October 2024
- **PCLOUD-11624** | Blocked | 2024-11-27 | Documentation and Comms post-Oakenshield
- **PCLOUD-11630** | Closed | 2024-12-02 | 3C-VCOps Monthly Audit — November 2024
- **PCLOUD-11660** | Validation | 2024-12-13 | AWS auditing: reduce IAM calls
- **PCLOUD-11664** | Closed | 2024-12-17 | Look into issues with AWS-7001 signature when no EC2 GACCO instance found
- **PCLOUD-11675** | Closed | 2024-12-20 | Fix IAM policy check logic in AWS-5030
- **PCLOUD-11678** | Closed | 2024-12-26 | 3C-VCOps Monthly Audit — December 2024

## PCLOUD — 2025 Assigned (Strategic + Baseline v6)
- **PCLOUD-11682** | Closed | 2025-01-02 | Amazon Personalize for AOL Content Personalization PSR
- **PCLOUD-11720** | Closed | 2025-01-10 | Re-evaluate Risk Ratings for AWS Baselines ⭐
- **PCLOUD-11725** | In Progress | 2025-01-13 | Identify Costly AWS API calls and suggest alternatives
- **PCLOUD-11732** | Deferred | 2025-01-14 | Refactor AWS-6053
- **PCLOUD-11759** | Deferred | 2025-01-22 | Review if AWS baseline necessary for unrestricted egress traffic
- **PCLOUD-11811** | Closed | 2025-01-30 | Include L5, L6 level filters in Databricks cloud alert
- **PCLOUD-11813** | Closed | 2025-01-30 | 3C-VCOps Monthly Audit — January 2025
- **PCLOUD-11826** | Open | 2025-01-31 | State of Cloud Security — Enhancing Visibility & Adoption of Security Controls ⭐
- **PCLOUD-11827** | Open | 2025-01-31 | Normalize Security Baselines for Flexibility and less prescriptive guidance ⭐
- **PCLOUD-11829** | Open | 2025-01-31 | AWS Baseline Version 6.0 Rollout & Checkov Controls Mapping ⭐
- **PCLOUD-11830** | Open | 2025-01-31 | Transition and Enhancement of Checkov Security Scanning Tool
- **PCLOUD-11833** | Closed | 2025-02-03 | Add Checkov controls to baseline DBs
- **PCLOUD-11837** | Closed | 2025-02-03 | Clarify AWS-4007 and AWS-4008
- **PCLOUD-11838** | Closed | 2025-02-03 | Implement Federated Cloud Alerts Access Control ⭐
- **PCLOUD-11847** | In Progress | 2025-02-05 | Milestone 2: Implement Monitoring and Metrics Collection
- **PCLOUD-11848** | Open | 2025-02-05 | Milestone 3: Integration with CI/CD and GitHub Advanced Security
- **PCLOUD-11849** | In Progress | 2025-02-05 | Milestone 1: Define and Prioritize Key Security Controls for Visibility
- **PCLOUD-11858** | Closed | 2025-02-06 | Cloud Alerts Executive Dashboard revision or replacement
- **PCLOUD-11863** | Closed | 2025-02-06 | May Accelerator announcement ⭐
- **PCLOUD-11869** | In Progress | 2025-02-06 | Consider new baseline for all OIDC providers
- **PCLOUD-11891** | Closed | 2025-02-11 | Create Lambda to gather users from fed roles for cloud-alerts access
- **PCLOUD-11892** | Closed | 2025-02-11 | Create new federated role (fed.alert.access) for cloud-alerts access
- **PCLOUD-11893** | Closed | 2025-02-11 | Ingest cloud-alert-user data into Databricks
- **PCLOUD-11899** | Closed | 2025-02-12 | Update ECR Enhanced Scanning Unsupported regions list in AWS-5033
- **PCLOUD-11915** | Closed | 2025-02-14 | Slack Comms for AWS baseline severity corrections
- **PCLOUD-11934** | In Progress | 2025-02-24 | Align GACCO S3 and ECR policy checks with EH
- **PCLOUD-11936** | Closed | 2025-02-25 | Xosphere Instance Orchestrator review
- **PCLOUD-11945** | Closed | 2025-02-27 | 3C-VCOps Monthly Audit — February 2025

---

## CLOUDSVCS — GACCO & IAM/SCP Updates

### 2022
- **CLOUDSVCS-422** | Closed | 2022-02-18 | List of services currently being used in GCP
- **CLOUDSVCS-510** | Closed | 2022-05-11 | Governance grading updates for AWS-7001 Baseline update
- **CLOUDSVCS-546** | Closed | 2022-06-06 | Governance grading updates for AWS-7001 Baseline update
- **CLOUDSVCS-595** | Closed | 2022-07-01 | Add new permissions to paranoids-audit-role
- **CLOUDSVCS-619** | Closed | 2022-07-27 | Add new permissions to paranoids-audit-role for AWS Inspector
- **CLOUDSVCS-628** | Closed | 2022-07-29 | Governance grading updates for AWS-7001 Baseline update
- **CLOUDSVCS-726** | Closed | 2022-09-08 | Governance grading updates for AWS-7001 Baseline update

### 2023
- **CLOUDSVCS-1005** | Closed | 2023-02-22 | Governance grading updates for AWS-7001 (GACCO v5.11.2)
- **CLOUDSVCS-1101** | Closed | 2023-03-15 | Governance grading updates for AWS-7001 (GACCO v5.11.3)
- **CLOUDSVCS-1414** | Closed | 2023-06-22 | Fix Sonic API Link in Documentation
- **CLOUDSVCS-1515** | Closed | 2023-07-19 | Confirm GuardDuty status on accounts found in 3C July Audit
- **CLOUDSVCS-2034** | Closed | 2023-10-24 | Additional CloudWatch permissions needed for new AWS Baseline
- **CLOUDSVCS-2099** | Closed | 2023-11-06 | Xray Index for baseline
- **CLOUDSVCS-2218** | Closed | 2023-12-13 | Need additional permissions in audit-role for detection of Amazon Q usage ⭐

### 2024
- **CLOUDSVCS-2509** | Closed | 2024-02-21 | Restrict Access to GuardDuty metadata files
- **CLOUDSVCS-2510** | Closed | 2024-02-21 | Enable Amazon Q for Paranoids-Cloudsec-fail account (development of new baseline)
- **CLOUDSVCS-2627** | Closed | 2024-03-07 | Update paranoids-audit-access role with additional Q permissions
- **CLOUDSVCS-2628** | Closed | 2024-03-07 | Update the DenyAmazonQ SCP policy
- **CLOUDSVCS-2866** | Closed | 2024-04-17 | Update paranoids-audit-access role with additional WAF read permission

### 2025
- **CLOUDSVCS-5089** | Done | 2025-08-01 | Approval for AWS Bedrock Usage

---

## PSMON — Splunk/Databricks Monitoring Infrastructure

### 2022
- **PSMON-4026** | Done | 2022-06-08 | Access request for new team member
- **PSMON-4124** | Done | 2022-09-14 | Phasing out AWS-6031 baseline ⭐
- **PSMON-4130** | Done | 2022-09-19 | Investigate inconsistent alerting of AWS-5034 and similar baselines
- **PSMON-4205** | Done | 2022-12-19 | Update Splunk Query for PCP to resolve inconsistency issues

### 2023
- **PSMON-4419** | Done | 2023-08-30 | Support for new Calypso baseline on Splunk Dashboard
- **PSMON-4420** | Done | 2023-08-30 | Exclude alert data for new baseline AWS-4047
- **PSMON-4445** | Done | 2023-09-25 | S3 ingestion issues
- **PSMON-4469** | Done | 2023-10-09 | Support for missing data fields for AWS-4047 baseline alerts
- **PSMON-4504** | Done | 2023-10-27 | Improve interaction with alerts on yo/cloud-alerts
- **PSMON-4536** | Done | 2023-11-29 | Change Business Segment grouping in Splunk dashboards

### 2024
- **PSMON-4579** | Done | 2024-01-29 | New Dashboard request for State of Cloud Security metrics ⭐
- **PSMON-4593** | Done | 2024-02-07 | Update Dashboards to reflect new BU Filtering
- **PSMON-4743** | Done | 2024-07-02 | Update AWS-4047 data collection to support Athenz Service and Calypso Profile details

### 2025
- **PSMON-4916** | Done | 2025-01-09 | Segment Mapping for Cloud and IAM Alerts
- **PSMON-4930** | Done | 2025-01-17 | Request for Cloud Alerts Executive Overview Dashboard ⭐
- **PSMON-4981** | Done | 2025-02-06 | Cloud Alerts Executive Overview Dashboard Updates
- **PSMON-5031** | Done | 2025-03-10 | New Pipeline For Athenz Domain Information
- **PSMON-5033** | Done | 2025-03-13 | Replace Segments filter with Athenz Domains on Cloud Dashboards
- **PSMON-5083** | Done | 2025-04-30 | Update Schema for AWS-6053
- **PSMON-5084** | Done | 2025-04-30 | Update Cloud Exec Dashboard
- **PSMON-5101** | Done | 2025-05-26 | Add new widget to yo/cloud-alerts
- **PSMON-5129** | Done | 2025-06-25 | Update Schema for AWS-1024
- **PSMON-5389** | Done | 2025-12-17 | Replace Segments filter with Athenz Domains on IAMOK Dashboards

### 2026
- **PSMON-5453** | To Do | 2026-01-23 | Additional Metrics for Checkov Dashboard
- **PSMON-5489** | With Customer | 2026-02-13 | Create new scheduled pipeline job to ingest GitHub Data for Checkov Metrics Dashboard
- **PSMON-5526** | Open | 2026-03-04 | Request for Databricks Service Principal to test new workflow

---

## PSEA / PCEDEVOPS — EternalHarvest Signature Infrastructure

### PSEA (2022–2023)
- **PSEA-85** | Closed | 2022-10-04 | Clean-up EH Signature Lambdas
- **PSEA-312** | Done | 2022-11-30 | Add new index to EH data in ElasticSearch — AWS MQ describe broker
- **PSEA-251** | Done | 2022-12-12 | Add new index to EH data in ElasticSearch — AWS MQ list-brokers
- **PSEA-1074** | Closed | 2023-09-13 | EH Collection for AWS EMR Block Public Access
- **PSEA-1105** | Closed | 2023-10-04 | Need indexes to detect usage of GenAI Services — AWS Bedrock and SageMaker JumpStart ⭐
- **PSEA-1224** | Closed | 2023-12-01 | New indexes for Amazon Q Detection ⭐

### PCEDEVOPS (2025–2026)
- **PCEDEVOPS-508** | Done | 2025-01-13 | New EH index for IAM get-account-authorization-details
- **PCEDEVOPS-550** | Done | 2025-01-24 | New EH index for Secrets Manager — list-secret-version-ids
- **PCEDEVOPS-707** | Done | 2025-04-08 | New EH index for Secrets Manager — Describe Secrets
- **PCEDEVOPS-860** | Done | 2025-06-23 | Retire EH index list-entities-for-policy
- **PCEDEVOPS-1190** | Done | 2025-10-31 | New EH index KMS list-aliases
- **PCEDEVOPS-1395** | Open | 2026-02-13 | Request for GitHub data to identify IaC repos for Checkov coverage metrics ⭐

---

## PSECBUGS — Security Issue Tracking

### 2023 Reported
- **PSECBUGS-71978** | Done | 2023-05-19 | Overly Broad Permissions on Data.All Account
- **PSECBUGS-73609** | Done | 2023-05-25 | Update AWS settings to remove high/medium alerts — Data.All
- **PSECBUGS-73755** | Done | 2023-05-31 | Overly Broad Permissions on Data.All — PivotRole (linked PRC-2449)
- **PSECBUGS-77747** | Done | 2023-10-10 | IAMOK — TEST Ticket audit for AWS account 767698972682

### 2024–2025 Reported
- **PSECBUGS-85348** | Done | 2024-05-31 | Enable GACCO features on Artifact AWS Accounts
- **PSECBUGS-89497** | Done | 2024-10-01 | Excessive Permissions detected on AWS S3 Bucket Policy
- **PSECBUGS-103242** | To Do | 2025-11-06 | Security Review — data.all Environment Bootstrap Process

---

## PVMOPS / PVMENG / DEO — Access & Tooling

### 2022
- **PVMOPS-570** | Closed | 2022-02-22 | 3C access to yo/cloud-alerts
- **PVMOPS-602** | Closed | 2022-06-08 | 3C access to yo/cloud-alerts
- **PVMOPS-603** | Closed | 2022-06-22 | 3C contractor access to yo/cloud-alerts
- **PVMENG-2258** | Open | 2022-06-08 | Athenz Access for Sai
- **PVMENG-2265** | Done | 2022-06-23 | Add new index to EH data in ElasticSearch
- **PVMENG-2289** | Done | 2022-07-27 | Add new index to EH data in ElasticSearch — ECR Describe-images
- **DEO-1627** | Done | 2022-06-08 | paranoids-audit-access for new 3C team member Sai

### 2023
- **PVMOPS-872** | Closed | 2023-11-08 | Need access to Tenable app on Okta

---

## Other Projects (Cross-Team & Tooling)

### 2023
- **JIRA-16925** | Done | 2023-05-31 | Need access to create SBUG Tickets
- **JIRA-18134** | Done | 2023-10-10 | Cannot see custom field "Go-Live date" on dashboard

### 2024
- **CONTAKE-956** | Done | 2024-05-08 | Unrestricted File Manipulation in S3 Bucket on Yahoo Finance Article
- **GITHUB-8016** | Closed | 2024-05-03 | Provide GHE Cloud login access
- **CLOUDSEC-1015** | Closed | 2024-05-08 | Update SCP to allow usage of Amazon Q (for builders) and QuickSight ⭐
- **BIGML-3968** | Done | 2024-08-01 | Onboard to Databricks — Paranoids 3C ⭐
- **PPSE-37527** | Done | 2024-04-15 | Security review for Artifact AWS Infrastructure
- **GLEAN-98** | With Reporter | 2024-11-13 | Access request to create Glean Apps

### 2025
- **CLOUDSEC-1167** | Closed | 2025-11-14 | Additional permissions for AWS paranoids-audit-access role
- **ATHENS-8980** | Done | 2025-11-06 | Onboarding a new account

### 2026
- **DTPSR-582** | In Progress | 2026-03-31 | 3C Bot — Using AI to automate some of the 3C processes ⭐
- **PPSE-43493** | Done | 2026-03-31 | PPSE — 3C Ingestor — n8n Cloud baseline automation pipeline ⭐
- **GITHUB-9656** | Closed | 2026-03-20 | Request for Claude / Anthropic API Key ⭐
- **ADKITE-8237** | Open | 2026-02-10 | Request for Sample data to test PII detection tools
- **PCEDEVOPS-1395** | Open | 2026-02-13 | Request for GitHub data for Checkov coverage metrics

---

## Key Patterns & Resume-Worthy Findings from JIRA

### Systematic Monthly Compliance Audits (2024–2026)
Every month from May 2024 through March 2026 has a completed **3C-VCOps Monthly Audit of Alert Suppression Requests** — **24+ consecutive monthly audit cycles** with 100% completion rate. This is a systematic, recurring compliance function owned end-to-end.

### GACCO Version Release Pipeline (2022–2023)
Multiple CLOUDSVCS tickets per GACCO version (5.6.1, 5.7.0, 5.8.1, 5.9.0, 5.11.2, 5.11.3) — Koushik owned the GACCO-to-baseline coordination loop across all versions from early 2022.

### GenAI Security First-Mover Sprint (Q4 2023)
Within a 3-month window:
- PSEA-1105 (Oct 2023) — first GenAI detection indexes (Bedrock + SageMaker JumpStart)
- PCLOUD-9815 (Oct 2023) — GenAI detection investigation and baseline design
- PSEA-1224 (Dec 2023) — Amazon Q detection
- PCLOUD-10196 (Dec 2023) — S-Bug templates for AWS-6125/6126
- CLOUDSVCS-2218 (Dec 2023) — audit-role permissions for Q detection
The entire GenAI security capability was built end-to-end in Q4 2023 — first at Yahoo.

### State of Cloud Security Platform (2025 Strategic Initiative)
PCLOUD-11826 through PCLOUD-11854 (14+ tickets, Jan-Feb 2025) — a multi-milestone strategic program:
- Milestone tracks: Visibility, Baseline Normalization, Checkov Integration, CI/CD + GitHub Advanced Security
- Executive dashboard (PSMON-4930) driven from same initiative

### AI Automation for 3C Processes (2026)
- DTPSR-582: "3C Bot — Using AI to automate some of the 3C processes" (In Progress, Mar 2026)
- GITHUB-9656: Request for Claude/Anthropic API Key (Mar 2026)
- PPSE-43493: n8n Cloud baseline automation pipeline (Done, Mar 2026)
Confirms active AI-driven process automation work ongoing at end of tenure.
