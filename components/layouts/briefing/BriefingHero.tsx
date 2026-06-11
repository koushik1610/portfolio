"use client";

import { useRef } from "react";
import type { Theme } from "@/lib/themes";
import { gsap, useGSAP, SplitText } from "@/lib/gsap";
import CountUp from "@/components/CountUp";
import "./styles.css";

/* ─────────────────────────────────────────────────────────────────────────────
   BRIEFING · layout variant: briefing · class prefix: bf-
   A dark operations-brief bento. Strict hierarchy: ONE dominant identity tile,
   ONE accent-filled CTA tile (the conversion path is structural), supporting
   tiles for stats / attack path / featured work / availability.
   Owned accent: signal coral #ff7a5c (7.6:1 as text on bg; tiles use dark
   text on coral at 7.3:1). Animation owner: GSAP only.
───────────────────────────────────────────────────────────────────────────── */

const STATS = [
  { value: "2,800+", label: "cloud accounts" },
  { value: "200+", label: "detection signatures" },
  { value: "120+", label: "security reviews" },
  { value: "1,700+", label: "knowledge-graph nodes" },
] as const;

const AI_FACTS = [
  { value: "19", label: "models orchestrated" },
  { value: "5", label: "providers" },
  { value: "$1.40", label: "per research run" },
] as const;

/* The mini attack path the Antitoxin work cuts — rendered as a static chain. */
const ATTACK_PATH = [
  { node: "role", state: "entry" },
  { node: "iam:PassRole", state: "toxic" },
  { node: "lambda:Create", state: "toxic" },
  { node: "admin", state: "cut" },
] as const;

const WORK = [
  { name: "Artemis", desc: "Multi-cloud attack-path simulation across the estate.", metric: "2,800+ accounts" },
  { name: "IAM Audit Agent", desc: "65+ escalation paths · 10 vulnerability classes.", metric: "100% GOAT · 32/32" },
  { name: "Autonomous Threat Intel", desc: "19 models, 5 providers, weighted routing.", metric: "$1.40 / run" },
  { name: "Detection Engine", desc: "Terraform-deployed signature fleet, ATT&CK-mapped.", metric: "0% FP" },
] as const;

const CONTACT = [
  { k: "Email", href: "mailto:koushik.kotamraju1610@gmail.com", v: "koushik.kotamraju1610@gmail.com", ext: false },
  { k: "LinkedIn", href: "https://www.linkedin.com/in/koushikkotamraju/", v: "in/koushikkotamraju", ext: true },
  { k: "GitHub", href: "https://github.com/koushik1610", v: "github.com/koushik1610", ext: true },
] as const;

export default function BriefingHero({ theme }: { theme: Theme }) {
  void theme;
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReduced) return;

      // Name reveals first (the identity tile itself stays visible), then the
      // supporting tiles assemble — each on its own once-only scroll trigger so
      // below-fold tiles never animate unseen.
      const split = SplitText.create(".bf-name", { type: "words", mask: "words", aria: "none" });
      gsap.from(split.words, {
        yPercent: 115,
        duration: 0.85,
        stagger: 0.08,
        ease: "power3.out",
        delay: 0.1,
      });
      gsap.utils.toArray<HTMLElement>(".bf-tile:not(.bf-tile--identity)").forEach((tile, i) => {
        gsap.from(tile, {
          autoAlpha: 0,
          y: 18,
          scale: 0.985,
          duration: 0.6,
          ease: "power3.out",
          // small index offset staggers the above-fold cluster on load without
          // making late below-fold tiles hesitate after their trigger fires
          delay: Math.min(i, 3) * 0.06,
          scrollTrigger: { trigger: tile, start: "top 92%", once: true },
        });
      });

      // Attack-path chain lights left → right, then the cut lands.
      gsap.from(".bf-path-node, .bf-path-edge", {
        autoAlpha: 0,
        duration: 0.35,
        stagger: 0.12,
        ease: "power1.out",
        delay: 0.4,
        scrollTrigger: { trigger: ".bf-tile--path", start: "top 90%", once: true },
      });

      // Work rows rise on scroll, once.
      gsap.from(".bf-work-row", {
        autoAlpha: 0,
        y: 16,
        duration: 0.55,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: { trigger: ".bf-work", start: "top 84%", once: true },
      });
    },
    { scope: rootRef }
  );

  return (
    <div className="bf-root" ref={rootRef}>
      <a href="#bf-main" className="bf-skip">Skip to main content</a>
      <h1 className="bf-sr-only">
        Koushik Kotamraju — Sr. Security Engineer at Yahoo Paranoids. Cloud security
        engineer building AI-native security platforms.
      </h1>

      <nav className="bf-nav" aria-label="Primary navigation">
        <span className="bf-nav-logo" aria-hidden="true">KK<span className="bf-nav-dot">·</span></span>
        <span className="bf-nav-tag" aria-hidden="true">OPERATIONS BRIEF · 2026-06</span>
        <span className="bf-nav-status">
          <span className="bf-status-dot" aria-hidden="true" />
          Open to work
        </span>
      </nav>

      <main id="bf-main" className="bf-main">
        <div className="bf-grid">
          {/* ── 1 · Identity — the dominant tile ─────────────────────── */}
          <section className="bf-tile bf-tile--identity" aria-label="Identity">
            <p className="bf-kicker">Sr. Security Engineer · Yahoo Paranoids</p>
            <p className="bf-name" aria-hidden="true">Koushik<br />Kotamraju</p>
            <p className="bf-lede">
              Cloud security engineer building AI-native security platforms —{" "}
              <strong>production systems, not prototypes.</strong>
            </p>
            <p className="bf-hook">
              A small team. 2,800+ cloud accounts. The math only works if you
              build the right systems.
            </p>
          </section>

          {/* ── 2 · CTA — the accent-filled action tile ──────────────── */}
          <section className="bf-tile bf-tile--cta" aria-label="Contact actions">
            <p className="bf-cta-title">Hire signal</p>
            <p className="bf-cta-sub">Staff / Principal Security Engineer · AI Security</p>
            <div className="bf-cta-actions">
              <a href="mailto:koushik.kotamraju1610@gmail.com" className="bf-btn bf-btn--onaccent">Email me</a>
              <a href="/resume" className="bf-btn bf-btn--outline">Résumé</a>
            </div>
          </section>

          {/* ── 3 · Stats ─────────────────────────────────────────────── */}
          <section className="bf-tile bf-tile--stats" aria-label="Scale">
            <p className="bf-tile-label">Scale</p>
            <dl className="bf-stats">
              {STATS.map((s) => (
                <div key={s.label} className="bf-stat">
                  <dt className="bf-stat-label">{s.label}</dt>
                  {/* CountUp's own aria-label carries the final value */}
                  <dd className="bf-stat-val"><CountUp value={s.value} className="bf-stat-num" /></dd>
                </div>
              ))}
            </dl>
          </section>

          {/* ── 4 · Portrait ──────────────────────────────────────────── */}
          <section className="bf-tile bf-tile--portrait" aria-label="Portrait">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/profile.jpeg"
              alt="Portrait of Koushik Kotamraju"
              className="bf-portrait"
              loading="lazy"
            />
          </section>

          {/* ── 5 · Attack path (decorative narrative) ───────────────── */}
          <section
            className="bf-tile bf-tile--path"
            aria-label="62 toxic IAM combinations catalogued; 65+ privilege-escalation paths cut across 10 vulnerability classes"
          >
            <p className="bf-tile-label" aria-hidden="true">Escalation path · cut</p>
            <div className="bf-path" aria-hidden="true">
              {ATTACK_PATH.map((p, i) => (
                <span key={p.node} className="bf-path-seg">
                  {i > 0 && <span className={`bf-path-edge${p.state === "cut" ? " bf-path-edge--cut" : ""}`} />}
                  <span className={`bf-path-node bf-path-node--${p.state}`}>{p.node}</span>
                </span>
              ))}
            </div>
            <p className="bf-path-note" aria-hidden="true">
              62 toxic combinations · 65+ paths across 10 classes · minimum cut-set remediation
            </p>
          </section>

          {/* ── 6 · AI platform ───────────────────────────────────────── */}
          <section className="bf-tile bf-tile--ai" aria-label="AI platform">
            <p className="bf-tile-label">AI platform</p>
            <div className="bf-ai-row">
              {AI_FACTS.map((f) => (
                <div key={f.label} className="bf-ai-fact" role="group" aria-label={`${f.value} ${f.label}`}>
                  <span className="bf-ai-num" aria-hidden="true">{f.value}</span>
                  <span className="bf-ai-label" aria-hidden="true">{f.label}</span>
                </div>
              ))}
            </div>
            <p className="bf-ai-note">Performance-weighted routing · 55% cost cut vs baseline</p>
          </section>

          {/* ── 7 · Credentials / now ─────────────────────────────────── */}
          <section className="bf-tile bf-tile--now" aria-label="Credentials">
            <p className="bf-tile-label">Now</p>
            <ul className="bf-now-list" role="list">
              <li>9 years · 3 organizations</li>
              <li>AWS Solutions Architect Associate</li>
              <li>AWS Security Specialty</li>
              <li>CIEM · CNAPP · Detection · IAM</li>
            </ul>
          </section>
        </div>

        {/* ── Selected work ─────────────────────────────────────────────── */}
        <section className="bf-work" aria-labelledby="bf-work-head">
          <div className="bf-work-head">
            <h2 id="bf-work-head" className="bf-h2">Selected work</h2>
            <span className="bf-work-count" aria-hidden="true">04</span>
          </div>
          <ul className="bf-work-list" role="list">
            {WORK.map((w) => (
              <li key={w.name} className="bf-work-row">
                <span className="bf-work-name">{w.name}</span>
                <span className="bf-work-desc">{w.desc}</span>
                <span className="bf-work-metric">{w.metric}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* ── Contact bar ───────────────────────────────────────────────── */}
        <section className="bf-contact" aria-labelledby="bf-contact-head">
          <h2 id="bf-contact-head" className="bf-h2">Contact</h2>
          <ul className="bf-contact-list" role="list">
            {CONTACT.map((c) => (
              <li key={c.k}>
                <a
                  href={c.href}
                  className="bf-contact-link"
                  {...(c.ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  <span className="bf-contact-k">{c.k}</span>
                  <span className="bf-contact-v">{c.v}</span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}
