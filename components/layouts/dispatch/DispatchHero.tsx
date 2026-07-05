"use client";

import { useRef } from "react";
import type { Theme } from "@/lib/themes";
import { gsap, useGSAP } from "@/lib/gsap";
import "./styles.css";

/* ─────────────────────────────────────────────────────────────────────────────
   DISPATCH · layout variant: dispatch · class prefix: dp-
   The hero IS a split-flap operations board (Solari departure-board grammar):
   the name flips into place tile-by-tile, the work is a departure board where
   every system reads SHIPPED / ON TIME, and the CTA is a boarding gate. True
   monochrome — ivory on graphite, no chromatic accent; hierarchy is value,
   weight, and the inverted "live" tile. Animation owner: GSAP only (one board
   of flap flips on load + once-only row settles; nothing loops).
───────────────────────────────────────────────────────────────────────────── */

const BOARD_META = "operations board · koushik · dep 09:00 · gate KK";

const NAME = "KOUSHIK KOTAMRAJU";

const ROWS = [
  { time: "2022", system: "ARTEMIS", detail: "Multi-cloud attack-path simulation", status: "SHIPPED" },
  { time: "2023", system: "GENAI GUARDRAILS", detail: "Bedrock + SageMaker, from zero prior art", status: "SHIPPED" },
  { time: "2024", system: "AGENTIC REVIEW", detail: "1,700+-node knowledge graph platform", status: "SHIPPED" },
  { time: "2025", system: "IAM AUDIT AGENT", detail: "65+ escalation paths · 32 GOAT benchmarks", status: "SHIPPED" },
  { time: "LIVE", system: "DETECTION FLEET", detail: "200+ signatures · 1,400+ AWS accounts", status: "ON TIME" },
  { time: "LIVE", system: "ANTITOXIN", detail: "62 toxic combinations · CIEM dissolution", status: "BOARDING" },
] as const;

const STATS = [
  { value: "9", unit: "YRS", label: "in service" },
  { value: "2,800+", unit: "ACCT", label: "accounts secured" },
  { value: "150+", unit: "PSR", label: "security reviews" },
  { value: "$1.40", unit: "RUN", label: "per research run" },
] as const;

const GATES = [
  { k: "EMAIL", v: "koushik.kotamraju1610@gmail.com", href: "mailto:koushik.kotamraju1610@gmail.com", ext: false },
  { k: "LINKEDIN", v: "in/koushikkotamraju", href: "https://www.linkedin.com/in/koushikkotamraju/", ext: true },
  { k: "GITHUB", v: "github.com/koushik1610", href: "https://github.com/koushik1610", ext: true },
  { k: "RÉSUMÉ", v: "/resume", href: "/resume", ext: false },
] as const;

/* Render a string as split-flap tiles. Spaces become gaps; letters become
   flap tiles the GSAP timeline flips into place. The accessible name is on
   the parent's aria-label; the tiles are aria-hidden.
   NOTE: cls must stay "dp-name" — the GSAP timeline targets the literal
   selector ".dp-name-glyph"; a different cls would silently skip the flip. */
function flaps(text: string, cls: string) {
  return text.split("").map((ch, i) =>
    ch === " " ? (
      <span key={i} className={`${cls}-space`} aria-hidden="true" />
    ) : (
      <span key={i} className={`${cls}-tile`} aria-hidden="true">
        <span className={`${cls}-glyph`}>{ch}</span>
      </span>
    )
  );
}

export default function DispatchHero({ theme }: { theme: Theme }) {
  void theme;
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReduced) {
        // CSS pre-hides these under scripting — restore statically (inline
        // styles override the stylesheet pre-hide; never clearProps here).
        gsap.set(".dp-name-glyph, .dp-status-glyph", { rotateX: 0, opacity: 1 });
        gsap.set(".dp-anim, .dp-reveal, .dp-row", { opacity: 1, y: 0 });
        return;
      }

      const tl = gsap.timeline();
      // The name flaps into place, tile by tile — the board's one big beat.
      tl.to(".dp-name-glyph", {
        rotateX: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power3.out",
        stagger: 0.045,
        delay: 0.15,
      }).to(
        ".dp-head .dp-anim",
        { opacity: 1, y: 0, duration: 0.55, stagger: 0.08, ease: "power3.out" },
        "-=0.3"
      );

      // Failsafe: if the rAF ticker stalls (background tab, low-power mode),
      // never leave the name-flap beat stuck mid-flight — force-complete it
      // by wall clock.
      const settle = window.setTimeout(() => {
        if (tl.progress() < 1) tl.progress(1);
      }, 3000);

      // Board rows settle in once; each row's status tile flaps over.
      gsap.utils.toArray<HTMLElement>(".dp-row").forEach((row) => {
        const glyph = row.querySelector(".dp-status-glyph");
        gsap.timeline({ scrollTrigger: { trigger: row, start: "top 88%", once: true } })
          .to(row, { opacity: 1, y: 0, duration: 0.45, ease: "power3.out" })
          .to(glyph, { rotateX: 0, opacity: 1, duration: 0.45, ease: "power3.out" }, "-=0.2");
      });

      // Remaining blocks reveal once.
      gsap.utils.toArray<HTMLElement>(".dp-reveal").forEach((el) => {
        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 86%", once: true },
        });
      });

      return () => {
        window.clearTimeout(settle);
      };
    },
    { scope: rootRef }
  );

  return (
    <div className="dp-root" ref={rootRef}>
      <a href="#dp-main" className="dp-skip">Skip to main content</a>

      {/* Top bar — not a nav landmark (no links); the global-nav suppression
          rule keys off nav:not(.dp-nav) and is unaffected. */}
      <header className="dp-nav">
        <span className="dp-nav-meta">{BOARD_META}</span>
        <span className="dp-nav-status">
          <span className="dp-nav-dot" aria-hidden="true" />
          Open to opportunities
        </span>
      </header>

      <main id="dp-main" className="dp-main">
        {/* ── The board header ───────────────────────────────────────────── */}
        <header className="dp-head">
          <p className="dp-eyebrow dp-anim">Departures · Sr. Security Engineer · Yahoo Paranoids</p>
          <h1 className="dp-name" aria-label="Koushik Kotamraju">
            {flaps(NAME, "dp-name")}
          </h1>
          <p className="dp-summary dp-anim">
            Cloud security engineer building AI-native security platforms —{" "}
            <strong className="dp-em">production systems, not prototypes.</strong>{" "}
            A small team, 2,800+ cloud accounts: the math only works if you
            build the right systems.
          </p>
          <div className="dp-cta-row dp-anim">
            <a href="mailto:koushik.kotamraju1610@gmail.com" className="dp-btn dp-btn--primary">Email me</a>
            <a href="/resume" className="dp-btn dp-btn--ghost">Résumé</a>
          </div>
        </header>

        {/* ── Departures board — the work ────────────────────────────────── */}
        <section className="dp-section" aria-labelledby="dp-board-head">
          <div className="dp-board-top">
            <h2 id="dp-board-head" className="dp-h2">Departures board</h2>
            <span className="dp-board-cols" aria-hidden="true">
              <span>Time</span><span>System</span><span>Detail</span><span>Status</span>
            </span>
          </div>
          <ol className="dp-board" role="list">
            {ROWS.map((r) => (
              <li key={r.system} className="dp-row">
                <span className="dp-cell dp-cell--time">{r.time}</span>
                <span className="dp-cell dp-cell--system">{r.system}</span>
                <span className="dp-cell dp-cell--detail">{r.detail}</span>
                <span className={`dp-cell dp-cell--status dp-status--${r.status.replace(/\s+/g, "").toLowerCase()}`}>
                  <span className="dp-status-glyph">{r.status}</span>
                </span>
              </li>
            ))}
          </ol>
        </section>

        {/* ── Service record — stats as board tiles ──────────────────────── */}
        <section className="dp-section dp-reveal" aria-labelledby="dp-stats-head">
          <h2 id="dp-stats-head" className="dp-h2">Service record</h2>
          <dl className="dp-stats">
            {STATS.map((s) => (
              <div key={s.label} className="dp-stat">
                <dt className="dp-stat-label">
                  <span className="dp-stat-unit" aria-hidden="true">{s.unit}</span> {s.label}
                </dt>
                <dd className="dp-stat-val">{s.value}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* ── Boarding gate — contact ────────────────────────────────────── */}
        <section className="dp-section dp-section--gate dp-reveal" aria-labelledby="dp-gate-head">
          <h2 id="dp-gate-head" className="dp-h2">Boarding gate</h2>
          <p className="dp-gate-note">
            Now boarding — open to Staff &amp; Principal Security Engineer roles ·
            AI Security · Detection.
          </p>
          <a href="mailto:koushik.kotamraju1610@gmail.com" className="dp-email">
            koushik.kotamraju1610<wbr />@gmail.com
          </a>
          <ul className="dp-gates" role="list">
            {GATES.map((g) => (
              <li key={g.k}>
                <a
                  href={g.href}
                  className="dp-gate"
                  {...(g.ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  <span className="dp-gate-k">{g.k}</span>
                  <span className="dp-gate-v">{g.v}</span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}
