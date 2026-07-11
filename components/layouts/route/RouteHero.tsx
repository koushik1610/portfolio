"use client";

import { useRef } from "react";
import type { Theme } from "@/lib/themes";
import { gsap, useGSAP } from "@/lib/gsap";
import CountUp from "@/components/CountUp";
import "./styles.css";

/* ─────────────────────────────────────────────────────────────────────────────
   ROUTE · layout variant: route · class prefix: rt-
   The career rendered as a schematic route: a single bold vertical line runs
   the page's spine, a marker travels it in lockstep with scroll, and five
   career milestones sit as stations along the way before the line terminates
   at a "current position" node — the contact CTA, framed as the destination,
   not a section bolted on after.

   theme-plans/21-route.md flags the tension up front: CLAUDE.md §4 bans
   "metaphors that require decoding (...GPS/geo...)" and a route is GPS-
   adjacent by definition. The fix is execution, not avoidance: this is
   rendered as a Vignelli/Beck subway-schematic object — one straight line,
   90°-clean, a plain circle per station, an abstract diamond marker — never
   a road texture, a pin, or a literal vehicle. No "journey"/"map"/"you are
   here" language in the UI chrome.

   Palette: deep cool near-black #070a10 · ice #eef2f6 · muted #90a0ae
   (7.38:1). Owned accent: cyan #22d3ee (10.96:1 on bg; 10.37:1 for dark-on-
   accent button text #04141a) — freed up by Telemetry's move to red, distinct
   from every other live accent (glacier, klein, ink-teal are all different
   families/values). Radius scale: 3px (track/marker) · 8px (station cards) ·
   9px (buttons).

   Motion: the scroll-scrub on the track fill + marker IS the one signature
   move (00-COMMON.md §4 sanctions scrub on scaleY-class bars) — deliberately
   the ONLY scrub in the rotation, so no competing intro SplitText/mask beat
   is added; the masthead gets a plain settle-protected fade-up and nothing
   else. Track fill and marker position are driven by ONE GSAP timeline/
   ScrollTrigger so they can never drift apart.
───────────────────────────────────────────────────────────────────────────── */

interface Station {
  id: string;
  code: string;
  title: string;
  stat: string;
  statLabel: string;
  desc: string;
}

const STATIONS: ReadonlyArray<Station> = [
  {
    id: "rt-detect",
    code: "01",
    title: "Detection Engineering",
    stat: "200+",
    statLabel: "signatures",
    desc: "200+ Python/Lambda signatures evaluating 1,400+ AWS accounts — the posture scores the company is measured against.",
  },
  {
    id: "rt-iam",
    code: "02",
    title: "IAM Privilege Analysis",
    stat: "65+",
    statLabel: "escalation paths",
    desc: "An AI-native audit agent traversing 65+ escalation paths across 10 vulnerability classes. Built the GOAT benchmark first — 32 ground-truth findings — then evaluated against all 32.",
  },
  {
    id: "rt-ai",
    code: "03",
    title: "AI Security Platforms",
    stat: "19",
    statLabel: "models · 5 providers",
    desc: "A self-learning research router at $1.40 per run, an MCP-integrated agentic review platform, and a deterministic CSPM advisor with hard deny gates.",
  },
  {
    id: "rt-review",
    code: "04",
    title: "Security Reviews",
    stat: "150+",
    statLabel: "reviews conducted",
    desc: "150+ Paranoid Security Reviews, partnering with Product Security, Network, and Identity to approve new cloud architectures before launch.",
  },
  {
    id: "rt-ciem",
    code: "05",
    title: "CIEM Research",
    stat: "62",
    statLabel: "toxic combinations",
    desc: "Antitoxin — graph-theoretic minimum cut-set dissolution. Find the keystone permission whose removal collapses the whole escalation chain.",
  },
] as const;

const CONTACT = [
  { k: "Email", v: "koushik.kotamraju1610@gmail.com", href: "mailto:koushik.kotamraju1610@gmail.com", ext: false },
  { k: "LinkedIn", v: "in/koushikkotamraju", href: "https://www.linkedin.com/in/koushikkotamraju/", ext: true },
  { k: "GitHub", v: "github.com/koushik1610", href: "https://github.com/koushik1610", ext: true },
] as const;

export default function RouteHero({ theme }: { theme: Theme }) {
  void theme;
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      const settleTimers: number[] = [];
      const settle = (tw: gsap.core.Tween | gsap.core.Timeline, ms: number) => {
        settleTimers.push(
          window.setTimeout(() => {
            if (tw.progress() < 1) tw.progress(1);
          }, ms)
        );
      };

      if (prefersReduced) return;

      // Masthead: one plain settle-protected fade-up. No SplitText mask here —
      // the scroll-scrub below is this theme's one nameable signature move,
      // not a second competing one (per the plan's explicit instruction).
      const intro = gsap.from(".rt-masthead > *", {
        autoAlpha: 0,
        y: 14,
        duration: 0.55,
        stagger: 0.07,
        ease: "power3.out",
        delay: 0.1,
      });
      settle(intro, 3000);

      // The track fill and the marker are driven by ONE timeline/ScrollTrigger
      // so they can never drift out of sync with each other.
      const track = document.querySelector<HTMLElement>(".rt-track");
      const trackFill = document.querySelector<HTMLElement>(".rt-track-fill");
      const marker = document.querySelector<HTMLElement>(".rt-marker");
      if (track && trackFill && marker) {
        const travel = track.clientHeight - marker.clientHeight;
        const routeTl = gsap.timeline({
          scrollTrigger: {
            trigger: ".rt-route-body",
            start: "top 65%",
            end: "bottom 55%",
            scrub: 0.6,
          },
        });
        routeTl
          .fromTo(trackFill, { scaleY: 0 }, { scaleY: 1, ease: "none" }, 0)
          .fromTo(marker, { y: 0 }, { y: Math.max(travel, 0), ease: "none" }, 0);
      }

      // Station cards settle in, once each, as the route passes them.
      gsap.utils.toArray<HTMLElement>(".rt-station").forEach((station, i) => {
        gsap.from(station.querySelector(".rt-station-card"), {
          autoAlpha: 0,
          y: 22,
          duration: 0.6,
          ease: "power3.out",
          delay: (i % 2) * 0.05,
          scrollTrigger: {
            trigger: station,
            start: "top 82%",
            once: true,
            onEnter: (self) => settle(self.animation as gsap.core.Tween, 2500),
          },
        });
      });

      // The destination node — the route's terminus, not a bolted-on section.
      const destIn = gsap.from(".rt-dest > *", {
        autoAlpha: 0,
        y: 18,
        duration: 0.6,
        stagger: 0.07,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".rt-dest",
          start: "top 84%",
          once: true,
          onEnter: (self) => settle(self.animation as gsap.core.Tween, 2500),
        },
      });
      void destIn;

      return () => settleTimers.forEach((t) => window.clearTimeout(t));
    },
    { scope: rootRef }
  );

  return (
    <div className="rt-root" ref={rootRef}>
      <a href="#rt-main" className="rt-skip">Skip to main content</a>

      <nav className="rt-nav" aria-label="Primary navigation">
        <span className="rt-meta" aria-hidden="true">career route · koushik kotamraju</span>
        <span className="rt-open">
          <span className="rt-open-dot" aria-hidden="true" />
          Open to opportunities
        </span>
      </nav>

      <main id="rt-main" className="rt-main">
        {/* ── Masthead ─────────────────────────────────────────────────── */}
        <header className="rt-masthead">
          <p className="rt-kicker">Sr. Security Engineer · Yahoo Paranoids · 9 years</p>
          <h1 className="rt-name">Koushik Kotamraju</h1>
          <p className="rt-lede">
            Cloud security engineer building AI-native security platforms —{" "}
            <strong className="rt-em">production systems, not prototypes.</strong>
          </p>
          <p className="rt-hook">
            A small team. 2,800+ cloud accounts. The math only works if you build the right systems.
          </p>
          <div className="rt-cta-row">
            <a href="mailto:koushik.kotamraju1610@gmail.com" className="rt-btn rt-btn--primary">Email me</a>
            <a href="/resume" className="rt-btn rt-btn--ghost">Résumé</a>
          </div>
          <p className="rt-avail">
            <span className="rt-open-dot" aria-hidden="true" /> Open to opportunities
          </p>
        </header>

        {/* ── The route ────────────────────────────────────────────────── */}
        <section className="rt-route" aria-labelledby="rt-route-head">
          <h2 id="rt-route-head" className="rt-sr-only">Career route — five stops</h2>

          <div className="rt-route-body">
            <div className="rt-track" aria-hidden="true">
              <span className="rt-track-fill" />
              <span className="rt-marker" />
            </div>

            <ol className="rt-stations" role="list">
              {STATIONS.map((s) => (
                <li key={s.id} id={s.id} className="rt-station">
                  <span className="rt-station-node" aria-hidden="true" />
                  <div className="rt-station-card">
                    <span className="rt-station-code" aria-hidden="true">{s.code}</span>
                    <h3 className="rt-station-title">{s.title}</h3>
                    <p className="rt-station-desc">{s.desc}</p>
                    <div className="rt-station-stat">
                      <CountUp value={s.stat} className="rt-station-num" />
                      {/* visible, not aria-hidden — a screen reader hearing
                          CountUp's own final-value aria-label needs this
                          unit text too, or "200+" reads with no context */}
                      <span className="rt-station-statlabel">{s.statLabel}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ── Destination — the route's terminus ──────────────────────── */}
        <section className="rt-dest" aria-labelledby="rt-dest-head">
          {/* Connects the last station down to this node — without it, the
              destination read as a disconnected footer rather than where
              the line actually ends (a real QA finding, not cosmetic). */}
          <span className="rt-dest-connector" aria-hidden="true" />
          <span className="rt-dest-node" aria-hidden="true" />
          <p className="rt-dest-eyebrow">Current position</p>
          <h2 id="rt-dest-head" className="rt-dest-head">
            2,800+ cloud accounts secured. Open to what&apos;s next.
          </h2>
          <p className="rt-dest-sub">
            Staff &amp; Principal Security Engineer · AI Security roles.
          </p>
          <div className="rt-cta-row">
            <a href="mailto:koushik.kotamraju1610@gmail.com" className="rt-btn rt-btn--primary">Email me</a>
            <a href="/resume" className="rt-btn rt-btn--ghost">Résumé</a>
          </div>
          <ul className="rt-contacts" role="list">
            {CONTACT.map((c) => (
              <li key={c.k}>
                <a
                  href={c.href}
                  className="rt-contact-link"
                  {...(c.ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  <span className="rt-contact-k">{c.k}</span>
                  <span className="rt-contact-v">{c.v}</span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}
