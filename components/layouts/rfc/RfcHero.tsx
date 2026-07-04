"use client";

import { useRef } from "react";
import type { Theme } from "@/lib/themes";
import { gsap, useGSAP } from "@/lib/gsap";
import CountUp from "@/components/CountUp";
import "./styles.css";

/* ─────────────────────────────────────────────────────────────────────────────
   RFC · layout variant: rfc · class prefix: rc-
   RFC 9161 — The Kotamraju Protocol: a standards-track document rendered
   faithfully. Canonical two-column header block, numbered sections,
   RFC 2119 MUST/SHOULD language, a References section that is his evidence.
   Palette: paper #fcfbf8 · ink #191817 · muted #5d5b55 (~7.3:1) · owned
   accent: ink-teal, derived from the registry token (~5.2:1 on paper).
   Mono throughout except the h1 name (the one deliberate Sans break).
   Animation owner: GSAP only — near-none by genre; documents don't slide.
───────────────────────────────────────────────────────────────────────────── */

const TOC = [
  { href: "#rc-abstract", label: "1.  Abstract" },
  { href: "#rc-lang", label: "2.  Requirements Language" },
  { href: "#rc-overview", label: "3.  Protocol Overview" },
  { href: "#rc-security", label: "4.  Security Considerations" },
  { href: "#rc-iana", label: "5.  IANA Considerations" },
  { href: "#rc-refs", label: "6.  References" },
  { href: "#rc-author", label: "Author's Address" },
] as const;

const OVERVIEW = [
  {
    n: "3.1",
    title: "Detection",
    body: "200+ Python/Lambda signatures evaluate 1,400+ AWS accounts. The posture scores the company is measured against derive from this fleet. The v6.0 release added 50+ new baselines, the largest single control expansion in program history.",
  },
  {
    n: "3.2",
    title: "Identity",
    body: "65+ escalation paths are catalogued across 10 vulnerability classes. GOAT was built before it was trusted: 32 ground-truth findings, and the IAM audit agent was evaluated against all 32. Antitoxin catalogues 62 toxic IAM combinations with minimum cut-set dissolution.",
  },
  {
    n: "3.3",
    title: "Review",
    body: "150+ Paranoid Security Reviews were conducted in partnership with Product Security, Network, and Identity, covering every business unit before launch.",
  },
  {
    n: "3.4",
    title: "AI Platforms",
    body: "A self-learning research router orchestrates 19 models across 5 providers at $1.40 per run. A deterministic advisor enforces hard deny gates. Implementations MUST remain auditable.",
  },
] as const;

const REFERENCES = [
  { tag: "GOAT", value: "32", label: "ground-truth IAM findings" },
  { tag: "ANTITOXIN", value: "62", label: "toxic combinations, minimum cut-set" },
  { tag: "ARTEMIS", value: "2,800+", label: "accounts, attack-path simulation" },
  { tag: "V6", value: "50+", label: "new baselines, largest release in program history" },
] as const;

const CONTACT = [
  { k: "Email", v: "koushik.kotamraju1610@gmail.com", href: "mailto:koushik.kotamraju1610@gmail.com", ext: false },
  { k: "LinkedIn", v: "in/koushikkotamraju", href: "https://www.linkedin.com/in/koushikkotamraju/", ext: true },
  { k: "GitHub", v: "github.com/koushik1610", href: "https://github.com/koushik1610", ext: true },
] as const;

export default function RfcHero({ theme }: { theme: Theme }) {
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

      // Header block settles once — documents don't slide, so no y movement.
      const intro = gsap.from(".rc-header, .rc-title-block, .rc-abstract", {
        autoAlpha: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: "power2.out",
        delay: 0.1,
      });
      settle(intro, 3000);

      // Sections reveal on scroll, once, autoAlpha only.
      gsap.utils.toArray<HTMLElement>(".rc-reveal").forEach((el) => {
        const tw = gsap.from(el, {
          autoAlpha: 0,
          duration: 0.5,
          ease: "power2.out",
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
    <div className="rc-root" ref={rootRef}>
      <a href="#rc-main" className="rc-skip">Skip to main content</a>

      <nav className="rc-nav" aria-label="Primary navigation">
        <span className="rc-meta" aria-hidden="true">rfc 9161 · standards track · category: hire</span>
        <span className="rc-open">
          <span className="rc-open-dot" aria-hidden="true" />
          Open to opportunities
        </span>
      </nav>

      <main id="rc-main" className="rc-main">
        {/* ── Canonical RFC header block ──────────────────────────────── */}
        <div className="rc-header">
          <div className="rc-header-col">
            <p>Independent Submission</p>
            <p>Request for Comments: 9161</p>
            <p>Category: Standards Track</p>
            <p>ISSN: none (one of one)</p>
          </div>
          <div className="rc-header-col rc-header-col--right">
            <p>K. Kotamraju</p>
            <p>Yahoo Paranoids</p>
            <p>July 2026</p>
          </div>
        </div>

        {/* ── Title block ──────────────────────────────────────────────── */}
        <div className="rc-title-block">
          <p className="rc-eyebrow">The Kotamraju Protocol</p>
          <h1 className="rc-name">Koushik Kotamraju</h1>
          <p className="rc-subtitle">Requirements for Staff-Level Cloud Security Engineering</p>
        </div>

        {/* ── 1. Abstract ──────────────────────────────────────────────── */}
        <section className="rc-abstract" aria-labelledby="rc-abstract">
          <h2 id="rc-abstract">1.  Abstract</h2>
          <p>
            Cloud security engineer building AI-native security platforms —{" "}
            <strong>production systems, not prototypes.</strong> A small team.
            2,800+ cloud accounts. The math only works if you build the right
            systems.
          </p>
          <div className="rc-cta-row">
            <a href="mailto:koushik.kotamraju1610@gmail.com" className="rc-btn rc-btn--primary">Email me</a>
            <a href="/resume" className="rc-btn rc-btn--ghost">Résumé</a>
          </div>
          <p className="rc-avail">
            <span className="rc-open-dot" aria-hidden="true" /> Open to opportunities
          </p>
        </section>

        {/* ── Table of contents (after the Abstract — real RFC convention) ── */}
        <nav className="rc-toc" aria-label="Table of contents">
          <ol>
            {TOC.map((t) => (
              <li key={t.href}>
                <a href={t.href}>
                  <span>{t.label}</span>
                  <span className="rc-toc-leader" aria-hidden="true" />
                  <span aria-hidden="true">1</span>
                </a>
              </li>
            ))}
          </ol>
        </nav>

        {/* ── 2. Requirements Language ─────────────────────────────────── */}
        <section className="rc-reveal" aria-labelledby="rc-lang">
          <h2 id="rc-lang">2.  Requirements Language</h2>
          <p>
            The key words &quot;<strong className="rc-key">MUST</strong>&quot;,
            &quot;<strong className="rc-key">SHOULD</strong>&quot;, and
            &quot;<strong className="rc-key">MAY</strong>&quot; are to be
            interpreted as described in RFC 2119. The hiring organization{" "}
            <strong className="rc-key">MUST</strong> provide production
            scale. Prototypes <strong className="rc-key">SHOULD NOT</strong>{" "}
            be mistaken for platforms.
          </p>
        </section>

        {/* ── 3. Protocol Overview ─────────────────────────────────────── */}
        <section className="rc-reveal" aria-labelledby="rc-overview">
          <h2 id="rc-overview">3.  Protocol Overview</h2>
          {OVERVIEW.map((o) => (
            <div key={o.n} className="rc-subsection">
              <h3>{o.n}.  {o.title}</h3>
              <p>{o.body}</p>
            </div>
          ))}
        </section>

        {/* ── 4. Security Considerations ───────────────────────────────── */}
        <section className="rc-reveal" aria-labelledby="rc-security">
          <h2 id="rc-security">4.  Security Considerations</h2>
          <p>
            This document IS the security considerations. Every claim above
            traces to a benchmarked artifact, a shipped control, or a
            production system — nothing here is aspirational.
          </p>
        </section>

        {/* ── 5. IANA Considerations ───────────────────────────────────── */}
        <section className="rc-reveal" aria-labelledby="rc-iana">
          <h2 id="rc-iana">5.  IANA Considerations</h2>
          <p>
            This document registers one value:{" "}
            <a href="mailto:koushik.kotamraju1610@gmail.com">koushik.kotamraju1610@gmail.com</a>{" "}
            (permanent).
          </p>
        </section>

        {/* ── 6. References ────────────────────────────────────────────── */}
        <section className="rc-reveal" aria-labelledby="rc-refs">
          <h2 id="rc-refs">6.  References</h2>
          <dl className="rc-refs">
            {REFERENCES.map((r) => (
              <div key={r.tag} className="rc-ref-row">
                <dt>[{r.tag}]</dt>
                <dd>
                  <CountUp value={r.value} className="rc-ref-num" /> {r.label}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        {/* ── Author's Address ─────────────────────────────────────────── */}
        <section className="rc-reveal" aria-labelledby="rc-author">
          <h2 id="rc-author">Author&apos;s Address</h2>
          <ul className="rc-contacts" role="list">
            {CONTACT.map((c) => (
              <li key={c.k}>
                <a
                  href={c.href}
                  className="rc-contact-link"
                  {...(c.ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  <span className="rc-contact-k">{c.k}</span>
                  <span className="rc-contact-v">{c.v}</span>
                </a>
              </li>
            ))}
          </ul>
          <p className="rc-eof" aria-hidden="true">[Page 1 of 1]</p>
        </section>
      </main>
    </div>
  );
}
