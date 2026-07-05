"use client";

import { useRef } from "react";
import type { Theme } from "@/lib/themes";
import { gsap, useGSAP, SplitText } from "@/lib/gsap";
import "./styles.css";

// ── Content ─────────────────────────────────────────────────────────────────

// The 3D avatar is this theme's identity — the real photo lives in aethera/briefing.
const PORTRAIT_SRC = "/my-3d-avatar.png";

const EXPOSURE = [
  { k: "ISO", v: "32 GOAT benchmarks" },
  { k: "f/", v: "150+ security reviews" },
  { k: "exp", v: "9 years · 5 providers" },
] as const;

interface ProjectFrame {
  frame: string;
  name: string;
  desc: string;
  metric: string;
  stack: string;
}

const PROJECTS: ProjectFrame[] = [
  {
    frame: "01",
    name: "Artemis",
    desc: "Multi-cloud attack-path simulation. GCP SCC and AWS Security Hub unified into an AI-enriched graph layer across the estate.",
    metric: "2,800+ accounts",
    stack: "Python · GCP SCC · AWS Security Hub · Vertex AI",
  },
  {
    frame: "02",
    name: "IAM Audit Agent",
    desc: "Boto3 tool-calling agent traversing 65+ escalation paths across 10 vulnerability classes with semantic interpretation of transitive chains.",
    metric: "32 GOAT benchmarks",
    stack: "IAM · Python · Boto3 · LLM tool-use",
  },
  {
    frame: "03",
    name: "Autonomous Threat Intel",
    desc: "19 models from 5 providers behind a performance-weighted router. Analyst-ready proposals at a fraction of baseline cost.",
    metric: "$1.40 / run",
    stack: "Multi-Agent · Claude · GPT · Gemini",
  },
  {
    frame: "04",
    name: "Detection Engine",
    desc: "200+ active signatures deployed via Terraform, evaluating 1,400+ AWS accounts. MITRE ATT&CK gap analysis from incident response data.",
    metric: "200+ signatures",
    stack: "Python · Lambda · Terraform · MITRE ATT&CK",
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

      // Portrait "develops": one-shot filter ramp, no loop.
      const portraitIn = gsap.from(".w12-portrait", {
        autoAlpha: 0,
        filter: "grayscale(1) brightness(0.55) contrast(1.2)",
        duration: 1.4,
        ease: "power2.out",
        delay: 0.1,
        clearProps: "filter",
      });
      settle(portraitIn, 3000);
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

      gsap.utils.toArray<HTMLElement>(".w12-sheet-row").forEach((row) => {
        gsap.from(row, {
          autoAlpha: 0,
          y: 24,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: row, start: "top 86%", once: true },
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
              src={PORTRAIT_SRC}
              alt="Portrait of Koushik Kotamraju"
              className="w12-portrait"
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
              <a href="/resume" className="w12-btn w12-btn--ghost">Résumé</a>
            </div>
          </div>
        </header>

        <div className="w12-rule" aria-hidden="true" />

        {/* ── Contact sheet of projects ──────────────────────────────────── */}
        <section className="w12-sheet" aria-labelledby="w12-sheet-head">
          <div className="w12-sheet-top">
            <h2 id="w12-sheet-head" className="w12-sheet-title">Contact sheet — selected work</h2>
            <span className="w12-sheet-num" aria-hidden="true">04 frames</span>
          </div>

          <ol className="w12-sheet-list" role="list">
            {PROJECTS.map((p) => (
              <li key={p.frame} className="w12-sheet-row" aria-label={`Project: ${p.name} — ${p.metric}`}>
                <span className="w12-sheet-frame" aria-hidden="true">{p.frame}</span>
                <div className="w12-sheet-body">
                  <h3 className="w12-sheet-name">{p.name}</h3>
                  <p className="w12-sheet-desc">{p.desc}</p>
                  <p className="w12-sheet-stack" aria-label="Stack">{p.stack}</p>
                </div>
                <span className="w12-sheet-metric" aria-hidden="true">{p.metric}</span>
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
