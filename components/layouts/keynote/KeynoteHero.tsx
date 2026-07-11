"use client";

import { useRef } from "react";
import type { Theme } from "@/lib/themes";
import { gsap, useGSAP } from "@/lib/gsap";
import CountUp from "@/components/CountUp";
import "./styles.css";

/* ─────────────────────────────────────────────────────────────────────────────
   KEYNOTE · layout variant: keynote · class prefix: kn-
   theme-plans/16-keynote.md, salvaged and re-grounded post-cull (original
   exemplar "monolith" removed; the concept survives — no surviving theme
   uses a framed/letterboxed presentation aesthetic, genuinely open
   territory). His unshipped conference talk, "Securing 2,800+ Accounts
   With a Small Team," staged as the deck he'd give: seven full-viewport
   16:9 framed slides with a persistent slide counter and progress rail.

   Distinctness vs Wrapped (closest sibling — both use scroll-snap slide
   sequencing): Wrapped is intentionally edge-to-edge, borderless color
   drench; Keynote is intentionally FRAMED — a visible 16:9 boundary and
   letterboxed stage around every slide is the structural difference, real
   margin/border, not a cosmetic radius.

   Palette: stage-dark #08090c around a #0f1118 slide frame · ice #eef1f6 ·
   muted #98a0ae. Owned accent: a refined magenta #ec4899 (5.64:1 on bg) —
   NOT the plan's suggested azure blue: that hue (#0a84ff, ~210°) sits
   almost exactly on Coverage's glacier (~211°), and the whole blue/cyan/
   violet band (185°-260°) is now claimed by four live siblings (route,
   coverage, wrapped, ide). Magenta is genuinely unclaimed and reads as an
   equally legitimate "keynote spotlight" register — stage lighting, not
   just presentation-software blue. Radius: 12px (slide frames) · 6px
   (buttons).

   Motion: title slide settles once on load. Each slide's headline/bullets
   reveal on scroll, once, settle-protected. The progress rail (scrub,
   scaleX) and slide counter (text swap on section enter) are the ONLY
   scroll-scrub in this theme — both aria-hidden, decorative chrome; no
   slide-transition wipes (they'd fight native scroll), no autoplay, no
   prev/next controls (scroll-driven only, per the plan's own guardrail
   against fake controls).
───────────────────────────────────────────────────────────────────────────── */

const SLIDE_COUNT = 7;

const CONTACT = [
  { k: "Email", v: "koushik.kotamraju1610@gmail.com", href: "mailto:koushik.kotamraju1610@gmail.com", ext: false },
  { k: "LinkedIn", v: "in/koushikkotamraju", href: "https://www.linkedin.com/in/koushikkotamraju/", ext: true },
  { k: "GitHub", v: "github.com/koushik1610", href: "https://github.com/koushik1610", ext: true },
] as const;

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function SlideNote({ children }: { children: string }) {
  return <p className="kn-note">{children}</p>;
}

export default function KeynoteHero({ theme }: { theme: Theme }) {
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

      // The slide counter is a text swap, not a motion effect — it stays
      // wired up even under reduced motion (unlike the scrub-driven rail,
      // which is genuine motion and stays gated below). Without this, the
      // counter would freeze at "01" for the whole page under reduced
      // motion, which reads as broken chrome rather than "no animation."
      const counterEl = document.querySelector<HTMLElement>(".kn-counter-current");
      if (counterEl) {
        gsap.utils.toArray<HTMLElement>(".kn-slide").forEach((slide, i) => {
          const setCount = () => {
            counterEl.textContent = pad(i + 1);
          };
          gsap.timeline({
            scrollTrigger: { trigger: slide, start: "top center", end: "bottom center", onEnter: setCount, onEnterBack: setCount },
          });
        });
      }

      if (prefersReduced) return;

      const intro = gsap.from(".kn-masthead-content > *", {
        autoAlpha: 0,
        y: 16,
        duration: 0.55,
        stagger: 0.07,
        ease: "power3.out",
        delay: 0.1,
      });
      settle(intro, 3000);

      // Each slide's headline block reveals once, on scroll.
      gsap.utils.toArray<HTMLElement>(".kn-reveal").forEach((el) => {
        gsap.from(el.querySelectorAll(".kn-reveal-item"), {
          autoAlpha: 0,
          y: 18,
          duration: 0.55,
          stagger: 0.05,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 78%",
            once: true,
            onEnter: (self) => settle(self.animation as gsap.core.Tween, 2500),
          },
        });
      });

      // Progress rail: the one scrub in this theme — decorative, aria-hidden.
      const rail = document.querySelector<HTMLElement>(".kn-rail-fill");
      if (rail) {
        gsap.fromTo(
          rail,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: { start: "top top", end: "bottom bottom", scrub: true },
          }
        );
      }

      return () => settleTimers.forEach((t) => window.clearTimeout(t));
    },
    { scope: rootRef }
  );

  return (
    <div className="kn-root" ref={rootRef}>
      <a href="#kn-main" className="kn-skip">Skip to main content</a>

      <nav className="kn-nav" aria-label="Primary navigation">
        <span className="kn-meta" aria-hidden="true">keynote · 07 slides</span>
        <span className="kn-open">
          <span className="kn-open-dot" aria-hidden="true" />
          Open to opportunities
        </span>
      </nav>

      <main id="kn-main">
        {/* ── Slide 01 — Title ─────────────────────────────────────────── */}
        <section className="kn-slide" aria-labelledby="kn-s1-head">
          <div className="kn-frame">
            <div className="kn-masthead-content">
              <p className="kn-kicker">KEYNOTE · 07 SLIDES</p>
              <h1 id="kn-s1-head" className="kn-name">Koushik Kotamraju</h1>
              <p className="kn-talk-title">Securing 2,800+ Accounts With a Small Team</p>
              <p className="kn-role">Sr. Security Engineer · Yahoo Paranoids · 9 years</p>
              <div className="kn-cta-row">
                <a href="mailto:koushik.kotamraju1610@gmail.com" className="kn-btn kn-btn--primary">Email me</a>
                <a href="/resume" className="kn-btn kn-btn--ghost">Résumé</a>
              </div>
              <p className="kn-avail">
                <span className="kn-open-dot" aria-hidden="true" /> Open to opportunities
              </p>
            </div>
          </div>
          <SlideNote>&quot;Hi — I&apos;m Koushik. Here&apos;s how the math works.&quot;</SlideNote>
        </section>

        {/* ── Slide 02 — The problem ──────────────────────────────────── */}
        <section className="kn-slide" aria-labelledby="kn-s2-head">
          <div className="kn-frame">
            <div className="kn-reveal">
              <p className="kn-slide-eyebrow kn-reveal-item" aria-hidden="true">02 · The problem</p>
              <h2 id="kn-s2-head" className="kn-sr-only">The problem: 2,800+ accounts, a small senior team</h2>
              <div className="kn-reveal-item">
                <CountUp value="2,800+" className="kn-big-num" />
              </div>
              <p className="kn-slide-sub kn-reveal-item">accounts. A small senior team.</p>
            </div>
          </div>
          <SlideNote>&quot;You can&apos;t hire your way to this. You build.&quot;</SlideNote>
        </section>

        {/* ── Slide 03 — Detection ────────────────────────────────────── */}
        <section className="kn-slide" aria-labelledby="kn-s3-head">
          <div className="kn-frame">
            <div className="kn-reveal">
              <p className="kn-slide-eyebrow kn-reveal-item" aria-hidden="true">03 · Detection</p>
              <h2 id="kn-s3-head" className="kn-slide-head kn-reveal-item">
                200+ signatures / 1,400+ AWS accounts
              </h2>
              <ul className="kn-bullets" role="list">
                <li className="kn-reveal-item">The posture scores the company is measured against</li>
                <li className="kn-reveal-item">v6.0: 50+ new baselines, the largest control expansion in program history</li>
                <li className="kn-reveal-item">Shipped via Terraform, evaluated against incident-response data</li>
              </ul>
            </div>
          </div>
          <SlideNote>&quot;Every one of these traces back to a real incident, not a guess.&quot;</SlideNote>
        </section>

        {/* ── Slide 04 — Identity ─────────────────────────────────────── */}
        <section className="kn-slide" aria-labelledby="kn-s4-head">
          <div className="kn-frame">
            <div className="kn-reveal">
              <p className="kn-slide-eyebrow kn-reveal-item" aria-hidden="true">04 · Identity</p>
              <h2 id="kn-s4-head" className="kn-slide-head kn-reveal-item">Benchmark before you trust</h2>
              <p className="kn-slide-sub kn-reveal-item">
                GOAT: 32 ground-truth findings · 65+ paths · 62 toxic combinations
              </p>
              <ul className="kn-bullets" role="list">
                <li className="kn-reveal-item">Built the benchmark first, then evaluated the agent against all 32</li>
                <li className="kn-reveal-item">Antitoxin: find the keystone permission whose removal collapses the chain</li>
              </ul>
            </div>
          </div>
          <SlideNote>&quot;An agent that grades its own homework isn&apos;t trustworthy. Ours doesn&apos;t.&quot;</SlideNote>
        </section>

        {/* ── Slide 05 — Reviews ──────────────────────────────────────── */}
        <section className="kn-slide" aria-labelledby="kn-s5-head">
          <div className="kn-frame">
            <div className="kn-reveal">
              <p className="kn-slide-eyebrow kn-reveal-item" aria-hidden="true">05 · Reviews</p>
              <h2 id="kn-s5-head" className="kn-slide-head kn-reveal-item">150+ reviews, no new headcount</h2>
              <ul className="kn-bullets" role="list">
                <li className="kn-reveal-item">Partnering with Product Security, Network, and Identity</li>
                <li className="kn-reveal-item">An agentic review platform, MCP-integrated</li>
                <li className="kn-reveal-item">Multi-week backlog eliminated</li>
              </ul>
            </div>
          </div>
          <SlideNote>&quot;More reviews, same team. That only happens if the tooling carries weight.&quot;</SlideNote>
        </section>

        {/* ── Slide 06 — AI in production ─────────────────────────────── */}
        <section className="kn-slide" aria-labelledby="kn-s6-head">
          <div className="kn-frame">
            <div className="kn-reveal">
              <p className="kn-slide-eyebrow kn-reveal-item" aria-hidden="true">06 · AI in production</p>
              <h2 id="kn-s6-head" className="kn-slide-head kn-reveal-item">19 models · $1.40 / run</h2>
              <ul className="kn-bullets" role="list">
                <li className="kn-reveal-item">A self-learning, performance-weighted router across 5 providers</li>
                <li className="kn-reveal-item">A deterministic CSPM advisor with hard deny gates</li>
                <li className="kn-reveal-item">All in daily production use</li>
              </ul>
            </div>
          </div>
          <SlideNote>&quot;Production, not a demo. That&apos;s the whole point.&quot;</SlideNote>
        </section>

        {/* ── Slide 07 — Close / Q&A ───────────────────────────────────── */}
        <section className="kn-slide" aria-labelledby="kn-s7-head">
          <div className="kn-frame">
            <div className="kn-reveal">
              <p className="kn-slide-eyebrow kn-reveal-item" aria-hidden="true">07 · Close</p>
              <h2 id="kn-s7-head" className="kn-slide-head kn-reveal-item">Questions?</h2>
              <p className="kn-slide-sub kn-reveal-item">The next system could be yours to build.</p>
              <div className="kn-cta-row kn-reveal-item">
                <a href="mailto:koushik.kotamraju1610@gmail.com" className="kn-btn kn-btn--primary">Email me</a>
                <a href="/resume" className="kn-btn kn-btn--ghost">Résumé</a>
              </div>
              <ul className="kn-contacts kn-reveal-item" role="list">
                {CONTACT.map((c) => (
                  <li key={c.k}>
                    <a
                      href={c.href}
                      className="kn-contact-link"
                      {...(c.ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    >
                      <span className="kn-contact-k">{c.k}</span>
                      <span className="kn-contact-v">{c.v}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <SlideNote>&quot;Thanks. Let&apos;s talk.&quot;</SlideNote>
        </section>
      </main>

      {/* Persistent chrome: counter + progress rail — decorative, aria-hidden */}
      <div className="kn-chrome" aria-hidden="true">
        <span className="kn-counter">
          <span className="kn-counter-current">01</span> / {pad(SLIDE_COUNT)}
        </span>
      </div>
      <div className="kn-rail" aria-hidden="true">
        <span className="kn-rail-fill" />
      </div>
    </div>
  );
}
