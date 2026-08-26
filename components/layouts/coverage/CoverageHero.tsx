"use client";

import { useRef } from "react";
import type { Theme } from "@/lib/themes";
import { gsap, useGSAP } from "@/lib/gsap";
import CountUp from "@/components/CountUp";
import "./styles.css";

/* ─────────────────────────────────────────────────────────────────────────────
   COVERAGE · layout variant: coverage · class prefix: cv-
   The hero artifact is his actual craft: a MITRE ATT&CK-style coverage
   matrix — cloud tactics across the top, technique cells heat-mapped by
   detection depth. Person-first masthead above; the matrix is evidence,
   not decoration. One owned accent: glacier blue #7cb8f7; heat = intensity
   steps of the same hue (derived via color-mix — see styles.css).
   Animation owner: GSAP.
───────────────────────────────────────────────────────────────────────────── */

const BOARD_META = "att&ck coverage · cloud estate · koushik · 2026";

/* Heat levels: 0 = out of scope · 1 = baseline authored · 2 = detected ·
   3 = enforced + detected. Depth is conveyed by fill AND by visible sr-only
   text inside each cell — never color alone.
   ⚠ Co-update sites if a level is added: HEAT (here), .cv-h<N> in styles.css,
   and the legend renders from HEAT automatically.

   2026-07-12 asset rework: heat cells now carry a genuine halftone dot
   pattern (21st.dev-derived, pure CSS) whose density scales with heat
   level, layered under the existing flat tint — a more literal "heat map"
   than a 4-step opacity ramp alone. See styles.css .cv-h1/.cv-h2/.cv-h3. */
type Heat = 0 | 1 | 2 | 3;
const HEAT: Record<Heat, { word: string; short: string }> = {
  0: { word: "out of scope", short: "out of scope" },
  1: { word: "baseline authored", short: "baseline" },
  2: { word: "detected", short: "detected" },
  3: { word: "enforced and detected", short: "enforced" },
};
const HEAT_LEVELS = [0, 1, 2, 3] as const;

interface Cell {
  t: string;
  h: Heat;
}
interface Tactic {
  name: string;
  /* exactly 4 techniques per tactic — the row iteration derives from this
     tuple, so a wrong count is a compile error, not a render crash */
  cells: readonly [Cell, Cell, Cell, Cell];
}

const MATRIX: ReadonlyArray<Tactic> = [
  {
    name: "Initial Access",
    cells: [
      { t: "Valid Accounts", h: 2 },
      { t: "Public-Facing Services", h: 3 },
      { t: "Trusted Relationships", h: 2 },
      { t: "Stolen Access Keys", h: 2 },
    ],
  },
  {
    name: "Persistence",
    cells: [
      { t: "IAM Backdoor Users", h: 3 },
      { t: "Access Key Persistence", h: 3 },
      { t: "Lambda Backdoors", h: 2 },
      { t: "Role Trust Edits", h: 3 },
    ],
  },
  {
    name: "Privilege Escalation",
    cells: [
      { t: "PassRole Abuse", h: 3 },
      { t: "Role Chain Assumption", h: 3 },
      { t: "Policy Self-Escalation", h: 3 },
      { t: "Compute-to-Data Pivot", h: 3 },
    ],
  },
  {
    name: "Defense Evasion",
    cells: [
      { t: "CloudTrail Tampering", h: 3 },
      { t: "Logging Suppression", h: 3 },
      { t: "Encryption Misuse", h: 2 },
      { t: "Config Drift", h: 2 },
    ],
  },
  {
    name: "Credential Access",
    cells: [
      { t: "IMDS Credential Theft", h: 3 },
      { t: "Secrets Sprawl", h: 2 },
      { t: "Keys Exposed in Code", h: 2 },
      { t: "Token Replay", h: 1 },
    ],
  },
  {
    name: "Exfiltration",
    cells: [
      { t: "Public S3 Exposure", h: 3 },
      { t: "Snapshot Sharing", h: 2 },
      { t: "Cross-Account Copy", h: 2 },
      { t: "Transfer Anomalies", h: 1 },
    ],
  },
  {
    name: "Impact",
    cells: [
      { t: "Resource Hijacking", h: 2 },
      { t: "Crypto Mining", h: 2 },
      { t: "Data Destruction", h: 1 },
      { t: "Service Disruption", h: 0 },
    ],
  },
];

/* Derived, never hand-counted — the matrix bar's headline number. */
const TECHNIQUES_TOTAL = MATRIX.reduce((n, t) => n + t.cells.length, 0);
const TECHNIQUES_COVERED = MATRIX.flatMap((t) => [...t.cells]).filter((c) => c.h >= 2).length;

const STATS = [
  { value: "200+", label: "detection signatures" },
  { value: "1,400+", label: "AWS accounts evaluated" },
  { value: "150+", label: "security reviews" },
  { value: "$1.40", label: "per research run · 19 models" },
] as const;

/* Depth rows. Each carries a real metric and a real description.
   These previously also drove a progress bar from a `pct` field (94/88/82)
   whose own comment conceded the widths were "editorial, not measurements".
   A fabricated chart on a security engineer's portfolio is the one category of
   error this site cannot afford, so the bar is gone rather than re-based: there
   is no honest percentage to put there. The metric is the quantitative claim. */
const DEPTH = [
  {
    name: "Identity & Privilege",
    desc: "65+ escalation paths across 10 vulnerability classes. 62 toxic combinations catalogued with minimum cut-set dissolution. The audit agent was benchmarked before it was trusted.",
    metric: "32 GOAT benchmarks",
  },
  {
    name: "Detection & Baselines",
    desc: "200+ Python/Lambda signatures evaluating 1,400+ AWS accounts — the posture scores the company is measured against. v6.0: the largest control expansion in program history.",
    metric: "50+ new baselines",
  },
  {
    name: "AI Security Platforms",
    desc: "A self-learning research router across 19 models, an MCP-integrated agentic review platform, and a deterministic CSPM advisor with hard deny gates. All in daily production use.",
    metric: "$1.40 / research run",
  },
] as const;

const CONTACT = [
  { k: "Email", v: "koushik.kotamraju1610@gmail.com", href: "mailto:koushik.kotamraju1610@gmail.com", ext: false },
  { k: "LinkedIn", v: "in/koushikkotamraju", href: "https://www.linkedin.com/in/koushikkotamraju/", ext: true },
  { k: "GitHub", v: "github.com/koushik1610", href: "https://github.com/koushik1610", ext: true },
] as const;

function SectionTitle({ ix, id, children }: { ix: string; id: string; children: string }) {
  return (
    <h2 id={id} className="cv-htitle">
      <span className="cv-htitle-ix" aria-hidden="true">{ix}</span>
      {children}
    </h2>
  );
}

export default function CoverageHero({ theme }: { theme: Theme }) {
  void theme;
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReduced) return;

      // Failsafe: never leave content hidden if the rAF ticker is throttled
      // (background tab, low-power mode) — setTimeout still fires when rAF
      // does not. Scroll-triggered tweens arm their own timer in onEnter;
      // reveals/bars are exempt on purpose: their triggers only fire on user
      // scroll, which implies a live ticker.
      const settleTimers: number[] = [];
      const settle = (tw: gsap.core.Tween, ms: number) => {
        settleTimers.push(
          window.setTimeout(() => {
            if (tw.progress() < 1) tw.progress(1);
          }, ms)
        );
      };

      // Masthead settles first — quiet fade-up, one pass.
      const intro = gsap.from(".cv-masthead > *", {
        autoAlpha: 0,
        y: 14,
        duration: 0.55,
        stagger: 0.07,
        ease: "power3.out",
        delay: 0.1,
      });
      settle(intro, 3000);

      // The matrix lights up — cells sweep in row by row, once. onEnter can
      // fire synchronously during ScrollTrigger's own construction (if the
      // trigger is already past its start point when this mounts, e.g. after
      // switching themes at a scrolled position) — that's before the `const`
      // assignment below finishes, so it must read the tween off `self`,
      // never close over the outer variable name (TDZ crash otherwise).
      gsap.from(".cv-cell", {
        autoAlpha: 0,
        duration: 0.4,
        ease: "power1.out",
        stagger: { each: 0.014, from: "start" },
        scrollTrigger: {
          trigger: ".cv-matrix",
          start: "top 85%",
          once: true,
          onEnter: (self) => settle(self.animation as gsap.core.Tween, 2500),
        },
      });

      // Rows below the fold print in, once each.
      gsap.utils.toArray<HTMLElement>(".cv-reveal").forEach((el) => {
        gsap.from(el, {
          autoAlpha: 0,
          y: 18,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      });

      return () => settleTimers.forEach((t) => window.clearTimeout(t));
    },
    { scope: rootRef }
  );

  return (
    <div className="cv-root" ref={rootRef}>
      <a href="#cv-main" className="cv-skip">Skip to main content</a>

      <nav className="cv-nav" aria-label="Primary navigation">
        <span className="cv-meta" aria-hidden="true">{BOARD_META}</span>
        <span className="cv-open">
          <span className="cv-open-dot" aria-hidden="true" />
          Open to opportunities
        </span>
      </nav>

      <main id="cv-main" className="cv-main">
        {/* ── Masthead — the person before the matrix ───────────────────── */}
        <header className="cv-masthead">
          <p className="cv-eyebrow">Sr. Security Engineer · Yahoo Paranoids · 9 years</p>
          <h1 className="cv-name">Koushik Kotamraju</h1>
          <p className="cv-lede">
            Cloud security engineer building AI-native security platforms —{" "}
            <strong className="cv-em">production systems, not prototypes.</strong>
          </p>
          <p className="cv-hook">
            A small team. 2,800+ cloud accounts. The math only works if you build the right systems.
          </p>
          <div className="cv-cta-row">
            <a href="mailto:koushik.kotamraju1610@gmail.com" className="cv-btn cv-btn--primary">Email me</a>
            <a href="/resume" className="cv-btn cv-btn--ghost">Résumé</a>
          </div>
          {/* Availability chip surfaces here on phones (nav chip hides there) */}
          <p className="cv-avail">
            <span className="cv-open-dot" aria-hidden="true" /> Open to opportunities
          </p>
        </header>

        {/* ── The coverage matrix ───────────────────────────────────────── */}
        <section className="cv-matrix" aria-labelledby="cv-matrix-head">
          <div className="cv-matrix-bar">
            <SectionTitle ix="01" id="cv-matrix-head">Detection coverage, mapped</SectionTitle>
            <span className="cv-matrix-sum">
              {TECHNIQUES_COVERED}/{TECHNIQUES_TOTAL} techniques detected or enforced
            </span>
            <ul className="cv-legend" role="list" aria-label="Heat legend">
              {HEAT_LEVELS.map((h) => (
                <li key={h}>
                  <i className={`cv-swatch cv-h${h}`} aria-hidden="true" /> {HEAT[h].short}
                </li>
              ))}
            </ul>
          </div>

          <div className="cv-table-scroll" role="region" aria-label="ATT&CK coverage matrix, scrolls horizontally" tabIndex={0}>
            <table className="cv-table">
              <caption className="cv-sr-only">
                Cloud ATT&amp;CK tactics and technique coverage. Each cell names a technique
                and its coverage depth.
              </caption>
              <thead>
                <tr>
                  {MATRIX.map((t) => (
                    <th key={t.name} scope="col">{t.name}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {MATRIX[0].cells.map((_, row) => (
                  <tr key={row}>
                    {MATRIX.map((t) => {
                      const cell = t.cells[row];
                      return (
                        <td key={t.name + cell.t}>
                          <span className={`cv-cell cv-h${cell.h}`}>
                            {cell.t}
                            {/* depth in real text, not color — sr-only suffix */}
                            <span className="cv-sr-only"> — {HEAT[cell.h].word}</span>
                          </span>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="cv-caption">
            I mapped every control to a technique — a MITRE ATT&amp;CK gap analysis against
            real-world attack patterns from cloud incident-response data.
          </p>
        </section>

        {/* ── The numbers ───────────────────────────────────────────────── */}
        <section className="cv-stats cv-reveal" aria-label="Key metrics">
          {STATS.map((s) => (
            <div key={s.label} className="cv-stat">
              <CountUp value={s.value} className="cv-stat-num" />
              <span className="cv-stat-label">{s.label}</span>
            </div>
          ))}
        </section>

        {/* ── Depth ─────────────────────────────────────────────────────── */}
        <section className="cv-depth" aria-labelledby="cv-depth-head">
          <div className="cv-reveal">
            <SectionTitle ix="02" id="cv-depth-head">Where the depth is</SectionTitle>
          </div>
          {DEPTH.map((d) => (
            <article key={d.name} className="cv-depth-row cv-reveal" aria-label={d.name}>
              <div className="cv-depth-head">
                <h3 className="cv-depth-name">{d.name}</h3>
                <span className="cv-depth-metric">{d.metric}</span>
              </div>
              <p className="cv-depth-desc">{d.desc}</p>
            </article>
          ))}
        </section>

        {/* ── Contact ───────────────────────────────────────────────────── */}
        <section className="cv-contact cv-reveal" aria-labelledby="cv-contact-head">
          <SectionTitle ix="03" id="cv-contact-head">Close the gap</SectionTitle>
          <p className="cv-contact-note">
            Open to Staff &amp; Principal Security Engineer roles · AI Security · Detection.
          </p>
          <ul className="cv-contacts" role="list">
            {CONTACT.map((c) => (
              <li key={c.k}>
                <a
                  href={c.href}
                  className="cv-contact-link"
                  {...(c.ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  <span className="cv-contact-k">{c.k}</span>
                  <span className="cv-contact-v">{c.v}</span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}
