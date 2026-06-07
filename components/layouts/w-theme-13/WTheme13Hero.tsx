"use client";

import { useRef } from "react";
import type { Theme } from "@/lib/themes";
import { gsap, useGSAP, SplitText } from "@/lib/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./styles.css";

gsap.registerPlugin(ScrollTrigger);

// ── Content ─────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { id: "w13-overview", label: "Overview", code: "0x00" },
  { id: "w13-disciplines", label: "Disciplines", code: "0x01" },
  { id: "w13-projects", label: "Deployments", code: "0x02" },
  { id: "w13-contact", label: "Contact", code: "0x03" },
] as const;

// Right-rail telemetry gauges/sparklines. Each metric carries a static aria-label.
const GAUGES = [
  {
    key: "recall",
    target: 100,
    format: (v: number) => Math.round(v) + "%",
    initial: "0%",
    numClass: "w13-g-recall",
    label: "GOAT recall",
    sub: "32 / 32 · 0 FP",
    ariaLabel: "100 percent GOAT recall, 32 of 32 findings, zero false positives",
    // gauge ring fill fraction (0–1) at final state
    fill: 1,
  },
  {
    key: "fp",
    target: 0,
    format: () => "0%",
    initial: "—",
    numClass: "w13-g-fp",
    label: "False positives",
    sub: "200+ signatures",
    ariaLabel: "Zero percent false positive rate across 200 plus detection signatures",
    fill: 0.02,
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

// Sparkline waveforms — paired path "d" strings GSAP morphs between via attr tween.
// 0..120 wide, 0..32 tall. Kept cheap (few points), eased on a slow yoyo loop.
const SPARKS = [
  {
    key: "signals",
    label: "signals / sec",
    value: "200+",
    a: "M0 22 L15 18 L30 24 L45 10 L60 20 L75 8 L90 16 L105 6 L120 14",
    b: "M0 18 L15 24 L30 12 L45 20 L60 9 L75 19 L90 7 L105 17 L120 8",
    ariaLabel: "200 plus detection signatures active",
  },
  {
    key: "paths",
    label: "esc. paths",
    value: "65+",
    a: "M0 26 L20 20 L40 22 L60 12 L80 16 L100 6 L120 10",
    b: "M0 20 L20 14 L40 18 L60 8 L80 20 L100 12 L120 4",
    ariaLabel: "65 plus privilege escalation paths across 10 vulnerability classes",
  },
  {
    key: "graph",
    label: "graph nodes",
    value: "1,700+",
    a: "M0 16 L18 22 L36 14 L54 24 L72 12 L90 22 L108 10 L120 18",
    b: "M0 22 L18 12 L36 24 L54 10 L72 20 L90 8 L108 18 L120 6",
    ariaLabel: "1,700 plus knowledge graph nodes",
  },
] as const;

const EXPERTISE = [
  {
    proc: "detection.d",
    name: "Detection Engineering",
    desc: "200+ active signatures across AWS accounts at a 0% false-positive rate. CIS-benchmarked baselines, MITRE ATT&CK coverage of real-world techniques, shipped via Terraform.",
    meta: "0% FP",
    status: "RUNNING",
  },
  {
    proc: "iam-audit.d",
    name: "IAM Privilege Analysis",
    desc: "AI-native audit agent traversing 65+ escalation paths across 10 vulnerability classes, with LLM semantic interpretation of transitive privilege chains.",
    meta: "100% GOAT",
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
    desc: "Boto3 tool-calling agent. 65+ escalation paths across 10 vulnerability classes. 100% GOAT recall.",
    metric: "100% recall",
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
    desc: "200+ active signatures via Terraform. MITRE ATT&CK gap analysis. Zero false positives at scale.",
    metric: "200+ signatures",
    tags: ["Python", "Lambda", "Terraform"],
  },
] as const;

// ── Component ───────────────────────────────────────────────────────────────

export default function WTheme13Hero({ theme }: { theme: Theme }) {
  void theme;
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const root = rootRef.current;
      if (!root) return;

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
          gsap.fromTo(
            ring,
            { strokeDashoffset: circ },
            {
              strokeDashoffset: targetOffset,
              duration: 1.6,
              ease: "power2.out",
              delay: 0.5,
            }
          );
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
        gsap.to(obj, {
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
      });

      if (prefersReduced) return; // static, complete page below this line.

      // ── Left rail intro: name reveal + nav rows. ──
      const split = SplitText.create(".w13-name", {
        type: "words",
        mask: "words",
        aria: "none",
      });
      gsap.from(split.words, {
        yPercent: 115,
        duration: 0.85,
        stagger: 0.08,
        ease: "power3.out",
        delay: 0.1,
      });
      gsap.from(".w13-rail-meta > *", {
        autoAlpha: 0,
        y: 12,
        duration: 0.55,
        stagger: 0.07,
        ease: "power2.out",
        delay: 0.4,
      });
      gsap.from(".w13-rail-nav li", {
        autoAlpha: 0,
        x: -10,
        duration: 0.5,
        stagger: 0.06,
        ease: "power2.out",
        delay: 0.55,
      });

      // ── Right rail panels fade/slide in. ──
      gsap.from(".w13-tele-card", {
        autoAlpha: 0,
        y: 16,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        delay: 0.55,
      });

      // ── Sparklines: morph the path "d" on a slow yoyo loop ("live" feel). ──
      SPARKS.forEach((s, i) => {
        const path = root.querySelector<SVGPathElement>(`.w13-spark-path[data-spark="${s.key}"]`);
        if (!path) return;
        gsap.to(path, {
          attr: { d: s.b },
          duration: 2.6 + i * 0.4,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
        // travelling scan dot riding the line
        const dot = root.querySelector<SVGCircleElement>(`.w13-spark-dot[data-spark="${s.key}"]`);
        if (dot) {
          gsap.fromTo(
            dot,
            { attr: { cx: 0 } },
            {
              attr: { cx: 120 },
              duration: 3.2 + i * 0.3,
              ease: "none",
              repeat: -1,
            }
          );
        }
      });

      // ── Ticker: slow vertical marquee of pseudo-events. ──
      const tickerInner = root.querySelector<HTMLElement>(".w13-ticker-track");
      if (tickerInner) {
        const half = tickerInner.scrollHeight / 2;
        gsap.to(tickerInner, {
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
        const s = SplitText.create(el, { type: "lines", mask: "lines", aria: "none" });
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
    },
    { scope: rootRef }
  );

  return (
    <div className="w13-root" ref={rootRef}>
      <a href="#w13-main" className="w13-skip">Skip to main content</a>
      <h1 className="w13-sr-only">
        Koushik Kotamraju — Sr. Security Engineer at Yahoo Paranoids
      </h1>

      {/* Suppress global nav; this layout owns its own nav inside the left rail. */}
      <nav className="w13-nav" aria-label="Primary navigation" />

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
              <div key={g.key} className="w13-gauge" aria-label={g.ariaLabel}>
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

          {/* Sparklines */}
          <div className="w13-tele-card w13-sparks">
            {SPARKS.map((s) => (
              <div key={s.key} className="w13-spark" aria-label={s.ariaLabel}>
                <div className="w13-spark-top" aria-hidden="true">
                  <span className="w13-spark-label">{s.label}</span>
                  <span className="w13-spark-value">{s.value}</span>
                </div>
                <svg className="w13-spark-svg" viewBox="0 0 120 32" preserveAspectRatio="none" aria-hidden="true">
                  <path className="w13-spark-path" data-spark={s.key} d={s.a} />
                  <circle className="w13-spark-dot" data-spark={s.key} cx="0" cy="16" r="2" />
                </svg>
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

          {/* Events ticker (decorative; no aria-live per house rule) */}
          <div className="w13-tele-card w13-ticker" aria-hidden="true">
            <div className="w13-ticker-head">events/sec</div>
            <div className="w13-ticker-window">
              <div className="w13-ticker-track">
                <span className="w13-ev"><i className="w13-ev-ok" />signature.match resolved · 0 FP</span>
                <span className="w13-ev"><i className="w13-ev-ok" />iam.path traversed · class 7</span>
                <span className="w13-ev"><i className="w13-ev-info" />graph.enrich · +12 nodes</span>
                <span className="w13-ev"><i className="w13-ev-ok" />goat.bench recall 100%</span>
                <span className="w13-ev"><i className="w13-ev-info" />router.dispatch · 19 models</span>
                <span className="w13-ev"><i className="w13-ev-ok" />antitoxin.scan · 62 combos</span>
                <span className="w13-ev"><i className="w13-ev-info" />run.cost settled · $1.40</span>
                <span className="w13-ev"><i className="w13-ev-ok" />cnapp.sweep · 2,800+ acct</span>
                {/* duplicate set for seamless loop */}
                <span className="w13-ev"><i className="w13-ev-ok" />signature.match resolved · 0 FP</span>
                <span className="w13-ev"><i className="w13-ev-ok" />iam.path traversed · class 7</span>
                <span className="w13-ev"><i className="w13-ev-info" />graph.enrich · +12 nodes</span>
                <span className="w13-ev"><i className="w13-ev-ok" />goat.bench recall 100%</span>
                <span className="w13-ev"><i className="w13-ev-info" />router.dispatch · 19 models</span>
                <span className="w13-ev"><i className="w13-ev-ok" />antitoxin.scan · 62 combos</span>
                <span className="w13-ev"><i className="w13-ev-info" />run.cost settled · $1.40</span>
                <span className="w13-ev"><i className="w13-ev-ok" />cnapp.sweep · 2,800+ acct</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
