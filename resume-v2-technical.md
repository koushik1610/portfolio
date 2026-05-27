# Resume Version 2 — Technical Depth / AI Security Focus

**Target:** AI-native startups, security-forward companies (Cloudflare, Wiz, Anthropic-adjacent), Principal IC roles  
**Council composite:** 95.9 — APPROVED  
**Format:** Narrative, ATS-compatible, co-founder signal included

---

```
KOUSHIK KOTAMRAJU
koushik.kotamraju1610@gmail.com | linkedin.com/in/koushikkotamraju | github.com/koushik1610
```

---

## SUMMARY

Senior Security Engineer and stealth-mode co-founder at the intersection of AI systems and cloud security. Nine years building detection infrastructure, IAM analysis tooling, and AI-driven security automation at scale. At Yahoo, built attack path simulation systems (Artemis), automated IAM toxic combination dissolution (Antitoxin), and deployed a multi-provider LLM evaluation pipeline on Amazon Bedrock that operates at $1.40/run across 19 models and 5 providers. Achieved 100% recall on the GOAT benchmark for IAM privilege escalation path coverage. Researcher and practitioner on LLM security, AI pipeline security, and the application of machine learning to adversary simulation and detection engineering. Seeking Principal or Staff Security Engineer roles where the problems are hard, the tooling doesn't yet exist, and the security surface includes AI systems.

---

## EXPERIENCE

### Senior Security Engineer
**Yahoo Paranoids — Yahoo Inc.** | Sunnyvale, CA (Remote) | 2021 – Present

- Designed and operated cloud security detection infrastructure covering 2,823 AWS and GCP accounts with a 4-person team, maintaining 222 active detection rules at a sustained 0% false-positive rate — a signal/noise ratio uncommon at this account count without large team investment.
- Achieved 100% recall on the GOAT benchmark, the gold-standard evaluation framework for IAM privilege escalation path analysis, confirming complete detection coverage across the full known IAM privilege escalation taxonomy in AWS environments.
- Identified and documented 65+ distinct IAM privilege escalation paths, producing internal remediation playbooks that formalized the organization's approach to cloud identity risk triage.
- Built Artemis: an attack path simulation system that models adversarial traversal across cloud identity graphs. Artemis ingests IAM policy data, constructs a privilege graph, and identifies reachable high-value targets from any attacker-controlled starting node — enabling proactive path closure before exploitation.
- Built Antitoxin: an IAM toxic combination dissolution tool that analyzes AWS IAM policies for dangerous permission co-occurrences, scores risk by exploitability, and generates least-privilege rewrites — reducing standing over-permission across cloud environments at scale.
- Engineered a multi-provider LLM evaluation and deployment pipeline using Amazon Bedrock; evaluated 19 models across 5 providers (including Anthropic Claude, AWS Titan, Meta Llama, Cohere, and Mistral families) on security code review tasks, optimizing for recall on vulnerability classes while driving cost to $1.40/run. Automated 123 structured security code reviews through the pipeline.
- Applied adversarial ML testing methods to LLM-based security tooling, evaluating prompt injection resilience, jailbreak susceptibility, and output reliability under adversarial input conditions.
- Mapped detection rule coverage to MITRE ATT&CK across cloud-native attack scenarios, building coverage heatmaps to surface gaps and drive prioritized detection investment.
- Deployed SOAR playbooks and Python-based automation to reduce mean time to contain for high-severity cloud security incidents, integrating detection signals with automated enrichment and response workflows.
- Drove Zero Trust architecture reviews, applying identity-centric security modeling to enforce least-privilege access patterns across cloud workloads and service-to-service communications.
- Leveraged CNAPP tooling integrated with Terraform-managed infrastructure to maintain continuous cloud posture assessment and risk-prioritized remediation pipelines.

---

### Threat Intelligence Engineer
**Cyr3con** | 2019 – 2021

- Constructed a 1,767-node threat intelligence knowledge graph linking adversary groups, malware families, TTPs, vulnerabilities, and dark-web intelligence signals — enabling predictive prioritization of CVE remediation based on adversary capability and intent.
- Developed Python-based NLP pipelines for extracting structured intelligence from unstructured threat actor communications, translating raw adversary text into graph-queryable knowledge nodes.
- Built graph analytics tooling on top of the knowledge graph to surface adversary clustering patterns, enabling early identification of emerging threat actor campaigns before they appeared in mainstream threat feeds.
- Delivered predictive threat intelligence outputs to enterprise SOC and incident response customers, mapping adversary behavior to MITRE ATT&CK TTPs and translating findings into actionable detection recommendations.
- Automated threat intelligence ingestion, normalization, and enrichment workflows, compressing time from raw feed to actionable intelligence output by approximately 60%.

---

### Systems Engineer / Security Analyst
**Infosys** | 2016 – 2019

- Conducted security assessments and vulnerability analysis across enterprise application and infrastructure environments for Fortune 500 clients.
- Supported SIEM rule tuning and incident response operations in client SOC engagements, developing detection logic for common threat patterns.
- Built Python automation tooling to accelerate security assessment workflows, reducing manual data collection overhead across multi-system audit engagements.
- Contributed to compliance implementation projects including SOC 2 and ISO 27001, delivering control documentation and evidence collection frameworks.

---

## SELECTED RESEARCH & BENCHMARKS

**Artemis — Attack Path Simulation System**  
Built an internal cloud identity graph traversal engine that models adversarial movement across AWS IAM relationships. Artemis constructs a privilege graph from live IAM policy data, identifies reachable high-value nodes from any starting position, and outputs prioritized attack path reports. Designed to function as an automated red-team analog for cloud identity environments.

**Antitoxin — IAM Toxic Combination Dissolution**  
Designed a policy analysis tool that identifies dangerous IAM permission co-occurrences — pairs or sets of permissions that are individually permissible but collectively exploitable for privilege escalation or data exfiltration. Antitoxin scores combinations by exploitation risk and generates least-privilege policy rewrites. Applied across Yahoo's AWS account fleet.

**GOAT Benchmark — 100% Recall**  
The GOAT benchmark is a gold-standard evaluation framework for IAM privilege escalation path analysis tools, covering the full taxonomy of known AWS IAM privilege escalation techniques. Achieved 100% recall — detecting every privilege escalation path in the benchmark dataset — validating detection completeness for the internal IAM analysis toolchain.

**LLM Security Pipeline — Multi-Provider Evaluation**  
Designed and executed a systematic evaluation of 19 large language models across 5 inference providers (Amazon Bedrock) on structured security code review tasks. Evaluation criteria included vulnerability class recall, output structure consistency, latency, and cost per run. Final production pipeline operates at $1.40/run and has processed 123 structured security code reviews. Research surfaces model-specific failure modes on security reasoning tasks — relevant to both AI security tooling design and LLM security threat modeling.

---

## SKILLS

**Cloud Security:** AWS, GCP, IAM, Privilege Escalation Analysis, Attack Path Simulation, Cloud Posture Management, CNAPP, Zero Trust  
**AI & LLM Security:** Amazon Bedrock, LLM Security, AI Security, Prompt Injection Analysis, Multi-Model Evaluation, AI Pipeline Security  
**Detection Engineering:** SIEM, SOAR, Detection Engineering, MITRE ATT&CK, Incident Response  
**Engineering:** Python, Terraform, Security Automation, Graph Analytics, NLP, Infrastructure as Code  
**Research:** Adversary Simulation, IAM Toxic Combination Analysis, Threat Intelligence, Knowledge Graph Construction

---

## EDUCATION

**Bachelor of Technology — Computer Science**  
Jawaharlal Nehru Technological University | 2016

---

## CO-FOUNDER STATUS

Currently co-founding a stealth-mode company. Open to Principal or Staff Security Engineer roles at organizations where AI security, cloud identity risk, and detection engineering intersect.
