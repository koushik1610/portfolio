"use client";

import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import type { Theme } from "@/lib/themes";
import { gsap, useGSAP, ScrambleTextPlugin } from "@/lib/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./styles.css";

gsap.registerPlugin(ScrollTrigger, ScrambleTextPlugin);

// ── Content ─────────────────────────────────────────────────────────────────

interface Stat {
  key: string;
  target: number;
  duration: number;
  format?: (v: number) => string;
  initial: string;
  numClass: string;
  label: string;
  ariaLabel: string;
}

const STATS: Stat[] = [
  { key: "accounts", target: 2823, duration: 1.6, initial: "0", numClass: "w7-n-accounts", label: "cloud accounts", ariaLabel: "2,823 cloud accounts" },
  { key: "sigs", target: 222, duration: 1.4, initial: "0", numClass: "w7-n-sigs", label: "detection signatures", ariaLabel: "222 detection signatures" },
  { key: "recall", target: 100, duration: 1.4, format: (v) => Math.round(v) + "%", initial: "0%", numClass: "w7-n-recall", label: "GOAT recall", ariaLabel: "100 percent GOAT recall" },
  { key: "cost", target: 1.4, duration: 1.2, format: (v) => "$" + v.toFixed(2), initial: "$0.00", numClass: "w7-n-cost", label: "per research run", ariaLabel: "1 dollar 40 cents per research run" },
];

const ICONS: Record<string, ReactNode> = {
  shield: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
  lock: (<><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></>),
  cpu: (<><rect x="4" y="4" width="16" height="16" rx="2" /><rect x="9" y="9" width="6" height="6" /><path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3" /></>),
  cloud: <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9z" />,
  search: (<><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></>),
};

const EXPERTISE = [
  { icon: "shield", name: "Detection Engineering", brief: "222 signatures · 0% FP · 1,500+ AWS accounts", hint: "MITRE ATT&CK" },
  { icon: "lock", name: "IAM Privilege Analysis", brief: "65+ escalation paths · 10 vuln classes · 100% GOAT recall", hint: "Boto3" },
  { icon: "cpu", name: "AI Security Tooling", brief: "19 models · 5 providers · 1,767-node knowledge graph", hint: "Multi-Agent" },
  { icon: "cloud", name: "Cloud Security Architecture", brief: "2,823 AWS + GCP accounts · CNAPP · Zero Trust", hint: "CSPM" },
  { icon: "search", name: "Security Research", brief: "Artemis · Antitoxin · 62 toxic IAM combinations", hint: "Graph Theory" },
] as const;

const PROJECTS = [
  { id: "01", name: "Artemis", desc: "Multi-cloud attack-path simulation. GCP SCC + AWS Security Hub unified into an AI-enriched graph layer.", metric: "2,823+", metricLabel: "accounts", tags: ["Python", "GCP SCC", "Vertex AI"] },
  { id: "02", name: "IAM Audit Agent", desc: "Boto3 tool-calling agent. 65+ escalation paths across 10 vulnerability classes. 100% GOAT recall.", metric: "100%", metricLabel: "recall", tags: ["IAM", "Python", "Boto3"] },
  { id: "03", name: "Autonomous Threat Intel", desc: "19 models, 5 providers, performance-weighted router. $1.40 per run — replaced a manual weekly process.", metric: "$1.40", metricLabel: "per run", tags: ["Multi-Agent", "Claude"] },
  { id: "04", name: "Detection Engine", desc: "222 active signatures via Terraform. MITRE ATT&CK gap analysis. Zero false positives at scale.", metric: "222", metricLabel: "signatures", tags: ["Python", "Lambda", "Terraform"] },
] as const;

const ACTIONS = [
  { label: "Email", value: "koushik.kotamraju1610@gmail.com", href: "mailto:koushik.kotamraju1610@gmail.com", keys: "↵" },
  { label: "LinkedIn", value: "in/koushikkotamraju", href: "https://www.linkedin.com/in/koushikkotamraju/", keys: "↗" },
  { label: "GitHub", value: "github.com/koushik1610", href: "https://github.com/koushik1610", keys: "↗" },
] as const;

const FULL_NAME = "Koushik Kotamraju";

// ── Component ───────────────────────────────────────────────────────────────

export default function WTheme07Hero({ theme }: { theme: Theme }) {
  void theme;
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      // Console panel entrance
      if (!prefersReduced) {
        gsap.from(".w7-console", {
          autoAlpha: 0,
          y: 24,
          scale: 0.985,
          filter: "blur(8px)",
          duration: 0.8,
          ease: "power3.out",
        });
        gsap.from(".w7-console-row, .w7-console-foot", {
          autoAlpha: 0,
          y: 12,
          duration: 0.5,
          stagger: 0.07,
          ease: "power2.out",
          delay: 0.35,
        });

        // Scramble the display name
        const nameEl = rootRef.current?.querySelector<HTMLElement>(".w7-console-name");
        if (nameEl) {
          gsap.to(nameEl, {
            duration: 1.5,
            delay: 0.3,
            scrambleText: {
              text: FULL_NAME,
              chars: "upperAndLowerCase",
              speed: 0.6,
            },
          });
        }
      }

      // Count-ups
      STATS.forEach((stat) => {
        const el = rootRef.current?.querySelector<HTMLElement>(`.${stat.numClass}`);
        if (!el) return;
        if (prefersReduced) {
          el.textContent = stat.format ? stat.format(stat.target) : String(stat.target);
          return;
        }
        const obj = { val: 0 };
        gsap.to(obj, {
          val: stat.target,
          duration: stat.duration,
          ease: "power2.out",
          scrollTrigger: { trigger: ".w7-statbar", start: "top 90%", once: true },
          onUpdate: () => {
            el.textContent = stat.format ? stat.format(obj.val) : Math.round(obj.val).toLocaleString();
          },
        });
      });

      // Section rows reveal
      if (!prefersReduced) {
        gsap.utils.toArray<HTMLElement>(".w7-section").forEach((sec) => {
          gsap.from(sec.querySelectorAll(".w7-row, .w7-section-head"), {
            autoAlpha: 0,
            y: 16,
            duration: 0.5,
            stagger: 0.06,
            ease: "power2.out",
            scrollTrigger: { trigger: sec, start: "top 80%", once: true },
          });
        });
      }
    },
    { scope: rootRef }
  );

  // Real ⌘K / Ctrl+K: jump to the actions and focus the first one.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        const first = rootRef.current?.querySelector<HTMLElement>(".w7-action-link");
        if (first) {
          first.scrollIntoView({ behavior: "smooth", block: "center" });
          first.focus({ preventScroll: true });
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="w7-root" ref={rootRef}>
      <a href="#w7-main" className="w7-skip">Skip to main content</a>
      <h1 className="w7-sr-only">Koushik Kotamraju — Sr. Security Engineer at Yahoo Paranoids</h1>

      <nav className="w7-nav" aria-label="Primary navigation">
        <span className="w7-nav-logo" aria-hidden="true">KK</span>
        <span className="w7-nav-hint" aria-hidden="true">
          <kbd className="w7-kbd">⌘</kbd><kbd className="w7-kbd">K</kbd> to navigate
        </span>
        <a href="https://github.com/koushik1610" className="w7-nav-cta" target="_blank" rel="noopener noreferrer">GitHub</a>
      </nav>

      <main id="w7-main" className="w7-stage">
        {/* ── Console hero ─────────────────────────────────────────────── */}
        <section className="w7-console" aria-label="Profile">
          <div className="w7-console-bar">
            <svg className="w7-cmd-glyph" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="m6 17 5-5-5-5M13 17h5" />
            </svg>
            <span className="w7-cmd-prompt" aria-hidden="true">whoami</span>
            <span className="w7-cmd-tag" aria-hidden="true">profile</span>
          </div>

          <div className="w7-console-body">
            <p className="w7-console-name-line w7-console-row">
              <span className="w7-console-name" aria-hidden="true">{FULL_NAME}</span>
              <span className="w7-caret" aria-hidden="true" />
            </p>
            <p className="w7-console-role w7-console-row">Sr. Security Engineer · Yahoo Paranoids</p>

            <div className="w7-console-results">
              <div className="w7-result-label w7-console-row" aria-hidden="true">Summary</div>
              <p className="w7-console-line w7-console-row">
                Cloud security engineer building AI-native security platforms —
                <span className="w7-em"> production systems, not prototypes.</span>
              </p>
              <p className="w7-console-line w7-console-row w7-console-hook">
                4 engineers. 2,823 cloud accounts. The math only works if you build the right systems.
              </p>
            </div>
          </div>

          <div className="w7-console-foot">
            <span className="w7-foot-keys" aria-hidden="true">
              <kbd className="w7-kbd">⌘</kbd><kbd className="w7-kbd">K</kbd> jump to contact
            </span>
            <span className="w7-foot-status"><span className="w7-status-dot" aria-hidden="true" /> Open to opportunities</span>
          </div>
        </section>

        {/* ── Stat bar ─────────────────────────────────────────────────── */}
        <section className="w7-statbar" aria-label="Key metrics">
          {STATS.map((stat) => (
            <div key={stat.key} className="w7-stat" aria-label={stat.ariaLabel}>
              <span className={`w7-stat-num ${stat.numClass}`} aria-hidden="true">{stat.initial}</span>
              <span className="w7-stat-label" aria-hidden="true">{stat.label}</span>
            </div>
          ))}
        </section>

        {/* ── Capabilities ─────────────────────────────────────────────── */}
        <section className="w7-section" aria-labelledby="w7-cap-head">
          <div className="w7-section-head">
            <h2 id="w7-cap-head" className="w7-section-title">Capabilities</h2>
            <span className="w7-section-count" aria-hidden="true">05</span>
          </div>
          <ul className="w7-rows" role="list">
            {EXPERTISE.map((item) => (
              <li key={item.name} className="w7-row w7-row-cap">
                <span className="w7-row-bar" aria-hidden="true" />
                <span className="w7-row-icon" aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    {ICONS[item.icon]}
                  </svg>
                </span>
                <span className="w7-row-main">
                  <span className="w7-row-name">{item.name}</span>
                  <span className="w7-row-brief">{item.brief}</span>
                </span>
                <span className="w7-row-hint" aria-hidden="true">{item.hint}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* ── Selected Work ────────────────────────────────────────────── */}
        <section className="w7-section" aria-labelledby="w7-work-head">
          <div className="w7-section-head">
            <h2 id="w7-work-head" className="w7-section-title">Selected Work</h2>
            <span className="w7-section-count" aria-hidden="true">04</span>
          </div>
          <ul className="w7-rows" role="list">
            {PROJECTS.map((proj) => (
              <li key={proj.id} className="w7-row w7-row-proj" aria-label={`Project: ${proj.name}`}>
                <span className="w7-row-bar" aria-hidden="true" />
                <span className="w7-proj-id" aria-hidden="true">{proj.id}</span>
                <span className="w7-row-main">
                  <span className="w7-row-name">{proj.name}</span>
                  <span className="w7-row-brief">{proj.desc}</span>
                  <span className="w7-proj-tags">
                    {proj.tags.map((t) => (<span key={t} className="w7-tag">{t}</span>))}
                  </span>
                </span>
                <span className="w7-proj-metric" aria-label={`${proj.metric} ${proj.metricLabel}`}>
                  <span className="w7-proj-metric-num">{proj.metric}</span>
                  <span className="w7-proj-metric-label">{proj.metricLabel}</span>
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* ── Actions / Contact ────────────────────────────────────────── */}
        <section className="w7-section" aria-labelledby="w7-act-head">
          <div className="w7-section-head">
            <h2 id="w7-act-head" className="w7-section-title">Actions</h2>
            <span className="w7-section-count" aria-hidden="true">contact</span>
          </div>
          <ul className="w7-rows" role="list">
            {ACTIONS.map((a) => (
              <li key={a.label} className="w7-row w7-row-action">
                <a
                  className="w7-action-link"
                  href={a.href}
                  {...(a.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  aria-label={`${a.label}: ${a.value}`}
                >
                  <span className="w7-row-bar" aria-hidden="true" />
                  <span className="w7-action-label">{a.label}</span>
                  <span className="w7-action-value">{a.value}</span>
                  <span className="w7-action-keys" aria-hidden="true"><kbd className="w7-kbd">{a.keys}</kbd></span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}
