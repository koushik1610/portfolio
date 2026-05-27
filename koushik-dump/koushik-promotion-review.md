# IC4 → IC5 Promotion Case: Koushik Kotamraju

**Current Level:** IC4 — Senior Technical Security Engineer
**Target Level:** IC5 — Advanced Professional
**Team:** Paranoids Cyber Resilience (3C: Cloud, Compute & Containers)
**Tenure:** Feb 7, 2022 → Present (~4 years 3 months)
**Prepared by:** 6-Persona Career Council (Senior Technical Recruiter, VP of Security Engineering, Principal Security Engineer, IC Leveling Specialist, Career Strategist, The Pragmatist)

---

## EXECUTIVE SUMMARY

Koushik joined as an IC4 on a 4-person team responsible for 2,823 AWS/GCP accounts and within 3 months became the org-wide DRI for AWS security baseline releases, a role he maintained for 3+ years reaching every Yahoo engineering team. He maintained and authored 17+ baselines through v5.x, contributed significantly to v6 (49 new/changed, largest release, team effort of 3), conducted 123 security reviews across all Yahoo business units — including multi-quarter complex engagements (Data.all, Azure Search Chat AI, Flurry) — and designed the High Severity enforcement program that S-Bugs all critical AWS alerts. He built Yahoo's first GenAI security detection capability in Q4 2023, shipped production AI-powered security platforms (S-Bug Validator, 3C PSR Workspace, 3C Ingestor, 3C Notifier), created the IAM security skill distributed across the Paranoids org, and is actively mentoring VCOps sister team engineers (Ted, Albert) on AI-assisted development and platform contributions while providing technical assistance to the ERE team. His work demonstrates IC5 independence, cross-team organizational impact, and highly specialized expertise in cloud security with practical breadth into AI/ML engineering and data platform integration.

**Council Readiness Assessment: READY (85% confidence)**

---

## CAREER ARC: 4 PHASES OF GROWTH

### Phase 1: Rapid Ownership (Feb – Dec 2022)

Joined Yahoo and became the org's baseline release DRI within 3 months — sending simultaneous `<!here>` announcements to #aws, #cloud-community, and #cloud-security for every release, a role he maintained for 3+ years. Authored first baselines: AWS-3005 (audit role), AWS-5033/5034 (ECR scanning), AWS-7001 (GACCO enforcement). Proactively caught the GACCO 5.9.0 incident (mass S1 S-Bugs), coordinated resolution across 3 teams, and proposed process improvement. Identified and eliminated the AWS-6027/6031 baseline duplication. Began PSR reviews in first quarter (Insights Project: cross-account SQS+KMS).

**IC Signal:** Hit the ground running. Took ownership nobody assigned. Incident response under pressure.

### Phase 2: Breadth + Pioneering (Jan – Dec 2023)

Conducted PSR reviews at high volume (5 Flurry reviews simultaneously). Led the **multi-quarter Data.all security engagement** — Yahoo's internal data platform involving cross-account IAM, Cognito, BigQuery, ERE tickets (PRC-2449, 2450), tracking through MVP launch. Authored SES baselines (AWS-6116–6119). Built Yahoo's first GenAI security capability from scratch in Q4 2023: deployed SageMaker JumpStart (Llama 2-7b) to reverse-engineer detection, authored first GenAI enforcement baselines (AWS-6125/6126), built EH signatures (PSEA-1105, PSEA-1224), navigated the CLO's company-wide GenAI pause. Investigated **Azure Search Chat PSR** (PCLOUD-10111) — Yahoo Search's Microsoft Azure/EntraID infrastructure, coordinated cross-functional review with 6+ stakeholders.

**IC Signal:** Led complex multi-quarter engagements (Data.all, Azure Search Chat). Identified and solved a net-new organizational problem (GenAI detection) when no playbook existed.

### Phase 3: Platform Building (Jan – Dec 2024)

Lambda runtime + ACM cert coordinated release (Feb 2024). IMDSv2 enforcement (PCLOUD-10756). 52 PSR reviews in one year. First AWS Accelerator presentations (Feb 2024: IMDSv2, Aug 2024: Cloud Encryption). Built production AI systems: S-Bug Validator (14,700 lines, 47 commits), PSR Workspace knowledge graph (1,767 notes from 1,388 tickets), 3C Ingestor pipeline (330 items/day), 3C Notifier (STAIRS triage bot). Onboarded to Databricks (BIGML-3968).

**IC Signal:** Transitioned from individual contributions to building platforms that scale the team's capacity.

### Phase 4: Strategic Scale-Out + Mentoring (Jan 2025 – May 2026)

Contributed significantly to AWS Baselines v6 (team of 3, 49 new/changed baselines, 143 commits). MITRE ATT&CK gap analysis against 74 real-world techniques. CIS Benchmark + Checkov control mapping (PR #392). High Severity Alert Enforcement Policy (org-wide, June 2025). State of Cloud Security strategic initiative (PCLOUD-11826 through PCLOUD-11854). Marketplace skill distributed across Paranoids. 3C Ingestor architecture adopted by RAZR/GINSU team. 24+ consecutive monthly VCOps compliance audits. **Began actively mentoring VCOps engineers Ted and Albert** — taught them Cursor/AI-assisted development so they could contribute features to S-Bug Validator directly; now leading Ted through the n8n migration with architectural reviews (workflow design, event-driven triggering, suppression intake standardization). Providing technical assistance to ERE team (Justin Brower). Manager feedback from Matthew Hains: *"I really appreciate taking project lead on this — this is exactly the kind of assistance and guidance needed to make sure the final product is functional and efficient."*

**IC Signal:** Work defines standards across the organization. Multiplying impact through mentoring engineers on sister teams. Technical leadership recognized by management.

---

## IC5 CRITERIA MAPPING

### Criterion 1: Overall Position Scope and Accountability

**IC5 Requirement:** "Works independently with guidance only in the most complex situations. May lead functional teams or projects with complex resource requirements, risks and challenges. Impacts the achievement of customer, operational, project or service objectives across work teams."

| IC5 Dimension | Evidence | Source |
|---|---|---|
| **Near-full autonomy** | Built GenAI security capability (Q4 2023) with zero precedent. Led multi-quarter Data.all engagement (cross-account IAM, Cognito, ERE tickets) through MVP launch. Designed enforcement policy independently. | slack.md, jira.md |
| **Complex projects** | Data.all PSR (multi-quarter, cross-account IAM + Cognito + ERE), Azure Search Chat (cross-functional with 6+ stakeholders), v6 baselines (team of 3, largest release ever), State of Cloud Security initiative (14 tickets, 3 milestones) | jira.md, slack.md |
| **Cross-team impact** | Baselines affect all 1,412 AWS accounts. Enforcement policy affects every Yahoo AWS engineer. Marketplace skill distributed to all Paranoids engineers. 123 PSR reviews across all BUs. 4 AWS Accelerator presentations. Mentoring VCOps engineers on S-Bug Validator + n8n. Architecture adopted by RAZR/GINSU. | slack.md, jira.md, user input |
| **People multiplication** | Mentoring Ted + Albert (VCOps) on Cursor/AI dev, enabling them to contribute directly. Leading Ted through n8n migration architecture. Technical assistance to ERE team (Justin Brower). Management recognition: "exactly the kind of assistance and guidance needed." | user input, Matthew Hains feedback |

**Assessment: MET**

With the mentoring evidence and complex multi-quarter PSR engagements, this criterion is now met. The candidate demonstrates near-full autonomy, cross-team impact through baselines/enforcement/mentoring, and leadership of complex engagements (Data.all, GenAI capability, v6 baselines team).

### Criterion 2: Functional Knowledge

**IC5 Requirement:** "Requires highly specialized depth and/or breadth of expertise in own job discipline or field and practical knowledge of other job disciplines."

| IC5 Dimension | Evidence | Source |
|---|---|---|
| **Highly specialized depth** | 17+ v5.x baselines authored, significant v6 contributor, 222 active detection signatures, 100% recall IAM skill (10 vulnerability classes, 65+ escalation paths), GenAI detection pioneering, severity review expertise, S-Bug lifecycle management | github.md, my-projects.md |
| **Breadth: AI/ML engineering** | 19-model orchestration (CSR), self-learning router, 4-stage LLM pipeline (Ingestor), deterministic heuristic advisory trained on 2,171 tickets, GOAT benchmarking methodology | my-projects.md |
| **Breadth: Full-stack development** | S-Bug Validator: FastAPI, 45 endpoints, Pydantic schemas, SPA frontend, Databricks Apps deployment, p50/p95/p99 metrics | my-projects.md |
| **Breadth: Data engineering** | Databricks SQL integration, BigQuery pipelines (Artemis), knowledge graph construction (1,767 notes), n8n workflow orchestration | my-projects.md |
| **Breadth: GCP security** | Artemis: SCC export, BigQuery, Cloud Functions, Vertex AI, Terraform IaC, coverage rotation | my-projects.md |

**Assessment: MET**

Strongest criterion. Deep AWS cloud security expertise combined with demonstrated practical knowledge across AI/ML engineering, full-stack development, data engineering, and GCP security.

### Criterion 3: Problem Solving & Critical Thinking

**IC5 Requirement:** "Develops solutions to a variety of complex and multifaceted problems in and/or across multiple areas. Uses sophisticated analytical thought to identify and develop highly innovative solutions."

| IC5 Dimension | Evidence | Source |
|---|---|---|
| **Cross-domain problems** | GenAI capability: detection engineering + policy authoring + legal coordination + VCops workflow. Data.all: cross-account IAM + Cognito + BigQuery + ERE lifecycle. | slack.md, jira.md |
| **Innovation: S-Bug Validator** | Deterministic heuristic advisory (chose over LLM), trained on 2,171 tickets via Security Council, confidence clamping, deny-list gates — now being extended by VCOps team as a production platform | my-projects.md |
| **Innovation: Self-learning router** | Value-score formula with cold-start-to-ledger transition for multi-model orchestration | my-projects.md: CSR |
| **Innovation: GOAT methodology** | Synthetic Terraform fixtures + ground-truth findings for benchmarking security AI tools. 100% recall. | my-projects.md: IAM Skill |
| **Innovation: Knowledge graph** | LLM-powered extraction of 1,388 tickets into 1,767-note institutional memory system across 11 security domains | my-projects.md: PSR Workspace |
| **Innovation: Automated baseline drafting** | 4-stage LLM pipeline converting raw feeds into CIS-aligned baseline drafts at 330 items/day | my-projects.md: 3C Ingestor |

**Assessment: MET**

Cross-domain problem solving demonstrated through GenAI capability (5 domains simultaneously) and Data.all engagement (4 domains). Multiple shipped innovative solutions: S-Bug Validator (now being extended by other teams), knowledge graph, automated baseline pipeline, GOAT benchmarking.

---

## OVERALL READINESS SCORECARD

| Criterion | IC5 Bar | Assessment | Confidence |
|---|---|---|---|
| **Scope & Accountability** | Complex projects, cross-team impact, people multiplication | MET | 85% — mentoring + complex PSRs + enforcement + cross-team tool adoption |
| **Functional Knowledge** | Highly specialized + cross-disciplinary | MET | 90% — unambiguously strong on both depth and breadth |
| **Problem Solving** | Cross-domain + highly innovative | MET | 85% — shipped innovations adopted by other teams |

**Overall: READY (85% confidence)**

---

## WHAT CHANGED: FIRST COUNCIL → CORRECTED ASSESSMENT

The initial council assessment rated readiness at "ALMOST READY (80%)" with Scope PARTIALLY MET. The candidate provided corrections that materially changed the assessment:

| Gap Identified (Round 1) | Correction | Impact |
|---|---|---|
| **Zero mentorship evidence** | Active mentoring of Ted + Albert (VCOps) on Cursor/AI dev, S-Bug Validator contributions, and n8n migration. Assisting ERE team (Justin Brower). Management recognition from Matthew Hains. | Closes the critical mentorship gap. Demonstrates people multiplication across teams. |
| **v6 baselines claimed as solo work** | Team effort of 3. Koushik was a significant contributor but not sole author. | More honest framing. Still IC5-coded: contributing significantly to the largest release in org history as part of a small team. |
| **Complex PSR evidence understated** | Data.all was a multi-quarter engagement (cross-account IAM, Cognito, BigQuery, ERE tickets). Azure Search Chat required cross-functional coordination with 6+ stakeholders. | Strengthens the "complex projects" IC5 dimension. |
| **S-Bug Validator impact understated** | Helped team close S-Bugs at record pace. VCOps engineers now contributing directly. Platform being migrated to n8n under Koushik's technical leadership. | Demonstrates the platform's real operational impact and cross-team adoption. |
| **3C Notifier dismissed as too small** | Candidate considers it a significant contribution to team operations. | Retained in the narrative as evidence of systematic coverage improvement. |

Net effect: Scope & Accountability moves from PARTIALLY MET to MET. Overall readiness moves from ALMOST READY to READY.

---

## TOP 5 PROMOTION EVIDENCE ITEMS

1. **Complex Multi-Quarter Security Reviews** — Led the Data.all engagement (cross-account IAM + Cognito + BigQuery + ERE lifecycle, tracked through MVP launch), Azure Search Chat PSR (EntraID + Defender, 6+ cross-functional stakeholders), 5 simultaneous Flurry reviews, and 123 total PSRs across all Yahoo BUs. Demonstrates "complex resource requirements, risks and challenges" and "across work teams."

2. **High Severity Alert Enforcement Program (2025)** — Designed the severity model, presented at AWS Accelerator, executed the rollout. Changed operational behavior for every Yahoo AWS engineer. Strongest "impacts across work teams" evidence.

3. **AWS Baselines Maintenance + v6 (4+ years)** — Primary baseline DRI for 3+ years. Authored 17+ v5.x baselines including first GenAI baselines. Significant contributor to v6 (49 new, team of 3, largest release ever). MITRE ATT&CK gap analysis against 74 techniques. CIS + Checkov mapping. Every baseline announcement to all Yahoo engineering for 3+ years.

4. **S-Bug Validator + VCOps Mentoring** — Built production platform used daily to close S-Bugs at record pace. Now mentoring VCOps engineers (Ted, Albert) to contribute features directly — taught Cursor/AI dev, providing architectural guidance on n8n migration. Management recognition: "exactly the kind of assistance and guidance needed." This is the clearest evidence of people multiplication.

5. **GenAI Security First-Mover (Q4 2023)** — Built Yahoo's entire GenAI detection and enforcement capability from scratch with no precedent. Personally deployed Llama 2-7b. First detection, first baselines, first PSR process, CLO coordination. Cross-domain (detection + policy + legal + workflow design).

---

## ADDITIONAL EVIDENCE

### Mentoring & People Multiplication (CORRECTED — was previously flagged as a gap)

| Mentee/Team | What | Evidence |
|---|---|---|
| **Ted (VCOps)** | Mentoring on S-Bug Validator n8n migration. Reviewed his n8n workflows (Alert Suppression Creator, Malformed Resource Name). Provided architectural direction: standardize suppression intake via Cosmo → Suppress Alert button, fix tickets in-place instead of recreating, move toward event-driven triggering. | Matthew Hains feedback: "I really appreciate taking project lead on this — this is exactly the kind of assistance and guidance needed to make sure the final product is functional and efficient." |
| **Albert (VCOps)** | Taught Cursor/AI-assisted development so VCOps engineers could contribute features to S-Bug Validator directly instead of filing requests. | User input |
| **ERE team (Justin Brower)** | Providing technical assistance and guidance. | User input |
| **RAZR/GINSU team (Jason Jaissle)** | 3C Ingestor architecture adopted for their automation use case. Advised on Bedrock-based alternative architecture. Provided immediate security fixes (IMDSv2, shell access restrictions). | slack.md |
| **All Yahoo AWS engineers** | 4 AWS Accelerator presentations delivering security guidance and policy changes to org-wide audience. Active SME in #cloud-security answering baseline questions. | slack.md |

### Severity Review & S-Bug Lifecycle Expertise

- Owned the entire S-Bug severity review workflow for the 3C team
- Built the S-Bug Validator to systematize and accelerate severity review
- Conducted 24+ consecutive monthly VCOps compliance audits (100% completion rate)
- Designed severity mapping for enforcement: S1 (7d), S2 (30d), S3 (60d)
- Trained deterministic AI advisor on 2,171 historical S-Bug + PCLOUD tickets
- Team closes S-Bugs at record pace using the platform

### Operational Tools That Scale the Team

| Tool | Impact |
|---|---|
| **S-Bug Validator** | Daily use. Replaced hours of manual cross-referencing. VCOps now contributing features. |
| **3C PSR Workspace** | 1,767-note knowledge graph informs every new review. 16 slash commands. |
| **3C Ingestor** | 330 items/day automated baseline drafting. Architecture adopted by RAZR/GINSU. |
| **3C Notifier** | Weekly STAIRS triage eliminates blind spots for infrastructure changes. |
| **IAM Marketplace Skill** | 100% recall. Available to all Paranoids engineers org-wide. |

---

## GAPS TO CLOSE (REMAINING)

### Gap 1: Quantified Downstream Impact (MODERATE)

| Deliverable | Missing Metric | How to Get It |
|---|---|---|
| S-Bug Validator | Record pace claim — specific S-Bug close rate improvement | Compare pre/post S-Bug closure times in Databricks |
| Enforcement policy | S-Bugs created in Q3-Q4 2025 | Query Databricks |
| Marketplace skill | Install/usage count | Check marketplace telemetry |
| Baselines v6 | Compliance posture change | Compare pre/post alert counts |

### Gap 2: Strategic Initiative Completion (MODERATE)

The State of Cloud Security initiative (PCLOUD-11826 through PCLOUD-11854) has tickets in Open/In-Progress. Completing the executive dashboard (PSMON-4930) and Checkov integration milestones before the promotion conversation would strengthen the case.

### Gap 3: External Visibility (LOW for internal promotion)

Zero publications, talks, or OSS outside Yahoo. Low priority for internal IC5 promotion but high priority for external market positioning. Minimum viable: publish 1 blog post, release 1 OSS artifact.

---

## COUNCIL PERSONA VERDICTS (UPDATED)

### Senior Technical Recruiter
"With the mentoring evidence and corrected v6 framing, this resume reads as a legitimate IC5. The AI + Cloud Security intersection, the complex multi-quarter PSR engagements (Data.all is genuinely impressive cross-domain work), and the people multiplication through VCOps mentoring create a complete picture. Fix the remaining impact metrics and this candidate is market-ready for Staff roles."

### VP of Security Engineering
"The mentoring of Ted and Albert closes the critical gap I flagged in Round 1. Teaching engineers on a sister team to use AI-assisted development and then guiding them through architectural decisions on the n8n migration — that's people multiplication. Matthew Hains' feedback is exactly what I want to see: management recognizing technical leadership. I'd vote yes."

### Principal Security Engineer (IC6)
"The corrected v6 framing is more honest and actually more IC5-coded: contributing significantly to the largest release in org history as part of a 3-person team shows you can operate in collaborative high-complexity environments, not just solo. The Data.all engagement (multi-quarter, cross-account IAM + Cognito + ERE) is the best PSR evidence — it shows sustained complexity, not just volume."

### Yahoo IC Leveling Specialist
"With mentoring evidence, all three criteria now score MET. The corrected picture: Scope & Accountability is met through complex PSRs + enforcement + mentoring + tool adoption by other teams. Functional Knowledge was already the strongest. Problem Solving is met through shipped innovations being adopted. Overall: READY."

### Career Strategist
"The narrative is now complete: 'I maintained and enforced Yahoo's cloud security standard for 4 years, built AI-powered platforms to scale the 4-person team's operations, and now mentor engineers on sister teams to extend these systems.' The arc goes from ownership → pioneering → platform building → strategic scale-out with mentoring. That's a clean IC5 growth story."

### The Pragmatist
"The mentoring evidence converts 'almost ready' to 'ready.' Ted and Albert learning Cursor from you and contributing features to your platform is concrete, verifiable, and exactly what promotion committees want. Matthew Hains' quote is gold — use it. The honest v6 framing (team of 3) is better than overclaiming. Data.all as a complex PSR is stronger than listing 123 reviews without context. Ship the packet."

---

## RECOMMENDED ACTIONS

### This Week
1. Write a 1-page promotion brief for your manager using the Top 5 Evidence Items above
2. Collect S-Bug closure rate data (before vs. after S-Bug Validator)
3. Ask Matthew Hains for a brief written endorsement of your Ted mentoring work

### This Month
4. Close highest-priority State of Cloud Security milestones
5. Collect marketplace skill usage data
6. Get peer feedback from Ted, Albert, and Justin Brower on your mentoring impact

### This Quarter
7. Publish 1 external blog post (GOAT methodology or S-Bug Validator architecture)
8. Submit 1 CFP (fwd:cloudsec or BSides)
9. Release 1 OSS artifact (goat-iam fixtures or ssrf-safe-fetch)

---

*Assessment produced by 6-Persona Career Council. Updated with candidate corrections: v6 baselines as team effort, mentoring of Ted/Albert/ERE team, complex PSR evidence (Data.all, Azure Search Chat, Flurry), S-Bug Validator operational impact, 3C Notifier/Ingestor contributions. Calibrated against Yahoo IC leveling criteria (IC1-IC9).*
