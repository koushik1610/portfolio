"use client";

import { useRef } from "react";
import type { Theme } from "@/lib/themes";
import { gsap, useGSAP, SplitText } from "@/lib/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./styles.css";

gsap.registerPlugin(ScrollTrigger);

// ── Content ────────────────────────────────────────────────────────────────────

const EXPERTISE = [
  {
    num: "01",
    name: "Detection Engineering",
    desc: "200+ active signatures across AWS accounts. 0% false-positive rate. MITRE ATT&CK gap analysis.",
  },
  {
    num: "02",
    name: "IAM Privilege Analysis",
    desc: "65+ escalation paths across 10 vulnerability classes. 100% GOAT benchmark recall: 32/32 findings, zero FP.",
  },
  {
    num: "03",
    name: "AI Security Tooling",
    desc: "19 models from 5 providers. 1,700+-node knowledge graph from historical tickets.",
  },
  {
    num: "04",
    name: "Cloud Security Architecture",
    desc: "2,800+ cloud accounts. CNAPP-class attack path simulation. Zero Trust enforcement.",
  },
  {
    num: "05",
    name: "Security Research",
    desc: "Artemis attack path simulation. Antitoxin: 62 toxic IAM combinations with auto-remediation.",
  },
] as const;

const PROJECTS = [
  {
    id: "01",
    name: "Artemis",
    desc: "Multi-cloud attack path simulation — GCP SCC + AWS Security Hub unified into AI-enriched graph layer.",
    metric: "2,800+ accounts",
  },
  {
    id: "02",
    name: "IAM Audit Agent",
    desc: "Boto3 tool-calling — 65+ escalation paths, 100% GOAT benchmark recall, zero false positives.",
    metric: "100% recall",
  },
  {
    id: "03",
    name: "Autonomous Threat Intel",
    desc: "19 models, 5 providers, performance-weighted router. $1.40 per research sweep.",
    metric: "$1.40/run",
  },
  {
    id: "04",
    name: "Detection Engine",
    desc: "200+ active signatures via Terraform. MITRE ATT&CK coverage from real-world incident response.",
    metric: "200+ signatures",
  },
] as const;

// ── Component ──────────────────────────────────────────────────────────────────

export default function WTheme04Hero({ theme }: { theme: Theme }) {
  void theme;
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReduced) return;

      // 1. Grid bg fade-in
      gsap.from(".w4-grid-bg", {
        opacity: 0,
        duration: 2.5,
        ease: "power1.out",
      });

      // 2. Label fade
      gsap.from(".w4-label", {
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
        delay: 0.1,
      });

      // 3. Hero headline clip-path reveal (signature animation)
      const splitH1 = SplitText.create(".w4-headline", {
        type: "lines",
        mask: "lines",
        aria: "none", // .w4-headline is already aria-hidden
      });
      gsap.from(splitH1.lines, {
        xPercent: -100,
        duration: 1.1,
        stagger: 0.18,
        ease: "power4.out",
        delay: 0.2,
      });

      // 4. Tagline fade
      gsap.from(".w4-tagline", {
        opacity: 0,
        duration: 0.5,
        ease: "power2.out",
        delay: 1.0,
      });

      // 5. CTA group fade
      gsap.from(".w4-cta-group", {
        opacity: 0,
        y: 12,
        duration: 0.5,
        ease: "power2.out",
        delay: 1.2,
      });

      // 6. Chess sections scroll animations
      // Section A — text from left, stats from right
      gsap.from(".w4-section-a .w4-section-text", {
        opacity: 0,
        x: -40,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".w4-section-a",
          start: "top 75%",
          once: true,
        },
      });
      gsap.from(".w4-section-a .w4-stats-grid", {
        opacity: 0,
        x: 40,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".w4-section-a",
          start: "top 75%",
          once: true,
        },
      });

      // Section B — text from right, list from left
      gsap.from(".w4-section-b .w4-section-text", {
        opacity: 0,
        x: 40,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".w4-section-b",
          start: "top 75%",
          once: true,
        },
      });
      gsap.from(".w4-exp-row", {
        opacity: 0,
        x: -20,
        duration: 0.5,
        stagger: 0.06,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".w4-section-b",
          start: "top 70%",
          once: true,
        },
      });

      // Section C — project rows stagger up
      gsap.from(".w4-project-row", {
        opacity: 0,
        y: 20,
        duration: 0.45,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".w4-section-c",
          start: "top 80%",
          once: true,
        },
      });
    },
    { scope: rootRef }
  );

  return (
    <div className="w4-root" ref={rootRef}>
      {/* SVG Noise overlay — fixed, pointer-events none */}
      <svg className="w4-noise" aria-hidden="true">
        <filter id="w4-noise-filter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves={3}
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#w4-noise-filter)" opacity="0.04" />
      </svg>

      {/* Skip link — WCAG 2.4.1 */}
      <a href="#w4-main" className="w4-skip">
        Skip to main content
      </a>

      {/* Screen-reader title */}
      <h1 className="w4-sr-only">Koushik Kotamraju — Sr. Security Engineer</h1>

      {/* ── NAV ─────────────────────────────────────────────────────────────── */}
      <nav className="w4-nav" aria-label="Primary navigation">
        <a href="#w4-hero" className="w4-logo" aria-label="Home">
          KK
        </a>
        <ul className="w4-nav-links" role="list">
          <li>
            <a href="#w4-about" className="w4-nav-link">
              About
            </a>
          </li>
          <li>
            <a href="#w4-builds" className="w4-nav-link">
              Work
            </a>
          </li>
          <li>
            <a href="#w4-projects" className="w4-nav-link">
              Projects
            </a>
          </li>
          <li>
            <a href="#w4-contact" className="w4-nav-link">
              Contact
            </a>
          </li>
        </ul>
      </nav>

      {/* ── HERO ────────────────────────────────────────────────────────────── */}
      <section
        id="w4-hero"
        className="w4-hero"
        aria-labelledby="w4-hero-display"
      >
        {/* Dot grid */}
        <div className="w4-grid-bg" aria-hidden="true" />

        <div id="w4-main" className="w4-hero-content">
          {/* Label */}
          <p className="w4-label" aria-hidden="true">
            SR. SECURITY ENGINEER
          </p>

          {/* Name — masthead; the person is the subject, not the slogan */}
          <p className="w4-name" aria-hidden="true">Koushik Kotamraju</p>

          {/* Display headline — aria-hidden; sr-only h1 is the real title */}
          <div
            id="w4-hero-display"
            className="w4-headline"
            aria-hidden="true"
          >
            Infrastructure.
            <br />
            Precision.
            <br />
            Security.
          </div>

          {/* Tagline */}
          <p className="w4-tagline">Yahoo · 2,800+ cloud accounts · 9 years</p>

          {/* CTAs */}
          <div className="w4-cta-group">
            <a href="#w4-projects" className="w4-cta-link" aria-label="View my work">
              <span aria-hidden="true">→ </span>View Work
            </a>
            <a href="#w4-contact" className="w4-cta-link" aria-label="Contact me">
              <span aria-hidden="true">→ </span>Contact
            </a>
          </div>
        </div>
      </section>

      {/* ── SECTION A — Chess Left: About + Stats ─────────────────────────── */}
      <section
        id="w4-about"
        className="w4-chess-section w4-section-a"
        aria-label="About"
      >
        <div className="w4-chess-inner w4-chess-left">
          {/* Left: text (60%) */}
          <div className="w4-section-text">
            <p className="w4-section-label" aria-hidden="true">
              01 — About
            </p>
            <h2 className="w4-section-heading">
              Nine years building security at infrastructure scale.
            </h2>
            <p className="w4-section-body">
              Sr. Security Engineer at Yahoo Paranoids. I build detection systems,
              IAM audit tooling, and AI-native security platforms across 2,800+ cloud
              accounts. Three organizations, zero unresolved incidents.
            </p>
            <p className="w4-section-body">
              Specialist in cloud-native threat detection, privilege escalation
              analysis, and autonomous security tooling. The work is precision
              engineering — every signature, every escalation path, every model
              route deliberate.
            </p>
          </div>

          {/* Right: stats (40%) */}
          <div className="w4-stats-grid" aria-label="Key metrics">
            <div className="w4-stat-item">
              <span className="w4-stat-num" aria-label="2,800+">
                2,800+
              </span>
              <span className="w4-stat-label">Cloud Accounts</span>
            </div>
            <div className="w4-stat-item">
              <span className="w4-stat-num" aria-label="200+">
                222
              </span>
              <span className="w4-stat-label">Active Signatures</span>
            </div>
            <div className="w4-stat-item">
              <span className="w4-stat-num" aria-label="100 percent">
                100%
              </span>
              <span className="w4-stat-label">GOAT Recall</span>
            </div>
            <div className="w4-stat-item">
              <span className="w4-stat-num" aria-label="one dollar forty cents">
                $1.40
              </span>
              <span className="w4-stat-label">Per Research Run</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION B — Chess Right: What I Build ─────────────────────────── */}
      <section
        id="w4-builds"
        className="w4-chess-section w4-section-b"
        aria-label="What I Build"
      >
        <div className="w4-chess-inner w4-chess-right">
          {/* Left: expertise list (40%) */}
          <div className="w4-exp-list" aria-label="Expertise areas">
            {EXPERTISE.map((item) => (
              <article key={item.num} className="w4-exp-row">
                <span className="w4-exp-num" aria-hidden="true">
                  {item.num}
                </span>
                <div className="w4-exp-body">
                  <h3 className="w4-exp-name">{item.name}</h3>
                  <p className="w4-exp-desc">{item.desc}</p>
                </div>
              </article>
            ))}
          </div>

          {/* Right: section text (60%) */}
          <div className="w4-section-text">
            <p className="w4-section-label" aria-hidden="true">
              02 — What I Build
            </p>
            <h2 className="w4-section-heading">
              Detection. Analysis. Autonomous tooling.
            </h2>
            <p className="w4-section-body">
              Five areas of deep technical work — each one production-deployed,
              each one measured. Not prototypes. Systems operating at cloud account
              scale in a Fortune-50 security org.
            </p>
            <p className="w4-section-body">
              The constraint is always precision: 0% false-positive rate, 100% recall,
              $1.40 per research sweep. These aren&apos;t aspirational — they&apos;re
              production numbers.
            </p>
          </div>
        </div>
      </section>

      {/* ── SECTION C — Projects Table ────────────────────────────────────── */}
      <section
        id="w4-projects"
        className="w4-chess-section w4-section-c"
        aria-label="Selected Projects"
      >
        <div className="w4-projects-inner">
          <div className="w4-projects-header">
            <p className="w4-section-label" aria-hidden="true">
              03 — Projects
            </p>
            <h2 className="w4-section-heading">Selected Work</h2>
          </div>

          <div
            className="w4-projects-table"
            role="list"
            aria-label="Project list"
          >
            {/* Table header — decorative */}
            <div className="w4-projects-table-head" aria-hidden="true">
              <span>No.</span>
              <span>Project</span>
              <span>Metric</span>
            </div>

            {PROJECTS.map((proj) => (
              <article
                key={proj.id}
                className="w4-project-row"
                role="listitem"
                aria-label={`Project ${proj.id}: ${proj.name}`}
              >
                <span className="w4-project-id" aria-hidden="true">
                  {proj.id}
                </span>
                <div className="w4-project-body">
                  <h3 className="w4-project-name">{proj.name}</h3>
                  <p className="w4-project-desc">{proj.desc}</p>
                </div>
                <span className="w4-project-metric">{proj.metric}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ─────────────────────────────────────────────────────────── */}
      <section
        id="w4-contact"
        className="w4-contact"
        aria-label="Contact"
      >
        <div className="w4-contact-inner">
          <p className="w4-contact-label" aria-hidden="true">
            04 — Contact
          </p>
          <h2 className="w4-contact-heading">
            Open to senior security engineering roles.
          </h2>
          <p className="w4-contact-sub">
            Staff / Principal Security Engineer · AI Security Engineer · FAANG &amp; AI-native
          </p>
          <div className="w4-contact-links">
            <a
              href="mailto:koushik.kotamraju1610@gmail.com"
              className="w4-contact-link"
            >
              koushik.kotamraju1610@gmail.com
            </a>
            <a
              href="https://www.linkedin.com/in/koushikkotamraju/"
              className="w4-contact-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/koushik1610"
              className="w4-contact-link"
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
