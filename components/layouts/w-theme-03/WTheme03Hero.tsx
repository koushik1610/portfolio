"use client";

import { useRef } from "react";
import type { Theme } from "@/lib/themes";
import { gsap, useGSAP } from "@/lib/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./styles.css";

gsap.registerPlugin(ScrollTrigger);

const EXPERTISE = [
  {
    num: "01",
    name: "Detection Engineering",
    desc: "222 active detection signatures across 1,500+ AWS accounts — 0% false-positive rate. MITRE ATT&CK gap analysis against 74 real-world techniques.",
  },
  {
    num: "02",
    name: "IAM Privilege Analysis",
    desc: "AI-native IAM audit agent — 65+ escalation paths, 10 vulnerability classes. 100% recall on GOAT benchmark: 32/32 findings, zero false positives.",
  },
  {
    num: "03",
    name: "AI Security Tooling",
    desc: "Multi-agent pipeline across 19 models from 5 providers. Agentic SOAR workstation with 1,767-node knowledge graph from 3,559 historical tickets.",
  },
  {
    num: "04",
    name: "Cloud Security Architecture",
    desc: "2,823 accounts (AWS + GCP). CNAPP-class attack path simulation. AI-augmented CSPM. Zero Trust enforcement across the full cloud estate.",
  },
  {
    num: "05",
    name: "Security Research",
    desc: "Artemis: multi-cloud attack path simulation platform. Antitoxin: IAM privilege analysis cataloguing 62 toxic combinations with minimum cut-set auto-remediation.",
  },
] as const;

const PROJECTS = [
  {
    id: "01",
    name: "Artemis",
    tag: "ATTACK PATH SIM",
    desc: "GCP SCC + AWS Security Hub unified into AI-enriched graph layer. Crown-jewel exposure, toxic IAM combination trends, cross-cloud attack chains.",
    metric: "2,823+",
  },
  {
    id: "02",
    name: "IAM Audit Agent",
    tag: "PRIVILEGE ANALYSIS",
    desc: "Boto3 tool-calling agent — 65+ escalation paths across 10 vulnerability classes. LLM semantic interpretation surfaces transitive chains. 100% recall.",
    metric: "100%",
  },
  {
    id: "03",
    name: "Autonomous Threat Intel",
    tag: "AI ORCHESTRATION",
    desc: "5-stage pipeline (triage → analyze → decompose → peer review → synthesize) across 19 models. Performance-weighted router. $1.40/sweep.",
    metric: "$1.40",
  },
  {
    id: "04",
    name: "Detection Engine",
    tag: "DETECTION ENG",
    desc: "222 active signatures via Terraform across 1,500+ accounts. MITRE ATT&CK coverage from real-world incident response. Zero false positives.",
    metric: "222",
  },
] as const;

export default function WTheme03Hero({ theme }: { theme: Theme }) {
  void theme;
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReduced) return;

      // 1. Stat cards stagger in on load
      gsap.from(".w3-stat-card", {
        opacity: 0,
        y: 30,
        duration: 0.7,
        stagger: 0.15,
        ease: "power3.out",
      });

      // 2. Count up integer counters
      const accountsObj = { val: 0 };
      gsap.to(accountsObj, {
        val: 2823,
        duration: 2.2,
        ease: "power2.out",
        delay: 0.3,
        onUpdate: () => {
          const el = document.querySelector(".w3-stat-num-accounts");
          if (el) el.textContent = Math.round(accountsObj.val).toLocaleString();
        },
      });

      const sigsObj = { val: 0 };
      gsap.to(sigsObj, {
        val: 222,
        duration: 1.6,
        ease: "power2.out",
        delay: 0.3,
        onUpdate: () => {
          const el = document.querySelector(".w3-stat-num-sigs");
          if (el) el.textContent = Math.round(sigsObj.val).toLocaleString();
        },
      });

      // 3. $1.40 decimal counter
      const costObj = { val: 0 };
      gsap.to(costObj, {
        val: 1.4,
        duration: 1.2,
        ease: "power2.out",
        delay: 0.5,
        onUpdate: () => {
          const el = document.querySelector(".w3-stat-num-cost");
          if (el) el.textContent = "$" + costObj.val.toFixed(2);
        },
      });

      // 4. Hero headline fade after stat cards
      gsap.from(".w3-hero-identity", {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: "power2.out",
        delay: 0.8,
      });

      // 5. Expertise rows slide in on scroll
      gsap.from(".w3-exp-row", {
        opacity: 0,
        x: -20,
        duration: 0.5,
        stagger: 0.06,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".w3-expertise",
          start: "top 80%",
          once: true,
        },
      });

      // 6. Project rows slide in on scroll
      gsap.from(".w3-project-row", {
        opacity: 0,
        y: 16,
        duration: 0.45,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".w3-projects",
          start: "top 80%",
          once: true,
        },
      });
    },
    { scope: rootRef }
  );

  return (
    <div className="w3-root" ref={rootRef}>
      {/* ── Skip link ──────────────────────────────────────────────────────── */}
      <a href="#w3-main" className="w3-skip">
        Skip to main content
      </a>

      {/* ── Top navigation ─────────────────────────────────────────────────── */}
      <nav className="w3-nav" aria-label="Primary navigation">
        <a href="#w3-main" className="w3-nav-logo" aria-label="Koushik Kotamraju — home">
          KK
        </a>
        <ul className="w3-nav-links" role="list">
          <li>
            <a href="#w3-expertise" className="w3-nav-link">
              Expertise
            </a>
          </li>
          <li>
            <a href="#w3-projects" className="w3-nav-link">
              Work
            </a>
          </li>
          <li>
            <a href="#w3-contact" className="w3-nav-link">
              Contact
            </a>
          </li>
        </ul>
        <div className="w3-nav-status" aria-label="Currently active">
          <span className="w3-status-dot" aria-hidden="true" />
          <span className="w3-status-label">Open to opportunities</span>
        </div>
      </nav>

      {/* ── Stats hero (above fold) ─────────────────────────────────────────── */}
      <section
        id="w3-main"
        className="w3-stats-hero"
        aria-label="Key metrics"
      >
        <div className="w3-stats-grid">
          {/* Card 1: Cloud Accounts */}
          <article className="w3-stat-card" aria-label="2,823 cloud accounts">
            <div
              className="w3-stat-num w3-stat-num-accounts"
              aria-hidden="true"
            >
              0
            </div>
            <div className="w3-stat-label">Cloud Accounts</div>
            <div className="w3-stat-sub">Yahoo · AWS + GCP</div>
          </article>

          {/* Card 2: Active Signatures */}
          <article className="w3-stat-card" aria-label="222 active signatures">
            <div
              className="w3-stat-num w3-stat-num-sigs"
              aria-hidden="true"
            >
              0
            </div>
            <div className="w3-stat-label">Active Signatures</div>
            <div className="w3-stat-sub">0% false-positive rate</div>
          </article>

          {/* Card 3: Cost per research run */}
          <article
            className="w3-stat-card"
            aria-label="$1.40 per research run"
          >
            <div
              className="w3-stat-num w3-stat-num-cost"
              aria-hidden="true"
            >
              $0.00
            </div>
            <div className="w3-stat-label">Per Research Run</div>
            <div className="w3-stat-sub">19 models · 5 providers</div>
          </article>
        </div>

        {/* ── Hero identity (below stat cards, still in hero section) ─────── */}
        <div className="w3-hero-identity">
          <h1 className="w3-hero-name">Koushik Kotamraju</h1>
          <p className="w3-hero-role">
            Sr. Security Engineer · Yahoo Paranoids
          </p>
          <p className="w3-hero-brief">
            9 years building AI-native cloud security platforms at enterprise scale.
          </p>
          <div className="w3-hero-ctas">
            <a href="#w3-projects" className="w3-cta-primary">
              View Work →
            </a>
            <a
              href="mailto:koushik.kotamraju1610@gmail.com"
              className="w3-cta-secondary"
            >
              koushik.kotamraju1610@gmail.com
            </a>
          </div>
        </div>
      </section>

      {/* ── What I Build — Expertise ────────────────────────────────────────── */}
      <section
        id="w3-expertise"
        className="w3-expertise"
        aria-labelledby="w3-expertise-heading"
      >
        <div className="w3-section-inner">
          <header className="w3-section-header">
            <h2 id="w3-expertise-heading" className="w3-section-title">
              What I Build
            </h2>
            <span className="w3-section-count" aria-hidden="true">
              05 disciplines
            </span>
          </header>
          <ol className="w3-exp-list" role="list">
            {EXPERTISE.map((item) => (
              <li key={item.num} className="w3-exp-row">
                <span className="w3-exp-num" aria-hidden="true">
                  {item.num}
                </span>
                <span className="w3-exp-name">{item.name}</span>
                <p className="w3-exp-desc">{item.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Selected Work — Projects ────────────────────────────────────────── */}
      <section
        id="w3-projects"
        className="w3-projects"
        aria-labelledby="w3-projects-heading"
      >
        <div className="w3-section-inner">
          <header className="w3-section-header">
            <h2 id="w3-projects-heading" className="w3-section-title">
              Selected Work
            </h2>
            <span className="w3-section-count" aria-hidden="true">
              04 projects
            </span>
          </header>
          <ol className="w3-project-list" role="list">
            {PROJECTS.map((project) => (
              <li key={project.id} className="w3-project-row">
                <span className="w3-project-id" aria-hidden="true">
                  {project.id}
                </span>
                <div className="w3-project-body">
                  <span className="w3-project-name">{project.name}</span>
                  <span className="w3-project-tag" aria-label={`Category: ${project.tag}`}>
                    {project.tag}
                  </span>
                </div>
                <p className="w3-project-desc">{project.desc}</p>
                <span className="w3-project-metric" aria-label={`Key metric: ${project.metric}`}>
                  {project.metric}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Contact ─────────────────────────────────────────────────────────── */}
      <section
        id="w3-contact"
        className="w3-contact"
        aria-labelledby="w3-contact-heading"
      >
        <div className="w3-contact-inner">
          <p className="w3-contact-eyebrow">Get in touch</p>
          <h2 id="w3-contact-heading" className="w3-contact-heading">
            Building cloud security at scale.<br />
            Let&apos;s talk.
          </h2>
          <p className="w3-contact-sub">
            Open to Staff and Principal Security Engineer roles, AI Security Engineering,
            and CIEM/CNAPP opportunities.
          </p>
          <div className="w3-contact-links">
            <a
              href="mailto:koushik.kotamraju1610@gmail.com"
              className="w3-contact-link w3-contact-link--primary"
            >
              koushik.kotamraju1610@gmail.com
            </a>
            <a
              href="https://www.linkedin.com/in/koushikkotamraju/"
              className="w3-contact-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/koushik1610"
              className="w3-contact-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
