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

   2026-07 Spotify/YouTube-Wrapped rework (theme-plans/24-wrapped-spotify-
   rework.md): three additions on top of the original five-slab sequence —
   (1) data-as-interaction: the FIRST numeric slab now pairs its CountUp
   with a growth arc (2017 -> 2026, two real anchor points only, never an
   invented intermediate figure — the house stats policy forbids fabricating
   a trend line's middle), so the slab shows a trajectory, not just an
   endpoint; (2) two soft background shape fields (klein-derived via
   color-mix, never a new hardcoded hue) behind the growth slab and the
   outro, echoing Wrapped-2025's bolder geometric backdrops; (3) a condensed
   recap strip immediately before the outro, replaying all five numbers at
   once as the "share card" moment — plain final-value text, not a second
   round of CountUp instances (those already animated once each; replaying
   the count-up semantics a second time in one viewport would be confusing
   to re-announce to assistive tech for no benefit).

   2026-07-12 asset rework: added a static film-grain texture (SVG
   feTurbulence, fixed opacity, no animation) over every slab — the
   tactile finish real Wrapped-style cards use on flat color fields.
   Static by design, respecting this theme's own "no perpetual motion, no
   hue animation" rule (see styles.css .wr-root::after).
───────────────────────────────────────────────────────────────────────────── */

interface Slab {
  id: string;
  tone: "blue1" | "blue2" | "klein" | "ivory" | "black";
  value: string;
  caption: string;
  recapLabel: string; // short label for the recap-strip grid (§ recap section)
  footnote: string;
  label: string; // aria-label for the section — what this number is
  growth?: boolean; // this ONE slab gets the growth-arc treatment — see banner
}

const SLABS: readonly Slab[] = [
  {
    id: "wr-slab-accounts",
    tone: "blue1",
    value: "2,800+",
    caption: "cloud accounts held by a small senior team",
    recapLabel: "cloud accounts",
    footnote: "AWS + GCP · every business unit",
    label: "2,800+ cloud accounts, 2017 to 2026",
    growth: true,
  },
  {
    id: "wr-slab-signatures",
    tone: "blue2",
    value: "200+",
    caption: "detection signatures watching 1,400+ AWS accounts",
    recapLabel: "detection signatures",
    footnote: "the posture scores the company is measured against",
    label: "200+ detection signatures",
  },
  {
    id: "wr-slab-reviews",
    tone: "klein",
    value: "150+",
    caption: "security reviews — every launch threat-modeled",
    recapLabel: "security reviews",
    footnote: "Product Security · Network · Identity",
    label: "150+ security reviews",
  },
  {
    id: "wr-slab-goat",
    tone: "ivory",
    value: "32",
    caption: "GOAT benchmarks — built first, then evaluated against every one",
    recapLabel: "GOAT benchmarks",
    footnote: "65+ escalation paths · 62 toxic combinations",
    label: "32 GOAT benchmarks",
  },
  {
    id: "wr-slab-cost",
    tone: "black",
    value: "$1.40",
    caption: "per research run · 19 models · 5 providers",
    recapLabel: "per research run",
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
      // .wr-recap-content is one cohesive reveal (like .wr-slab-content),
      // not per-child like .wr-outro, since the recap grid should arrive as
      // a single unit, not stagger item-by-item.
      gsap.utils.toArray<HTMLElement>(".wr-slab-content, .wr-recap-content, .wr-outro > *").forEach((el) => {
        gsap.from(el, {
          autoAlpha: 0,
          y: 24,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            once: true,
            onEnter: (self) => settle(self.animation as gsap.core.Tween, 2500),
          },
        });
      });

      // Growth arc: a scaleX fill from a fixed transform-origin, timed close
      // to CountUp's own default 1400ms so the trajectory and the number
      // land together. This is a separate element from the CountUp span —
      // one animation owner per element (§3.3) still holds.
      gsap.utils.toArray<HTMLElement>(".wr-growth-fill").forEach((el) => {
        gsap.from(el, {
          scaleX: 0,
          transformOrigin: "left center",
          duration: 1.3,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            once: true,
            onEnter: (self) => settle(self.animation as gsap.core.Tween, 3000),
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
          <section key={s.id} id={s.id} className={`wr-slab wr-slab--${s.tone}${s.growth ? " wr-slab--growth" : ""}`} aria-label={s.label}>
            {s.growth && <span className="wr-shape" aria-hidden="true" />}
            <div className="wr-slab-content">
              {/* sr-only chapter heading — restores a real heading outline
                  between the cover h1 and the outro h2 for screen readers */}
              <h2 className="wr-sr-only">{s.label}</h2>
              {s.growth && (
                // Two real anchor points only (2017 start, 2026 now) — never an
                // invented intermediate value. The arc is the VISUAL trajectory;
                // the honesty is in not pretending to know the shape in between.
                <div className="wr-growth-arc" aria-hidden="true">
                  <span className="wr-growth-track"><span className="wr-growth-fill" /></span>
                  <span className="wr-growth-years"><span>2017</span><span>2026</span></span>
                </div>
              )}
              <CountUp value={s.value} className="wr-slab-num" />
              <p className="wr-slab-caption">{s.caption}</p>
              <p className="wr-slab-footnote">{s.footnote}</p>
            </div>
          </section>
        ))}

        {/* ── Recap: the "share card" moment — all five numbers at once,
            before the outro. Plain text, not a second CountUp pass (see
            banner comment). */}
        <section className="wr-slab wr-slab--recap" aria-label="All five numbers, recapped">
          <div className="wr-recap-content">
            <p className="wr-recap-eyebrow" aria-hidden="true">THE RECAP</p>
            <div className="wr-recap-grid">
              {/* Plain text, not CountUp — these already animated once each in
                  their own slabs above; no aria-hidden trick needed here since
                  there's no count-up semantics to collide with, just read the
                  value and label normally. */}
              {SLABS.map((s) => (
                <div key={s.id} className="wr-recap-item">
                  <span className="wr-recap-num">{s.value}</span>
                  <span className="wr-recap-label">{s.recapLabel}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Outro ─────────────────────────────────────────────────────── */}
        {/* --wr-slab--outro: a deliberately slightly-deeper klein than slab
            3's pure hue, so the closing beat doesn't repeat an identical
            tone mid-sequence (see styles.css). */}
        <section className="wr-slab wr-slab--outro" aria-labelledby="wr-outro-head">
          <span className="wr-shape wr-shape--outro" aria-hidden="true" />
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
