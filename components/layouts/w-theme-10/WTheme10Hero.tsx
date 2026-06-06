"use client";

import { useRef } from "react";
import type { ReactNode } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "motion/react";
import type { Theme } from "@/lib/themes";
import { gsap, useGSAP } from "@/lib/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./styles.css";

gsap.registerPlugin(ScrollTrigger);

// ── Content ─────────────────────────────────────────────────────────────────

const STATS = [
  { key: "accounts", target: 2823, duration: 1.8, initial: "0", numClass: "w10-n-accounts", label: "Cloud Accounts", sub: "AWS + GCP", ariaLabel: "2,823 cloud accounts" },
  { key: "sigs", target: 222, duration: 1.4, initial: "0", numClass: "w10-n-sigs", label: "Detection Signatures", sub: "0% false positives", ariaLabel: "222 detection signatures" },
  { key: "recall", target: 100, duration: 1.4, format: (v: number) => Math.round(v) + "%", initial: "0%", numClass: "w10-n-recall", label: "GOAT Recall", sub: "32 / 32 findings", ariaLabel: "100 percent GOAT recall" },
] as const;

const ICONS: Record<string, ReactNode> = {
  shield: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
  lock: (<><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></>),
  cpu: (<><rect x="4" y="4" width="16" height="16" rx="2" /><rect x="9" y="9" width="6" height="6" /><path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3" /></>),
  cloud: <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9z" />,
  search: (<><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></>),
};

const EXPERTISE = [
  { icon: "shield", name: "Detection Engineering", brief: "222 signatures · 0% FP · 1,500+ AWS accounts" },
  { icon: "lock", name: "IAM Privilege Analysis", brief: "65+ escalation paths · 100% GOAT recall" },
  { icon: "cpu", name: "AI Security Tooling", brief: "19 models · 1,767-node knowledge graph" },
  { icon: "cloud", name: "Cloud Security Architecture", brief: "2,823 accounts · CNAPP · Zero Trust" },
  { icon: "search", name: "Security Research", brief: "Artemis · Antitoxin · 62 toxic combos" },
] as const;

const PROJECTS = [
  { id: "01", name: "Artemis", desc: "Multi-cloud attack-path simulation. GCP SCC + AWS Security Hub unified into an AI-enriched graph.", metric: "2,823+", metricLabel: "accounts", tags: ["Python", "GCP SCC", "Vertex AI"] },
  { id: "02", name: "IAM Audit Agent", desc: "Boto3 tool-calling agent. 65+ escalation paths across 10 vulnerability classes. 100% GOAT recall.", metric: "100%", metricLabel: "recall", tags: ["IAM", "Python", "Boto3"] },
  { id: "03", name: "Autonomous Threat Intel", desc: "19 models, 5 providers, performance-weighted router. $1.40 per run — replaced a manual process.", metric: "$1.40", metricLabel: "per run", tags: ["Multi-Agent", "Claude"] },
  { id: "04", name: "Detection Engine", desc: "222 active signatures via Terraform. MITRE ATT&CK gap analysis. Zero false positives.", metric: "222", metricLabel: "signatures", tags: ["Python", "Lambda", "Terraform"] },
] as const;

// ── Tilt card ───────────────────────────────────────────────────────────────

function TiltCard({
  children,
  className,
  ariaLabel,
  reduce,
  intensity = 9,
}: {
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
  reduce: boolean | null;
  intensity?: number;
}) {
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 150, damping: 18, mass: 0.4 });
  const sry = useSpring(ry, { stiffness: 150, damping: 18, mass: 0.4 });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduce) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    ry.set(px * intensity);
    rx.set(-py * intensity);
  };
  const handleLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.div
      className={className}
      aria-label={ariaLabel}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={reduce ? undefined : { rotateX: srx, rotateY: sry, transformPerspective: 900 }}
    >
      {children}
    </motion.div>
  );
}

// ── Component ───────────────────────────────────────────────────────────────

export default function WTheme10Hero({ theme }: { theme: Theme }) {
  void theme;
  const reduce = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll();
  const layerA = useTransform(scrollY, [0, 800], [0, reduce ? 0 : -120]);
  const layerB = useTransform(scrollY, [0, 800], [0, reduce ? 0 : -60]);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
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
          scrollTrigger: { trigger: ".w10-stats", start: "top 88%", once: true },
          onUpdate: () => {
            el.textContent = fmt ? fmt(obj.val) : Math.round(obj.val).toLocaleString();
          },
        });
      });
    },
    { scope: rootRef }
  );

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: reduce ? 0 : 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-50px" },
    transition: { duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] as const },
  });

  return (
    <div className="w10-root" ref={rootRef}>
      <a href="#w10-main" className="w10-skip">Skip to main content</a>
      <h1 className="w10-sr-only">Koushik Kotamraju — Sr. Security Engineer at Yahoo Paranoids</h1>

      {/* Depth background layers */}
      <motion.div className="w10-layer w10-layer-a" aria-hidden="true" style={{ y: layerA }} />
      <motion.div className="w10-layer w10-layer-b" aria-hidden="true" style={{ y: layerB }} />
      <div className="w10-grid-bg" aria-hidden="true" />

      <nav className="w10-nav" aria-label="Primary navigation">
        <span className="w10-nav-logo" aria-hidden="true">KK</span>
        <span className="w10-nav-role">Sr. Security Engineer · Yahoo</span>
        <a href="https://github.com/koushik1610" className="w10-nav-cta" target="_blank" rel="noopener noreferrer">GitHub</a>
      </nav>

      <main id="w10-main" className="w10-main">
        {/* ── Hero ─────────────────────────────────────────────────────── */}
        <section className="w10-hero" aria-label="Introduction">
          <motion.div {...fadeUp()}>
            <TiltCard className="w10-hero-card" reduce={reduce} intensity={6}>
              <p className="w10-hero-eyebrow">
                <span className="w10-dot" aria-hidden="true" />
                Sr. Security Engineer · Yahoo Paranoids
              </p>
              <div className="w10-hero-name">Koushik<br />Kotamraju</div>
              <p className="w10-hero-tagline">
                Cloud security engineer building AI-native security platforms —
                production systems, not prototypes.
              </p>
              <div className="w10-hero-ctas">
                <a href="#w10-work" className="w10-cta w10-cta--primary">View Work</a>
                <a href="mailto:koushik.kotamraju1610@gmail.com" className="w10-cta">Get in touch</a>
              </div>
            </TiltCard>
          </motion.div>
        </section>

        {/* ── Stats ────────────────────────────────────────────────────── */}
        <section className="w10-stats" aria-label="Key metrics">
          {STATS.map((stat, i) => (
            <motion.div key={stat.key} {...fadeUp(i * 0.08)}>
              <TiltCard className="w10-stat-card" reduce={reduce} ariaLabel={stat.ariaLabel}>
                <span className={`w10-stat-num ${stat.numClass}`} aria-hidden="true">{stat.initial}</span>
                <span className="w10-stat-label">{stat.label}</span>
                <span className="w10-stat-sub">{stat.sub}</span>
              </TiltCard>
            </motion.div>
          ))}
        </section>

        {/* ── Expertise ────────────────────────────────────────────────── */}
        <section className="w10-section" aria-labelledby="w10-exp-head">
          <motion.div className="w10-section-head" {...fadeUp()}>
            <h2 id="w10-exp-head" className="w10-section-title">What I build</h2>
            <span className="w10-section-count" aria-hidden="true">05</span>
          </motion.div>
          <ul className="w10-exp-list" role="list">
            {EXPERTISE.map((item, i) => (
              <motion.li key={item.name} className="w10-exp-card" {...fadeUp(i * 0.05)}>
                <span className="w10-exp-icon" aria-hidden="true">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    {ICONS[item.icon]}
                  </svg>
                </span>
                <span className="w10-exp-name">{item.name}</span>
                <span className="w10-exp-brief">{item.brief}</span>
              </motion.li>
            ))}
          </ul>
        </section>

        {/* ── Work ─────────────────────────────────────────────────────── */}
        <section id="w10-work" className="w10-section" aria-labelledby="w10-work-head">
          <motion.div className="w10-section-head" {...fadeUp()}>
            <h2 id="w10-work-head" className="w10-section-title">Selected work</h2>
            <span className="w10-section-count" aria-hidden="true">04</span>
          </motion.div>
          <div className="w10-work-grid">
            {PROJECTS.map((proj, i) => (
              <motion.div key={proj.id} {...fadeUp(i * 0.06)}>
                <TiltCard className="w10-proj-card" reduce={reduce} ariaLabel={`Project: ${proj.name}`}>
                  <div className="w10-proj-top">
                    <span className="w10-proj-id" aria-hidden="true">{proj.id}</span>
                    <div className="w10-proj-metric" aria-label={`${proj.metric} ${proj.metricLabel}`}>
                      <span className="w10-proj-metric-num">{proj.metric}</span>
                      <span className="w10-proj-metric-label">{proj.metricLabel}</span>
                    </div>
                  </div>
                  <h3 className="w10-proj-name">{proj.name}</h3>
                  <p className="w10-proj-desc">{proj.desc}</p>
                  <div className="w10-proj-tags" aria-label="Technologies">
                    {proj.tags.map((t) => (<span key={t} className="w10-tag">{t}</span>))}
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── Contact ──────────────────────────────────────────────────── */}
        <section className="w10-contact" aria-labelledby="w10-contact-head">
          <motion.div {...fadeUp()}>
            <TiltCard className="w10-contact-card" reduce={reduce} intensity={5}>
              <p className="w10-contact-eyebrow">Open to opportunities</p>
              <h2 id="w10-contact-head" className="w10-contact-title">
                Let&apos;s build security that holds.
              </h2>
              <p className="w10-contact-sub">
                Open to Staff &amp; Principal Security Engineer and AI Security Engineering roles.
              </p>
              <div className="w10-contact-links">
                <a href="mailto:koushik.kotamraju1610@gmail.com" className="w10-cta w10-cta--primary">koushik.kotamraju1610@gmail.com</a>
                <a href="https://www.linkedin.com/in/koushikkotamraju/" className="w10-cta" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                <a href="https://github.com/koushik1610" className="w10-cta" target="_blank" rel="noopener noreferrer">GitHub</a>
              </div>
            </TiltCard>
          </motion.div>
        </section>
      </main>
    </div>
  );
}
