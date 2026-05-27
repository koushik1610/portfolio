# LinkedIn Review Document

**Council member 13 score:** 96 — APPROVED  
**Purpose:** Complete rewrites for all LinkedIn sections. Production-ready copy.

---

## SECTION 1: HEADLINE OPTIONS

**Variant A (Builder-forward) — RECOMMENDED:**
```
Senior Security Engineer · Cloud Identity · Detection Engineering · AI Security · Building at the AI × Cloud Security frontier
```

**Variant B (Metrics-forward):**
```
Senior Security Engineer · 2,823 Cloud Accounts · 222 Detection Rules · 0 False Positives · IAM · AI Security · Amazon Bedrock
```

**Variant C (Principal-signal):**
```
Principal-Track Security Engineer · Cloud Security · IAM Privilege Escalation · LLM Security · Co-Founder (Stealth) · Yahoo Paranoids
```

**Recommendation: Use Variant A as default.**  
Variant A opens with role identity, signals the AI + cloud security intersection (rare and high-demand in 2026), and frames Koushik as a builder — resonates with Wiz, Cloudflare, and Anthropic-adjacent orgs. Swap to Variant C when applying directly to startup roles. Variant B is strong for FAANG recruiter keyword search but can read as a metrics parade out of context.

---

## SECTION 2: ABOUT SECTION (Full Rewrite — ~490 words)

I build the systems that find what adversaries try to hide.

Over 9 years in security, I've moved from enterprise vulnerability assessments to operating cloud security infrastructure at one of the largest consumer internet companies in the world. At Yahoo Paranoids, I'm part of a 4-person team responsible for the security posture of 2,823 AWS and GCP cloud accounts. That means every detection rule we write, every IAM path we close, and every automation pipeline we ship has to work — because the blast radius of getting it wrong is enormous, and the team size means there's no one to cover for you.

My work lives at the intersection of cloud security, identity, and AI.

On the cloud security side, I've built detection engineering infrastructure from the ground up: 222 active detection rules across our SIEM and SOAR stack, running at a sustained zero false-positive rate. I've identified and documented 65+ IAM privilege escalation paths in AWS environments, and I've built two tools that I'm proud of: Artemis, an attack path simulation system that models adversarial traversal across cloud identity graphs, and Antitoxin, an IAM toxic combination dissolution tool that finds dangerous permission co-occurrences and generates least-privilege rewrites. I also achieved 100% recall on the GOAT benchmark — the gold-standard evaluation framework for IAM privilege escalation path analysis — validating that the detection coverage we've built is complete, not just good enough.

On the AI side, I've been building and evaluating LLM security pipelines using Amazon Bedrock. I ran a systematic evaluation of 19 models across 5 providers on structured security code review tasks, optimizing for vulnerability class recall and cost, and got the production pipeline to $1.40/run. That pipeline has now automated 123 structured security code reviews. I'm also actively researching LLM security itself — how these models fail under adversarial inputs, where prompt injection creates real risk, and how AI pipeline security needs to be designed differently from traditional software security.

Before Yahoo, I spent two years at Cyr3con building threat intelligence infrastructure. I constructed a 1,767-node knowledge graph connecting adversary groups, malware families, TTPs, and dark-web intelligence signals — and built the NLP pipelines to populate it automatically from unstructured threat actor data. Before that, I started my career at Infosys doing enterprise security assessments and SOC work.

I use Python and Terraform daily. I think in MITRE ATT&CK. I care about Zero Trust not as a framework to check a compliance box but as an architectural discipline that actually reduces identity risk surface.

Right now, I'm co-founding a company in stealth. I'm also open to Principal or Staff Security Engineer roles at organizations where the security problems are unsolved, the AI surface is growing, and the team is small enough that your work actually matters.

If your security problems live at the intersection of cloud identity, detection engineering, and AI systems — let's talk.

---

## SECTION 3: FEATURED SECTION

Pin 4 items in this order:

### Pin 1 — Artemis Research Write-Up
**What to create:** Write a 600–900 word LinkedIn article (or link to a GitHub README or personal site page) describing Artemis — the attack path simulation system. Frame it as: "How I built a red-team analog for cloud identity." Include what problem it solves, how the privilege graph is constructed, and one sanitized example of an attack path it surfaced.

**Featured card framing copy:**
> "I built Artemis to answer a question that manual IAM reviews can't: where can an attacker go from here? Here's how cloud identity attack path simulation works — and why it matters more than ever."

### Pin 2 — GOAT Benchmark Result Post
**What to create:** A LinkedIn post announcing the 100% recall result on the GOAT benchmark. Keep it technical and specific — explain what GOAT tests, why 100% recall is meaningful, and what it implies about detection coverage.

**Featured card framing copy:**
> "100% recall on the GOAT benchmark for IAM privilege escalation analysis. Here's what that means and why most tooling doesn't get there."

### Pin 3 — LLM Security Pipeline Technical Post
**What to create:** A LinkedIn post or article on the 19-model, 5-provider evaluation work. Lead with: "How do you evaluate whether an LLM is actually good at security code review — not just at looking like it is?" Walk through evaluation criteria, key model failure modes, and the cost optimization story.

**Featured card framing copy:**
> "I evaluated 19 LLMs across 5 providers on security code review tasks. Here's what the data showed — and why model choice matters more than people think for security applications."

### Pin 4 — Antitoxin Description or GitHub Link
**What to create:** Either a GitHub repo README for Antitoxin (if open-sourceable) or a LinkedIn post explaining IAM toxic combinations — what they are, why standard least-privilege advice doesn't catch them, and how automated dissolution works.

**Featured card framing copy:**
> "IAM least-privilege is necessary but not sufficient. Toxic combinations — individually-permitted actions that are jointly exploitable — are the gap most cloud security programs miss. Here's what I built to close it."

---

## SECTION 4: EXPERIENCE BULLETS — YAHOO PARANOIDS (LinkedIn Narrative Format)

**Bullet 1 — Scale and Scope**
As part of a 4-person team, I own cloud security detection and response coverage across 2,823 AWS and GCP accounts — one of the larger cloud security scopes I'm aware of operated by a team this size. The constraint forces every architectural and tooling decision to be built for leverage, not headcount.

**Bullet 2 — Detection Engineering at Zero False Positives**
I've built and maintained 222 active detection rules across our SIEM and SOAR stack, maintaining a false-positive rate of zero across the full rule set. In detection engineering, false positives are a form of failure — they erode analyst trust, slow response, and obscure real signals. Getting to zero and holding it at this rule count requires treating detection logic as production code: tested, reviewed, and iterated.

**Bullet 3 — IAM and Identity Security**
I've identified and documented 65+ IAM privilege escalation paths in AWS environments, and I achieved 100% recall on the GOAT benchmark — the gold-standard evaluation framework for IAM privilege escalation path coverage. Identity is the new perimeter in cloud environments, and privilege escalation paths are the primary mechanism adversaries use to move from initial access to full account compromise. Knowing your IAM graph better than an attacker does is the whole game.

**Bullet 4 — AI Security Tooling and LLM Pipeline**
I built and operate an AI-driven security automation pipeline using Amazon Bedrock that has automated 123 structured security code reviews. The pipeline required evaluating 19 LLMs across 5 providers on security reasoning tasks — optimizing for vulnerability recall, output consistency, and cost — and now runs at $1.40 per review. This work sits at the intersection of AI systems and security engineering, and it's shaped how I think about both LLM capability boundaries and the security risks of deploying AI in high-stakes workflows.

**Bullet 5 — Research: Artemis and Antitoxin**
I've built two internal research tools that address gaps I couldn't find commercial solutions for. Artemis is an attack path simulation system that constructs a privilege graph from live IAM data and models adversarial traversal — functioning as an automated red-team analog for cloud identity. Antitoxin is an IAM toxic combination dissolution tool that identifies dangerous permission co-occurrences and generates least-privilege policy rewrites. Both reflect my belief that the most valuable security work happens before an incident, in the tooling no one has built yet.

---

## SECTION 5: SKILLS — TOP 15 IN PRIORITY ORDER

1. Cloud Security
2. AWS
3. IAM (Identity and Access Management)
4. Detection Engineering
5. Security Automation
6. Python
7. Amazon Bedrock
8. LLM Security
9. MITRE ATT&CK
10. Terraform
11. SIEM
12. SOAR
13. Incident Response
14. Zero Trust
15. GCP

**Pin the top 3 as Featured Skills:** Cloud Security, AWS, IAM — these are highest-search-volume for Principal Security Engineer searches and LinkedIn's algorithm weights featured skills more heavily.

**Endorsement strategy:**
- Target 5–10 endorsements from Senior/Principal engineers or security architects (quality over quantity)
- Reach out to Yahoo colleagues for Cloud Security, IAM, and Detection Engineering specifically
- Add LLM Security and Amazon Bedrock now even if endorsements are sparse — high-velocity 2026 search terms, early presence matters
- Keep total skills list under 20 — a shorter, sharper list with more endorsements per term outperforms a long thin list

---

## SECTION 6: CREATOR MODE

**Recommendation: Yes — enable Creator Mode.**

Koushik's profile has the properties that make Creator Mode high-leverage: technical depth on a high-growth topic (AI security + cloud identity), serializable research output (Artemis, Antitoxin, GOAT, LLM pipeline), and a career inflection moment (co-founding + open to principal roles) where inbound visibility has real value.

Creator Mode promotes "Follow" over "Connect" — correct for Koushik's situation. He's building visibility among hiring managers and founders who don't know him yet, not managing a tight mutual network.

**Commit to cadence first.** Creator Mode signals you post. Minimum: 2 posts/month on security topics. The 4 Featured Section pieces above provide the first 2 months of content with minimal additional work. Each can be written in under 2 hours from existing material.

---

## SECTION 7: CUSTOM URL

**Confirmed:** `linkedin.com/in/koushikkotamraju`

Verify in: LinkedIn Settings → Public Profile → Edit your custom URL. The slug `koushikkotamraju` is clean, professional, and consistent with koushik.io and other channels. Confirm it is set and matches resume headers and email signature exactly.

---

## SECTION 8: SEARCH OPTIMIZATION — KEYWORD MAP

**Target query:** "Principal Security Engineer"  
**Secondary targets:** "Staff Security Engineer," "Cloud Security Engineer," "Detection Engineer," "IAM Security Engineer," "AI Security Engineer"

### LinkedIn field signal weights

| Field | Signal Weight | What to do |
|---|---|---|
| Headline | Very High | Include "Security Engineer" + "Cloud Security" or "IAM" |
| Current Job Title | Very High | "Senior Security Engineer" — strong, keep |
| About first 300 chars | High | Open with "Security Engineer" + 2–3 domain terms |
| Featured Skills (top 3) | High | Cloud Security, AWS, IAM — pin these |
| Experience Titles | Medium-High | "Senior Security Engineer" repeats — good |
| About full body | Medium | "detection engineering," "IAM," "cloud security," "AWS," "Python" each appear multiple times |
| Skills list | Medium | 15 targeted skills as listed above |
| Posts and Articles | Low-Medium | LLM security + IAM content adds crawlable keyword surface |

### Terms to emphasize (high volume, high match)
- "Cloud Security" — headline, about opening, experience bullet 1, skills #1
- "IAM" — headline (Variant A implicit, explicit in B/C), about, experience bullets 3 and 5, skills #3
- "Detection Engineering" — headline, about, experience bullet 2, skills #4
- "AWS" — about, experience bullets 1 and 3, skills #2
- "Security Automation" — about, experience bullet 4, skills #5
- "LLM Security" / "AI Security" — headline, about, experience bullet 4, skills #8

### Terms to include but not over-rotate
- "Amazon Bedrock" — niche AI security searches; keep in about + experience
- "MITRE ATT&CK" — SOC/detection audience; keep in about + skills
- "Zero Trust" — compliance/architecture audience; keep in skills, mention once in about
- "Terraform" — DevSecOps audience; keep in skills, mention once in experience

### Terms to avoid over-indexing on
- "Penetration Testing" — Koushik's work is detection/engineering, not traditional pentesting; over-indexing attracts wrong-fit roles
- "SOC Analyst" — too junior for target positioning; keep out of headline and about
- "Compliance" — relevant to Infosys history but not current positioning; leave in job description body only

### About section opening (visible preview before "see more")
Optimized for "Principal Security Engineer" click-through:
> "I build the systems that find what adversaries try to hide. Over 9 years in security, I've moved from enterprise assessments to operating cloud security infrastructure at Yahoo — 2,823 accounts, 4-person team."

Contains: "security" (twice), "cloud security," signals scale — all in the first visible chars.
