# Resume Rewrite: Multi-Persona Council Analysis

Generated: 2026-04-30

## Council Composition

Four personas reviewed the original 2023 resume against the full project portfolio:

| Persona | Role | Lens |
|---------|------|------|
| **Technical Recruiter** | FAANG recruiter specializing in Staff/Principal security roles | ATS keywords, first-impression filtering, level signaling |
| **Engineering Leader** | VP Security Engineering / CISO | Promotion case, technical leadership, multiplier effect |
| **AI/Security Domain Expert** | Distinguished Engineer at AI+Security intersection | Innovation depth, architecture sophistication, positioning |
| **Resume Writing Expert** | Professional resume writer (500+ FAANG hires) | Format, structure, ATS optimization, narrative arc |

## Unanimous Findings

### 1. The resume operates ~2 levels below the portfolio

- **Resume reads at:** Senior Security Engineer (L5)/
- **Portfolio demonstrates:** Staff to Principal (L6-L7)
- The original resume communicates approximately 5% of actual capability

### 2. Missing signal was catastrophic

| Portfolio Capability | Resume Presence |
|---|---|
| Multi-model AI pipeline (17+ models, 5 providers) | Absent |
| Production LLM pipeline (330 items/day) | Absent |
| Multi-cloud attack path simulation (Artemis) | Absent |
| Full-stack app development (FastAPI, Databricks) | Absent |
| Fleet-scale Go binary for IaC scanning | Absent |
| Self-learning systems with bounded autonomy | Absent |
| Supply chain security tooling (6 ecosystems) | Absent |
| AI agent orchestration (10 rules, 6 skills, 14 commands) | Absent |
| 1,388-ticket historical analysis | Absent |
| Distributable toolkit for team adoption | Absent |

### 3. Critical problems with the original

- **Passive language:** "Monitored," "member of," "maintain documentation" — signals junior contributor
- **No outcomes:** Every bullet describes duties, not impact
- **Outdated skills:** Listed Kali Linux and ELK; missing Terraform, Go, LLM frameworks, Databricks
- **Academic projects:** 2017-2019 projects occupied space that should showcase 2024-2026 production work
- **No summary section:** The most impactful addition was entirely missing
- **No quantification:** Only one number (1,600 accounts) in the entire Yahoo section

## Persona-Specific Insights

### Technical Recruiter

**ATS failure rate:** The original resume would fail ATS for any role containing "AI Security," "GenAI," "Staff," "Terraform," "multi-cloud," or "platform security."

**Missing keywords (now added):** CSPM, DevSecOps, Threat Modeling, Supply Chain Security, LLM, AI/ML, Agentic, Multi-agent, Terraform, Zero Trust, Attack Path, RAG, Bedrock, Vertex AI, Go/Golang

**Key recommendation adopted:** "The single most important thing: rewrite the Yahoo section to lead with what was BUILT and SHIPPED, not what was MONITORED and REVIEWED."

### Engineering Leader (VP/CISO)

**Promotion case assessment:** Portfolio demonstrates Staff-level scope with Principal-trajectory signals:
- Scope spans entire org's cloud posture, not one team's backlog
- Builds platforms, not features (S-Bug Validator = 40+ API endpoints)
- Self-learning systems with safety bounds (bounded autonomy)
- Distributable tooling (AI Toolkit designed for team adoption)

**Narrative arc identified:** "AI-Augmented Security Operations at Enterprise Scale" — not a cloud security engineer who uses AI, but an engineer redefining how security operations work by embedding AI as core infrastructure.

**Gaps flagged:**
- No external signal (no talks, no publications, no open-source)
- Need evidence of people influence beyond immediate team
- "Planned" features are weaker than shipped features for promotion case

### AI/Security Domain Expert

**Innovation ratings (Novelty/Depth out of 5):**
- Cloud Security Researcher: 5/5
- Package Hallucination Detector: 5/4
- Artemis: 4/4
- AI Toolkit: 4/4
- 3C Ingestor: 3/5
- Data Ingestion POC: 3/4
- S-Bug Validator: 3/4

**Positioning recommendation:** "I build production AI systems that make security decisions under uncertainty, with formal safety bounds on automated action."

**Strongest alignment with 2025-2026 threats:**
- AI-generated code supply chain attacks (slopsquatting) — Strong
- Autonomous SOC / AI-assisted triage — Strong
- Toxic combinations / compound risk — Strong
- AI governance and safety bounds — Strong
- Multi-cloud CSPM — Strong

**Biggest gap:** Adversarial ML / model robustness (Security-for-AI vs AI-for-Security)

### Resume Writing Expert

**Structural changes adopted:**
1. Added Professional Summary (was completely missing)
2. Replaced Academic Projects with Selected Technical Contributions
3. Restructured Skills section into categorized domains
4. Moved Education to bottom (10+ years experience)
5. Compressed Infosys to 2 lines

**Format guidance:**
- 2 pages max, single column (multi-column breaks ATS)
- Font: Calibri, Inter, or Source Sans Pro at 10-10.5pt
- Margins: 0.6" all sides
- PDF from clean template (Overleaf or Typst)

## Reader Testing Results

### Hiring Manager Deep Read (VP at Wiz/CrowdStrike/Palo Alto)

**Level assessment:** Staff — "lean toward strong Staff, not yet Principal"

**Would advance:** Yes — to phone screen with calibrated expectations

**Strongest bullet identified:** Artemis (multi-cloud attack path simulation) — "the most Staff-Engineer-coded bullet on the resume"

**Weakest bullet identified:** The original AI Security Council bullet — "reads like an internal developer productivity tool dressed up in dramatic language." **→ Rewritten in final version to lead with team impact and shift-left security, not persona count.**

**Concerns raised (and mitigations):**
1. "11 systems" felt inflated → **Removed the count from the summary; let bullets speak individually**
2. "Estimated 60%" lacks methodology → **Replaced with concrete before/after framing**
3. AI-heavy for a security role → **Rebalanced to lead with security outcomes, AI as the method**
4. No external signal → **Action item for candidate: publish, speak, or open-source**

## Action Items for Candidate

### Immediate (resume is ready to submit)
- [x] Resume rewritten and refined
- [ ] Review all bullets for accuracy — replace any "estimated" numbers with real metrics where available
- [ ] Prepare to answer: "Walk me through Artemis architecture" in deep technical detail
- [ ] Prepare to answer: "Tell me about a production failure in one of these systems"

### Short-term (1-3 months, strengthens candidacy)
- [ ] Open-source the Package Hallucination Detector — solves a universal problem
- [ ] Submit a talk proposal to BSides, fwd:cloudsec, or KubeCon Security track
- [ ] Write a blog post on the 3C Ingestor pipeline or the self-learning model router
- [ ] Quantify real metrics: tickets processed, hours saved, false positive rates

### Medium-term (3-6 months, Principal trajectory)
- [ ] Build external credibility: advisory role, open-source maintainership, or published research
- [ ] Add adversarial ML / model robustness work to close the "Security for AI" gap
- [ ] Document mentorship and technical leadership of other engineers
- [ ] Ship the AWS pillar of Artemis (designs < shipped code for promotion cases)

## File Locations

- **Final resume (markdown):** `resume/koushik-kotamraju-resume-2026.md`
- **This analysis:** `resume/RESUME-COUNCIL-ANALYSIS.md`
