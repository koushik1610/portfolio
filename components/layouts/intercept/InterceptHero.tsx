"use client";

import { useRef } from "react";
import type { Theme } from "@/lib/themes";
import { gsap, useGSAP } from "@/lib/gsap";
import CountUp from "@/components/CountUp";
import "./styles.css";

/* ─────────────────────────────────────────────────────────────────────────────
   INTERCEPT · layout variant: intercept · class prefix: ic-
   The hero IS a packet capture: a Wireshark-grade stream table whose packets
   are nine years of work; one identity packet auto-selects and its dissection
   tree decodes to "Koushik Kotamraju" with the CTA in the payload. Protocol
   hierarchy = the stats; Follow Stream = contact. Saffron is Wireshark's
   filter-bar yellow — used as punctuation only. Animation owner: GSAP only
   (rows print → row selects → tree decodes; once). CountUp owns its spans.
───────────────────────────────────────────────────────────────────────────── */

const CAPTURE_META = "capture.pcapng · 9y window · filter: koushik";

const PACKETS = [
  { no: 1, time: "2015", src: "infosys", dst: "enterprise", proto: "SYS", info: "Cloud integration — EDI pipelines, iPaaS", selected: false },
  { no: 2, time: "2017", src: "cyr3con", dst: "aws", proto: "SEC", info: "Security architect — ML workloads, −90% external attack surface", selected: false },
  { no: 3, time: "2022", src: "yahoo", dst: "estate", proto: "GUARD", info: "2,800+ accounts under secure-by-default guardrails", selected: true },
  { no: 4, time: "live", src: "detection-fleet", dst: "estate", proto: "DETECT", info: "200+ signatures · 1,400+ AWS accounts", selected: false },
  { no: 5, time: "live", src: "iam-agent", dst: "goat-bench", proto: "IAM", info: "65+ escalation paths · 32 GOAT benchmarks", selected: false },
  { no: 6, time: "live", src: "antitoxin", dst: "ciem", proto: "CIEM", info: "62 toxic combinations · minimum cut-set dissolution", selected: false },
  { no: 7, time: "live", src: "artemis", dst: "multi-cloud", proto: "APS", info: "GCP SCC + AWS Security Hub, one AI-enriched graph", selected: false },
  { no: 8, time: "live", src: "research-pipe", dst: "intel", proto: "INTEL", info: "19 models · 5 providers · $1.40 per run", selected: false },
] as const;

/* The dissection narrates whichever packet carries selected: true — the
   frame line is derived from the data so they can never drift apart. */
const SELECTED = PACKETS.find((p) => p.selected) ?? PACKETS[0];

const HIERARCHY = [
  { proto: "DETECT — detection engineering", share: 92, value: "200+ signatures · 1,400+ accounts" },
  { proto: "IAM — privilege analysis", share: 78, value: "65+ escalation paths · 10 classes" },
  { proto: "CIEM — toxic combinations", share: 64, value: "62 catalogued · ATT&CK-mapped" },
  { proto: "APS — attack-path simulation", share: 55, value: "2,800+ accounts unified" },
  { proto: "INTEL — autonomous research", share: 41, value: "19 models · $1.40/run" },
] as const;

const STATS = [
  { value: "2,800+", label: "cloud accounts · AWS + GCP" },
  { value: "200+", label: "signatures · 1,400+ AWS accounts" },
  { value: "150+", label: "security reviews · every business unit" },
  { value: "$1.40", label: "per research run · 19 models" },
] as const;

const STREAM_LINKS = [
  { k: "email", v: "koushik.kotamraju1610@gmail.com", href: "mailto:koushik.kotamraju1610@gmail.com", ext: false },
  { k: "linkedin", v: "in/koushikkotamraju", href: "https://www.linkedin.com/in/koushikkotamraju/", ext: true },
  { k: "github", v: "github.com/koushik1610", href: "https://github.com/koushik1610", ext: true },
  { k: "résumé", v: "/resume", href: "/resume", ext: false },
] as const;

/* Decorative hex strip (aria-hidden) — "4b 6f 75 73 68 69 6b" spells Koushik */
const HEX_STRIP = "0000  4b 6f 75 73 68 69 6b 20  4b 6f 74 61 6d 72 61 6a";

export default function InterceptHero({ theme }: { theme: Theme }) {
  void theme;
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      // Single-source the selection tint from the CSS token.
      const selectTint = rootRef.current
        ? getComputedStyle(rootRef.current).getPropertyValue("--ic-select").trim()
        : "rgba(234, 179, 8, 0.09)";

      if (prefersReduced) {
        // CSS pre-hides these under scripting — restore statically (inline
        // styles override the stylesheet pre-hide; never clearProps here).
        gsap.set(".ic-row, .ic-tree-line, .ic-reveal", { opacity: 1, y: 0 });
        gsap.set(".ic-row--selected", { backgroundColor: selectTint });
        gsap.set(".ic-bar-fill", { scaleX: 1, opacity: 1 });
        return;
      }

      // 1 · packets print, terminal-honest (no typing theater)
      const tl = gsap.timeline({ defaults: { ease: "none" } });
      tl.to(".ic-row", { opacity: 1, duration: 0.14, stagger: 0.07, delay: 0.2 })
        // 2 · the identity packet selects
        .to(".ic-row--selected", {
          backgroundColor: selectTint,
          duration: 0.3,
          ease: "power2.out",
        })
        // 3 · the dissection tree decodes — the name is the payload
        .to(".ic-tree-line", {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: "power3.out",
        }, "+=0.1");

      // Failsafe: if the rAF ticker stalls (background tab, low-power mode),
      // never leave the packet-print/decode sequence stuck mid-flight —
      // force-complete it by wall clock.
      const settle = window.setTimeout(() => {
        if (tl.progress() < 1) tl.progress(1);
      }, 3000);

      // Below-fold sections reveal once on scroll.
      gsap.utils.toArray<HTMLElement>(".ic-reveal").forEach((el) => {
        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 84%", once: true },
        });
      });

      // Protocol-hierarchy bars draw when visible.
      gsap.utils.toArray<HTMLElement>(".ic-bar-fill").forEach((el) => {
        gsap.to(el, {
          scaleX: 1,
          opacity: 1,
          duration: 0.9,
          ease: "power4.out",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      });

      return () => {
        window.clearTimeout(settle);
      };
    },
    { scope: rootRef }
  );

  return (
    <div className="ic-root" ref={rootRef}>
      <a href="#ic-main" className="ic-skip">Skip to main content</a>

      {/* Top bar — not a nav landmark (it holds no links); the global-nav
          suppression rule keys off nav:not(.ic-nav) and is unaffected. */}
      <header className="ic-nav">
        <span className="ic-nav-meta">{CAPTURE_META}</span>
        <span className="ic-nav-status">
          <span className="ic-nav-dot" aria-hidden="true" />
          Capturing · Open to opportunities
        </span>
      </header>

      <main id="ic-main" className="ic-main">
        {/* ── The capture — stream table ─────────────────────────────────── */}
        <section className="ic-capture" aria-label="Career packet capture">
          <div
            className="ic-table-wrap"
            tabIndex={0}
            role="region"
            aria-label="Captured packets — nine years of work"
          >
            <table className="ic-table">
              <thead>
                <tr>
                  <th scope="col">No.</th>
                  <th scope="col">Time</th>
                  <th scope="col">Source</th>
                  <th scope="col">Destination</th>
                  <th scope="col">Protocol</th>
                  <th scope="col">Info</th>
                </tr>
              </thead>
              <tbody>
                {PACKETS.map((p) => (
                  <tr key={p.no} className={`ic-row${p.selected ? " ic-row--selected" : ""}`}>
                    <td className="ic-td-no">{p.no}</td>
                    <td className="ic-td-time">{p.time}</td>
                    <td className="ic-td-host">{p.src}</td>
                    <td className="ic-td-host">{p.dst}</td>
                    <td className="ic-td-proto">{p.proto}</td>
                    <td className="ic-td-info">{p.info}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ── The dissection — the selected packet decodes to the person ──── */}
        <section className="ic-dissect" aria-labelledby="ic-name">
          <p className="ic-tree-line ic-tree-frame">
            <span className="ic-twist" aria-hidden="true">▸</span>{" "}
            Frame {SELECTED.no}: {SELECTED.src} → {SELECTED.dst} — packet selected
          </p>
          <div className="ic-tree-line ic-tree-branch">
            <span className="ic-twist" aria-hidden="true">▾</span>
            <span className="ic-branch-label">Identity — payload decoded</span>
          </div>
          <h1 id="ic-name" className="ic-tree-line ic-name">Koushik Kotamraju</h1>
          <p className="ic-tree-line ic-role">Sr. Security Engineer · Yahoo Paranoids · 9 years</p>
          <p className="ic-tree-line ic-lede">
            Cloud security engineer building AI-native security platforms —{" "}
            <strong className="ic-em">production systems, not prototypes.</strong>
          </p>
          <p className="ic-tree-line ic-thesis">
            <span className="ic-thesis-mark" aria-hidden="true"># </span>
            A small team, 2,800+ cloud accounts: the math only works if you
            build the right systems.
          </p>
          <div className="ic-tree-line ic-cta-row">
            <a href="mailto:koushik.kotamraju1610@gmail.com" className="ic-btn ic-btn--primary">Email me</a>
            <a href="/resume" className="ic-btn ic-btn--ghost">Résumé</a>
          </div>
        </section>

        {/* ── Protocol hierarchy — the work, by relative emphasis ─────────── */}
        <section className="ic-section ic-reveal" aria-labelledby="ic-hier-head">
          <p className="ic-hex" aria-hidden="true">{HEX_STRIP}</p>
          <h2 id="ic-hier-head" className="ic-h2">
            Protocol hierarchy
            <span className="ic-h2-note"> — by relative emphasis, not packet count</span>
          </h2>
          <ul className="ic-hier" role="list">
            {HIERARCHY.map((h) => (
              <li key={h.proto} className="ic-hier-row">
                <span className="ic-hier-proto">{h.proto}</span>
                <span
                  className="ic-bar"
                  role="img"
                  aria-label={`${h.proto}: ${h.value}`}
                >
                  <span className="ic-bar-fill" style={{ width: `${h.share}%` }} aria-hidden="true" />
                </span>
                <span className="ic-hier-value" aria-hidden="true">{h.value}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* ── Capture statistics ───────────────────────────────────────────── */}
        <section className="ic-section ic-reveal" aria-labelledby="ic-stats-head">
          <h2 id="ic-stats-head" className="ic-h2">Capture statistics</h2>
          <dl className="ic-stats">
            {STATS.map((s) => (
              <div key={s.label} className="ic-stat">
                <dt className="ic-stat-label">{s.label}</dt>
                <dd className="ic-stat-val">
                  <CountUp value={s.value} className="ic-stat-num" />
                </dd>
              </div>
            ))}
          </dl>
        </section>

        {/* ── Follow stream — contact ──────────────────────────────────────── */}
        <section className="ic-section ic-section--stream ic-reveal" aria-labelledby="ic-stream-head">
          <h2 id="ic-stream-head" className="ic-h2">Follow stream</h2>
          <p className="ic-stream-note">
            End of capture. The next packet is yours — open to Staff &amp;
            Principal Security Engineer roles · AI Security · Detection.
          </p>
          <a href="mailto:koushik.kotamraju1610@gmail.com" className="ic-email">
            koushik.kotamraju1610<wbr />@gmail.com
          </a>
          <ul className="ic-links" role="list">
            {STREAM_LINKS.map((l) => (
              <li key={l.k}>
                <a
                  href={l.href}
                  className="ic-link"
                  {...(l.ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  <span className="ic-link-k">{l.k}</span>
                  <span className="ic-link-v">{l.v}</span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}
