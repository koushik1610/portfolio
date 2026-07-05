"use client";

import { useRef } from "react";
import type { Theme } from "@/lib/themes";
import { gsap, useGSAP } from "@/lib/gsap";
import CountUp from "@/components/CountUp";
import "./styles.css";

/* ─────────────────────────────────────────────────────────────────────────────
   ONCALL · layout variant: oncall · class prefix: oc-
   PagerDuty/incident.io, but the pager is silent: an on-call shift summary
   where every incident resolved. Past-tense resolved ledger, not a live
   console (that's telemetry) and not status strips (that's uptime).
   Palette: near-black #0c0d10 · text #eceef2 · muted #9a9ea8. Owned
   accent: chartreuse — RATIONED HARD to resolved-check glyphs, the
   "ALL CLEAR" word, the CTA, and the status dot only (~6% of the frame).
   Severity chips
   are neutral, never colored by severity (the all-resolved conceit
   forbids a traffic-light palette). Animation owner: GSAP.
───────────────────────────────────────────────────────────────────────────── */

interface Incident {
  sev: string;
  title: string;
  resolution: string;
  mttr: string;
}

const INCIDENTS: readonly Incident[] = [
  {
    sev: "SEV-1",
    title: "Unauthorized GenAI usage, no controls, no precedent (2023)",
    resolution: "Built the company's first Bedrock/SageMaker guardrails and detection from zero prior art.",
    mttr: "caught early",
  },
  {
    sev: "SEV-2",
    title: "Untracked critical cloud alerts across the AWS estate",
    resolution: "Designed the org-wide High Severity Alert Enforcement Program — SLA-driven remediation, posture metrics leadership now tracks.",
    mttr: "resolved",
  },
  {
    sev: "SEV-2",
    title: "IAM privilege-escalation blind spots",
    resolution: "65+ paths across 10 vulnerability classes. Built GOAT first — 32 ground-truth findings — then evaluated the audit agent against all 32.",
    mttr: "resolved",
  },
  {
    sev: "SEV-3",
    title: "Review backlog — one engineer per review",
    resolution: "Agentic review platform, MCP-integrated. 150+ reviews. Multi-week backlog eliminated.",
    mttr: "resolved",
  },
  {
    sev: "SEV-3",
    title: "Manual threat-intel research, slow and costly",
    resolution: "19-model self-learning router at $1.40 per run.",
    mttr: "resolved",
  },
  {
    sev: "SEV-4",
    title: "Detection at estate scale",
    resolution: "200+ signatures across 1,400+ AWS accounts. The v6.0 release added 50+ new baselines.",
    mttr: "resolved",
  },
] as const;

const STATS = [
  { value: "2,800+", label: "accounts on rotation" },
  { value: "150+", label: "reviews closed" },
  { value: "200+", label: "signatures armed" },
  { value: "9", label: "yr shift length" },
] as const;

const CONTACT = [
  { k: "Email", v: "koushik.kotamraju1610@gmail.com", href: "mailto:koushik.kotamraju1610@gmail.com", ext: false },
  { k: "LinkedIn", v: "in/koushikkotamraju", href: "https://www.linkedin.com/in/koushikkotamraju/", ext: true },
  { k: "GitHub", v: "github.com/koushik1610", href: "https://github.com/koushik1610", ext: true },
] as const;

function CheckGlyph({ draw }: { draw?: boolean }) {
  return (
    <svg className={`oc-check${draw ? " oc-check--draw" : ""}`} viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

export default function OncallHero({ theme }: { theme: Theme }) {
  void theme;
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReduced) return;

      const settleTimers: number[] = [];
      const settle = (tw: gsap.core.Tween, ms: number) => {
        settleTimers.push(
          window.setTimeout(() => {
            if (tw.progress() < 1) tw.progress(1);
          }, ms)
        );
      };

      const intro = gsap.from(".oc-masthead > *", {
        autoAlpha: 0,
        y: 12,
        duration: 0.5,
        stagger: 0.06,
        ease: "power3.out",
        delay: 0.1,
      });
      settle(intro, 3000);

      const rows = gsap.from(".oc-row", {
        autoAlpha: 0,
        x: -8,
        duration: 0.45,
        stagger: 0.05,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".oc-ledger",
          start: "top 85%",
          once: true,
          onEnter: () => settle(rows, 2500),
        },
      });

      // Each ledger check glyph draws in once, following its row. The
      // footer "end of shift" check is static decoration, not animated.
      gsap.utils.toArray<SVGPathElement>(".oc-check--draw path").forEach((path, i) => {
        const len = path.getTotalLength();
        gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
        const checkTw = gsap.to(path, {
          strokeDashoffset: 0,
          duration: 0.35,
          ease: "power2.out",
          delay: 0.3 + i * 0.05,
          scrollTrigger: { trigger: ".oc-ledger", start: "top 85%", once: true },
        });
        settle(checkTw, 3200);
      });

      gsap.utils.toArray<HTMLElement>(".oc-reveal").forEach((el) => {
        const tw = gsap.from(el, {
          autoAlpha: 0,
          y: 14,
          duration: 0.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            once: true,
            onEnter: () => settle(tw, 2500),
          },
        });
      });

      return () => settleTimers.forEach((t) => window.clearTimeout(t));
    },
    { scope: rootRef }
  );

  return (
    <div className="oc-root" ref={rootRef}>
      <a href="#oc-main" className="oc-skip">Skip to main content</a>

      <nav className="oc-nav" aria-label="Primary navigation">
        <span className="oc-meta" aria-hidden="true">on-call · rotation: koushik · status: all clear</span>
        <span className="oc-open">
          <span className="oc-open-dot" aria-hidden="true" />
          Open to opportunities
        </span>
      </nav>

      <main id="oc-main" className="oc-main">
        {/* ── Shift header ──────────────────────────────────────────────── */}
        <header className="oc-masthead">
          <p className="oc-eyebrow">
            SHIFT · 2017 → NOW · STATUS: <span className="oc-clear">ALL CLEAR</span>
          </p>
          <h1 className="oc-name">Koushik Kotamraju</h1>
          <p className="oc-lede">
            Cloud security engineer building AI-native security platforms —{" "}
            <strong className="oc-em">production systems, not prototypes.</strong>
          </p>
          <p className="oc-hook">
            A small team. 2,800+ cloud accounts. The math only works if you build the right systems.
          </p>
          <div className="oc-cta-row">
            <a href="mailto:koushik.kotamraju1610@gmail.com" className="oc-btn oc-btn--primary">Email me</a>
            <a href="/resume" className="oc-btn oc-btn--ghost">Résumé</a>
          </div>
          <p className="oc-avail">
            <span className="oc-open-dot" aria-hidden="true" /> Open to opportunities
          </p>
          <p className="oc-status-line">0 open incidents · everything below was caught and closed.</p>
        </header>

        {/* ── Incident ledger ───────────────────────────────────────────── */}
        <section aria-labelledby="oc-ledger-head">
          <h2 id="oc-ledger-head" className="oc-sr-only">Incident ledger, all resolved</h2>
          <ol className="oc-ledger">
            {INCIDENTS.map((inc) => (
              <li key={inc.title} className="oc-row">
                <span className="oc-sev">{inc.sev}</span>
                <div className="oc-content">
                  <p className="oc-title">{inc.title}</p>
                  <p className="oc-resolution">{inc.resolution}</p>
                </div>
                <span className="oc-mttr">
                  <CheckGlyph draw />
                  {inc.mttr}
                  {/* only disambiguate non-"resolved" states — avoids
                      screen readers hearing "resolved — resolved" */}
                  {inc.mttr !== "resolved" && <span className="oc-sr-only"> — resolved</span>}
                </span>
              </li>
            ))}
          </ol>
        </section>

        {/* ── Shift stats ───────────────────────────────────────────────── */}
        <section className="oc-stats oc-reveal" aria-label="Key metrics">
          {STATS.map((s) => (
            <div key={s.label} className="oc-stat">
              <CountUp value={s.value} className="oc-stat-num" />
              <span className="oc-stat-label">{s.label}</span>
            </div>
          ))}
        </section>

        {/* ── Handoff ───────────────────────────────────────────────────── */}
        <section className="oc-contact oc-reveal" aria-labelledby="oc-contact-head">
          <h2 id="oc-contact-head">Hand off the pager</h2>
          <p className="oc-contact-note">
            Open to Staff &amp; Principal Security Engineer roles · AI Security · Detection.
          </p>
          <ul className="oc-contacts" role="list">
            {CONTACT.map((c) => (
              <li key={c.k}>
                <a
                  href={c.href}
                  className="oc-contact-link"
                  {...(c.ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  <span className="oc-contact-k">{c.k}</span>
                  <span className="oc-contact-v">{c.v}</span>
                </a>
              </li>
            ))}
          </ul>
          <p className="oc-eof" aria-hidden="true">
            <CheckGlyph /> end of shift · all clear
          </p>
        </section>
      </main>
    </div>
  );
}
