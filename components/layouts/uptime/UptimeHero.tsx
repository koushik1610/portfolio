"use client";

import { useRef } from "react";
import type { Theme } from "@/lib/themes";
import { gsap, useGSAP } from "@/lib/gsap";
import CountUp from "@/components/CountUp";
import "./styles.css";

/* ─────────────────────────────────────────────────────────────────────────────
   UPTIME · layout variant: uptime · class prefix: up-
   The hero IS a status page: every capability OPERATIONAL, nine years of
   uptime, an honest incident history that always resolves. Statuspage grammar
   (component rows, uptime history strips, incident log) carries a career.
   One emerald accent — status-green, used as punctuation. Animation owner:
   GSAP only (strips fill once, status dot settles after two pulses).
   CountUp owns its spans.
───────────────────────────────────────────────────────────────────────────── */

const PAGE_META = "status · koushik · all systems operational";

/* Each strip = 30 cells across the tenure. "op" = healthy; "deg" = a hard
   problem, later resolved — every degraded cell corresponds to a real entry
   in the INCIDENTS log below (keep that invariant when editing). */
function strip(degAt: number[] = []): ("op" | "deg")[] {
  return Array.from({ length: 30 }, (_, i) => (degAt.includes(i) ? "deg" : "op"));
}

/* deg cells live ONLY on components that have a matching INCIDENTS entry —
   every dip is a logged, resolved incident; most systems never dipped. */
const COMPONENTS = [
  { name: "Detection engineering", state: "Operational", metric: "200+ signatures · 1,400+ accounts", cells: strip([23]) },
  { name: "IAM privilege analysis", state: "Operational", metric: "65+ paths · 32 GOAT benchmarks", cells: strip() },
  { name: "CIEM — toxic combinations", state: "Operational", metric: "62 catalogued · ATT&CK-mapped", cells: strip() },
  { name: "Multi-cloud attack-path simulation", state: "Operational", metric: "2,800+ accounts · AWS + GCP", cells: strip() },
  { name: "AI-native security platforms", state: "Operational", metric: "19 models · 5 providers · $1.40/run", cells: strip([14, 19]) },
] as const;

const KPIS = [
  { value: "9", label: "years uptime" },
  { value: "2,800+", label: "accounts monitored" },
  { value: "32", label: "GOAT benchmarks" },
  { value: "150+", label: "security reviews" },
] as const;

/* Each incident names the system component it maps to — the same components
   that carry a degraded cell in the strip above. */
const INCIDENTS = [
  {
    date: "2023",
    component: "AI-native security platforms",
    title: "GenAI adoption — no controls, no detection, no precedent",
    resolution: "Built the company's first GenAI guardrails (Bedrock, SageMaker) and detection from zero; adoption proceeded on a governed path.",
  },
  {
    date: "2024",
    component: "AI-native security platforms",
    title: "Security reviews bottlenecked behind one engineer per review",
    resolution: "Shipped an agentic review platform on a 1,700+-node knowledge graph; the multi-week backlog cleared and it became the team standard.",
  },
  {
    date: "2025",
    component: "Detection engineering",
    title: "Critical cloud alerts untracked across the estate",
    resolution: "Designed the org-wide High Severity Alert Enforcement Program — SLA-driven remediation with the posture metrics leadership now tracks.",
  },
] as const;

const SUBSCRIBE = [
  { k: "email", v: "koushik.kotamraju1610@gmail.com", href: "mailto:koushik.kotamraju1610@gmail.com", ext: false },
  { k: "linkedin", v: "in/koushikkotamraju", href: "https://www.linkedin.com/in/koushikkotamraju/", ext: true },
  { k: "github", v: "github.com/koushik1610", href: "https://github.com/koushik1610", ext: true },
  { k: "résumé", v: "/resume", href: "/resume", ext: false },
] as const;

export default function UptimeHero({ theme }: { theme: Theme }) {
  void theme;
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReduced) {
        // CSS pre-hides these under scripting — restore statically (inline
        // styles override the stylesheet pre-hide; never clearProps here).
        gsap.set(".up-anim, .up-reveal", { opacity: 1, y: 0 });
        gsap.set(".up-cell", { opacity: 0.85, scaleY: 1 });
        return;
      }

      // Masthead settles in.
      gsap.timeline({ defaults: { ease: "power3.out" } })
        .to(".up-head .up-anim", { opacity: 1, y: 0, duration: 0.55, stagger: 0.08, delay: 0.1 });

      // Each component's uptime strip fills cell-by-cell when it scrolls in.
      gsap.utils.toArray<HTMLElement>(".up-strip").forEach((stripEl) => {
        gsap.to(stripEl.querySelectorAll(".up-cell"), {
          opacity: 0.85, // matches the resting cell tone (op/deg both 0.85)
          scaleY: 1,
          duration: 0.5,
          stagger: 0.012,
          ease: "power2.out",
          scrollTrigger: { trigger: stripEl, start: "top 90%", once: true },
        });
      });

      // Below-fold blocks reveal once.
      gsap.utils.toArray<HTMLElement>(".up-reveal").forEach((el) => {
        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 84%", once: true },
        });
      });
    },
    { scope: rootRef }
  );

  return (
    <div className="up-root" ref={rootRef}>
      <a href="#up-main" className="up-skip">Skip to main content</a>

      {/* Top bar — not a nav landmark (no links); the global-nav suppression
          rule keys off nav:not(.up-nav) and is unaffected. */}
      <header className="up-nav">
        <span className="up-nav-meta">{PAGE_META}</span>
        <span className="up-nav-status">
          <span className="up-nav-dot" aria-hidden="true" />
          Open to opportunities
        </span>
      </header>

      <main id="up-main" className="up-main">
        {/* ── Masthead — the overall status banner ───────────────────────── */}
        <header className="up-head">
          <p className="up-eyebrow up-anim">Sr. Security Engineer · Yahoo Paranoids · 9 years</p>
          <h1 className="up-title up-anim">Koushik Kotamraju</h1>

          {/* static content — not a live region (role="status" would announce
              on every load); the visible text carries the meaning */}
          <div className="up-banner up-anim">
            <span className="up-banner-dot" aria-hidden="true" />
            <span className="up-banner-text">All systems operational</span>
            <span className="up-banner-since">9 years uptime</span>
          </div>

          <p className="up-summary up-anim">
            Cloud security engineer building AI-native security platforms —{" "}
            <strong className="up-em">production systems, not prototypes.</strong>{" "}
            A small team, 2,800+ cloud accounts: the math only works if you
            build the right systems.
          </p>

          <div className="up-cta-row up-anim">
            <a href="mailto:koushik.kotamraju1610@gmail.com" className="up-btn up-btn--primary">Email me</a>
            <a href="/resume" className="up-btn up-btn--ghost">Résumé</a>
          </div>

          {/* KPI strip */}
          <dl className="up-kpis up-anim">
            {KPIS.map((k) => (
              <div key={k.label} className="up-kpi">
                <dt className="up-kpi-label">{k.label}</dt>
                <dd className="up-kpi-val"><CountUp value={k.value} className="up-kpi-num" /></dd>
              </div>
            ))}
          </dl>
        </header>

        {/* ── System components ──────────────────────────────────────────── */}
        <section className="up-section up-reveal" aria-labelledby="up-systems-head">
          <h2 id="up-systems-head" className="up-h2">System components</h2>
          <ul className="up-components" role="list">
            {COMPONENTS.map((c) => (
              <li key={c.name} className="up-component">
                <div className="up-comp-head">
                  <span className="up-comp-name">{c.name}</span>
                  <span className="up-comp-state">
                    <span className="up-comp-dot" aria-hidden="true" />
                    {c.state}
                  </span>
                </div>
                <span
                  className="up-strip"
                  role="img"
                  aria-label={(() => {
                    const deg = c.cells.filter((x) => x === "deg").length;
                    const past = deg === 0 ? "" : ` · ${deg} past incident${deg > 1 ? "s" : ""}, resolved`;
                    return `${c.name}: operational — ${c.metric}${past}`;
                  })()}
                >
                  {c.cells.map((cell, i) => (
                    <span key={i} className={`up-cell up-cell--${cell}`} aria-hidden="true" />
                  ))}
                </span>
                <p className="up-comp-metric" aria-hidden="true">{c.metric}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* ── Incident history — every one resolved ──────────────────────── */}
        <section className="up-section up-reveal" aria-labelledby="up-incidents-head">
          <h2 id="up-incidents-head" className="up-h2">Incident history</h2>
          <ol className="up-incidents" role="list">
            {INCIDENTS.map((inc) => (
              <li key={inc.date} className="up-incident">
                <div className="up-inc-top">
                  <span className="up-inc-date">{inc.date}</span>
                  <span className="up-inc-affected">{inc.component}</span>
                  <span className="up-inc-resolved">Resolved</span>
                </div>
                <p className="up-inc-title">{inc.title}</p>
                <p className="up-inc-resolution">{inc.resolution}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* ── Subscribe — contact ────────────────────────────────────────── */}
        <section className="up-section up-section--subscribe up-reveal" aria-labelledby="up-subscribe-head">
          <h2 id="up-subscribe-head" className="up-h2">Subscribe to updates</h2>
          <p className="up-subscribe-note">
            Open to Staff &amp; Principal Security Engineer roles · AI Security · Detection.
          </p>
          <a href="mailto:koushik.kotamraju1610@gmail.com" className="up-email">
            koushik.kotamraju1610<wbr />@gmail.com
          </a>
          <ul className="up-links" role="list">
            {SUBSCRIBE.map((l) => (
              <li key={l.k}>
                <a
                  href={l.href}
                  className="up-link"
                  {...(l.ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  <span className="up-link-k">{l.k}</span>
                  <span className="up-link-v">{l.v}</span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}
