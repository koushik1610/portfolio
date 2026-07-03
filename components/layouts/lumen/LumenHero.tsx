"use client";

import { useRef } from "react";
import type { Theme } from "@/lib/themes";
import { gsap, useGSAP, SplitText } from "@/lib/gsap";
import "./styles.css";

// ── Content ─────────────────────────────────────────────────────────────────

const METRICS = [
  { key: "accounts", target: 2800, duration: 1.8, initial: "0", numClass: "w8-m-accounts", label: "Cloud accounts secured", ariaLabel: "2,800+ cloud accounts secured" },
  { key: "sigs", target: 200, duration: 1.4, initial: "0", numClass: "w8-m-sigs", label: "Detection signatures", ariaLabel: "200+ detection signatures" },
  { key: "reviews", target: 150, duration: 1.4, initial: "0", numClass: "w8-m-reviews", label: "Security reviews conducted", ariaLabel: "150+ security reviews conducted" },
  { key: "recall", target: 32, duration: 1.4, format: (v: number) => String(Math.round(v)), initial: "0", numClass: "w8-m-recall", label: "GOAT benchmarks evaluated", ariaLabel: "Evaluated against 32 GOAT benchmarks" },
] as const;

const EXPERTISE = [
  { num: "01", name: "Detection Engineering", desc: "200+ active signatures evaluating 1,400+ AWS accounts. CIS-benchmarked baselines, MITRE ATT&CK coverage of real-world techniques, deployed via Terraform.", meta: "1,400+ acct" },
  { num: "02", name: "IAM Privilege Analysis", desc: "AI-native IAM audit agent traversing 65+ escalation paths across 10 vulnerability classes, with LLM semantic interpretation of transitive chains.", meta: "32 GOAT" },
  { num: "03", name: "AI Security Tooling", desc: "Multi-agent orchestration across 19 models from 5 providers. Agentic SOAR workstation on a 1,700+-node knowledge graph mined from historical tickets.", meta: "19 models" },
  { num: "04", name: "Cloud Security Architecture", desc: "2,800+ cloud accounts. CNAPP-class attack-path simulation, AI-augmented CSPM, crown-jewel exposure tracking, Zero Trust enforcement.", meta: "2,800+ acct" },
  { num: "05", name: "Security Research", desc: "Artemis multi-cloud attack-path simulation; Antitoxin graph-theoretic IAM analysis cataloguing 62 toxic combinations with minimum cut-set auto-remediation.", meta: "62 combos" },
] as const;

const PROJECTS = [
  { id: "01", name: "Artemis", desc: "Multi-cloud attack-path simulation. GCP SCC + AWS Security Hub unified into an AI-enriched graph layer.", metric: "2,800+ accounts", tags: ["Python", "GCP SCC", "AWS Security Hub", "Vertex AI"] },
  { id: "02", name: "IAM Audit Agent", desc: "Boto3 tool-calling agent. 65+ escalation paths across 10 vulnerability classes. Evaluated against 32 GOAT benchmarks.", metric: "32 GOAT benchmarks", tags: ["IAM", "Python", "Boto3"] },
  { id: "03", name: "Autonomous Threat Intel", desc: "19 models, 5 providers, performance-weighted router. Analyst-ready proposals at $1.40 per run.", metric: "$1.40 / run", tags: ["Multi-Agent", "Claude", "GPT-4"] },
  { id: "04", name: "Detection Engine", desc: "200+ active signatures via Terraform. MITRE ATT&CK gap analysis across 1,400+ AWS accounts.", metric: "200+ signatures", tags: ["Python", "Lambda", "Terraform"] },
] as const;

// ── Component ───────────────────────────────────────────────────────────────

export default function LumenHero({ theme }: { theme: Theme }) {
  void theme;
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (!prefersReduced) {
        const split = SplitText.create(".w8-name", {
          type: "words",
          mask: "words",
          aria: "none",
        });
        gsap.from(split.words, {
          yPercent: 110,
          duration: 0.9,
          stagger: 0.08,
          ease: "power3.out",
          delay: 0.1,
        });
        gsap.from(".w8-masthead-meta > *", {
          autoAlpha: 0,
          y: 14,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          delay: 0.45,
        });

        // Hairline rules draw in
        gsap.utils.toArray<HTMLElement>(".w8-rule").forEach((rule) => {
          gsap.from(rule, {
            scaleX: 0,
            transformOrigin: "left center",
            duration: 0.9,
            ease: "power3.inOut",
            scrollTrigger: { trigger: rule, start: "top 92%", once: true },
          });
        });

        // Rows fade up
        gsap.utils.toArray<HTMLElement>(".w8-anim-list").forEach((list) => {
          gsap.from(list.querySelectorAll(".w8-anim-row"), {
            autoAlpha: 0,
            y: 18,
            duration: 0.6,
            stagger: 0.08,
            ease: "power2.out",
            scrollTrigger: { trigger: list, start: "top 82%", once: true },
          });
        });
      }

      // Count-ups
      METRICS.forEach((m) => {
        const el = rootRef.current?.querySelector<HTMLElement>(`.${m.numClass}`);
        if (!el) return;
        const fmt = "format" in m ? (m.format as (v: number) => string) : undefined;
        if (prefersReduced) {
          el.textContent = fmt ? fmt(m.target) : m.target.toLocaleString() + "+";
          return;
        }
        const obj = { val: 0 };
        gsap.to(obj, {
          val: m.target,
          duration: m.duration,
          ease: "power2.out",
          scrollTrigger: { trigger: ".w8-metrics", start: "top 88%", once: true },
          onUpdate: () => {
            el.textContent = fmt ? fmt(obj.val) : Math.round(obj.val).toLocaleString() + "+";
          },
        });
      });
    },
    { scope: rootRef }
  );

  return (
    <div className="w8-root" ref={rootRef}>
      <a href="#w8-main" className="w8-skip">Skip to main content</a>
      <h1 className="w8-sr-only">Koushik Kotamraju — Sr. Security Engineer at Yahoo Paranoids</h1>

      <nav className="w8-nav" aria-label="Primary navigation">
        <span className="w8-nav-logo" aria-hidden="true">KK<span className="w8-nav-logo-dot">.</span></span>
        <ul className="w8-nav-links" role="list">
          <li><a href="#w8-work" className="w8-nav-link">Index</a></li>
          <li><a href="#w8-projects" className="w8-nav-link">Work</a></li>
          <li><a href="#w8-contact" className="w8-nav-link">Contact</a></li>
        </ul>
        <span className="w8-nav-status"><span className="w8-status-dot" aria-hidden="true" />Open to work</span>
      </nav>

      <main id="w8-main">
        {/* ── Document-control strip — the spec-sheet identity ─────────── */}
        <div className="w8-docbar" aria-hidden="true">
          <span className="w8-docbar-cell">DOC&nbsp;&nbsp;KK-SPEC-08</span>
          <span className="w8-docbar-cell">REV&nbsp;&nbsp;2026-06</span>
          <span className="w8-docbar-cell">CLASS&nbsp;&nbsp;PUBLIC</span>
          <span className="w8-docbar-cell w8-docbar-cell--end">SHEET&nbsp;&nbsp;1 / 1</span>
        </div>

        {/* ── Masthead ─────────────────────────────────────────────────── */}
        <header className="w8-masthead">
          <p className="w8-kicker"><span aria-hidden="true">§</span> Sr. Security Engineer · Yahoo Paranoids</p>
          <div className="w8-name" aria-hidden="true">Koushik<br />Kotamraju</div>
          <div className="w8-masthead-meta">
            <p className="w8-lede">
              Cloud security engineer building AI-native security platforms —
              production systems, not prototypes. Nine years across three organizations.
            </p>
            <div className="w8-cta-row">
              <a href="mailto:koushik.kotamraju1610@gmail.com" className="w8-btn w8-btn--primary">Email me</a>
              <a href="/resume" className="w8-btn w8-btn--ghost">Résumé</a>
            </div>
            <div className="w8-masthead-foot">
              <span className="w8-fileref">koushik.io</span>
              <span className="w8-fileref">AWS Solutions Architect · Security Specialty</span>
              <span className="w8-fileref">2026</span>
            </div>
          </div>
        </header>

        <div className="w8-rule w8-rule--accent" aria-hidden="true" />

        {/* ── Metrics ──────────────────────────────────────────────────── */}
        <section className="w8-metrics" aria-label="1.0 — Key metrics">
          {METRICS.map((m) => (
            <div key={m.key} className="w8-metric" role="group" aria-label={m.ariaLabel}>
              <span className={`w8-metric-num ${m.numClass}`} aria-hidden="true">{m.initial}</span>
              <span className="w8-metric-label">{m.label}</span>
            </div>
          ))}
        </section>

        <div className="w8-rule" aria-hidden="true" />

        {/* ── Index / Expertise ────────────────────────────────────────── */}
        <section id="w8-work" className="w8-block" aria-labelledby="w8-idx-head">
          <div className="w8-block-head">
            <h2 id="w8-idx-head" className="w8-block-title">2.0 — Capability matrix</h2>
            <span className="w8-block-num" aria-hidden="true">05 disciplines</span>
          </div>
          <ol className="w8-index w8-anim-list" role="list">
            {EXPERTISE.map((item) => (
              <li key={item.num} className="w8-index-row w8-anim-row">
                <span className="w8-index-num" aria-hidden="true">{item.num}</span>
                <div className="w8-index-body">
                  <h3 className="w8-index-name">{item.name}</h3>
                  <p className="w8-index-desc">{item.desc}</p>
                </div>
                <span className="w8-index-meta" aria-hidden="true">{item.meta}</span>
              </li>
            ))}
          </ol>
        </section>

        <div className="w8-rule" aria-hidden="true" />

        {/* ── Selected Work ────────────────────────────────────────────── */}
        <section id="w8-projects" className="w8-block" aria-labelledby="w8-work-head">
          <div className="w8-block-head">
            <h2 id="w8-work-head" className="w8-block-title">3.0 — Reference implementations</h2>
            <span className="w8-block-num" aria-hidden="true">04 projects</span>
          </div>
          <ol className="w8-projects w8-anim-list" role="list">
            {PROJECTS.map((proj) => (
              <li key={proj.id} className="w8-proj-row w8-anim-row" aria-label={`Project: ${proj.name}`}>
                <span className="w8-proj-id" aria-hidden="true">{proj.id}</span>
                <div className="w8-proj-body">
                  <h3 className="w8-proj-name">{proj.name}</h3>
                  <p className="w8-proj-desc">{proj.desc}</p>
                  <div className="w8-proj-tags" aria-label="Technologies">
                    {proj.tags.map((t) => (<span key={t} className="w8-tag">{t}</span>))}
                  </div>
                </div>
                <span className="w8-proj-metric" aria-hidden="true">{proj.metric}</span>
              </li>
            ))}
          </ol>
        </section>

        <div className="w8-rule" aria-hidden="true" />

        {/* ── Contact / Colophon ───────────────────────────────────────── */}
        <section id="w8-contact" className="w8-colophon" aria-labelledby="w8-contact-head">
          <div className="w8-colophon-left">
            <p className="w8-kicker"><span aria-hidden="true">§</span> 4.0 — Contact</p>
            <h2 id="w8-contact-head" className="w8-colophon-title">
              Open to Staff &amp; Principal Security Engineer roles.
            </h2>
            <p className="w8-colophon-note">Rev 2026-06 · Set in Geist · Maintained like production.</p>
          </div>
          <div className="w8-colophon-links">
            <a href="mailto:koushik.kotamraju1610@gmail.com" className="w8-clink">
              <span className="w8-clink-k">Email</span>
              <span className="w8-clink-v">koushik.kotamraju1610@gmail.com</span>
            </a>
            <a href="https://www.linkedin.com/in/koushikkotamraju/" className="w8-clink" target="_blank" rel="noopener noreferrer">
              <span className="w8-clink-k">LinkedIn</span>
              <span className="w8-clink-v">in/koushikkotamraju</span>
            </a>
            <a href="https://github.com/koushik1610" className="w8-clink" target="_blank" rel="noopener noreferrer">
              <span className="w8-clink-k">GitHub</span>
              <span className="w8-clink-v">github.com/koushik1610</span>
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
