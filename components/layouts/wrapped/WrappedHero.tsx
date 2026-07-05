"use client";

import { useRef } from "react";
import type { Theme } from "@/lib/themes";
import { gsap, useGSAP } from "@/lib/gsap";
import CountUp from "@/components/CountUp";
import "./styles.css";

/* ─────────────────────────────────────────────────────────────────────────────
   WRAPPED · layout variant: wrapped · class prefix: wr-
   "Nine Years, Wrapped" — the rotation's only DRENCHED color strategy: a
   sequence of full-viewport slabs, each a solid color field with one giant
   number and one caption. One hue (klein blue) laddered from near-black
   through increasing saturation, inverting once to ivory, then closing on
   the pure hue. Native CSS scroll-snap (proximity, never mandatory) — not
   a GSAP scroll-jack. Contrast verified per slab (see each slab's comment
   in styles.css); animation owner: GSAP, autoAlpha/y reveals only, no
   parallax, no hue animation, no perpetual motion.
───────────────────────────────────────────────────────────────────────────── */

interface Slab {
  id: string;
  tone: "blue1" | "blue2" | "klein" | "ivory" | "black";
  value: string;
  caption: string;
  footnote: string;
  label: string; // aria-label for the section — what this number is
}

const SLABS: readonly Slab[] = [
  {
    id: "wr-slab-accounts",
    tone: "blue1",
    value: "2,800+",
    caption: "cloud accounts held by a small senior team",
    footnote: "AWS + GCP · every business unit",
    label: "2,800+ cloud accounts",
  },
  {
    id: "wr-slab-signatures",
    tone: "blue2",
    value: "200+",
    caption: "detection signatures watching 1,400+ AWS accounts",
    footnote: "the posture scores the company is measured against",
    label: "200+ detection signatures",
  },
  {
    id: "wr-slab-reviews",
    tone: "klein",
    value: "150+",
    caption: "security reviews — every launch threat-modeled",
    footnote: "Product Security · Network · Identity",
    label: "150+ security reviews",
  },
  {
    id: "wr-slab-goat",
    tone: "ivory",
    value: "32",
    caption: "GOAT benchmarks — built first, then evaluated against every one",
    footnote: "65+ escalation paths · 62 toxic combinations",
    label: "32 GOAT benchmarks",
  },
  {
    id: "wr-slab-cost",
    tone: "black",
    value: "$1.40",
    caption: "per research run · 19 models · 5 providers",
    footnote: "deterministic advisors · hard deny gates · production, not prototypes",
    label: "$1.40 per research run",
  },
] as const;

const CONTACT = [
  { k: "Email", v: "koushik.kotamraju1610@gmail.com", href: "mailto:koushik.kotamraju1610@gmail.com", ext: false },
  { k: "LinkedIn", v: "in/koushikkotamraju", href: "https://www.linkedin.com/in/koushikkotamraju/", ext: true },
  { k: "GitHub", v: "github.com/koushik1610", href: "https://github.com/koushik1610", ext: true },
] as const;

export default function WrappedHero({ theme }: { theme: Theme }) {
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

      const intro = gsap.from(".wr-cover > *", {
        autoAlpha: 0,
        y: 14,
        duration: 0.55,
        stagger: 0.07,
        ease: "power3.out",
        delay: 0.1,
      });
      settle(intro, 3000);

      // Each slab's content block rises once — CountUp owns the number's
      // own count animation; this wrapper only owns opacity/position.
      gsap.utils.toArray<HTMLElement>(".wr-slab-content, .wr-outro > *").forEach((el) => {
        const tw = gsap.from(el, {
          autoAlpha: 0,
          y: 24,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
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
    <div className="wr-root" ref={rootRef}>
      <a href="#wr-main" className="wr-skip">Skip to main content</a>

      <nav className="wr-nav" aria-label="Primary navigation">
        <span className="wr-meta" aria-hidden="true">nine years, wrapped · 2017–2026 · koushik</span>
        <span className="wr-open">
          <span className="wr-open-dot" aria-hidden="true" />
          Open to opportunities
        </span>
        {/* Persistent CTA: the five numeric slabs otherwise offer no action
            path — a recruiter sold at any slab shouldn't have to scroll
            back to the cover or forward to the outro to act. */}
        <a href="mailto:koushik.kotamraju1610@gmail.com" className="wr-nav-email">Email</a>
      </nav>

      <main id="wr-main">
        {/* ── Slab 0: cover ─────────────────────────────────────────────── */}
        <section className="wr-slab wr-slab--black" aria-label="Introduction">
          <div className="wr-cover">
            <h1 className="wr-name">Koushik Kotamraju</h1>
            <p className="wr-lede">
              Cloud security engineer building AI-native security platforms —{" "}
              <strong className="wr-em">production systems, not prototypes.</strong>
            </p>
            {/* Deliberately NOT the verbatim COMMON hook line: stating
                "2,800+ cloud accounts" here would spoil slab 1's reveal of
                that exact figure. Keeps the tension, drops the number. */}
            <p className="wr-hook">
              A small team, a large estate. The math only works if you build the right systems.
            </p>
            <div className="wr-cta-row">
              <a href="mailto:koushik.kotamraju1610@gmail.com" className="wr-btn wr-btn--primary">Email me</a>
              <a href="/resume" className="wr-btn wr-btn--ghost">Résumé</a>
            </div>
            <p className="wr-avail">
              <span className="wr-open-dot" aria-hidden="true" /> Open to opportunities
            </p>
            <p className="wr-cue" aria-hidden="true">scroll ↓</p>
          </div>
        </section>

        {/* ── Slabs 1–5: the numbers ────────────────────────────────────── */}
        {SLABS.map((s) => (
          <section key={s.id} id={s.id} className={`wr-slab wr-slab--${s.tone}`} aria-label={s.label}>
            <div className="wr-slab-content">
              {/* sr-only chapter heading — restores a real heading outline
                  between the cover h1 and the outro h2 for screen readers */}
              <h2 className="wr-sr-only">{s.label}</h2>
              <CountUp value={s.value} className="wr-slab-num" />
              <p className="wr-slab-caption">{s.caption}</p>
              <p className="wr-slab-footnote">{s.footnote}</p>
            </div>
          </section>
        ))}

        {/* ── Outro ─────────────────────────────────────────────────────── */}
        {/* --wr-slab--outro: a deliberately slightly-deeper klein than slab
            3's pure hue, so the closing beat doesn't repeat an identical
            tone mid-sequence (see styles.css). */}
        <section className="wr-slab wr-slab--outro" aria-labelledby="wr-outro-head">
          <div className="wr-outro">
            <p className="wr-outro-eyebrow" aria-hidden="true">END OF WRAP</p>
            <h2 id="wr-outro-head" className="wr-outro-head">That was nine years.</h2>
            <p className="wr-outro-sub">The next one could be yours.</p>
            <div className="wr-cta-row">
              <a href="mailto:koushik.kotamraju1610@gmail.com" className="wr-btn wr-btn--ivory">Email me</a>
              <a href="/resume" className="wr-btn wr-btn--ghost-ivory">Résumé</a>
            </div>
            <ul className="wr-contacts" role="list">
              {CONTACT.map((c) => (
                <li key={c.k}>
                  <a
                    href={c.href}
                    className="wr-contact-link"
                    {...(c.ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  >
                    <span className="wr-contact-k">{c.k}</span>
                    <span className="wr-contact-v">{c.v}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
}
