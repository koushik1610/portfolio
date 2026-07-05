"use client";

import { useRef } from "react";
import type { Theme } from "@/lib/themes";
import { gsap, useGSAP } from "@/lib/gsap";
import CountUp from "@/components/CountUp";
import "./styles.css";

/* ─────────────────────────────────────────────────────────────────────────────
   ADVISORY · layout variant: advisory · class prefix: ad-
   The hero IS a security advisory (GHSA grammar, dark): KK-2026-0001,
   severity CRITICAL 10.0 — and the "vulnerability" is a highly effective
   security engineer with no available patch. Vector chips reinterpret the
   CVSS string as capabilities; remediation is the CTA. Wit stays dry.
   One fuchsia accent (GitHub critical purple). Animation owner: GSAP only
   (one masthead beat + once-only scroll reveals). CountUp owns its spans.
───────────────────────────────────────────────────────────────────────────── */

const ADVISORY_ID = "KK-2026-0001";

const VECTOR = [
  { code: "AV:C", term: "Attack Vector", reading: "Cloud — AWS and GCP, at estate scale" },
  { code: "AC:L", term: "Complexity", reading: "Low — production systems, not prototypes" },
  { code: "PR:N", term: "Privileges Required", reading: "None — builds least-privilege by default" },
  { code: "UI:N", term: "User Interaction", reading: "None — autonomous pipelines, human-gated" },
  { code: "S:C", term: "Scope", reading: "Changed — impact spans every business unit" },
  { code: "R:U", term: "Remediation", reading: "Unavailable — see advisory below" },
] as const;

const AFFECTED = [
  { system: "Cloud estates", versions: "AWS · GCP", impact: "2,800+ accounts under guardrails", patched: "none" },
  { system: "IAM configurations", versions: "all", impact: "65+ escalation paths · 10 vulnerability classes", patched: "none" },
  { system: "Detection fleets", versions: "production", impact: "200+ signatures · 1,400+ AWS accounts", patched: "none" },
  { system: "GenAI platforms", versions: "Bedrock · SageMaker · Vertex AI", impact: "guardrails and detection from zero prior art", patched: "none" },
] as const;

const EVIDENCE = [
  { name: "IAM Audit Agent", note: "agentic AWS IAM review, benchmarked before trusted", metric: "32", metricNote: "GOAT benchmarks · ground-truth" },
  { name: "Artemis", note: "multi-cloud attack-path simulation, AI-enriched graph", metric: "2,800+", metricNote: "accounts unified" },
  { name: "Antitoxin", note: "CIEM research — minimum cut-set dissolution", metric: "62", metricNote: "toxic combinations" },
  { name: "Threat-Intel Pipeline", note: "self-learning router across 5 providers", metric: "$1.40", metricNote: "per run · 19 models" },
] as const;

const TIMELINE = [
  { date: "2015", event: "First observed — enterprise systems, Infosys." },
  { date: "2017", event: "Capability escalation — cloud security architecture, CYR3CON." },
  { date: "2022", event: "Active at scale — Yahoo Paranoids, cloud security." },
  { date: "2026", event: "Public disclosure — this advisory. Status: unpatched." },
] as const;

const REFERENCES = [
  { k: "Email", href: "mailto:koushik.kotamraju1610@gmail.com", ext: false },
  { k: "LinkedIn", href: "https://www.linkedin.com/in/koushikkotamraju/", ext: true },
  { k: "GitHub", href: "https://github.com/koushik1610", ext: true },
  { k: "Résumé", href: "/resume", ext: false },
] as const;

export default function AdvisoryHero({ theme }: { theme: Theme }) {
  void theme;
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReduced) {
        // CSS pre-hides these under scripting — restore statically (inline
        // styles override the stylesheet pre-hide; never clearProps here).
        gsap.set(".ad-anim, .ad-reveal", { opacity: 1, y: 0 });
        gsap.set(".ad-sev-fill, .ad-sev-score", { opacity: 1 });
        return;
      }

      // Masthead beat: meta prints, title rises, severity meter draws to 10.0.
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.to(".ad-head .ad-anim", { opacity: 1, y: 0, duration: 0.55, stagger: 0.09, delay: 0.1 })
        .fromTo(
          ".ad-sev-fill",
          { scaleX: 0 },
          { scaleX: 1, opacity: 1, duration: 1.05, ease: "power4.out" },
          "-=0.25"
        )
        .to(".ad-sev-score", { opacity: 1, duration: 0.4, ease: "power2.out" }, "-=0.35");

      // Failsafe: if the rAF ticker stalls (background tab, low-power mode),
      // never leave the masthead beat stuck mid-flight — force-complete it
      // by wall clock.
      const settle = window.setTimeout(() => {
        if (tl.progress() < 1) tl.progress(1);
      }, 3000);

      // Lower sections reveal once on scroll.
      gsap.utils.toArray<HTMLElement>(".ad-reveal").forEach((el) => {
        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 84%", once: true },
        });
      });

      return () => {
        window.clearTimeout(settle);
      };
    },
    { scope: rootRef }
  );

  return (
    <div className="ad-root" ref={rootRef}>
      <a href="#ad-main" className="ad-skip">Skip to main content</a>

      {/* Top bar — not a nav landmark (it holds no links); the global-nav
          suppression rule keys off nav:not(.ad-nav) and is unaffected. */}
      <header className="ad-nav">
        <span className="ad-nav-id">GHSA · {ADVISORY_ID}</span>
        <span className="ad-nav-status">
          <span className="ad-nav-dot" aria-hidden="true" />
          Active · Open to opportunities
        </span>
      </header>

      <main id="ad-main" className="ad-main">
        {/* ── Masthead — the advisory header ─────────────────────────────── */}
        <header className="ad-head">
          <p className="ad-meta ad-anim">
            <span className="ad-chip ad-chip--sev">Severity: Critical</span>
            <span className="ad-meta-item">Published 2026</span>
            <span className="ad-meta-item">Status: unpatched</span>
          </p>
          <h1 className="ad-title ad-anim">Koushik Kotamraju</h1>
          <p className="ad-role ad-anim">
            Sr. Security Engineer · Yahoo Paranoids · 9 years — a persistent,
            highly effective presence in cloud estates.
          </p>

          {/* Severity meter — the masthead's one drawn beat */}
          <div className="ad-severity ad-anim" role="img" aria-label="Severity score 10.0 out of 10, critical">
            <span className="ad-sev-label" aria-hidden="true">Severity score</span>
            <span className="ad-sev-track" aria-hidden="true">
              <span className="ad-sev-fill" />
            </span>
            <span className="ad-sev-score" aria-hidden="true">10.0 <em>/ 10 critical</em></span>
          </div>

          <div className="ad-desc ad-anim">
            <span className="ad-desc-label" aria-hidden="true">Description</span>
            <p className="ad-summary">
              Cloud security engineer building AI-native security platforms —{" "}
              <strong className="ad-em">production systems, not prototypes.</strong>{" "}
              A small team, 2,800+ cloud accounts: the math only works if you
              build the right systems.
            </p>
          </div>

          <div className="ad-cta-row ad-anim">
            <a href="mailto:koushik.kotamraju1610@gmail.com" className="ad-btn ad-btn--primary">Email me</a>
            <a href="/resume" className="ad-btn ad-btn--ghost">Résumé</a>
          </div>
        </header>

        {/* ── Vector analysis ────────────────────────────────────────────── */}
        <section className="ad-section ad-reveal" aria-labelledby="ad-vector-head">
          <h2 id="ad-vector-head" className="ad-h2">Vector analysis</h2>
          <dl className="ad-vector">
            {VECTOR.map((v) => (
              <div key={v.code} className="ad-vec">
                <dt className="ad-vec-code">
                  <span aria-hidden="true">{v.code}</span>
                  <span className="ad-sr-only">{v.term}</span>
                </dt>
                <dd className="ad-vec-body">
                  <span className="ad-vec-term" aria-hidden="true">{v.term}</span>
                  <span className="ad-vec-reading">{v.reading}</span>
                </dd>
              </div>
            ))}
          </dl>
        </section>

        {/* ── Affected systems ───────────────────────────────────────────── */}
        <section className="ad-section ad-reveal" aria-labelledby="ad-affected-head">
          <h2 id="ad-affected-head" className="ad-h2">Affected systems</h2>
          <div
            className="ad-table-wrap"
            tabIndex={0}
            role="region"
            aria-labelledby="ad-affected-head"
          >
            <table className="ad-table">
              <thead>
                <tr>
                  <th scope="col">System</th>
                  <th scope="col">Versions</th>
                  <th scope="col">Impact</th>
                  <th scope="col">Patched</th>
                </tr>
              </thead>
              <tbody>
                {AFFECTED.map((row) => (
                  <tr key={row.system}>
                    <td className="ad-td-system">{row.system}</td>
                    <td className="ad-td-versions">{row.versions}</td>
                    <td className="ad-td-impact">{row.impact}</td>
                    <td className="ad-td-patched">{row.patched}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ── Evidence ───────────────────────────────────────────────────── */}
        <section className="ad-section ad-reveal" aria-labelledby="ad-evidence-head">
          <h2 id="ad-evidence-head" className="ad-h2">Evidence</h2>
          <ul className="ad-evidence" role="list">
            {EVIDENCE.map((e) => (
              <li key={e.name} className="ad-proof">
                <div className="ad-proof-main">
                  <span className="ad-proof-name">{e.name}</span>
                  <span className="ad-proof-note">{e.note}</span>
                </div>
                <div className="ad-proof-metric">
                  <CountUp value={e.metric} className="ad-proof-num" />
                  <span className="ad-proof-mnote">{e.metricNote}</span>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* ── Disclosure timeline ────────────────────────────────────────── */}
        <section className="ad-section ad-reveal" aria-labelledby="ad-timeline-head">
          <h2 id="ad-timeline-head" className="ad-h2">Disclosure timeline</h2>
          <ol className="ad-timeline" role="list">
            {TIMELINE.map((t) => (
              <li key={t.date} className="ad-tl-row">
                <span className="ad-tl-date">{t.date}</span>
                <span className="ad-tl-event">{t.event}</span>
              </li>
            ))}
          </ol>
        </section>

        {/* ── Remediation — the CTA is the punchline ─────────────────────── */}
        <section className="ad-section ad-section--remediation ad-reveal" aria-labelledby="ad-remediation-head">
          <h2 id="ad-remediation-head" className="ad-h2">Remediation</h2>
          <p className="ad-remediation">
            No patch available.{" "}
            <strong className="ad-remediation-strong">Acquire the engineer.</strong>
          </p>
          <a href="mailto:koushik.kotamraju1610@gmail.com" className="ad-email">
            koushik.kotamraju1610<wbr />@gmail.com
          </a>
          <ul className="ad-refs" role="list">
            {REFERENCES.map((r) => (
              <li key={r.k}>
                <a
                  href={r.href}
                  className="ad-ref"
                  {...(r.ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  {r.k}
                </a>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}
