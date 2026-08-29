"use client";

import { useRef } from "react";
import type { Theme } from "@/lib/themes";
import { gsap, useGSAP, SplitText } from "@/lib/gsap";
import "./styles.css";

/* ─────────────────────────────────────────────────────────────────────────────
   AVATAR (Aperture) · layout variant: avatar · class prefix: w12-
   Darkroom-editorial hero with a one-shot photo "develop" beat.

   2026-07 rework (theme-plans/00-STRATEGY-2026-07-cull-and-rebuild.md §5.3):
   Koushik likes the darkroom-develop concept but flagged it "loads weird, not
   smooth." Root cause: the develop tween started on a fixed timer regardless
   of whether the (1MB) portrait had actually finished loading, so on a cold
   cache the filter/opacity animation played out against a still-fetching
   <img> and the real photo just popped in later, decoupled from the motion.
   Fixed by gating the develop tween on the image's own load/decode state
   (checked via .complete/.naturalWidth, or a one-time "load" listener), with
   a wall-clock fallback so the reveal still fires if the image is slow or
   fails — same "never leave it stuck" philosophy as the settle failsafe, one
   level up (gating on load readiness, not just animation progress).
   Also rebuilt the below-fold "contact sheet" from a stacked list of rows
   into a literal grid of small framed cells (each with its own corner-tick
   frame, reusing the hero's exact darkroom visual language) so the metaphor
   holds top to bottom instead of a photo hero bolted onto a generic list.
───────────────────────────────────────────────────────────────────────────── */

// ── Content ─────────────────────────────────────────────────────────────────

// The 3D avatar is this theme's identity — the real photo lives in aethera/briefing.
const PORTRAIT_SRC = "/my-3d-avatar.png";

const EXPOSURE = [
  { k: "ISO", v: "32 GOAT benchmarks" },
  { k: "f/", v: "100+ security reviews" },
  { k: "exp", v: "9 years · 5 providers" },
] as const;

interface ProjectFrame {
  frame: string;
  name: string;
  desc: string;
  metric: string;
  stack: string[];
}

const PROJECTS: ProjectFrame[] = [
  {
    frame: "01",
    name: "Artemis",
    desc: "Attack-path operationalization on GCP Security Command Center, with AI enrichment and coverage rotation. The AWS side is designed, not built.",
    metric: "2,800+ accounts",
    stack: ["Python", "GCP SCC", "AWS Security Hub", "Vertex AI"],
  },
  {
    frame: "02",
    name: "IAM Audit Agent",
    desc: "Boto3 tool-calling agent across 10 IAM vulnerability classes, matched against a public 65+ path catalogue, with semantic interpretation of transitive chains.",
    metric: "32 GOAT benchmarks",
    stack: ["IAM", "Python", "Boto3", "LLM tool-use"],
  },
  {
    frame: "03",
    name: "Autonomous Threat Intel",
    desc: "19 models from 5 providers behind a performance-weighted router. Analyst-ready proposals at a fraction of baseline cost.",
    metric: "from $1.40 / run",
    stack: ["Multi-Agent", "Claude", "GPT", "Gemini"],
  },
  {
    frame: "04",
    name: "Detection Engine",
    desc: "200+ active signatures deployed via Terraform, evaluating 1,400+ AWS accounts. MITRE ATT&CK gap analysis from incident response data.",
    metric: "200+ signatures",
    stack: ["Python", "Lambda", "Terraform", "MITRE ATT&CK"],
  },
];

const CONTACT = [
  { k: "Email", v: "koushik.kotamraju1610@gmail.com", href: "mailto:koushik.kotamraju1610@gmail.com", ext: false },
  { k: "LinkedIn", v: "in/koushikkotamraju", href: "https://www.linkedin.com/in/koushikkotamraju/", ext: true },
  { k: "GitHub", v: "github.com/koushik1610", href: "https://github.com/koushik1610", ext: true },
] as const;

// ── Component ───────────────────────────────────────────────────────────────
// The portrait ships clean (per design feedback — the earlier WebGL dither
// engine was removed with it). One GSAP-owned "develop" beat on entry keeps
// the darkroom metaphor honest without any perpetual rendering cost.

export default function AvatarHero({ theme }: { theme: Theme }) {
  void theme;
  const rootRef = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLImageElement>(null);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReduced) return;

      // Failsafe: if the rAF ticker stalls (background tab, low-power mode),
      // never leave an on-mount entrance tween stuck mid-flight — force-
      // complete it by wall clock. Timers are cleared on cleanup below.
      const settleTimers: number[] = [];
      const settle = (tw: gsap.core.Tween | gsap.core.Timeline, ms: number) => {
        settleTimers.push(
          window.setTimeout(() => {
            if (tw.progress() < 1) tw.progress(1);
          }, ms)
        );
      };

      // Portrait "develops": one-shot filter ramp, no loop. Gated on the
      // image actually being decoded first — starting this on a fixed timer
      // (the previous defect) let the filter/opacity tween finish against a
      // still-fetching <img>, so the real photo just popped in later,
      // decoupled from the animation ("loads weird, not smooth"). A wall-
      // clock fallback still guarantees the reveal fires even if the image
      // is slow or fails to load.
      const runPortraitReveal = () => {
        const portraitIn = gsap.from(".w12-portrait", {
          autoAlpha: 0,
          filter: "grayscale(1) brightness(0.55) contrast(1.2)",
          duration: 1.4,
          ease: "power2.out",
          delay: 0.1,
          clearProps: "filter",
        });
        settle(portraitIn, 3000);
      };
      const img = portraitRef.current;
      if (img && img.complete && img.naturalWidth > 0) {
        runPortraitReveal();
      } else if (img) {
        let fired = false;
        const fire = () => {
          if (fired) return;
          fired = true;
          runPortraitReveal();
        };
        img.addEventListener("load", fire, { once: true });
        settleTimers.push(window.setTimeout(fire, 2500));
      }

      const ticksIn = gsap.from(".w12-frame-tick", {
        autoAlpha: 0,
        duration: 0.6,
        stagger: 0.06,
        ease: "power1.out",
        delay: 0.9,
      });
      settle(ticksIn, 3000);

      const split = SplitText.create(".w12-name", { type: "chars", mask: "chars", aria: "none" });
      const nameIn = gsap.from(split.chars, {
        yPercent: 120,
        opacity: 0,
        duration: 1.0,
        stagger: 0.035,
        ease: "power4.out",
        delay: 0.35,
      });
      settle(nameIn, 3000);

      const exposureIn = gsap.from(".w12-exposure > *", {
        autoAlpha: 0,
        y: 10,
        duration: 0.7,
        stagger: 0.07,
        ease: "power2.out",
        delay: 1.05,
      });
      settle(exposureIn, 3000);
      const ledeIn = gsap.from(".w12-lede", { autoAlpha: 0, y: 14, duration: 0.8, ease: "power2.out", delay: 1.2 });
      settle(ledeIn, 3000);

      gsap.utils.toArray<HTMLElement>(".w12-rule").forEach((rule) => {
        gsap.from(rule, {
          scaleX: 0,
          transformOrigin: "left center",
          duration: 0.9,
          ease: "power3.inOut",
          scrollTrigger: { trigger: rule, start: "top 92%", once: true },
        });
      });

      gsap.utils.toArray<HTMLElement>(".w12-frame-cell").forEach((cell, i) => {
        gsap.from(cell, {
          autoAlpha: 0,
          y: 24,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: cell, start: "top 86%", once: true },
          delay: (i % 2) * 0.08,
        });
      });

      gsap.from(".w12-contact-row", {
        autoAlpha: 0,
        y: 14,
        duration: 0.6,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: { trigger: ".w12-contact", start: "top 86%", once: true },
      });

      return () => {
        settleTimers.forEach((t) => window.clearTimeout(t));
      };
    },
    { scope: rootRef }
  );

  return (
    <div className="w12-root" ref={rootRef}>
      <a href="#w12-main" className="w12-skip">Skip to main content</a>
      <h1 className="w12-sr-only">
        Koushik Kotamraju — Sr. Security Engineer at Yahoo Paranoids. Cloud security engineer
        building AI-native security platforms.
      </h1>

      <nav className="w12-nav" aria-label="Primary navigation">
        <span className="w12-nav-logo" aria-hidden="true">
          KK<span className="w12-nav-dot">·</span>
        </span>
        <span className="w12-nav-mid" aria-hidden="true">AVATAR</span>
        <span className="w12-nav-status">
          <span className="w12-status-dot" aria-hidden="true" />
          Open to work
        </span>
      </nav>

      <main id="w12-main">
        {/* ── Darkroom hero ──────────────────────────────────────────────── */}
        <header className="w12-hero">
          <div className="w12-stage">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              ref={portraitRef}
              src={PORTRAIT_SRC}
              alt="Portrait of Koushik Kotamraju"
              className="w12-portrait"
              decoding="async"
            />
            <span className="w12-frame-tick w12-frame-tick--tl" aria-hidden="true" />
            <span className="w12-frame-tick w12-frame-tick--tr" aria-hidden="true" />
            <span className="w12-frame-tick w12-frame-tick--bl" aria-hidden="true" />
            <span className="w12-frame-tick w12-frame-tick--br" aria-hidden="true" />
          </div>

          <div className="w12-hero-text">
            <p className="w12-kicker">
              <span aria-hidden="true">◖</span> Sr. Security Engineer · Yahoo Paranoids
            </p>
            <div className="w12-name" aria-hidden="true">
              Koushik
              <br />
              Kotamraju
            </div>

            <div className="w12-exposure" role="list" aria-label="Exposure status">
              {EXPOSURE.map((e) => (
                <span key={e.k} className="w12-exposure-item" role="listitem">
                  <span className="w12-exposure-k">{e.k}</span>
                  <span className="w12-exposure-v">{e.v}</span>
                </span>
              ))}
            </div>

            <p className="w12-lede">
              Cloud security engineer building AI-native security platforms — production
              systems, not prototypes. Nine years, securing 2,800+ cloud accounts.
            </p>

            <div className="w12-cta-row">
              <a href="mailto:koushik.kotamraju1610@gmail.com" className="w12-btn w12-btn--primary">Email me</a>
              <a href="/resume/" className="w12-btn w12-btn--ghost">Résumé</a>
            </div>
          </div>
        </header>

        <div className="w12-rule" aria-hidden="true" />

        {/* ── Contact sheet of projects — a literal grid of small frames, each
            one an "exposure," reusing the hero's corner-tick frame language
            instead of a generic stat-row list. ─────────────────────────── */}
        <section className="w12-sheet" aria-labelledby="w12-sheet-head">
          <div className="w12-sheet-top">
            <h2 id="w12-sheet-head" className="w12-sheet-title">Contact sheet — selected work</h2>
            <span className="w12-sheet-num" aria-hidden="true">04 frames</span>
          </div>

          <ol className="w12-sheet-list" role="list">
            {PROJECTS.map((p) => (
              <li key={p.frame} className="w12-frame-cell" aria-label={`Project: ${p.name} — ${p.metric}`}>
                <span className="w12-frame-tick w12-frame-tick--sm w12-frame-tick--tl" aria-hidden="true" />
                <span className="w12-frame-tick w12-frame-tick--sm w12-frame-tick--tr" aria-hidden="true" />
                <span className="w12-frame-tick w12-frame-tick--sm w12-frame-tick--bl" aria-hidden="true" />
                <span className="w12-frame-tick w12-frame-tick--sm w12-frame-tick--br" aria-hidden="true" />
                <div className="w12-frame-top">
                  <span className="w12-frame-num" aria-hidden="true">FRAME {p.frame}</span>
                  <span className="w12-frame-metric" aria-hidden="true">{p.metric}</span>
                </div>
                <h3 className="w12-frame-name">{p.name}</h3>
                <p className="w12-frame-desc">{p.desc}</p>
                <div className="w12-frame-stack" role="list" aria-label="Stack">
                  {p.stack.map((t) => (
                    <span key={t} className="w12-frame-tag" role="listitem">{t}</span>
                  ))}
                </div>
              </li>
            ))}
          </ol>
        </section>

        <div className="w12-rule" aria-hidden="true" />

        {/* ── Contact ────────────────────────────────────────────────────── */}
        <section className="w12-contact" aria-labelledby="w12-contact-head">
          <div className="w12-contact-left">
            <p className="w12-kicker"><span aria-hidden="true">◖</span> Develop the next frame</p>
            <h2 id="w12-contact-head" className="w12-contact-title">
              Open to Staff &amp; Principal Security Engineer roles.
            </h2>
          </div>
          <div className="w12-contact-links">
            {CONTACT.map((c) => (
              <a
                key={c.k}
                href={c.href}
                className="w12-contact-row"
                {...(c.ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                <span className="w12-contact-k">{c.k}</span>
                <span className="w12-contact-v">{c.v}</span>
              </a>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
