"use client";

import { useRef } from "react";
import type { Theme } from "@/lib/themes";
import { gsap, useGSAP } from "@/lib/gsap";
import "./styles.css";

/* ─────────────────────────────────────────────────────────────────────────────
   WAVEFORM · layout variant: waveform · class prefix: wf-
   The hero IS a signal bench: an oscilloscope screen whose trace draws once
   across the graticule and freezes (no perpetual sweep — WCAG 2.2.2 clean),
   measurement cursors snap to the kept-exact readouts, the work reads as
   channels, contact is the probe output. One rose accent (the phosphor trace,
   refined off the old CTF green). Animation owner: GSAP only — the SVG trace
   reveals via a pathLength-normalized stroke draw, then nothing loops.
───────────────────────────────────────────────────────────────────────────── */

const BENCH_META = "signal bench · koushik · ch1 · 1 MS/s";

/* Deterministic oscilloscope trace — pure math, identical on server + client
   (no Math.random, no hydration drift). Analog sine settling into a pulse
   train: the signal others miss, cleaned up. viewBox 0 0 800 280. */
const WAVE_VIEW = { w: 800, h: 280 };
function buildWave(): string {
  const { w, h } = WAVE_VIEW;
  const mid = h / 2;
  const amp = 76;
  const N = 260;
  const pts: string[] = [];
  for (let i = 0; i <= N; i++) {
    const frac = i / N;
    const x = frac * w;
    let y: number;
    if (frac < 0.6) {
      const t = frac * Math.PI * 2 * 3.2;
      y = mid - Math.sin(t) * amp * (0.62 + 0.38 * Math.sin(frac * 5.5));
    } else {
      // settle into a clean pulse train
      const ph = Math.floor((frac - 0.6) * 22) % 2;
      y = mid - (ph ? amp * 0.6 : -amp * 0.3);
    }
    pts.push(`${x.toFixed(1)} ${y.toFixed(1)}`);
  }
  return "M" + pts.join(" L");
}
const WAVE_D = buildWave();

/* Graticule division lines (the scope grid). */
const GRID_COLS = Array.from({ length: 9 }, (_, i) => ((i + 1) * WAVE_VIEW.w) / 10);
const GRID_ROWS = Array.from({ length: 5 }, (_, i) => ((i + 1) * WAVE_VIEW.h) / 6);

/* Measurement cursors that land on kept-exact numbers. */
const CURSORS = [
  { x: 0.28, label: "RECALL", value: "100%" },
  { x: 0.55, label: "FALSE-POS", value: "0%" },
  { x: 0.8, label: "COST", value: "$1.40" },
] as const;

const READOUTS = [
  { label: "GOAT recall", value: "100%", sub: "32/32 · 0 FP" },
  { label: "Accounts", value: "2,800+", sub: "AWS + GCP" },
  { label: "Models routed", value: "19", sub: "5 providers" },
  { label: "Cost / run", value: "$1.40", sub: "vs $3.20" },
] as const;

const CHANNELS = [
  { ch: "CH1", name: "ARTEMIS", detail: "Multi-cloud attack-path simulation, AI-enriched graph" },
  { ch: "CH2", name: "IAM AUDIT AGENT", detail: "65+ escalation paths · 10 vulnerability classes" },
  { ch: "CH3", name: "ANTITOXIN", detail: "62 toxic combinations · CIEM minimum cut-set" },
  { ch: "CH4", name: "DETECTION FLEET", detail: "200+ signatures · Terraform · 0% false positives" },
] as const;

const OUTPUTS = [
  { k: "EMAIL", v: "koushik.kotamraju1610@gmail.com", href: "mailto:koushik.kotamraju1610@gmail.com", ext: false },
  { k: "LINKEDIN", v: "in/koushikkotamraju", href: "https://www.linkedin.com/in/koushikkotamraju/", ext: true },
  { k: "GITHUB", v: "github.com/koushik1610", href: "https://github.com/koushik1610", ext: true },
  { k: "RÉSUMÉ", v: "/resume", href: "/resume", ext: false },
] as const;

export default function WaveformHero({ theme }: { theme: Theme }) {
  void theme;
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReduced) {
        // CSS pre-hides these under scripting — restore statically (inline
        // styles override the stylesheet pre-hide; never clearProps here).
        // self-contained restore (don't rely on the CSS dasharray staying put)
        gsap.set(".wf-trace", { strokeDasharray: 1, strokeDashoffset: 0, opacity: 1 });
        gsap.set(".wf-cursor, .wf-anim, .wf-reveal", { opacity: 1, y: 0 });
        return;
      }

      // Three beats: masthead text settles → the trace draws across the scope
      // → cursors lock onto the measurements. Then everything freezes (no loop).
      const tl = gsap.timeline();
      tl.to(".wf-head .wf-anim", { opacity: 1, y: 0, duration: 0.55, stagger: 0.08, ease: "power3.out" })
        .set(".wf-trace", { opacity: 1 }, "-=0.2")
        .to(".wf-trace", { strokeDashoffset: 0, duration: 1.2, ease: "power2.inOut" }, "<")
        // cursors lock on at the end of the sweep — the "measure" beat
        .to(".wf-cursor", { opacity: 1, duration: 0.4, stagger: 0.1, ease: "power2.out" }, "-=0.25");

      // Below-fold blocks reveal once.
      gsap.utils.toArray<HTMLElement>(".wf-reveal").forEach((el) => {
        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 86%", once: true },
        });
      });
    },
    { scope: rootRef }
  );

  return (
    <div className="wf-root" ref={rootRef}>
      <a href="#wf-main" className="wf-skip">Skip to main content</a>

      {/* Top bar — not a nav landmark (no links); the global-nav suppression
          rule keys off nav:not(.wf-nav) and is unaffected. */}
      <header className="wf-nav">
        <span className="wf-nav-meta">{BENCH_META}</span>
        <span className="wf-nav-status">
          <span className="wf-nav-dot" aria-hidden="true" />
          Open to opportunities
        </span>
      </header>

      <main id="wf-main" className="wf-main">
        {/* ── The bench ──────────────────────────────────────────────────── */}
        <header className="wf-head">
          <p className="wf-eyebrow wf-anim">Signal bench · Sr. Security Engineer · Yahoo Paranoids</p>
          <h1 className="wf-title wf-anim">Koushik Kotamraju</h1>
          <p className="wf-summary wf-anim">
            Cloud security engineer building AI-native security platforms —{" "}
            <strong className="wf-em">production systems, not prototypes.</strong>{" "}
            Reading the signals others miss, at 2,800-account scale.
          </p>

          {/* The oscilloscope */}
          <div className="wf-scope wf-anim">
            <svg
              className="wf-screen"
              viewBox={`0 0 ${WAVE_VIEW.w} ${WAVE_VIEW.h}`}
              /* "none" lets the trace fill the screen like a real scope —
                 vertical scaling reads as gain, not distortion; cursor x then
                 maps linearly to the readout chips' left:% below. */
              preserveAspectRatio="none"
              role="img"
              aria-label={`Oscilloscope readout — ${CURSORS.map((c) => `${c.label.toLowerCase()} ${c.value}`).join(", ")}.`}
            >
              {/* graticule */}
              <g className="wf-grid" aria-hidden="true">
                {GRID_COLS.map((x) => (
                  <line key={`c${x}`} x1={x} y1="0" x2={x} y2={WAVE_VIEW.h} />
                ))}
                {GRID_ROWS.map((y) => (
                  <line key={`r${y}`} x1="0" y1={y} x2={WAVE_VIEW.w} y2={y} />
                ))}
                <line className="wf-axis" x1="0" y1={WAVE_VIEW.h / 2} x2={WAVE_VIEW.w} y2={WAVE_VIEW.h / 2} />
              </g>

              {/* measurement cursors */}
              {CURSORS.map((c) => (
                <line
                  key={c.label}
                  className="wf-cursor"
                  x1={c.x * WAVE_VIEW.w}
                  y1="0"
                  x2={c.x * WAVE_VIEW.w}
                  y2={WAVE_VIEW.h}
                  aria-hidden="true"
                />
              ))}

              {/* the trace — a soft glow layer under a sharp core (a fat
                  low-opacity stroke fakes the phosphor glow with zero filter
                  rasterization, so the draw stays GPU-cheap) */}
              <path className="wf-trace wf-trace-glow" d={WAVE_D} pathLength={1} fill="none" aria-hidden="true" />
              <path className="wf-trace wf-trace-core" d={WAVE_D} pathLength={1} fill="none" aria-hidden="true" />
            </svg>

            {/* cursor readouts sit under the screen, aligned to the cursor x */}
            <div className="wf-cursor-readouts" aria-hidden="true">
              {CURSORS.map((c) => (
                <span key={c.label} className="wf-cursor-chip" style={{ left: `${c.x * 100}%` }}>
                  <span className="wf-cursor-label">{c.label}</span>
                  <span className="wf-cursor-value">{c.value}</span>
                </span>
              ))}
            </div>
          </div>

          <div className="wf-cta-row wf-anim">
            <a href="mailto:koushik.kotamraju1610@gmail.com" className="wf-btn wf-btn--primary">Email me</a>
            <a href="/resume" className="wf-btn wf-btn--ghost">Résumé</a>
          </div>
        </header>

        {/* ── Measurements ───────────────────────────────────────────────── */}
        <section className="wf-section wf-reveal" aria-labelledby="wf-meas-head">
          <h2 id="wf-meas-head" className="wf-h2">Measurements</h2>
          <dl className="wf-readouts">
            {READOUTS.map((r) => (
              <div key={r.label} className="wf-readout">
                <dt className="wf-readout-label">{r.label}</dt>
                <dd className="wf-readout-val">
                  {r.value}
                  <span className="wf-readout-sub">{r.sub}</span>
                </dd>
              </div>
            ))}
          </dl>
        </section>

        {/* ── Channels — the work ────────────────────────────────────────── */}
        <section className="wf-section wf-reveal" aria-labelledby="wf-ch-head">
          <h2 id="wf-ch-head" className="wf-h2">Channels</h2>
          <ul className="wf-channels" role="list">
            {CHANNELS.map((c) => (
              <li key={c.ch} className="wf-channel">
                <span className="wf-ch-tag" aria-hidden="true">
                  <span className="wf-ch-mark" />
                  {c.ch}
                </span>
                <span className="wf-ch-name">{c.name}</span>
                <span className="wf-ch-detail">{c.detail}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* ── Probe output — contact ─────────────────────────────────────── */}
        <section className="wf-section wf-section--out wf-reveal" aria-labelledby="wf-out-head">
          <h2 id="wf-out-head" className="wf-h2">Probe output</h2>
          <p className="wf-out-note">
            Open to Staff &amp; Principal Security Engineer roles · AI Security · Detection.
          </p>
          <a href="mailto:koushik.kotamraju1610@gmail.com" className="wf-email">
            koushik.kotamraju1610<wbr />@gmail.com
          </a>
          <ul className="wf-outputs" role="list">
            {OUTPUTS.map((o) => (
              <li key={o.k}>
                <a
                  href={o.href}
                  className="wf-output"
                  {...(o.ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  <span className="wf-output-k">{o.k}</span>
                  <span className="wf-output-v">{o.v}</span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}
