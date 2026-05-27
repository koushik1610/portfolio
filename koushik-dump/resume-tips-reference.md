# Resume Tips Reference — 2026

Distilled from Harvard MCS, Resume Now, ASAP, Reddit r/jobsearchhacks, TechieCV, and real cloud security professional resumes (Abhay Kumar/Cargill, Benjamin Feld/Slack→Aurora, Picklu Paul/Grab, WriteCV security engineer example). Compiled for council reference when updating Koushik's resume.

---

## 1. Universal 2026 Resume Rules

### Structure (Harvard + Resume Now + ASAP consensus)
- **Reverse chronological** — most recent first. This is what recruiters and ATS expect.
- **Sections in order:** Header → Professional Summary → Experience → Skills → Education → Optional (certs, awards, projects)
- **Length:** 1 page if <10 years, 2 pages if >10 years. Never exceed 2.
- **Font:** Calibri, Arial, Inter, or Source Sans Pro. 10–10.5pt body. No decorative fonts.
- **Margins:** 0.6"–1" all sides. Balance white space with content density.
- **Format:** Single-column for ATS safety. No tables, graphics, multi-column layouts.
- **File format:** PDF (unless employer specifically requests .docx).

### Language (Harvard)
- **Specific rather than general** — "222 active detection signatures across 1,412 AWS accounts" not "maintained detection signatures"
- **Active rather than passive** — "Designed and launched" not "Was responsible for"
- **Written to express, not impress** — no flowery language
- **Fact-based** — quantify and qualify everything
- **Scannable** — 6-8 second first read. Key info must surface immediately.
- **No personal pronouns** (I, We, My)
- **No abbreviations** without first use spelled out (unless universally known: AWS, GCP)
- **No narrative style** — bullet points, not paragraphs

### Top 5 Resume Mistakes (Harvard)
1. Spelling and grammar errors
2. Missing contact info
3. Passive language instead of action words
4. Not well organized / hard to skim
5. Not demonstrating results

### Reddit r/jobsearchhacks Consensus (2026)
- "Focusing on achievements with numbers and listing specific details like clients worked with and specific projects — resumes that tell unique details stand out because everyone uses AI now and resumes are too generic"
- "Lead with actual impact — 'contributed to national campaign reaching X audience' beats 'assisted with campaign development'"
- "A narrative that's scannable for metric-supported outcomes delivered and how you supported strategic goals"
- "I redesigned my resume to be readable in about 9 seconds and it actually started getting me interviews"

---

## 2. ATS Optimization (All Sources)

- Use standard section headings: "Experience", "Skills", "Education" — not creative alternatives
- Include job-specific keywords naturally throughout (not keyword-stuffed)
- Match keywords from job descriptions verbatim where honest
- Clean formatting: no tables, no text boxes, no headers/footers (ATS may skip them)
- Test with ATS checkers before submitting

### Security Engineer ATS Keywords (TechieCV 2026)
Top keywords by frequency in 2026 job postings:
1. AWS / Azure / GCP (96%)
2. Python (90%)
3. SIEM (Splunk / Sentinel) (82%)
4. MITRE ATT&CK (78%)
5. Okta / Entra ID (72%)
6. Kubernetes (70%)
7. Snyk / Semgrep (64%)
8. Terraform (60%)
9. Wiz / Prisma Cloud (CSPM) (56%)
10. Tenable / Qualys (52%)
11. HashiCorp Vault (48%)

---

## 3. Bullet Point Formula (TechieCV + Cloud Security Resumes)

### The 2026 Credible Bullet Formula
> **Action verb** + **what you did** + **named tool/platform** + **scope (accounts, endpoints, rules)** + **measurable result** + **framework/SLA context**

### Six Number Families That Work (TechieCV)

1. **Detection rules authored** — with platform and ATT&CK mapping
   - "Wrote 64 Sigma detections + 22 Sentinel KQL queries mapped to MITRE ATT&CK Initial Access and Lateral Movement"

2. **Vulnerabilities driven to closure** — with prioritization model
   - "Closed 4,200 Wiz findings ranked by EPSS and asset criticality across two quarters"

3. **Cloud accounts protected** — with multi-cloud breakdown
   - "Extended CSPM coverage across 86 AWS accounts and 14 Azure subscriptions"

4. **Audit-pass outcomes** — with framework name
   - "Passed SOC 2 Type II with zero exceptions on the security-engineering control set across 28 controls"

5. **Mean-time-to-respond** — with SLA window
   - "Cut Sev 2 IR MTTR from 4 hours to 38 minutes through a Tines SOAR playbook"

6. **Remediation cycle compression** — on AppSec findings
   - "Snyk critical-finding SLA dropped from 14 days to 4 days across 12 product squads"

> "Bare numbers stripped of a platform, a framework, or an SLA window read like padding in 2026; a credible bullet wires one or two of these figures to a specific control surface and a named product." — TechieCV

---

## 4. What Staff/Senior Cloud Security Resumes Actually Look Like

### Abhay Kumar — Senior Architect, Cargill (500+ accounts)
**Summary style:** Role + scope + 2-3 biggest wins with numbers
> "Own CSPM strategy for 500+ cloud accounts using Wiz across AWS/Azure/GCP. Architecting security baselines mapped to CSA CCM with 92% control coverage. Building LLM-powered compliance automation achieving 89% precision."

**Bullet patterns:**
- "Built cloud security program from scratch for platform serving 300M+ users"
- "Reduced attack surface by 35%"
- "Led GenAI red teaming for 5 AI products"
- "Drove ISO 27001/SOC 2/FTC certifications to zero critical findings"
- "Enhanced Splunk SIEM with 50+ detection rules"
- "Saved $200K annually in infrastructure costs"

### Benjamin Feld — Staff Security Engineer, Aurora (self-driving)
**Summary style:** Narrative paragraph with role definition
> "Operate as Technical Lead responsible for defining and executing enterprise security strategy across client endpoints, corporate SaaS, internal infrastructure, and IAM. Translate ambiguous, high-level business goals into concrete, scalable, production-grade security architectures."

**Bullet patterns (accomplishments section):**
- "Architected and built hyper-scalable malware scanning service using Go, Yara, Docker, Kubernetes, AWS"
- "Designed and deployed dedicated AWS account for Security Operations Team including VPC architecture and IaC pipelines"
- "Led global rollout of DNS filtering technology across all corporate endpoints"
- "Contributed to Splunk rollout including data ingestion, normalization, and configuration"

### Picklu Paul — Senior Engineering Leader, Grab
**Summary style:** Title + years + biggest impact + external signal
> "Engineering leader, author, and consultant with 10+ years. At Grab, lead AI security—developing LLM-powered triaging engine cutting false positives by 85%. Author of Demystifying DevSecOps in AWS. Keynote speaker at executive conferences."

**Bullet patterns:**
- "Partnered with CTO to align InfoSec strategy with engineering OKRs"
- "Built LLM-powered code triaging engine, reducing false positives by 85%"
- "Built Python-based traffic management platform; cut incident response time by 60%"
- "Founding member of cybersecurity org; built multi-cloud security across GCP, AWS, Azure"

### WriteCV Security Engineer Example
**Summary style:** Years + specialization + 2 quantified wins
> "7+ years designing security infrastructure for cloud-native applications, specializing in AppSec and DevSecOps. Built AppSec program reducing critical vulnerabilities by 75%. Implemented zero-trust across 500+ microservices."

**Bullet patterns:**
- "Automated security scanning across 40+ CI/CD pipelines, reducing MTTR from 14 days to 5.5 days (60%)"
- "Developed custom Python tooling to automate AWS IAM policy audits, identifying 35 over-permissioned roles across 12 accounts"
- "Conducted vulnerability assessments across 300+ endpoints, triaging 1,300+ findings per quarter"

---

## 5. Action Verbs (Harvard — by category)

**Leadership:** Accomplished, Achieved, Directed, Executed, Led, Orchestrated, Oversaw, Spearheaded, Strengthened, Surpassed

**Technical:** Assembled, Built, Designed, Devised, Engineered, Maintained, Optimized, Programmed, Solved, Standardized, Streamlined, Upgraded

**Teaching/Mentoring:** Advised, Coached, Enabled, Guided, Instructed, Mentored, Trained

**Research:** Conducted, Evaluated, Identified, Investigated, Systematized

**Communication:** Authored, Delivered, Presented, Synthesized

---

## 6. Professional Summary Best Practices (All Sources)

- 2-3 sentences max
- Lead with: role + team size/scope + years
- Middle: 1-2 biggest quantified achievements
- End: what differentiates you (AI + security intersection, breadth across disciplines)
- Include keywords from target job descriptions
- No personal pronouns
- No "seeking opportunities" language (that's an objective, not a summary)

### Strong Summary Examples from Cloud Security Professionals:

**Pattern A: Scope → Wins → Differentiator**
> "Senior Architect leading Cloud Security Engineering at [Company], owning CSPM strategy for 500+ accounts, architecting baselines mapped to CSA CCM with 92% coverage, and building LLM-powered compliance automation achieving 89% precision."

**Pattern B: Role → Years → Impact → External Signal**
> "Engineering leader with 10+ years building AI security and DevSecOps at scale. At [Company], developed LLM-powered triaging engine cutting false positives by 85%. Author of [Book]. Speaker at [Conferences]."

**Pattern C: Years → Specialization → Two Quantified Wins**
> "7+ years designing security infrastructure for cloud-native applications. Built AppSec program reducing critical vulnerabilities by 75%. Implemented zero-trust across 500+ microservices."

---

## 7. Key Gaps in Koushik's Current Resume (Council Should Address)

Based on comparing current resume against these references:

1. **Summary is descriptive, not impact-led** — should lead with scope + quantified win, not describe what the team does
2. **Bullets need tighter action-verb + result pairing** — some bullets are long narratives when they should be punchier
3. **Missing specific metric families:** MTTR reduction, compliance posture change, remediation cycle compression, false positive reduction rate
4. **Bullet density** — some bullets try to pack too much into one. Better to split into focused achievement bullets.
5. **Skills section** could be more ATS-targeted — should include top keywords from TechieCV list
6. **Mentoring bullet** should use teaching verbs (Coached, Enabled, Guided) per Harvard action verb taxonomy
7. **Consistency** — some bullets start with "Built", some with context. Every bullet should start with a strong action verb.

---

*Reference compiled May 2026. Sources: Harvard MCS "Create a Strong Resume", Resume Now "What Should a Resume Look Like in 2026", ASAP "Best Resume Format in 2026", Reddit r/jobsearchhacks, TechieCV "Security Engineer Resume Skills & ATS Keywords", real resumes from Abhay Kumar (Cargill), Benjamin Feld (Aurora/Slack), Picklu Paul (Grab), WriteCV security engineer example.*
