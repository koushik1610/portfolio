"use client";

import { useRef } from "react";
import { motion } from "motion/react";
import type { Theme } from "@/lib/themes";
import { gsap, useGSAP, SplitText } from "@/lib/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./styles.css";

gsap.registerPlugin(ScrollTrigger);

// ── Content ────────────────────────────────────────────────────────────────────

const STAT_CARDS = [
  { value: "2,800+", label: "Cloud Accounts" },
  { value: "100%", label: "GOAT Recall" },
  { value: "$1.40", label: "Per Research Run" },
] as const;

const EXPERTISE = [
  {
    num: "01",
    name: "Detection Engineering",
    desc: "200+ active detection signatures across AWS accounts — 0% false-positive rate. CIS-benchmarked baselines grounded in MITRE ATT&CK coverage from cloud incident response data.",
  },
  {
    num: "02",
    name: "IAM Privilege Analysis",
    desc: "AI-native IAM audit agent traversing 65+ escalation paths across 10 vulnerability classes. 100% recall on GOAT benchmark — 32/32 findings, zero false positives.",
  },
  {
    num: "03",
    name: "AI Security Tooling",
    desc: "Multi-agent orchestration across 19 foundation models. Agentic SOAR workstation backed by 1,700+-node knowledge graph from historical tickets.",
  },
  {
    num: "04",
    name: "Cloud Security Architecture",
    desc: "2,800+ cloud accounts. CNAPP-class attack path simulation, AI-augmented CSPM, crown-jewel exposure tracking, Zero Trust enforcement.",
  },
  {
    num: "05",
    name: "Security Research",
    desc: "Artemis: multi-cloud attack path simulation. Antitoxin: IAM privilege escalation analysis cataloguing 62 toxic combinations with auto-remediation.",
  },
] as const;

const PROJECTS = [
  {
    id: "01",
    name: "Artemis",
    desc: "Multi-cloud attack path simulation — GCP SCC + AWS Security Hub unified into AI-enriched graph layer. Crown-jewel exposure, toxic IAM combinations, cross-cloud chains.",
    metric: "2,800+",
    metricLabel: "accounts",
    tags: ["Python", "GCP SCC", "AWS SHub", "Vertex AI"],
  },
  {
    id: "02",
    name: "IAM Audit Agent",
    desc: "Boto3 tool-calling to enumerate live AWS IAM configurations. 65+ escalation paths across 10 vulnerability classes. 100% GOAT benchmark recall.",
    metric: "100%",
    metricLabel: "recall",
    tags: ["IAM Analysis", "Python", "Boto3"],
  },
  {
    id: "03",
    name: "Autonomous Threat Intel",
    desc: "19 foundation models, 5 providers, performance-weighted router. $1.40 per research sweep. Replaced a fully manual weekly process.",
    metric: "$1.40",
    metricLabel: "per sweep",
    tags: ["Multi-Agent", "Claude", "GPT-4"],
  },
  {
    id: "04",
    name: "Detection Engine",
    desc: "200+ active signatures via Terraform across AWS accounts. MITRE ATT&CK gap analysis — real-world techniques. Zero false positives.",
    metric: "200+",
    metricLabel: "signatures",
    tags: ["Python", "Lambda", "Terraform"],
  },
] as const;

// ── Main ───────────────────────────────────────────────────────────────────────

export default function WTheme02Hero({ theme }: { theme: Theme }) {
  void theme;
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    // 1. Hero headline: SplitText word reveal
    const splitH1 = SplitText.create(".w2-headline", {
      type: "words",
      mask: "words",
      aria: "none", // .w2-headline is already aria-hidden
    });
    gsap.from(splitH1.words, {
      yPercent: 105,
      duration: 0.9,
      stagger: 0.08,
      ease: "power3.out",
    });

    // 2. Sub-headline fade in
    gsap.from(".w2-sub", {
      autoAlpha: 0,
      y: 16,
      duration: 0.7,
      ease: "power3.out",
      delay: 0.45,
    });

    // 3. CTA buttons fade in
    gsap.from(".w2-cta-group", {
      autoAlpha: 0,
      y: 12,
      duration: 0.6,
      ease: "power3.out",
      delay: 0.65,
    });

    // 4. Stat cards float in from right
    gsap.from(".w2-stat-card", {
      opacity: 0,
      x: 40,
      duration: 0.7,
      stagger: 0.15,
      ease: "power3.out",
      delay: 0.3,
    });

    // 5. Glow radial pulse
    gsap.to(".w2-glow", {
      scale: 1.1,
      opacity: 0.7,
      duration: 4,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
    });

    // 6. Expertise cards ScrollTrigger stagger
    gsap.from(".w2-exp-card", {
      opacity: 0,
      y: 24,
      duration: 0.6,
      stagger: 0.07,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".w2-expertise-section",
        start: "top 80%",
        once: true,
      },
    });

    // 7. Project cards ScrollTrigger
    gsap.from(".w2-project-card", {
      opacity: 0,
      y: 20,
      duration: 0.5,
      stagger: 0.1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".w2-projects-section",
        start: "top 80%",
        once: true,
      },
    });
  }, { scope: rootRef });

  return (
    <div className="w2-root" ref={rootRef}>
      {/* Skip link — WCAG 2.4.1 */}
      <a href="#w2-main" className="w2-skip">Skip to main content</a>

      {/* Accessible page title for screen readers */}
      <h1 className="w2-sr-only">Koushik Kotamraju — Sr. Security Engineer</h1>

      {/* ── NAV ─────────────────────────────────────────────────────────────── */}
      <nav className="w2-nav" aria-label="Primary navigation">
        <a href="#w2-hero" className="w2-logo" aria-label="Home">KK</a>
        <ul className="w2-nav-links" role="list">
          <li><a href="#w2-projects" className="w2-nav-link">Work</a></li>
          <li><a href="#w2-expertise" className="w2-nav-link">About</a></li>
          <li><a href="#w2-contact" className="w2-nav-link">Contact</a></li>
        </ul>
      </nav>

      {/* ── HERO ────────────────────────────────────────────────────────────── */}
      <section id="w2-hero" className="w2-hero" aria-labelledby="w2-hero-heading">
        {/* Background glow + dot grid */}
        <div className="w2-dot-grid" aria-hidden="true" />
        <div className="w2-glow" aria-hidden="true" />

        {/* Left column */}
        <div id="w2-main" className="w2-hero-left">
          {/* Name is the hero — this is a portfolio, the person is the subject */}
          <p className="w2-name" aria-hidden="true">Koushik Kotamraju</p>
          <p className="w2-eyebrow" aria-hidden="true">
            Sr. Security Engineer · Yahoo Paranoids
          </p>

          {/* Decorative tagline — aria-hidden; sr-only h1 is the real title */}
          <div
            id="w2-hero-heading"
            className="w2-headline"
            aria-hidden="true"
          >
            Security platforms at scale.
          </div>

          <p className="w2-sub">
            Building AI-native platforms across 2,800+ cloud accounts. Detection, IAM, and
            agentic security — production systems, not prototypes.
          </p>

          <div className="w2-cta-group">
            <a href="#w2-projects" className="w2-cta-primary">
              View Work
              <svg
                width="16"
                height="16"
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
              href="https://koushik.io/resume"
              className="w2-cta-ghost"
              target="_blank"
              rel="noopener noreferrer"
            >
              Resume
            </a>
          </div>
        </div>

        {/* Right column — floating stat cards */}
        <div className="w2-hero-right" aria-label="Key metrics">
          {STAT_CARDS.map((card) => (
            <div key={card.label} className="w2-stat-card" aria-label={`${card.value} ${card.label}`}>
              <span className="w2-stat-value">{card.value}</span>
              <span className="w2-stat-label">{card.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── EXPERTISE ───────────────────────────────────────────────────────── */}
      <section id="w2-expertise" className="w2-expertise-section" aria-label="What I Build">
        <div className="w2-section-inner">
          <div className="w2-section-header">
            <h2 className="w2-section-title">What I Build</h2>
            <span className="w2-section-count" aria-hidden="true">05 areas</span>
          </div>
          <div className="w2-exp-grid">
            {EXPERTISE.map((item) => (
              <article key={item.num} className="w2-exp-card">
                <span className="w2-exp-num" aria-hidden="true">{item.num}</span>
                <h3 className="w2-exp-name">{item.name}</h3>
                <p className="w2-exp-desc">{item.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROJECTS ────────────────────────────────────────────────────────── */}
      <section id="w2-projects" className="w2-projects-section" aria-label="Selected Projects">
        <div className="w2-section-inner">
          <div className="w2-section-header">
            <h2 className="w2-section-title">Selected Work</h2>
          </div>
          <div className="w2-projects-grid">
            {PROJECTS.map((proj) => (
              <motion.article
                key={proj.id}
                className="w2-project-card"
                whileHover={{ y: -4, transition: { duration: 0.2, ease: "easeOut" } }}
                aria-label={`Project: ${proj.name}`}
              >
                <div className="w2-project-header">
                  <span className="w2-project-id" aria-hidden="true">{proj.id}</span>
                  <div className="w2-project-metric" aria-label={`${proj.metric} ${proj.metricLabel}`}>
                    <span className="w2-project-metric-value">{proj.metric}</span>
                    <span className="w2-project-metric-label">{proj.metricLabel}</span>
                  </div>
                </div>
                <h3 className="w2-project-name">{proj.name}</h3>
                <p className="w2-project-desc">{proj.desc}</p>
                <div className="w2-project-tags" aria-label="Technologies">
                  {proj.tags.map((tag) => (
                    <span key={tag} className="w2-project-tag">{tag}</span>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ─────────────────────────────────────────────────────────── */}
      <section id="w2-contact" className="w2-contact" aria-label="Contact">
        <div className="w2-contact-inner">
          <p className="w2-contact-label">Let&apos;s connect</p>
          <h2 className="w2-contact-heading">
            Open to senior security <em>engineering</em> roles.
          </h2>
          <p className="w2-contact-sub">
            Staff/Principal Security Engineer · AI Security Engineer · FAANG &amp; AI-native startups
          </p>
          <div className="w2-contact-links">
            <a
              href="mailto:koushik.kotamraju1610@gmail.com"
              className="w2-contact-link"
            >
              Email
            </a>
            <a
              href="https://www.linkedin.com/in/koushikkotamraju/"
              className="w2-contact-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/koushik1610"
              className="w2-contact-link"
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
