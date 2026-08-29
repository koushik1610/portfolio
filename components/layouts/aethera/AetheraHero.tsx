"use client";

import { useRef, useEffect } from "react";
import { motion, useReducedMotion } from "motion/react";
import type { Theme } from "@/lib/themes";
// Animation ownership: GSAP (SplitText) owns the hero headline/tagline;
// motion/react owns the whileInView reveals on expertise cards + project rows.
import { gsap, useGSAP, SplitText } from "@/lib/gsap";
import "./styles.css";

// ── Content ───────────────────────────────────────────────────────────────────

const BIO =
  "With nine years of security engineering across three organizations, I focus on detection at cloud account scale, IAM privilege analysis, and agentic security workflows — AI-native security tooling that gives a small team genuine leverage over a large attack surface.";

const EXPERTISE = [
  {
    num: "01",
    name: "Detection Engineering",
    desc: "200+ active Python/Lambda detection signatures evaluating resource configurations across 1,400+ AWS accounts — producing per-resource findings and the security-posture scores the company is measured against. CIS-benchmarked baselines grounded in MITRE ATT&CK technique coverage from cloud incident response data. Detection fleet deployed via Terraform for machine-speed detection and response at account scale.",
  },
  {
    num: "02",
    name: "IAM Privilege Analysis",
    desc: "AI-native IAM audit agent using Boto3 tool-calling to enumerate live AWS IAM configurations — organised around 10 vulnerability classes, matched against DataDog's public 65+ path catalogue, with LLM semantic interpretation to surface transitive chains that rule-based tools miss. Built the GOAT benchmark first — 32 ground-truth findings — and evaluated the agent against all of them.",
  },
  {
    num: "03",
    name: "AI Security Tooling",
    desc: "Multi-agent orchestration across 19 foundation models from 5 providers — agentic pipeline with a performance-weighted router for autonomous security research. Agentic SOAR workstation backed by a 1,700+-node knowledge graph from a large corpus of historical tickets, serving as the autonomous review agent for 100+ security reviews across all business units.",
  },
  {
    num: "04",
    name: "Cloud Security Architecture",
    desc: "Guardrails across 2,800+ AWS and GCP accounts. Attack-path operationalization built on GCP Security Command Center: AI enrichment, crown-jewel exposure tracking, longitudinal toxic-combination trending, and a coverage rotation under the platform's hard simulation cap. The AWS side is designed, not built.",
  },
  {
    num: "05",
    name: "Security Research",
    desc: "Artemis: attack-path operationalization over a native cloud platform, implemented on GCP with the AWS side designed and not yet built. Antitoxin: CIEM research cataloguing 62 toxic IAM combinations by hand across 8 attack categories, each with the keystone permission whose removal breaks that chain. Research and design; no implementation yet.",
  },
] as const;

const PROJECTS = [
  {
    id: "01",
    name: "Artemis",
    desc: "Attack-path operationalization on GCP Security Command Center: export, AI enrichment, business-context mapping, longitudinal tracking, and coverage rotation under a hard platform cap. AWS designed, not built, so the cross-cloud view does not exist yet.",
    metric: "2,800+",
    metricLabel: "accounts unified",
    tags: ["Python", "GCP SCC", "AWS SHub", "Vertex AI"],
  },
  {
    id: "02",
    name: "IAM Audit Agent",
    desc: "AI-native IAM audit agent — Boto3 tool-calling to enumerate live AWS IAM configurations. 10 vulnerability classes, matched against a public 65+ path catalogue. LLM semantic interpretation surfaces transitive chains. Evaluated against 32 GOAT findings.",
    metric: "32",
    metricLabel: "GOAT benchmarks",
    tags: ["IAM Analysis", "Graph Theory", "Python", "Boto3"],
  },
  {
    id: "03",
    name: "Autonomous Threat Intelligence Pipeline",
    desc: "Autonomous threat intelligence ingestion agent — multi-agent orchestration pipeline across 19 foundation models from 5 providers. Performance-weighted router delivering analyst-ready security proposals from $1.40 per sweep. Replaced a fully manual weekly research process.",
    metric: "$1.40",
    metricLabel: "per research sweep",
    tags: ["Python", "Multi-Agent Orchestration", "Claude", "Gemini", "GPT-4"],
  },
  {
    id: "04",
    name: "Detection Engine",
    desc: "200+ active detection signatures deployed via Terraform, evaluating 1,400+ AWS accounts. MITRE ATT&CK gap analysis against real-world techniques from cloud incident response data. Machine-speed detection and response at account scale.",
    metric: "200+",
    metricLabel: "active signatures",
    tags: ["Python", "Lambda", "AWS", "MITRE ATT&CK", "Terraform"],
  },
] as const;

// ── Sub-components ────────────────────────────────────────────────────────────

const FADE_DURATION = 800; // ms, matches spec's 0.8s ease-out

function VideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Respect prefers-reduced-motion: stop the looping animation entirely
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      video.pause();
      video.style.opacity = "1";
      return;
    }

    video.style.opacity = "0";

    function fadeIn(timestamp: number, startTime: number) {
      const progress = Math.min((timestamp - startTime) / FADE_DURATION, 1);
      const eased = 1 - Math.pow(1 - progress, 2); // ease-out quadratic
      if (video) video.style.opacity = String(eased);
      if (progress < 1) {
        rafRef.current = requestAnimationFrame((ts) => fadeIn(ts, startTime));
      }
    }

    function handleCanPlay() {
      rafRef.current = requestAnimationFrame((ts) => fadeIn(ts, ts));
    }

    function handleError() {
      // Video failed to load — show fallback immediately so section is never invisible
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
        poster="/videos/aethera-poster.jpg"
      >
        <source src="/videos/aethera-hero.mp4" type="video/mp4" />
      </video>
      <div className="ath-video-overlay" />
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────

export default function AetheraHero({ theme }: { theme: Theme }) {
  void theme;
  const rootRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  useGSAP(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    // Failsafe: if the rAF ticker stalls during this entrance window (video
    // decode + font load + initial layout all competing for frames right at
    // mount), the mask-clipped SplitText reveal can freeze mid-flight with
    // no natural way to recover — unlike a plain fade, a stuck mask leaves
    // the name genuinely unreadable. Wall-clock setTimeout still fires when
    // rAF does not, so force-complete the timeline if it hasn't finished.
    const settleTimers: number[] = [];
    const settle = (tw: gsap.core.Timeline, ms: number) => {
      settleTimers.push(
        window.setTimeout(() => {
          if (tw.progress() < 1) tw.progress(1);
        }, ms)
      );
    };

    // Both elements are aria-hidden — sr-only h1 handles accessibility
    const splitHeadline = SplitText.create(".ath-headline", {
      type: "words",
      mask: "words",
      aria: "none", // target is aria-hidden (§3.4b)
    });
    const splitTagline = SplitText.create(".ath-tagline", {
      type: "words",
      aria: "none", // target is aria-hidden (§3.4b)
    });

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Headline: masked word reveal upward — premium editorial feel
    tl.from(splitHeadline.words, {
      yPercent: 110,
      duration: 0.8,
      stagger: 0.07,
    })
    // Tagline: soft fade + lift, starts while headline is still revealing
    .from(splitTagline.words, {
      autoAlpha: 0,
      y: 14,
      duration: 0.5,
      stagger: 0.05,
    }, "-=0.5");
    settle(tl, 3000);

    return () => settleTimers.forEach((t) => window.clearTimeout(t));
  }, { scope: rootRef });

  return (
    <div className="ath-root" ref={rootRef}>
      {/* Skip to main content — WCAG 2.4.1 */}
      <a href="#ath-main" className="ath-skip">Skip to main content</a>

      {/* Accessible page title — screen readers read this, visual headline is decorative */}
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
          <a href="#ath-contact"   className="ath-nav-link">Contact</a>
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
          {/* Decorative display headline — aria-hidden so sr-only h1 is the sole page title */}
          <div aria-hidden="true" className="ath-headline">
            Koushik Kotamraju
          </div>
          <p className="ath-tagline" aria-hidden="true">
            I build the{" "}
            <em>AI layer</em>
            {" "}security was missing.
          </p>
          <p className="ath-hero-desc">{BIO}</p>
          <div className="ath-cta-row">
            <a href="mailto:koushik.kotamraju1610@gmail.com" className="ath-hero-cta">
              Email me
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
            <a href="/resume/" className="ath-hero-cta ath-hero-cta--ghost">
              Résumé
            </a>
          </div>
        </div>
      </section>

      {/* ── ABOUT / BIO ──────────────────────────────────────────────────────── */}
      <section id="about-bio" className="ath-bio-section">
        <div className="ath-bio-left">
          <p className="ath-bio-label">About</p>
          <p className="ath-bio-quote">
            Building security systems that{" "}
            <em>find what others miss</em>
            {" "}and hold under pressure.
          </p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/profile.jpeg"
            alt="Portrait of Koushik Kotamraju"
            className="ath-portrait"
            loading="lazy"
          />
        </div>
        <div className="ath-bio-right">
          <p className="ath-bio-text">
            Sr. Security Engineer at Yahoo. Nine years across Infosys, Cyr3con, and Yahoo
            — building detection systems, AI research pipelines, and IAM privilege analysis tools at
            enterprise scale.
          </p>
          <p className="ath-bio-text">
            On a small team covering 2,800+ cloud accounts, I build systems with genuine leverage:
            attack path simulation, self-learning model orchestration, and detection signatures
            grounded in real-world MITRE ATT&CK coverage.
          </p>
          <div className="ath-bio-stats">
            <div className="ath-stat">
              <span className="ath-stat-num">200+</span>
              <span className="ath-stat-label">Active Signatures</span>
            </div>
            <div className="ath-stat">
              <span className="ath-stat-num">2,800+</span>
              <span className="ath-stat-label">Cloud Accounts</span>
            </div>
            <div className="ath-stat">
              <span className="ath-stat-num">100+</span>
              <span className="ath-stat-label">Security Reviews</span>
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
                initial={reduceMotion ? false : { opacity: 0, y: 20 }}
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
              initial={reduceMotion ? false : { opacity: 0, x: -16 }}
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
      {/* id is "ath-contact", not "contact" — the global rule in app/globals.css
          hides any section#contact to suppress the generic Contact component
          on themed pages, and would otherwise nuke this bespoke one too. */}
      <section id="ath-contact" className="ath-contact">
        <p className="ath-contact-label">Let&apos;s connect</p>
        <h2 className="ath-contact-heading">
          Open to senior{" "}
          <em>security engineering</em>
          {" "}roles.
        </h2>
        <div className="ath-contact-links">
          <a
            href="mailto:koushik.kotamraju1610@gmail.com"
            className="ath-contact-link"
          >
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

      {/* Mobile bottom nav — fixed, visible only at ≤640px */}
      <nav className="ath-mobile-nav" aria-label="Mobile section navigation">
        <a href="#about"     className="ath-mobile-nav-link">Home</a>
        <a href="#work"      className="ath-mobile-nav-link">Work</a>
        <a href="#about-bio" className="ath-mobile-nav-link">About</a>
        <a href="#ath-contact"   className="ath-mobile-nav-link">Contact</a>
      </nav>
    </div>
  );
}
