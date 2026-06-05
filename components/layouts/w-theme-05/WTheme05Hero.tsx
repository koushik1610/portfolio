"use client";

import { useRef } from "react";
import type { Theme } from "@/lib/themes";
import { gsap, useGSAP } from "@/lib/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./styles.css";

gsap.registerPlugin(ScrollTrigger);

// ── Content ───────────────────────────────────────────────────────────────────

interface StatTile {
  key: string;
  target: number;
  duration: number;
  format?: (v: number) => string;
  initial: string;
  countClass: string;
  accentClass: string;
  numClass: string;
  label: string;
  sub: string;
  tileClass: string;
  ariaLabel: string;
}

const STAT_TILES: StatTile[] = [
  {
    key: "accounts",
    target: 2823,
    duration: 2.2,
    initial: "0",
    countClass: "w5-num-accounts",
    accentClass: "w5-accent-emerald",
    numClass: "",
    label: "Cloud Accounts",
    sub: "Yahoo · AWS + GCP",
    tileClass: "w5-tile-stat-a",
    ariaLabel: "2,823 cloud accounts",
  },
  {
    key: "sigs",
    target: 222,
    duration: 1.6,
    initial: "0",
    countClass: "w5-num-sigs",
    accentClass: "w5-accent-emerald",
    numClass: "",
    label: "Active Signatures",
    sub: "0% false-positive rate",
    tileClass: "w5-tile-stat-b",
    ariaLabel: "222 active signatures",
  },
  {
    key: "cost",
    target: 1.4,
    duration: 1.2,
    format: (v) => "$" + v.toFixed(2),
    initial: "$0.00",
    countClass: "w5-num-cost",
    accentClass: "w5-accent-indigo",
    numClass: "w5-stat-indigo",
    label: "Per Research Run",
    sub: "19 models · 5 providers",
    tileClass: "w5-tile-stat-c",
    ariaLabel: "$1.40 per research run",
  },
];

const EXPERTISE_COMPACT = [
  { icon: "⚡", name: "Detection Engineering", brief: "222 sigs · 0% FP · 1,500+ accounts" },
  { icon: "🔐", name: "IAM Privilege Analysis", brief: "65+ paths · 100% GOAT recall" },
  { icon: "🤖", name: "AI Security Tooling", brief: "19 models · 1,767-node knowledge graph" },
  { icon: "☁️", name: "Cloud Security Architecture", brief: "2,823 accounts · Zero Trust" },
  { icon: "🔬", name: "Security Research", brief: "Artemis · Antitoxin · 62 toxic combos" },
] as const;

const PROJECTS_BENTO = [
  {
    id: "01",
    name: "Artemis",
    desc: "Multi-cloud attack path simulation. GCP SCC + AWS Security Hub unified graph.",
    metric: "2,823+",
    metricLabel: "accounts",
    tags: ["Python", "GCP SCC", "Vertex AI"],
  },
  {
    id: "02",
    name: "IAM Audit Agent",
    desc: "Boto3 tool-calling agent. 65+ escalation paths. 100% GOAT benchmark recall.",
    metric: "100%",
    metricLabel: "recall",
    tags: ["IAM", "Python", "Boto3"],
  },
  {
    id: "03",
    name: "Autonomous Threat Intel",
    desc: "19 models, 5 providers. $1.40/sweep. Replaced fully manual weekly process.",
    metric: "$1.40",
    metricLabel: "per sweep",
    tags: ["Multi-Agent", "Claude"],
  },
  {
    id: "04",
    name: "Detection Engine",
    desc: "222 active signatures via Terraform. MITRE ATT&CK coverage. Zero false positives.",
    metric: "222",
    metricLabel: "signatures",
    tags: ["Python", "Lambda", "AWS"],
  },
] as const;

// ── Main Component ────────────────────────────────────────────────────────────

export default function WTheme05Hero({ theme }: { theme: Theme }) {
  void theme;
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReduced) return;

      // 1. Hero tile fade + scale on load
      gsap.from(".w5-tile-hero", {
        opacity: 0,
        scale: 0.97,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.1,
      });

      // 2. All tiles: batch scroll reveal
      ScrollTrigger.batch(".w5-tile", {
        onEnter: (batch) => {
          gsap.from(batch, {
            opacity: 0,
            y: 20,
            duration: 0.6,
            stagger: 0.06,
            ease: "power2.out",
            overwrite: true,
          });
        },
        start: "top 88%",
        once: true,
      });

      // 3. Stat number counters on scroll
      const countUp = (
        selector: string,
        target: number,
        duration: number,
        format?: (v: number) => string
      ) => {
        const el = document.querySelector(selector);
        if (!el) return;
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration,
          ease: "power2.out",
          scrollTrigger: {
            trigger: selector,
            start: "top 90%",
            once: true,
          },
          onUpdate: () => {
            el.textContent = format
              ? format(obj.val)
              : Math.round(obj.val).toLocaleString();
          },
        });
      };

      STAT_TILES.forEach(({ countClass, target, duration, format }) => {
        countUp(`.${countClass}`, target, duration, format);
      });
    },
    { scope: rootRef }
  );

  return (
    <div className="w5-root" ref={rootRef}>
      {/* ── Skip link ──────────────────────────────────────────────────────── */}
      <a href="#w5-main" className="w5-skip">
        Skip to main content
      </a>

      {/* ── Slim nav ───────────────────────────────────────────────────────── */}
      <nav className="w5-nav" aria-label="Primary navigation">
        <a href="#w5-main" className="w5-nav-logo" aria-label="Koushik Kotamraju — home">
          KK
        </a>
        <ul className="w5-nav-links" role="list">
          <li>
            <a href="#w5-expertise" className="w5-nav-link">
              Expertise
            </a>
          </li>
          <li>
            <a href="#w5-projects" className="w5-nav-link">
              Work
            </a>
          </li>
          <li>
            <a href="#w5-contact" className="w5-nav-link">
              Contact
            </a>
          </li>
        </ul>
        <div className="w5-nav-status" aria-label="Availability status">
          <span className="w5-status-dot" aria-hidden="true" />
          <span className="w5-status-label">Open to opportunities</span>
        </div>
      </nav>

      {/* ── Bento Grid ─────────────────────────────────────────────────────── */}
      <main id="w5-main" className="w5-bento-grid" aria-label="Portfolio overview">

        {/* ── TILE-HERO ───────────────────────────────────────────────────── */}
        <article
          className="w5-tile w5-tile-hero"
          aria-label="Koushik Kotamraju — identity"
        >
          <div className="w5-hero-top">
            <div className="w5-hero-badge" aria-label="Current role">
              <span className="w5-badge-dot" aria-hidden="true" />
              Sr. Security Engineer · Yahoo · 2026
            </div>
          </div>
          <div className="w5-hero-body">
            <h1 className="w5-hero-name">Koushik<br />Kotamraju</h1>
            <p className="w5-hero-role">Sr. Security Engineer · Yahoo Paranoids</p>
            <p className="w5-hero-tagline">
              AI-native platforms protecting 2,823 cloud accounts.<br />
              4 engineers. Enterprise scale.
            </p>
          </div>
          <div className="w5-hero-cta-row">
            <a href="#w5-projects" className="w5-hero-cta">
              View Work →
            </a>
            <a
              href="https://github.com/koushik1610"
              className="w5-hero-cta-ghost"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </div>
        </article>

        {/* ── STAT TILES (data-driven) ────────────────────────────────────── */}
        {STAT_TILES.map((stat) => (
          <article
            key={stat.key}
            className={`w5-tile w5-tile-stat ${stat.tileClass}`}
            aria-label={stat.ariaLabel}
          >
            <div className={`w5-stat-accent ${stat.accentClass}`} aria-hidden="true" />
            <div
              className={`w5-stat-num ${stat.countClass}${stat.numClass ? ` ${stat.numClass}` : ""}`}
              aria-hidden="true"
            >
              {stat.initial}
            </div>
            <div className="w5-stat-label" aria-hidden="true">{stat.label}</div>
            <div className="w5-stat-sub" aria-hidden="true">{stat.sub}</div>
          </article>
        ))}

        {/* ── TILE-EXPERTISE ─────────────────────────────────────────────── */}
        <section
          id="w5-expertise"
          className="w5-tile w5-tile-expertise"
          aria-labelledby="w5-expertise-heading"
        >
          <header className="w5-tile-header">
            <h2 id="w5-expertise-heading" className="w5-tile-title">
              What I Build
            </h2>
            <span className="w5-tile-count" aria-hidden="true">05</span>
          </header>
          <ul className="w5-expertise-list" role="list">
            {EXPERTISE_COMPACT.map((item) => (
              <li key={item.name} className="w5-expertise-item">
                <span className="w5-exp-icon" aria-hidden="true">{item.icon}</span>
                <div className="w5-exp-text">
                  <span className="w5-exp-name">{item.name}</span>
                  <span className="w5-exp-brief">{item.brief}</span>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* ── PROJECT TILES ──────────────────────────────────────────────── */}
        {PROJECTS_BENTO.map((proj, i) => (
          <article
            key={proj.id}
            id={i === 0 ? "w5-projects" : undefined}
            className={`w5-tile w5-tile-project${i >= 2 ? " w5-tile-project--small" : ""}`}
            aria-label={`Project: ${proj.name}`}
          >
            <div className="w5-proj-top">
              <span className="w5-proj-id" aria-hidden="true">{proj.id}</span>
              <div className="w5-proj-metric" aria-label={`${proj.metric} ${proj.metricLabel}`}>
                <span className="w5-proj-metric-num">{proj.metric}</span>
                <span className="w5-proj-metric-lbl">{proj.metricLabel}</span>
              </div>
            </div>
            <h3 className="w5-proj-name">{proj.name}</h3>
            <p className="w5-proj-desc">{proj.desc}</p>
            <div className="w5-proj-tags" aria-label="Technologies">
              {proj.tags.map((tag) => (
                <span key={tag} className="w5-tag">{tag}</span>
              ))}
            </div>
          </article>
        ))}

        {/* ── TILE-CONTACT ────────────────────────────────────────────────── */}
        <section
          id="w5-contact"
          className="w5-tile w5-tile-contact"
          aria-labelledby="w5-contact-heading"
        >
          <div className="w5-contact-inner">
            <p className="w5-contact-eyebrow">Get in touch</p>
            <h2 id="w5-contact-heading" className="w5-contact-heading">
              Let&apos;s connect
            </h2>
            <p className="w5-contact-sub">
              Open to Staff / Principal Security Engineer and AI Security Engineering roles.
            </p>
            <div className="w5-contact-links">
              <a
                href="mailto:koushik.kotamraju1610@gmail.com"
                className="w5-contact-email"
              >
                koushik.kotamraju1610@gmail.com
              </a>
              <div className="w5-contact-social">
                <a
                  href="https://www.linkedin.com/in/koushikkotamraju/"
                  className="w5-contact-social-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn ↗
                </a>
                <a
                  href="https://github.com/koushik1610"
                  className="w5-contact-social-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub ↗
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
