"use client";

import { useRef } from "react";
import type { Theme } from "@/lib/themes";
import { gsap, useGSAP, SplitText } from "@/lib/gsap";
import "./styles.css";

/* ─────────────────────────────────────────────────────────────────────────────
   TELEMETRY · layout variant: telemetry · class prefix: w13-
   Always-on 3-pane SOC operations console — a real security-operations-center
   dashboard, not a hacker/Matrix-rain aesthetic (banned per CLAUDE.md §4).

   2026-07 SOC rework (theme-plans/25-telemetry-soc-rework.md): Koushik likes
   the concept, asked to push it further toward a real SOC feel — "deep black
   and red color scheme." Kept the masthead -> live-console body -> contact
   structural bones (rework, not a rebuild). Changes:
   (1) Accent cyan #22d3ee -> a desaturated alert-red #e0524a (4.93:1 on the
   #0d1117 background, 5.15:1 for the dark-on-accent button/skip-link text
   #160605) — deliberately NOT a saturated stop-sign red, so it reads as a
   critical-severity indicator rather than a warning label. Background was
   already deep-grey-blue (#0d1117), not pure black, per the SOC-dashboard
   research's glare guidance — no change needed there.
   (2) Added a severity-distribution strip: three real, already-sanctioned
   house stats (65+ escalation paths, 62 toxic combinations, 200+ detection
   signatures) framed as CRITICAL/HIGH/MEDIUM tiers, bar length scaled to each
   stat's real magnitude — never an invented proportion of any one number.
   (3) Reworked the decorative events ticker into a live alert feed: each row
   now carries an explicit, visible severity tag (not color alone, per the
   house color+text rule) alongside the existing marquee motion.
   (4) Cut the sparkline waveforms: their morphing paths never represented
   real data, pure decoration once the severity strip does the actual
   representational work — house discipline is to cut decoration-only cards
   rather than keep them for symmetry.
───────────────────────────────────────────────────────────────────────────── */

// ── Content ─────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { id: "w13-overview", label: "Overview", code: "0x00" },
  { id: "w13-disciplines", label: "Disciplines", code: "0x01" },
  { id: "w13-projects", label: "Deployments", code: "0x02" },
  { id: "w13-contact", label: "Contact", code: "0x03" },
] as const;

// Right-rail telemetry gauges. Each metric carries a static aria-label.
const GAUGES = [
  {
    key: "recall",
    target: 32,
    format: (v: number) => String(Math.round(v)),
    initial: "0",
    numClass: "w13-g-recall",
    label: "GOAT benchmarks",
    sub: "ground-truth findings",
    ariaLabel: "Evaluated against 32 GOAT benchmarks with ground-truth findings",
    // gauge ring fill fraction (0–1) at final state
    fill: 1,
  },
  {
    key: "fp",
    target: 150,
    format: (v: number) => Math.round(v) + "+",
    initial: "0",
    numClass: "w13-g-fp",
    label: "Security reviews",
    sub: "every business unit",
    ariaLabel: "150 plus security reviews across every business unit",
    fill: 0.85,
  },
] as const;

const COUNTERS = [
  {
    key: "uptime",
    target: 9,
    format: (v: number) => v.toFixed(2) + "y",
    initial: "0.00y",
    numClass: "w13-c-uptime",
    label: "Uptime",
    ariaLabel: "9 years experience",
  },
  {
    key: "accounts",
    target: 2800,
    format: (v: number) => Math.round(v).toLocaleString() + "+",
    initial: "0",
    numClass: "w13-c-accounts",
    label: "Accounts monitored",
    ariaLabel: "2,800 plus cloud accounts monitored across AWS and GCP",
  },
  {
    key: "models",
    target: 19,
    format: (v: number) => String(Math.round(v)),
    initial: "0",
    numClass: "w13-c-models",
    label: "Models orchestrated",
    ariaLabel: "19 AI models orchestrated across 5 providers",
  },
  {
    key: "cost",
    target: 1.4,
    format: (v: number) => "$" + v.toFixed(2),
    initial: "$0.00",
    numClass: "w13-c-cost",
    label: "Cost / run",
    ariaLabel: "1 dollar 40 cents per research run, down from 3 dollars 20 cents baseline",
  },
] as const;

// Severity-distribution strip: three real, already-public house stats framed
// as severity tiers. Bar length is each stat's real magnitude scaled against
// the largest (200) — never an invented sub-split of any single number.
const SEVERITY = [
  {
    key: "critical",
    tier: "CRITICAL",
    label: "escalation paths",
    value: "65+",
    sub: "10 vulnerability classes",
    pct: 33,
    ariaLabel: "Critical: 65 plus privilege escalation paths across 10 vulnerability classes",
  },
  {
    key: "high",
    tier: "HIGH",
    label: "toxic combinations",
    value: "62",
    sub: "graph-theoretic CIEM",
    pct: 31,
    ariaLabel: "High: 62 toxic IAM combinations",
  },
  {
    key: "medium",
    tier: "MEDIUM",
    label: "detection signatures",
    value: "200+",
    sub: "1,400+ AWS accounts",
    pct: 100,
    ariaLabel: "Medium: 200 plus active detection signatures across 1,400 plus AWS accounts",
  },
] as const;

// Live alert feed — replaces the old decorative sparkline/ticker pairing.
// Each row carries a visible severity tag (never color alone) plus the
// existing marquee "live" motion. Decorative only: aria-hidden, no aria-live
// (duplicate announcements) per house convention.
const ALERTS = [
  { sev: "crit", tag: "CRIT", text: "iam-audit.d · path confirmed" },
  { sev: "high", tag: "HIGH", text: "cnapp.d · toxic combo flagged" },
  { sev: "info", tag: "INFO", text: "ai-tooling.d · router dispatch" },
  { sev: "ok", tag: "OK", text: "detection.d · signature resolved" },
  { sev: "info", tag: "INFO", text: "research.d · GOAT bench 32/32" },
  { sev: "ok", tag: "OK", text: "cnapp.d · sweep, 2,800+ acct" },
] as const;

const EXPERTISE = [
  {
    proc: "detection.d",
    name: "Detection Engineering",
    desc: "200+ active signatures evaluating 1,400+ AWS accounts. CIS-benchmarked baselines, MITRE ATT&CK coverage of real-world techniques, shipped via Terraform.",
    meta: "1,400+ acct",
    status: "RUNNING",
  },
  {
    proc: "iam-audit.d",
    name: "IAM Privilege Analysis",
    desc: "AI-native audit agent traversing 65+ escalation paths across 10 vulnerability classes, with LLM semantic interpretation of transitive privilege chains.",
    meta: "32 GOAT",
    status: "RUNNING",
  },
  {
    proc: "ai-tooling.d",
    name: "AI Security Tooling",
    desc: "Multi-agent orchestration across 19 models from 5 providers. Agentic SOAR workstation built on a 1,700+-node knowledge graph mined from a large corpus of historical tickets.",
    meta: "19 models",
    status: "RUNNING",
  },
  {
    proc: "cnapp.d",
    name: "Cloud Security Architecture",
    desc: "2,800+ cloud accounts. CNAPP-class attack-path simulation, AI-augmented CSPM, crown-jewel exposure tracking, Zero Trust enforcement.",
    meta: "2,800+ acct",
    status: "RUNNING",
  },
  {
    proc: "research.d",
    name: "Security Research",
    desc: "Artemis multi-cloud attack-path simulation; Antitoxin graph-theoretic CIEM analysis cataloguing 62 toxic IAM combinations with minimum cut-set auto-remediation.",
    meta: "62 combos",
    status: "RUNNING",
  },
] as const;

const PROJECTS = [
  {
    id: "ARTEMIS",
    desc: "Multi-cloud attack-path simulation. GCP SCC + AWS Security Hub unified into an AI-enriched graph layer.",
    metric: "2,800+ accounts",
    tags: ["Python", "GCP SCC", "AWS Security Hub", "Vertex AI"],
  },
  {
    id: "IAM-AUDIT-AGENT",
    desc: "Boto3 tool-calling agent. 65+ escalation paths across 10 vulnerability classes. Evaluated against 32 GOAT benchmarks.",
    metric: "32 GOAT benchmarks",
    tags: ["IAM", "Python", "Boto3"],
  },
  {
    id: "THREAT-INTEL",
    desc: "Autonomous intel pipeline. 19 models, 5 providers, performance-weighted router. Analyst-ready proposals at $1.40 per run.",
    metric: "$1.40 / run",
    tags: ["Multi-Agent", "Claude", "GPT-4"],
  },
  {
    id: "DETECTION-ENGINE",
    desc: "200+ active signatures via Terraform. MITRE ATT&CK gap analysis across 1,400+ AWS accounts.",
    metric: "200+ signatures",
    tags: ["Python", "Lambda", "Terraform"],
  },
] as const;

// ── Component ───────────────────────────────────────────────────────────────

export default function TelemetryHero({ theme }: { theme: Theme }) {
  void theme;
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const root = rootRef.current;
      if (!root) return;

      // Failsafe: if the rAF ticker stalls (background tab, low-power mode),
      // never leave an on-mount tween stuck mid-flight — force-complete it by
      // wall clock. Timers are cleared on cleanup below.
      const settleTimers: number[] = [];
      const settle = (tw: gsap.core.Tween | gsap.core.Timeline, ms: number) => {
        settleTimers.push(
          window.setTimeout(() => {
            if (tw.progress() < 1) tw.progress(1);
          }, ms)
        );
      };

      // ── Gauge rings: set the geometry, then either animate the sweep or snap. ──
      // stroke-dasharray = circumference; we animate stroke-dashoffset from full→target.
      GAUGES.forEach((g) => {
        const ring = root.querySelector<SVGCircleElement>(`.w13-ring-fill[data-gauge="${g.key}"]`);
        if (!ring) return;
        const r = ring.r.baseVal.value;
        const circ = 2 * Math.PI * r;
        const targetOffset = circ * (1 - g.fill);
        ring.style.strokeDasharray = String(circ);
        if (prefersReduced) {
          ring.style.strokeDashoffset = String(targetOffset);
        } else {
          const ringTw = gsap.fromTo(
            ring,
            { strokeDashoffset: circ },
            {
              strokeDashoffset: targetOffset,
              duration: 1.6,
              ease: "power2.out",
              delay: 0.5,
            }
          );
          settle(ringTw, 3000);
        }
      });

      // ── Count-ups (gauges + counters), settled values on reduced motion. ──
      [...GAUGES, ...COUNTERS].forEach((m) => {
        const el = root.querySelector<HTMLElement>(`.${m.numClass}`);
        if (!el) return;
        const fmt = m.format as (v: number) => string;
        if (prefersReduced) {
          el.textContent = fmt(m.target);
          return;
        }
        const obj = { val: 0 };
        const countTw = gsap.to(obj, {
          val: m.target,
          duration: 1.7,
          ease: "power2.out",
          delay: 0.4,
          onUpdate: () => {
            el.textContent = fmt(obj.val);
          },
          onComplete: () => {
            el.textContent = fmt(m.target);
          },
        });
        settle(countTw, 3000);
      });

      if (prefersReduced) return; // static, complete page below this line.

      // ── Left rail intro: name reveal + nav rows. ──
      const split = SplitText.create(".w13-name", {
        type: "words",
        mask: "words",
        aria: "none",
      });
      const nameIn = gsap.from(split.words, {
        yPercent: 115,
        duration: 0.85,
        stagger: 0.08,
        ease: "power3.out",
        delay: 0.1,
      });
      settle(nameIn, 3000);
      const railMetaIn = gsap.from(".w13-rail-meta > *", {
        autoAlpha: 0,
        y: 12,
        duration: 0.55,
        stagger: 0.07,
        ease: "power2.out",
        delay: 0.4,
      });
      settle(railMetaIn, 3000);
      const railNavIn = gsap.from(".w13-rail-nav li", {
        autoAlpha: 0,
        x: -10,
        duration: 0.5,
        stagger: 0.06,
        ease: "power2.out",
        delay: 0.55,
      });
      settle(railNavIn, 3000);

      // ── Right rail panels fade/slide in. ──
      const teleCardIn = gsap.from(".w13-tele-card", {
        autoAlpha: 0,
        y: 16,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        delay: 0.55,
      });
      settle(teleCardIn, 3000);

      // ── Severity bars: sweep in from empty. Final width is already set
      // inline (style="width: N%") so reduced-motion users see it correct
      // without this ever running — this only adds the reveal motion. ──
      gsap.utils.toArray<HTMLElement>(".w13-sev-fill").forEach((el, i) => {
        const sevTw = gsap.from(el, {
          width: "0%",
          duration: 1.1,
          ease: "power2.out",
          delay: 0.6 + i * 0.1,
        });
        settle(sevTw, 3000);
      });

      // ── Alert feed: slow vertical marquee of pseudo-alerts. ──
      const feedInner = root.querySelector<HTMLElement>(".w13-feed-track");
      if (feedInner) {
        const half = feedInner.scrollHeight / 2;
        gsap.to(feedInner, {
          y: -half,
          duration: 22,
          ease: "none",
          repeat: -1,
        });
      }

      // ── Center log rows: stream/print in per LINE on scroll. ──
      gsap.utils.toArray<HTMLElement>(".w13-stream").forEach((stream) => {
        const rows = gsap.utils.toArray<HTMLElement>(stream.querySelectorAll(".w13-log-row"));
        gsap.from(rows, {
          autoAlpha: 0,
          x: -14,
          duration: 0.5,
          stagger: 0.09,
          ease: "power2.out",
          scrollTrigger: { trigger: stream, start: "top 82%", once: true },
        });
      });

      // Per-line mono reveal of the longer descriptive bodies.
      gsap.utils.toArray<HTMLElement>(".w13-split-lines").forEach((el) => {
        const s = SplitText.create(el, { type: "lines", mask: "lines", aria: "auto" }); // visible text (§3.4b)
        gsap.from(s.lines, {
          yPercent: 110,
          duration: 0.6,
          stagger: 0.05,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 86%", once: true },
        });
      });

      // Section hairlines draw in.
      gsap.utils.toArray<HTMLElement>(".w13-rule").forEach((rule) => {
        gsap.from(rule, {
          scaleX: 0,
          transformOrigin: "left center",
          duration: 0.8,
          ease: "power3.inOut",
          scrollTrigger: { trigger: rule, start: "top 92%", once: true },
        });
      });

      return () => {
        settleTimers.forEach((t) => window.clearTimeout(t));
      };
    },
    { scope: rootRef }
  );

  return (
    <div className="w13-root" ref={rootRef}>
      <a href="#w13-main" className="w13-skip">Skip to main content</a>
      <h1 className="w13-sr-only">
        Koushik Kotamraju — Sr. Security Engineer at Yahoo Paranoids
      </h1>

      <div className="w13-shell">
        {/* ── LEFT RAIL · identity / nav / status ─────────────────────────── */}
        <aside className="w13-rail w13-rail-left" aria-label="Identity and navigation">
          <div className="w13-rail-top">
            <div className="w13-brand">
              <span className="w13-brand-mark" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2 4 6v6c0 4.5 3.2 7.6 8 9 4.8-1.4 8-4.5 8-9V6l-8-4z" />
                  <path d="M9 12l2 2 4-4" />
                </svg>
              </span>
              <span className="w13-brand-id">SOC · console</span>
              <span className="w13-status" aria-label="Status: open to work, online">
                <span className="w13-status-dot" aria-hidden="true" />
                <span aria-hidden="true">ONLINE</span>
              </span>
            </div>

            <p className="w13-kicker" aria-hidden="true">{"// process · career.run"}</p>
            <div className="w13-name" aria-hidden="true">Koushik<br />Kotamraju</div>

            <div className="w13-rail-meta">
              <p className="w13-role">Sr. Security Engineer · Yahoo Paranoids</p>
              <p className="w13-lede">
                Cloud security engineer building AI-native security platforms —
                production systems, not prototypes.
              </p>
            </div>

            <div className="w13-cta-row">
              <a href="mailto:koushik.kotamraju1610@gmail.com" className="w13-btn w13-btn--primary">Email me</a>
              <a href="/resume" className="w13-btn w13-btn--ghost">Résumé</a>
            </div>
          </div>

          <nav className="w13-rail-nav" aria-label="Sections">
            <ul role="list">
              {NAV_LINKS.map((l) => (
                <li key={l.id}>
                  <a href={`#${l.id}`} className="w13-rail-link">
                    <span className="w13-rail-link-code" aria-hidden="true">{l.code}</span>
                    <span className="w13-rail-link-label">{l.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="w13-rail-foot">
            <span className="w13-rail-foot-k">AWS SA · Security Specialty</span>
            <span className="w13-rail-foot-k">9 years · 3 orgs</span>
            <span className="w13-rail-foot-k">koushik.io</span>
          </div>
        </aside>

        {/* ── CENTER · streaming log content ──────────────────────────────── */}
        <main id="w13-main" className="w13-center">
          <header id="w13-overview" className="w13-center-head">
            <div className="w13-center-head-row">
              <span className="w13-eyebrow" aria-hidden="true">tail -f /var/log/career</span>
              <span className="w13-eyebrow w13-eyebrow-dim" aria-hidden="true">PID 1610 · TTY console</span>
            </div>
            <p className="w13-overview-lede">
              An always-on view of the work: detection at account scale, AI-native
              security tooling, and graph-theoretic IAM analysis — streaming live.
            </p>
          </header>

          <div className="w13-rule" aria-hidden="true" />

          {/* Disciplines — log stream */}
          <section id="w13-disciplines" className="w13-block" aria-labelledby="w13-disc-head">
            <div className="w13-block-head">
              <h2 id="w13-disc-head" className="w13-block-title">Disciplines</h2>
              <span className="w13-block-tag" aria-hidden="true">05 processes · all RUNNING</span>
            </div>
            <ol className="w13-stream" role="list">
              {EXPERTISE.map((item) => (
                <li key={item.proc} className="w13-log-row">
                  <span className="w13-log-gutter" aria-hidden="true">
                    <span className="w13-log-tick" />
                  </span>
                  <div className="w13-log-body">
                    <div className="w13-log-line1">
                      <span className="w13-log-proc" aria-hidden="true">{item.proc}</span>
                      <h3 className="w13-log-name">{item.name}</h3>
                      <span className="w13-log-status" aria-hidden="true">{item.status}</span>
                    </div>
                    <p className="w13-log-desc w13-split-lines">{item.desc}</p>
                  </div>
                  <span className="w13-log-meta" aria-hidden="true">{item.meta}</span>
                </li>
              ))}
            </ol>
          </section>

          <div className="w13-rule" aria-hidden="true" />

          {/* Deployments — log stream */}
          <section id="w13-projects" className="w13-block" aria-labelledby="w13-proj-head">
            <div className="w13-block-head">
              <h2 id="w13-proj-head" className="w13-block-title">Deployments</h2>
              <span className="w13-block-tag" aria-hidden="true">04 services · in production</span>
            </div>
            <ol className="w13-stream" role="list">
              {PROJECTS.map((proj) => (
                <li key={proj.id} className="w13-log-row w13-log-row--proj" aria-label={`Deployment: ${proj.id}`}>
                  <span className="w13-log-gutter" aria-hidden="true">
                    <span className="w13-log-tick w13-log-tick--proj" />
                  </span>
                  <div className="w13-log-body">
                    <div className="w13-log-line1">
                      <h3 className="w13-log-name w13-log-name--proj">{proj.id}</h3>
                      <span className="w13-log-status w13-log-status--ok" aria-hidden="true">DEPLOYED</span>
                    </div>
                    <p className="w13-log-desc w13-split-lines">{proj.desc}</p>
                    <div className="w13-tags" aria-label="Technologies">
                      {proj.tags.map((t) => (
                        <span key={t} className="w13-tag">{t}</span>
                      ))}
                    </div>
                  </div>
                  <span className="w13-log-meta" aria-hidden="true">{proj.metric}</span>
                </li>
              ))}
            </ol>
          </section>

          <div className="w13-rule" aria-hidden="true" />

          {/* Contact */}
          <section id="w13-contact" className="w13-block w13-contact" aria-labelledby="w13-contact-head">
            <div className="w13-block-head">
              <h2 id="w13-contact-head" className="w13-block-title">Contact</h2>
              <span className="w13-block-tag" aria-hidden="true">open · accepting connections</span>
            </div>
            <p className="w13-contact-note">
              Open to Staff &amp; Principal Security Engineer and AI Security roles.
            </p>
            <div className="w13-contact-links">
              <a href="mailto:koushik.kotamraju1610@gmail.com" className="w13-clink">
                <span className="w13-clink-k" aria-hidden="true">email</span>
                <span className="w13-clink-v">koushik.kotamraju1610@gmail.com</span>
              </a>
              <a href="https://www.linkedin.com/in/koushikkotamraju/" className="w13-clink" target="_blank" rel="noopener noreferrer">
                <span className="w13-clink-k" aria-hidden="true">linkedin</span>
                <span className="w13-clink-v">in/koushikkotamraju</span>
              </a>
              <a href="https://github.com/koushik1610" className="w13-clink" target="_blank" rel="noopener noreferrer">
                <span className="w13-clink-k" aria-hidden="true">github</span>
                <span className="w13-clink-v">github.com/koushik1610</span>
              </a>
            </div>
          </section>
        </main>

        {/* ── RIGHT RAIL · live telemetry ─────────────────────────────────── */}
        <aside className="w13-rail w13-rail-right" aria-label="Live telemetry">
          <div className="w13-tele-head" aria-hidden="true">
            <span className="w13-tele-head-title">TELEMETRY</span>
            <span className="w13-tele-head-live">
              <span className="w13-live-dot" /> live
            </span>
          </div>

          {/* Gauges */}
          <div className="w13-tele-card w13-gauges">
            {GAUGES.map((g) => (
              <div key={g.key} className="w13-gauge" role="group" aria-label={g.ariaLabel}>
                <svg className="w13-gauge-svg" viewBox="0 0 80 80" aria-hidden="true">
                  <circle className="w13-ring-track" cx="40" cy="40" r="32" />
                  <circle
                    className="w13-ring-fill"
                    data-gauge={g.key}
                    cx="40"
                    cy="40"
                    r="32"
                    transform="rotate(-90 40 40)"
                  />
                </svg>
                <div className="w13-gauge-center" aria-hidden="true">
                  <span className={`w13-gauge-num ${g.numClass}`}>{g.initial}</span>
                </div>
                <div className="w13-gauge-cap" aria-hidden="true">
                  <span className="w13-gauge-label">{g.label}</span>
                  <span className="w13-gauge-sub">{g.sub}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Severity distribution — real house stats framed as CRITICAL/HIGH/
              MEDIUM tiers; each tier's name is visible text, not color alone. */}
          <div className="w13-tele-card w13-sev">
            <div className="w13-sev-head" aria-hidden="true">severity · active findings</div>
            {SEVERITY.map((s) => (
              <div key={s.key} className="w13-sev-row" aria-label={s.ariaLabel}>
                <div className="w13-sev-top" aria-hidden="true">
                  <span className={`w13-sev-tier w13-sev-tier--${s.key}`}>{s.tier}</span>
                  <span className="w13-sev-value">{s.value}</span>
                </div>
                <div className="w13-sev-track" aria-hidden="true">
                  <span
                    className={`w13-sev-fill w13-sev-fill--${s.key}`}
                    style={{ width: `${s.pct}%` }}
                  />
                </div>
                <div className="w13-sev-sub" aria-hidden="true">{s.label} · {s.sub}</div>
              </div>
            ))}
          </div>

          {/* Counters */}
          <div className="w13-tele-card w13-counters">
            {COUNTERS.map((c) => (
              <div key={c.key} className="w13-counter" aria-label={c.ariaLabel}>
                <span className={`w13-counter-num ${c.numClass}`} aria-hidden="true">{c.initial}</span>
                <span className="w13-counter-label" aria-hidden="true">{c.label}</span>
              </div>
            ))}
          </div>

          {/* Live alert feed (decorative; no aria-live per house rule) — each
              row's severity tag is visible mono text, not a color-only dot. */}
          <div className="w13-tele-card w13-feed" aria-hidden="true">
            <div className="w13-feed-head">alert feed</div>
            <div className="w13-feed-window">
              <div className="w13-feed-track">
                {ALERTS.map((a, i) => (
                  <span key={`a-${i}`} className="w13-alert">
                    <i className={`w13-alert-dot w13-alert-dot--${a.sev}`} />
                    <span className={`w13-alert-tag w13-alert-tag--${a.sev}`}>{a.tag}</span>
                    {a.text}
                  </span>
                ))}
                {/* duplicate set for seamless loop */}
                {ALERTS.map((a, i) => (
                  <span key={`b-${i}`} className="w13-alert">
                    <i className={`w13-alert-dot w13-alert-dot--${a.sev}`} />
                    <span className={`w13-alert-tag w13-alert-tag--${a.sev}`}>{a.tag}</span>
                    {a.text}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
