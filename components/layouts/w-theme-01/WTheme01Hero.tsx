"use client";

import { useRef } from "react";
import { motion } from "motion/react";
import type { Theme } from "@/lib/themes";
import { gsap, useGSAP, SplitText } from "@/lib/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./styles.css";

// Register ScrollTrigger once on module import (outside component)
gsap.registerPlugin(ScrollTrigger);

// ── Content ───────────────────────────────────────────────────────────────────

const STATS = [
  { key: "accounts", num: "2,823",  label: "Cloud Accounts",    cssClass: "w1-stat-accounts", raw: 2823,  decimals: false },
  { key: "sigs",     num: "222",    label: "Signatures",        cssClass: "w1-stat-sigs",     raw: 222,   decimals: false },
  { key: "recall",   num: "100%",   label: "GOAT Recall",       cssClass: "w1-stat-recall",   raw: null,  decimals: false },
  { key: "cost",     num: "$1.40",  label: "Per Research Run",  cssClass: "w1-stat-cost",     raw: null,  decimals: false },
] as const;

const EXPERTISE = [
  {
    num: "01",
    name: "Detection Engineering",
    desc: "222 active detection signatures across 1,500+ AWS accounts — 0% false-positive rate. CIS-benchmarked baselines grounded in MITRE ATT&CK technique coverage from cloud incident response data.",
  },
  {
    num: "02",
    name: "IAM Privilege Analysis",
    desc: "AI-native IAM audit agent traversing 65+ privilege escalation paths across 10 vulnerability classes. 100% recall on GOAT benchmark — 32/32 findings, zero false positives.",
  },
  {
    num: "03",
    name: "AI Security Tooling",
    desc: "Multi-agent orchestration across 19 foundation models from 5 providers. Agentic SOAR workstation backed by a 1,767-node knowledge graph from 3,559 historical tickets.",
  },
  {
    num: "04",
    name: "Cloud Security Architecture",
    desc: "Multi-cloud coverage across 2,823 AWS and GCP accounts. CNAPP-class attack path simulation with AI-augmented CSPM, crown-jewel exposure tracking, and Zero Trust enforcement.",
  },
  {
    num: "05",
    name: "Security Research",
    desc: "Artemis: CNAPP-class multi-cloud attack path simulation. Antitoxin: graph-theoretic IAM privilege escalation analysis cataloguing 62 toxic combinations with minimum cut-set auto-remediation.",
  },
] as const;

const PROJECTS = [
  {
    id: "01",
    name: "Artemis",
    desc: "Multi-cloud attack path simulation. GCP SCC + AWS Security Hub unified into an AI-enriched graph layer. Crown-jewel exposure, toxic IAM trends, cross-cloud chains mapped to MITRE ATT&CK.",
    metric: "2,823+",
    metricLabel: "accounts unified",
    tags: ["Python", "GCP SCC", "AWS SHub", "Vertex AI"],
    span: "wide",
  },
  {
    id: "02",
    name: "IAM Audit Agent",
    desc: "Boto3 tool-calling to enumerate live AWS IAM configurations. 65+ escalation paths, 10 vulnerability classes. 100% recall on GOAT benchmark.",
    metric: "100%",
    metricLabel: "GOAT recall",
    tags: ["IAM", "Python", "Boto3"],
    span: "narrow",
  },
  {
    id: "03",
    name: "Autonomous Threat Intel",
    desc: "Multi-agent pipeline across 19 foundation models. Performance-weighted router — $1.40 per research sweep. Replaced a fully manual weekly process.",
    metric: "$1.40",
    metricLabel: "per sweep",
    tags: ["Multi-Agent", "Claude", "GPT-4"],
    span: "narrow",
  },
  {
    id: "04",
    name: "Detection Engine",
    desc: "222 active signatures deployed via Terraform across 1,500+ AWS accounts. MITRE ATT&CK gap analysis against 74 real-world techniques. Zero false positives at scale.",
    metric: "222",
    metricLabel: "active signatures",
    tags: ["Python", "Lambda", "Terraform"],
    span: "wide",
  },
] as const;

// ── Main Component ─────────────────────────────────────────────────────────────

export default function WTheme01Hero({ theme }: { theme: Theme }) {
  void theme;
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReduced) return;

      // 1. Hero headline: SplitText word-mask reveal
      const splitH1 = SplitText.create(".w1-hero-h1", {
        type: "words",
        mask: "words",
        aria: "none", // element already aria-hidden
      });
      gsap.from(splitH1.words, {
        yPercent: 105,
        duration: 0.9,
        stagger: 0.07,
        ease: "power3.out",
      });
      // Sub-text and CTAs fade after headline
      gsap.from(".w1-hero-sub", {
        autoAlpha: 0,
        y: 16,
        duration: 0.7,
        ease: "power3.out",
        delay: 0.55,
      });
      gsap.from(".w1-hero-ctas", {
        autoAlpha: 0,
        y: 12,
        duration: 0.6,
        ease: "power3.out",
        delay: 0.75,
      });

      // 2. Stat counters with ScrollTrigger
      const animatedStats = [
        { el: ".w1-stat-accounts", target: 2823, duration: 2,   decimals: false },
        { el: ".w1-stat-sigs",     target: 222,  duration: 1.6, decimals: false },
        { el: ".w1-stat-cost",     target: 1.40, duration: 1.2, decimals: true  },
      ];

      animatedStats.forEach(({ el, target, duration, decimals }) => {
        const node = document.querySelector(el);
        if (!node) return;

        // Proxy object so GSAP can tween a numeric value and we write it to DOM
        const counter = { value: 0 };
        gsap.to(counter, {
          value: target,
          duration,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".w1-stat-strip",
            start: "top 85%",
          },
          onUpdate: function () {
            (node as HTMLElement).textContent = decimals
              ? "$" + counter.value.toFixed(2)
              : String(Math.round(counter.value));
          },
        });
      });

      // 3. Glow pulse
      gsap.to(".w1-glow", {
        scale: 1.08,
        opacity: 0.85,
        duration: 3.5,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });

      // 4. Pill badge breathe
      gsap.to(".w1-pill", {
        scale: 1.02,
        duration: 2,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });

      // 5 & 6: Expertise and bento cards are handled by motion/react whileInView
      // (no GSAP stagger on same elements — prevents animation conflict)
    },
    { scope: rootRef },
  );

  return (
    <div className="w1-root" ref={rootRef}>
      <a href="#w1-main" className="w1-skip">
        Skip to main content
      </a>
      <h1 className="w1-sr-only">Koushik Kotamraju — Sr. Security Engineer</h1>

      {/* ── NAV ─────────────────────────────────────────────────────────────── */}
      <nav className="w1-nav" aria-label="Primary navigation">
        <a href="#about" className="w1-nav-logo">
          Koushik
        </a>
        <div className="w1-nav-links">
          <a href="#about"        className="w1-nav-link">Home</a>
          <a href="#w1-expertise" className="w1-nav-link">Expertise</a>
          <a href="#w1-work"      className="w1-nav-link">Work</a>
          <a href="#w1-contact"   className="w1-nav-link">Contact</a>
        </div>
        <a
          href="https://github.com/koushik1610"
          className="w1-nav-cta"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
      </nav>

      {/* ── HERO ────────────────────────────────────────────────────────────── */}
      <section id="about" className="w1-hero">
        {/* Indigo radial glow beacon */}
        <div className="w1-glow" aria-hidden="true" />

        <div id="w1-main" className="w1-hero-content">
          {/* Pill badge */}
          <div className="w1-pill" aria-label="Current role">
            <span className="w1-pill-dot" aria-hidden="true" />
            Sr. Security Engineer · Yahoo · 2026
          </div>

          {/* Headline */}
          <h2 className="w1-hero-h1" aria-hidden="true">
            Securing what the internet runs on.
          </h2>

          {/* Sub-text */}
          <p className="w1-hero-sub">
            AI-native platforms protecting 2,823 cloud accounts. Built for scale.
          </p>

          {/* CTAs */}
          <div className="w1-hero-ctas">
            <a href="#w1-work" className="w1-cta-primary">
              View Work
              <svg
                className="w1-cta-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
            <a
              href="https://github.com/koushik1610"
              className="w1-cta-secondary"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
              <svg
                className="w1-cta-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* ── STAT STRIP ──────────────────────────────────────────────────────── */}
      <section className="w1-stat-strip" aria-label="Key metrics">
        <div className="w1-stat-strip-inner">
          {STATS.map((stat, i) => (
            <div
              key={stat.key}
              className="w1-stat-item"
              aria-label={`${stat.num} ${stat.label}`}
            >
              <span
                className={`w1-stat-num ${stat.cssClass}`}
                aria-hidden="true"
              >
                {stat.num}
              </span>
              <span className="w1-stat-label" aria-hidden="true">{stat.label}</span>
              {i < STATS.length - 1 && (
                <div className="w1-stat-divider" aria-hidden="true" />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── EXPERTISE ───────────────────────────────────────────────────────── */}
      <section id="w1-expertise" className="w1-expertise-section">
        <div className="w1-expertise-inner">
          <div className="w1-expertise-header">
            <h2 className="w1-expertise-title">What I Build</h2>
            <span className="w1-expertise-count" aria-hidden="true">
              05 areas
            </span>
          </div>
          <div className="w1-expertise-grid">
            {EXPERTISE.map((item, i) => (
              <motion.div
                key={item.num}
                className="w1-exp-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.08,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
              >
                <span className="w1-exp-num" aria-hidden="true">
                  {item.num}
                </span>
                <div className="w1-exp-name">{item.name}</div>
                <p className="w1-exp-desc">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROJECTS BENTO ──────────────────────────────────────────────────── */}
      <section id="w1-work" className="w1-projects-section">
        <div className="w1-projects-inner">
          <div className="w1-projects-header">
            <h2 className="w1-projects-title">Selected Work</h2>
          </div>
          <div className="w1-bento-grid">
            {PROJECTS.map((proj, i) => (
              <motion.div
                key={proj.id}
                className={`w1-bento-card ${proj.span === "wide" ? "w1-proj-wide" : "w1-proj-narrow"}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -4, transition: { duration: 0.2, ease: "easeOut" } }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{
                  duration: 0.55,
                  delay: i * 0.07,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
              >
                <div className="w1-proj-header">
                  <span className="w1-proj-id" aria-hidden="true">
                    {proj.id}
                  </span>
                  <div className="w1-proj-metric-badge">
                    <span className="w1-proj-metric-num">{proj.metric}</span>
                    <span className="w1-proj-metric-label">{proj.metricLabel}</span>
                  </div>
                </div>
                <div className="w1-proj-name">{proj.name}</div>
                <p className="w1-proj-desc">{proj.desc}</p>
                <div className="w1-proj-tags">
                  {proj.tags.map((tag) => (
                    <span key={tag} className="w1-proj-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ─────────────────────────────────────────────────────────── */}
      <section id="w1-contact" className="w1-contact">
        <p className="w1-contact-label">Let&apos;s connect</p>
        <h2 className="w1-contact-heading">
          Open to senior{" "}
          <em>security engineering</em>
          {" "}roles.
        </h2>
        <div className="w1-contact-links">
          <a
            href="mailto:koushik.kotamraju1610@gmail.com"
            className="w1-contact-link"
          >
            Email
          </a>
          <a
            href="https://www.linkedin.com/in/koushikkotamraju/"
            className="w1-contact-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/koushik1610"
            className="w1-contact-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </div>
      </section>

      {/* ── MOBILE BOTTOM NAV ───────────────────────────────────────────────── */}
      <nav className="w1-mobile-nav" aria-label="Mobile section navigation">
        <a href="#about"        className="w1-mobile-nav-link">Home</a>
        <a href="#w1-expertise" className="w1-mobile-nav-link">Expertise</a>
        <a href="#w1-work"      className="w1-mobile-nav-link">Work</a>
        <a href="#w1-contact"   className="w1-mobile-nav-link">Contact</a>
      </nav>
    </div>
  );
}
