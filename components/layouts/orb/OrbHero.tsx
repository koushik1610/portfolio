"use client";

import { useRef, useEffect } from "react";
import { motion } from "motion/react";
import type { Theme } from "@/lib/themes";

// ── Content ───────────────────────────────────────────────────────────────────

const BIO =
  "With nine years of security engineering across three organizations, I focus on detection at cloud account scale, IAM privilege analysis, and agentic security workflows — AI-native security tooling that gives a small team genuine leverage over a large attack surface.";

const EXPERTISE = [
  {
    num: "01",
    name: "Detection Engineering",
    desc: "200+ active Python/Lambda detection signatures across 1,500+ AWS accounts — sustaining a 0% false-positive rate while continuously expanding coverage. CIS-benchmarked baselines grounded in MITRE ATT&CK technique coverage from cloud incident response data. Detection fleet deployed via Terraform for machine-speed detection and response at account scale.",
  },
  {
    num: "02",
    name: "IAM Privilege Analysis",
    desc: "AI-native IAM audit agent using Boto3 tool-calling to enumerate live AWS IAM configurations — traversing 65+ privilege escalation paths across 10 vulnerability classes with LLM semantic interpretation to surface transitive chains that rule-based tools miss. 100% recall on GOAT benchmark — 32/32 findings, zero false positives.",
  },
  {
    num: "03",
    name: "AI Security Tooling",
    desc: "Multi-agent orchestration across 19 foundation models from 5 providers — agentic pipeline with a performance-weighted router for autonomous security research. Agentic SOAR workstation backed by a 1,767-node knowledge graph from 1,400+ historical tickets, serving as the autonomous review agent for 123 security reviews across all business units.",
  },
  {
    num: "04",
    name: "Cloud Security Architecture",
    desc: "Multi-cloud coverage across 2,500+ AWS and GCP accounts. CNAPP-class attack path simulation unifying GCP SCC and AWS Security Hub into an AI-enriched graph layer with AI-augmented CSPM, crown-jewel exposure tracking, and toxic IAM combination trending. Zero Trust posture enforcement across the full cloud account estate.",
  },
  {
    num: "05",
    name: "Security Research",
    desc: "Artemis: CNAPP-class multi-cloud attack path simulation platform — agentic pipeline mapping attack chains to dissolution playbooks. Antitoxin: graph-theoretic IAM privilege escalation analysis cataloguing 62 toxic combinations across 8 attack categories with minimum cut-set auto-remediation actions and policy-as-code output.",
  },
] as const;

const PROJECTS = [
  {
    id: "01",
    name: "Artemis",
    desc: "CNAPP-class multi-cloud attack path simulation. GCP SCC + AWS Security Hub unified into an AI-enriched graph layer via agentic pipeline. Crown-jewel exposure, toxic IAM combination trends, cross-cloud attack chains mapped to MITRE ATT&CK.",
    metric: "2,500+",
    metricLabel: "accounts unified",
    tags: ["Python", "GCP SCC", "AWS SHub", "Vertex AI"],
  },
  {
    id: "02",
    name: "IAM Audit Agent",
    desc: "AI-native IAM audit agent — Boto3 tool-calling to enumerate live AWS IAM configurations. 65+ escalation paths across 10 vulnerability classes. LLM semantic interpretation surfaces transitive chains. 100% recall on GOAT benchmark.",
    metric: "100%",
    metricLabel: "GOAT recall",
    tags: ["IAM Analysis", "Graph Theory", "Python", "Boto3"],
  },
  {
    id: "03",
    name: "Autonomous Threat Intelligence Pipeline",
    desc: "Autonomous threat intelligence ingestion agent — multi-agent orchestration pipeline across 19 foundation models from 5 providers. Performance-weighted router delivering analyst-ready security proposals at $1.40/run. Replaced a fully manual weekly research process.",
    metric: "$1.40",
    metricLabel: "per research sweep",
    tags: ["Python", "Multi-Agent Orchestration", "Claude", "Gemini", "GPT-4"],
  },
  {
    id: "04",
    name: "Detection Engine",
    desc: "200+ active detection signatures deployed via Terraform across 1,500+ AWS accounts. MITRE ATT&CK gap analysis against 74 real-world techniques from cloud incident response data. Machine-speed detection and response — zero false positives at account scale.",
    metric: "200+",
    metricLabel: "active signatures",
    tags: ["Python", "Lambda", "AWS", "MITRE ATT&CK", "Terraform"],
  },
] as const;

// ── Sub-components ────────────────────────────────────────────────────────────

const FADE_DURATION = 800;

function VideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      video.pause();
      video.style.opacity = "1";
      return;
    }

    video.style.opacity = "0";

    function fadeIn(timestamp: number, startTime: number) {
      const progress = Math.min((timestamp - startTime) / FADE_DURATION, 1);
      const eased = 1 - Math.pow(1 - progress, 2);
      if (video) video.style.opacity = String(eased);
      if (progress < 1) {
        rafRef.current = requestAnimationFrame((ts) => fadeIn(ts, startTime));
      }
    }

    function handleCanPlay() {
      rafRef.current = requestAnimationFrame((ts) => fadeIn(ts, ts));
    }

    function handleError() {
      if (video) video.style.opacity = "1";
    }

    video.addEventListener("canplay", handleCanPlay, { once: true });
    video.addEventListener("error", handleError, { once: true });
    if (video.readyState >= 3) handleCanPlay();

    return () => {
      video.removeEventListener("canplay", handleCanPlay);
      video.removeEventListener("error", handleError);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div className="ath-video-wrap" aria-hidden="true">
      <video
        ref={videoRef}
        className="ath-video"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/videos/orb-poster.jpg"
      >
        <source src="/videos/orb-hero.mp4" type="video/mp4" />
      </video>
      <div className="ath-video-overlay" />
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────

export default function OrbHero({ theme }: { theme: Theme }) {
  void theme;

  return (
    <div className="ath-root">
      <a href="#ath-main" className="ath-skip">Skip to main content</a>
      <h1 className="ath-sr-only">Koushik Kotamraju — Sr. Security Engineer</h1>

      {/* ── NAV ──────────────────────────────────────────────────────────────── */}
      <nav className="ath-nav" aria-label="Primary navigation">
        <a href="#about" className="ath-logo">
          Koushik<span className="ath-reg">®</span>
        </a>
        <div className="ath-nav-links">
          <a href="#about"     className="ath-nav-link">Home</a>
          <a href="#work"      className="ath-nav-link">Work</a>
          <a href="#about-bio" className="ath-nav-link">About</a>
          <a href="#contact"   className="ath-nav-link">Contact</a>
        </div>
        <a href="#work" className="ath-nav-cta">View Work</a>
      </nav>

      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <section id="about" className="ath-hero">
        <VideoBackground />
        <div id="ath-main" className="ath-hero-content">
          <p className="ath-eyebrow" aria-hidden="true">
            Security Engineering · AI Systems · Cloud Architecture
          </p>
          <div aria-hidden="true" className="ath-headline">
            Koushik Kotamraju
          </div>
          <p className="ath-tagline" aria-hidden="true">
            Beyond noise,{" "}
            <em>I build</em>
            {" "}what holds.
          </p>
          <p className="ath-hero-desc">{BIO}</p>
          <a href="#work" className="ath-hero-cta">
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
        </div>
      </section>

      {/* ── ABOUT / BIO ──────────────────────────────────────────────────────── */}
      <section id="about-bio" className="ath-bio-section">
        <div className="ath-bio-left">
          <p className="ath-bio-label">About</p>
          <p className="ath-bio-quote">
            Security systems that{" "}
            <em>find what others miss</em>
            {" "}and hold under pressure.
          </p>
        </div>
        <div className="ath-bio-right">
          <p className="ath-bio-text">
            Sr. Security Engineer at Yahoo. Nine years across Infosys, Cyr3con, and Yahoo
            — building detection systems, AI research pipelines, and IAM privilege analysis tools at
            enterprise scale.
          </p>
          <p className="ath-bio-text">
            On a 4-person team covering 2,500+ cloud accounts, I build systems with genuine leverage:
            attack path simulation, self-learning model orchestration, and detection signatures
            grounded in real-world MITRE ATT&CK coverage.
          </p>
          <div className="ath-bio-stats">
            <div className="ath-stat">
              <span className="ath-stat-num">200+</span>
              <span className="ath-stat-label">Active Signatures</span>
            </div>
            <div className="ath-stat">
              <span className="ath-stat-num">2,500+</span>
              <span className="ath-stat-label">Cloud Accounts</span>
            </div>
            <div className="ath-stat">
              <span className="ath-stat-num">100%</span>
              <span className="ath-stat-label">Escalation Recall</span>
            </div>
            <div className="ath-stat">
              <span className="ath-stat-num">9yr</span>
              <span className="ath-stat-label">Security Experience</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── EXPERTISE ────────────────────────────────────────────────────────── */}
      <section className="ath-expertise-section">
        <div className="ath-expertise-inner">
          <div className="ath-expertise-header">
            <h2 className="ath-expertise-title">What I Build</h2>
            <span className="ath-expertise-count" aria-hidden="true">05 areas</span>
          </div>
          <div className="ath-expertise-grid">
            {EXPERTISE.map((item, i) => (
              <motion.div
                key={item.num}
                className="ath-exp-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <span className="ath-exp-num">{item.num}</span>
                <div className="ath-exp-name">{item.name}</div>
                <p className="ath-exp-desc">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROJECTS ─────────────────────────────────────────────────────────── */}
      <section id="work" className="ath-projects-section">
        <div className="ath-projects-inner">
          <div className="ath-projects-header">
            <h2 className="ath-projects-title">Selected Work</h2>
          </div>
          {PROJECTS.map((proj, i) => (
            <motion.div
              key={proj.id}
              className="ath-project-row"
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <span className="ath-proj-num">{proj.id}</span>
              <div className="ath-proj-info">
                <div className="ath-proj-name">{proj.name}</div>
                <p className="ath-proj-desc">{proj.desc}</p>
              </div>
              <div className="ath-proj-tags">
                {proj.tags.map((tag) => (
                  <span key={tag} className="ath-proj-tag">{tag}</span>
                ))}
              </div>
              <div className="ath-proj-metric">
                <span className="ath-proj-metric-num">{proj.metric}</span>
                <span className="ath-proj-metric-label">{proj.metricLabel}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── CONTACT ──────────────────────────────────────────────────────────── */}
      <section id="contact" className="ath-contact">
        <p className="ath-contact-label">Let&apos;s connect</p>
        <h2 className="ath-contact-heading">
          Open to senior{" "}
          <em>security engineering</em>
          {" "}roles.
        </h2>
        <div className="ath-contact-links">
          <a href="mailto:koushik.kotamraju1610@gmail.com" className="ath-contact-link">
            Email
          </a>
          <a
            href="https://www.linkedin.com/in/koushikkotamraju/"
            className="ath-contact-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/koushik1610"
            className="ath-contact-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </div>
      </section>

      <nav className="ath-mobile-nav" aria-label="Mobile section navigation">
        <a href="#about"     className="ath-mobile-nav-link">Home</a>
        <a href="#work"      className="ath-mobile-nav-link">Work</a>
        <a href="#about-bio" className="ath-mobile-nav-link">About</a>
        <a href="#contact"   className="ath-mobile-nav-link">Contact</a>
      </nav>
    </div>
  );
}
