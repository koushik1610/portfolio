"use client";

import { useRef } from "react";
import type { Theme } from "@/lib/themes";
import { gsap, useGSAP } from "@/lib/gsap";
import CountUp from "@/components/CountUp";
import "./styles.css";

/* ─────────────────────────────────────────────────────────────────────────────
   CASEFILE · layout variant: casefile · class prefix: cf-
   The hero IS a security artifact: a calm incident-response terminal session.
   Each section is a command; "Koushik Kotamraju" is the output the session
   resolves to, and `$ koushik --hire` is the CTA. Geist Mono throughout, one
   restrained sage accent — a quiet tool surface, not a CTF screensaver.
   Animation owner: GSAP only (lines "print" in, once). CountUp owns its spans.
───────────────────────────────────────────────────────────────────────────── */

const SESSION_META = "incident-response · session 2026-06 · case KK-09 · UTC";

const STATS = [
  { cmd: "accounts", value: "2,800+", label: "cloud accounts secured · AWS + GCP" },
  { cmd: "signatures", value: "200+", label: "detection signatures · 0% false positives" },
  { cmd: "goat_recall", value: "100%", label: "GOAT benchmark · 32/32 findings · 0 FP" },
  { cmd: "cost_per_run", value: "$1.40", label: "per research run · vs $3.20 baseline" },
] as const;

const CAPABILITIES = [
  { perm: "drwxr-x---", name: "detection-engineering/", note: "200+ signatures · MITRE ATT&CK · Terraform" },
  { perm: "drwxr-x---", name: "iam-privilege-analysis/", note: "65+ escalation paths · 10 vuln classes · CIEM" },
  { perm: "drwxr-x---", name: "ai-security-tooling/", note: "19 models · 5 providers · 1,700+-node graph" },
  { perm: "drwxr-x---", name: "cloud-architecture/", note: "2,800+ accounts · CNAPP · Zero Trust" },
  { perm: "drwxr-x---", name: "security-research/", note: "Artemis · Antitoxin · 62 toxic combinations" },
] as const;

const LOG_ENTRIES = [
  { tag: "ARTEMIS", desc: "Multi-cloud attack-path simulation — GCP SCC + AWS Security Hub unified into an AI-enriched graph layer.", metric: "2,800+ accounts" },
  { tag: "IAM-AUDIT", desc: "Boto3 tool-calling agent. 65+ escalation paths across 10 vulnerability classes.", metric: "100% GOAT recall" },
  { tag: "THREAT-INTEL", desc: "19 models, 5 providers, performance-weighted router. Replaced a manual weekly process.", metric: "$1.40 / run" },
  { tag: "DETECTION", desc: "200+ active signatures via Terraform. ATT&CK gap analysis, zero false positives at scale.", metric: "0% FP" },
] as const;

const CONTACT = [
  { k: "email", v: "koushik.kotamraju1610@gmail.com", href: "mailto:koushik.kotamraju1610@gmail.com", ext: false },
  { k: "linkedin", v: "in/koushikkotamraju", href: "https://www.linkedin.com/in/koushikkotamraju/", ext: true },
  { k: "github", v: "github.com/koushik1610", href: "https://github.com/koushik1610", ext: true },
] as const;

function Prompt({ cmd }: { cmd: string }) {
  // <span> (block via CSS) so it is valid phrasing content inside headings.
  return (
    <span className="cf-prompt">
      <span className="cf-prompt-mark" aria-hidden="true">$</span> {cmd}
    </span>
  );
}

export default function CasefileHero({ theme }: { theme: Theme }) {
  void theme;
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReduced) return;

      // The opening transcript "prints" — terminal-honest line stagger, no
      // per-character typing theater. Runs once.
      gsap.from(".cf-block--intro .cf-line", {
        autoAlpha: 0,
        duration: 0.18,
        stagger: 0.07,
        ease: "none",
        delay: 0.2,
      });

      // Subsequent command blocks print as they scroll in, once each.
      gsap.utils.toArray<HTMLElement>(".cf-block--scroll").forEach((block) => {
        gsap.from(block.querySelectorAll(".cf-line"), {
          autoAlpha: 0,
          duration: 0.16,
          stagger: 0.05,
          ease: "none",
          scrollTrigger: { trigger: block, start: "top 82%", once: true },
        });
      });
    },
    { scope: rootRef }
  );

  return (
    <div className="cf-root" ref={rootRef}>
      <a href="#cf-main" className="cf-skip">Skip to main content</a>

      <nav className="cf-nav" aria-label="Primary navigation">
        <span className="cf-session" aria-hidden="true">{SESSION_META}</span>
        <span className="cf-status">
          <span className="cf-status-dot" aria-hidden="true" />
          Open to opportunities
        </span>
      </nav>

      <main id="cf-main" className="cf-main">
        {/* ── $ whois koushik ─────────────────────────────────────────── */}
        <section className="cf-block cf-block--intro" aria-labelledby="cf-name">
          <div className="cf-line"><Prompt cmd="whois koushik" /></div>
          <h1 id="cf-name" className="cf-line cf-name">Koushik Kotamraju</h1>
          <p className="cf-line cf-role">Sr. Security Engineer · Yahoo Paranoids · 9 years</p>
          <p className="cf-line cf-lede">
            Cloud security engineer building AI-native security platforms —{" "}
            <strong className="cf-em">production systems, not prototypes.</strong>
          </p>
          <p className="cf-line cf-hook">
            A small team. 2,800+ cloud accounts. The math only works if you build
            the right systems.
          </p>

          {/* ── $ koushik --hire — the CTA is the prompt ────────────── */}
          <div className="cf-line cf-hire"><Prompt cmd="koushik --hire" /></div>
          <div className="cf-line cf-cta-row">
            <a href="mailto:koushik.kotamraju1610@gmail.com" className="cf-btn cf-btn--primary">Email me</a>
            <a href="/resume" className="cf-btn cf-btn--ghost">Résumé</a>
          </div>
        </section>

        {/* ── $ koushik --stats ───────────────────────────────────────── */}
        <section className="cf-block cf-block--scroll" aria-labelledby="cf-stats-head">
          <div className="cf-line">
            <h2 id="cf-stats-head" className="cf-h2"><Prompt cmd="koushik --stats" /></h2>
          </div>
          <dl className="cf-stats">
            {STATS.map((s) => (
              <div key={s.cmd} className="cf-line cf-stat">
                <dt className="cf-stat-key" aria-hidden="true">{s.cmd}</dt>
                <dd className="cf-stat-val">
                  {/* CountUp's own aria-label carries the final value */}
                  <CountUp value={s.value} className="cf-stat-num" />
                  <span className="cf-stat-label">{s.label}</span>
                </dd>
              </div>
            ))}
          </dl>
        </section>

        {/* ── $ ls capabilities/ ──────────────────────────────────────── */}
        <section className="cf-block cf-block--scroll" aria-labelledby="cf-cap-head">
          <div className="cf-line">
            <h2 id="cf-cap-head" className="cf-h2"><Prompt cmd="ls -l capabilities/" /></h2>
          </div>
          <ul className="cf-listing" role="list">
            {CAPABILITIES.map((c) => (
              <li key={c.name} className="cf-line cf-entry">
                <span className="cf-perm" aria-hidden="true">{c.perm}</span>
                <span className="cf-entry-name">{c.name}</span>
                <span className="cf-entry-note">{c.note}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* ── $ tail casefile.log ─────────────────────────────────────── */}
        <section className="cf-block cf-block--scroll" aria-labelledby="cf-log-head">
          <div className="cf-line">
            <h2 id="cf-log-head" className="cf-h2"><Prompt cmd="tail -n 4 casefile.log" /></h2>
          </div>
          <ol className="cf-log" role="list">
            {LOG_ENTRIES.map((e) => (
              <li key={e.tag} className="cf-line cf-log-row">
                <span className="cf-log-tag">[{e.tag}]</span>
                <span className="cf-log-desc">{e.desc}</span>
                <span className="cf-log-metric">{e.metric}</span>
              </li>
            ))}
          </ol>
        </section>

        {/* ── $ koushik --contact ─────────────────────────────────────── */}
        <section className="cf-block cf-block--scroll" aria-labelledby="cf-contact-head">
          <div className="cf-line">
            <h2 id="cf-contact-head" className="cf-h2"><Prompt cmd="koushik --contact" /></h2>
          </div>
          <p className="cf-line cf-contact-note">
            Open to Staff &amp; Principal Security Engineer roles · AI Security · Detection.
          </p>
          <ul className="cf-contacts" role="list">
            {CONTACT.map((c) => (
              <li key={c.k} className="cf-line">
                <a
                  href={c.href}
                  className="cf-contact-link"
                  {...(c.ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  <span className="cf-contact-k">{c.k}</span>
                  <span className="cf-contact-v">{c.v}</span>
                </a>
              </li>
            ))}
          </ul>
          {/* Session close — cursor blinks briefly, then settles (no perpetual loop) */}
          <p className="cf-line cf-eof" aria-hidden="true">
            <span className="cf-prompt-mark">$</span> <span className="cf-cursor" />
          </p>
        </section>
      </main>
    </div>
  );
}
