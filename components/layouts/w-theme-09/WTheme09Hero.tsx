"use client";

import { useRef } from "react";
import type { Theme } from "@/lib/themes";
import { gsap, useGSAP, SplitText } from "@/lib/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./styles.css";

gsap.registerPlugin(ScrollTrigger);

// ── Content ─────────────────────────────────────────────────────────────────

const MARQUEE = [
  "Detection Engineering", "IAM Privilege Analysis", "Cloud Security", "Attack Path Simulation",
  "MITRE ATT&CK", "AI Security Tooling", "CNAPP", "Zero Trust", "Threat Intelligence", "CIEM",
];

const STATS = [
  { key: "accounts", target: 2823, duration: 1.8, initial: "0", numClass: "w9-n-accounts", label: "Cloud accounts", ariaLabel: "2,823 cloud accounts" },
  { key: "sigs", target: 222, duration: 1.4, initial: "0", numClass: "w9-n-sigs", label: "Detection signatures", ariaLabel: "222 detection signatures" },
  { key: "recall", target: 100, duration: 1.4, format: (v: number) => Math.round(v) + "%", initial: "0%", numClass: "w9-n-recall", label: "GOAT recall", ariaLabel: "100 percent GOAT recall" },
  { key: "cost", target: 1.4, duration: 1.2, format: (v: number) => "$" + v.toFixed(2), initial: "$0.00", numClass: "w9-n-cost", label: "Per research run", ariaLabel: "1 dollar 40 cents per research run" },
] as const;

const EXPERTISE = [
  { name: "Detection Engineering", desc: "222 active signatures across 1,500+ AWS accounts — 0% false positives. MITRE ATT&CK coverage, deployed via Terraform." },
  { name: "IAM Privilege Analysis", desc: "AI-native IAM audit agent. 65+ escalation paths across 10 vulnerability classes. 100% GOAT recall." },
  { name: "AI Security Tooling", desc: "19 models, 5 providers. Agentic SOAR workstation on a 1,767-node knowledge graph from 3,559 tickets." },
  { name: "Cloud Security Architecture", desc: "2,823 AWS + GCP accounts. CNAPP-class attack-path simulation, AI-augmented CSPM, Zero Trust." },
  { name: "Security Research", desc: "Artemis attack-path simulation. Antitoxin: 62 toxic IAM combinations with min-cut auto-remediation." },
] as const;

const PROJECTS = [
  { id: "01", name: "Artemis", desc: "Multi-cloud attack-path simulation. GCP SCC + AWS Security Hub unified into an AI-enriched graph.", metric: "2,823+ accounts", tags: ["Python", "GCP SCC", "Vertex AI"] },
  { id: "02", name: "IAM Audit Agent", desc: "Boto3 tool-calling agent. 65+ escalation paths, 10 vulnerability classes. 100% GOAT recall.", metric: "100% recall", tags: ["IAM", "Python", "Boto3"] },
  { id: "03", name: "Autonomous Threat Intel", desc: "19 models, 5 providers, performance-weighted router. $1.40 per run — replaced a manual process.", metric: "$1.40 / run", tags: ["Multi-Agent", "Claude"] },
  { id: "04", name: "Detection Engine", desc: "222 active signatures via Terraform. MITRE ATT&CK gap analysis. Zero false positives at scale.", metric: "222 signatures", tags: ["Python", "Lambda", "Terraform"] },
] as const;

// ── Component ───────────────────────────────────────────────────────────────

export default function WTheme09Hero({ theme }: { theme: Theme }) {
  void theme;
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (!prefersReduced) {
        // Hero name reveal
        const split = SplitText.create(".w9-hero-name", {
          type: "lines",
          mask: "lines",
          aria: "none",
        });
        gsap.from(split.lines, {
          yPercent: 115,
          duration: 1.1,
          stagger: 0.12,
          ease: "power4.out",
          delay: 0.1,
        });
        gsap.from(".w9-hero-eyebrow, .w9-hero-tagline, .w9-hero-hint", {
          autoAlpha: 0,
          y: 20,
          duration: 0.7,
          stagger: 0.1,
          ease: "power3.out",
          delay: 0.55,
        });

        // Section titles clip-path wipe
        gsap.utils.toArray<HTMLElement>(".w9-wipe").forEach((el) => {
          gsap.from(el, {
            clipPath: "inset(0 100% 0 0)",
            duration: 1,
            ease: "power3.inOut",
            scrollTrigger: { trigger: el, start: "top 85%", once: true },
          });
        });

        // Scroll-scrubbed statement (kinetic signature)
        const stmt = SplitText.create(".w9-statement", {
          type: "words",
          aria: "auto",
        });
        gsap.from(stmt.words, {
          opacity: 0.14,
          ease: "none",
          stagger: 0.5,
          scrollTrigger: {
            trigger: ".w9-statement-section",
            start: "top 75%",
            end: "bottom 70%",
            scrub: true,
            invalidateOnRefresh: true,
          },
        });

        // Expertise + project rows
        gsap.utils.toArray<HTMLElement>(".w9-anim-list").forEach((list) => {
          gsap.from(list.querySelectorAll(".w9-anim-row"), {
            autoAlpha: 0,
            y: 28,
            duration: 0.6,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: { trigger: list, start: "top 82%", once: true },
          });
        });
      }

      // Count-ups
      STATS.forEach((stat) => {
        const el = rootRef.current?.querySelector<HTMLElement>(`.${stat.numClass}`);
        if (!el) return;
        const fmt = "format" in stat ? (stat.format as (v: number) => string) : undefined;
        if (prefersReduced) {
          el.textContent = fmt ? fmt(stat.target) : stat.target.toLocaleString();
          return;
        }
        const obj = { val: 0 };
        gsap.to(obj, {
          val: stat.target,
          duration: stat.duration,
          ease: "power2.out",
          scrollTrigger: { trigger: ".w9-stats", start: "top 85%", once: true },
          onUpdate: () => {
            el.textContent = fmt ? fmt(obj.val) : Math.round(obj.val).toLocaleString();
          },
        });
      });
    },
    { scope: rootRef }
  );

  return (
    <div className="w9-root" ref={rootRef}>
      <a href="#w9-main" className="w9-skip">Skip to main content</a>
      <h1 className="w9-sr-only">Koushik Kotamraju — Sr. Security Engineer at Yahoo Paranoids</h1>

      <nav className="w9-nav" aria-label="Primary navigation">
        <span className="w9-nav-logo" aria-hidden="true">KK</span>
        <a href="https://github.com/koushik1610" className="w9-nav-cta" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
      </nav>

      <main id="w9-main">
        {/* ── Hero ─────────────────────────────────────────────────────── */}
        <section className="w9-hero" aria-label="Introduction">
          <p className="w9-hero-eyebrow">
            <span className="w9-dot" aria-hidden="true" />
            Sr. Security Engineer · Yahoo Paranoids
          </p>
          <div className="w9-hero-name" aria-hidden="true">
            Koushik<br />Kotamraju
          </div>
          <p className="w9-hero-tagline">
            Cloud security engineer building AI-native security platforms —
            production systems, not prototypes.
          </p>
          <div className="w9-hero-ctas">
            <a href="#w9-work-head" className="w9-clink w9-clink--primary">View work</a>
            <a href="mailto:koushik.kotamraju1610@gmail.com" className="w9-clink">Get in touch</a>
          </div>
        </section>

        {/* ── Marquee band ─────────────────────────────────────────────── */}
        <div className="w9-marquee" aria-hidden="true">
          <div className="w9-marquee-track">
            {[...MARQUEE, ...MARQUEE].map((m, i) => (
              <span key={i} className="w9-marquee-item">
                {m}<span className="w9-marquee-sep">✦</span>
              </span>
            ))}
          </div>
        </div>

        {/* ── Stats ────────────────────────────────────────────────────── */}
        <section className="w9-stats" aria-label="Key metrics">
          {STATS.map((stat) => (
            <div key={stat.key} className="w9-stat" aria-label={stat.ariaLabel}>
              <span className={`w9-stat-num ${stat.numClass}`} aria-hidden="true">{stat.initial}</span>
              <span className="w9-stat-label">{stat.label}</span>
            </div>
          ))}
        </section>

        {/* ── Statement (scrubbed) ─────────────────────────────────────── */}
        <section className="w9-statement-section" aria-label="Statement">
          <p className="w9-statement">
            Four engineers. 2,823 cloud accounts. The math only works if you build the right systems.
          </p>
        </section>

        {/* ── Expertise ────────────────────────────────────────────────── */}
        <section className="w9-block" aria-labelledby="w9-exp-head">
          <h2 id="w9-exp-head" className="w9-block-title w9-wipe">What I build</h2>
          <ol className="w9-exp w9-anim-list" role="list">
            {EXPERTISE.map((item, i) => (
              <li key={item.name} className="w9-exp-row w9-anim-row">
                <span className="w9-exp-num" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="w9-exp-name">{item.name}</h3>
                <p className="w9-exp-desc">{item.desc}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* ── Work (oversized index) ───────────────────────────────────── */}
        <section className="w9-block" aria-labelledby="w9-work-head">
          <h2 id="w9-work-head" className="w9-block-title w9-wipe">Selected work</h2>
          <div className="w9-work w9-anim-list">
            {PROJECTS.map((proj) => (
              <article key={proj.id} className="w9-work-row w9-anim-row" aria-label={`Project: ${proj.name}`}>
                <span className="w9-work-num" aria-hidden="true">{proj.id}</span>
                <div className="w9-work-body">
                  <div className="w9-work-headline">
                    <h3 className="w9-work-name">{proj.name}</h3>
                    <span className="w9-work-metric" aria-hidden="true">{proj.metric}</span>
                  </div>
                  <p className="w9-work-desc">{proj.desc}</p>
                  <div className="w9-work-tags" aria-label="Technologies">
                    {proj.tags.map((t) => (<span key={t} className="w9-tag">{t}</span>))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ── Marquee band 2 ───────────────────────────────────────────── */}
        <div className="w9-marquee w9-marquee--rev" aria-hidden="true">
          <div className="w9-marquee-track">
            {[...MARQUEE, ...MARQUEE].map((m, i) => (
              <span key={i} className="w9-marquee-item">
                {m}<span className="w9-marquee-sep">✦</span>
              </span>
            ))}
          </div>
        </div>

        {/* ── Contact ──────────────────────────────────────────────────── */}
        <section className="w9-contact" aria-labelledby="w9-contact-head">
          <p className="w9-contact-eyebrow">Open to opportunities</p>
          <h2 id="w9-contact-head" className="w9-contact-title w9-wipe">Let&apos;s talk.</h2>
          <p className="w9-contact-sub">
            Open to Staff &amp; Principal Security Engineer and AI Security Engineering roles.
          </p>
          <div className="w9-contact-links">
            <a href="mailto:koushik.kotamraju1610@gmail.com" className="w9-clink w9-clink--primary">koushik.kotamraju1610@gmail.com</a>
            <a href="https://www.linkedin.com/in/koushikkotamraju/" className="w9-clink" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
            <a href="https://github.com/koushik1610" className="w9-clink" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
          </div>
        </section>
      </main>
    </div>
  );
}
