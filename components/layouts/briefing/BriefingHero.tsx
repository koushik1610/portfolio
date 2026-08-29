"use client";

import { useRef } from "react";
import type { Theme } from "@/lib/themes";
import { gsap, useGSAP } from "@/lib/gsap";
import CountUp from "@/components/CountUp";
import "./styles.css";

/* ─────────────────────────────────────────────────────────────────────────────
   BRIEFING · layout variant: briefing · class prefix: bf-
   2026-07 rework (theme-plans/00-STRATEGY-2026-07-cull-and-rebuild.md §5.4):
   Koushik named the profile-photo placement/treatment as the one thing he
   likes — kept verbatim (same photo, same object-position crop). Everything
   else was a 7-tile bento of equal-weight cards, which is exactly the
   generic "hero-metric SaaS template" the house style bans. Rebuilt as an
   editorial magazine spread instead: a masthead where the name overlaps the
   photo's edge (CSS grid stacking, not absolute-position hacks), a feature
   spread with one pull-quote stat + flowing body copy + a marginalia
   sidebar (not another card grid — that shape is now Avatar's), and a
   numbered "in this issue" feature index with a large ghost numeral behind
   each row. Signature move: the masthead's name band reveals via a solid
   colour plate that wipes off (a print-registration beat), distinct from
   Avatar's grayscale photo-develop and every other theme's reveal style.

   2026-07-12 asset rework (theme-plans/00-STRATEGY-2026-07-research-rework.md
   §2): added a rotating circular "stamp" badge on the photo panel corner
   (Cuberto-derived) — a literal magazine-seal detail, not decoration for its
   own sake — and a one-shot diagonal foil sweep on the contact links on
   hover/focus (deliberately a fixed transition, not cursor-tracked, so it
   reads distinct from Telemetry's continuous scan-line mechanic).
───────────────────────────────────────────────────────────────────────────── */

const MARGINALIA = [
  { k: "Signatures", v: "200+" },
  { k: "Reviews", v: "100+" },
  { k: "KG nodes", v: "1,700+" },
  { k: "Models", v: "19 · 5 providers" },
  { k: "Cost / run", v: "from $1.40" },
  { k: "Experience", v: "9 yrs · 3 orgs" },
  { k: "Focus", v: "IAM · CIEM · detection" },
] as const;

/* The mini attack path the Antitoxin work cuts — rendered as a static chain,
   kept from the prior build as an illustrative aside inside the feature body. */
const ATTACK_PATH = [
  { node: "role", state: "entry" },
  { node: "iam:PassRole", state: "toxic" },
  { node: "lambda:Create", state: "toxic" },
  { node: "admin", state: "cut" },
] as const;

const WORK = [
  { name: "Artemis", desc: "Attack-path operationalization over a native platform.", metric: "GCP built · AWS designed" },
  { name: "IAM Audit Agent", desc: "10 vulnerability classes · public path catalogue.", metric: "32 GOAT findings" },
  { name: "Autonomous Threat Intel", desc: "19 models, 5 providers, weighted routing.", metric: "from $1.40 / run" },
  { name: "Detection Engine", desc: "Terraform-deployed signature fleet, ATT&CK-mapped.", metric: "1,400+ accounts" },
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

      // Failsafe: if the rAF ticker stalls (background tab, low-power mode),
      // never leave an on-mount tween stuck mid-flight — force-complete it
      // by wall clock. Timers are cleared on cleanup below.
      const settleTimers: number[] = [];
      const settle = (tw: gsap.core.Tween | gsap.core.Timeline, ms: number) => {
        settleTimers.push(
          window.setTimeout(() => {
            if (tw.progress() < 1) tw.progress(1);
          }, ms)
        );
      };

      // Photo panel: quiet scale-settle, no filter (that beat belongs to Avatar).
      const photoIn = gsap.from(".bf-photo-panel img", {
        autoAlpha: 0,
        scale: 1.04,
        duration: 1.1,
        ease: "power2.out",
      });
      settle(photoIn, 3000);

      // Signature move: the name band's colour plate wipes off, revealing the
      // overlapping masthead title in one clean beat — this IS the reveal,
      // the name text itself stays static underneath (no second, competing
      // reveal mechanic on the same element).
      const plateOut = gsap.to(".bf-name-plate", {
        scaleX: 0,
        transformOrigin: "right center",
        duration: 0.75,
        ease: "power3.inOut",
        delay: 0.35,
      });
      settle(plateOut, 3000);

      const textIn = gsap.from(".bf-masthead-text > *", {
        autoAlpha: 0,
        y: 14,
        duration: 0.6,
        stagger: 0.07,
        ease: "power2.out",
        delay: 0.15,
      });
      settle(textIn, 3000);

      // Pull-quote stat rises on scroll; CountUp owns its own count animation.
      // Every below-fold reveal below also arms a settle timer on enter —
      // once a scroll-triggered tween starts, it's just as exposed to a
      // throttled/backgrounded rAF ticker as an on-mount one.
      gsap.from(".bf-pull", {
        autoAlpha: 0,
        y: 20,
        duration: 0.65,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".bf-feature",
          start: "top 82%",
          once: true,
          onEnter: (self) => settle(self.animation as gsap.core.Tween, 2500),
        },
      });

      // Body copy + attack-path aside settle in together.
      gsap.from(".bf-feature-body > *", {
        autoAlpha: 0,
        y: 16,
        duration: 0.6,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".bf-feature-body",
          start: "top 84%",
          once: true,
          onEnter: (self) => settle(self.animation as gsap.core.Tween, 2500),
        },
      });

      // Marginalia footnotes stagger in as a column of small annotations.
      gsap.from(".bf-margin-list li", {
        autoAlpha: 0,
        x: 10,
        duration: 0.45,
        stagger: 0.06,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".bf-marginalia",
          start: "top 84%",
          once: true,
          onEnter: (self) => settle(self.animation as gsap.core.Tween, 2500),
        },
      });

      // Feature-index rows: the ghost numeral settles from a larger scale
      // while the title/desc/metric do the standard rise — same trigger,
      // two coordinated moves on one row.
      gsap.utils.toArray<HTMLElement>(".bf-index-row").forEach((row, i) => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: row,
            start: "top 88%",
            once: true,
            onEnter: (self) => settle(self.animation as gsap.core.Timeline, 2500),
          },
          delay: i * 0.05,
        });
        tl.from(row.querySelector(".bf-index-num"), {
          autoAlpha: 0,
          scale: 1.18,
          duration: 0.6,
          ease: "power2.out",
        }, 0);
        tl.from(row.querySelector(".bf-index-body"), {
          autoAlpha: 0,
          y: 14,
          duration: 0.5,
          ease: "power2.out",
        }, 0.05);
        tl.from(row.querySelector(".bf-index-metric"), {
          autoAlpha: 0,
          duration: 0.4,
          ease: "power2.out",
        }, 0.15);
      });

      gsap.from(".bf-contact-link", {
        autoAlpha: 0,
        y: 14,
        duration: 0.6,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".bf-contact",
          start: "top 86%",
          once: true,
          onEnter: (self) => settle(self.animation as gsap.core.Tween, 2500),
        },
      });

      return () => {
        settleTimers.forEach((t) => window.clearTimeout(t));
      };
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
        {/* ── Masthead — photo bleeds full-height right, name overlaps its
            left edge (a magazine cover-line move), text column left ────── */}
        <header className="bf-masthead">
          <div className="bf-photo-panel">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/profile.jpeg"
              alt="Portrait of Koushik Kotamraju"
              className="bf-portrait"
            />
            {/* Rotating stamp badge (Cuberto-derived circular text) — reads
                as a literal magazine seal, reinforcing the "operations
                brief" issue concept rather than decorating for its own
                sake. Static under reduced motion (see CSS). */}
            <div className="bf-stamp" aria-hidden="true">
              <svg viewBox="0 0 100 100" className="bf-stamp-svg">
                <defs>
                  <path id="bf-stamp-circle" d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" />
                </defs>
                <circle cx="50" cy="50" r="45" className="bf-stamp-bg" />
                <text className="bf-stamp-text">
                  <textPath href="#bf-stamp-circle" startOffset="0%">
                    OPEN TO WORK · OPEN TO WORK ·
                  </textPath>
                </text>
                <circle cx="50" cy="50" r="4" className="bf-stamp-dot" />
              </svg>
            </div>
          </div>

          <div className="bf-masthead-text">
            <p className="bf-kicker">Sr. Security Engineer · Yahoo Paranoids</p>
            <p className="bf-lede">
              Cloud security engineer building AI-native security platforms —{" "}
              <strong>production systems, not prototypes.</strong>
            </p>
            <p className="bf-hook">
              A small team. 2,800+ cloud accounts. The math only works if you
              build the right systems.
            </p>
            <div className="bf-cta-row">
              <a href="mailto:koushik.kotamraju1610@gmail.com" className="bf-btn bf-btn--primary">Email me</a>
              <a href="/resume/" className="bf-btn bf-btn--ghost">Résumé</a>
            </div>
          </div>

          <div className="bf-name-row">
            <span className="bf-name-plate" aria-hidden="true" />
            <p className="bf-name" aria-hidden="true">Koushik<br />Kotamraju</p>
          </div>
        </header>

        <div className="bf-rule" aria-hidden="true" />

        {/* ── Feature spread — pull-quote stat, flowing body copy, and a
            marginalia sidebar of small facts (not another card grid) ────── */}
        <section className="bf-feature" aria-labelledby="bf-feature-head">
          <h2 id="bf-feature-head" className="bf-sr-only">The work</h2>
          <div className="bf-feature-grid">
            {/* No role="group" + aria-label here. CountUp carries its own
                visually-hidden text node with the final value (see CountUp.tsx),
                so naming the group would announce the number twice in browse
                mode. The caption is real text for the same reason. */}
            <div className="bf-pull">
              <CountUp value="2,800+" className="bf-pull-num" />
              <p className="bf-pull-cap">cloud accounts secured by a small senior team</p>
            </div>

            <div className="bf-feature-body">
              <p className="bf-body-p">
                A detection fleet of 200+ Python and Lambda signatures evaluates
                1,400+ AWS accounts — the posture scores the company is measured
                against. An AI-native IAM audit agent works across 10 IAM
                vulnerability classes and matches its findings against
                DataDog&rsquo;s public catalogue of 65+ documented escalation
                paths, interpreting transitive privilege chains the way an
                analyst would.
              </p>
              <p className="bf-body-p">
                Antitoxin, CIEM research with no implementation yet, catalogues
                62 toxic IAM combinations by hand, each carrying the keystone
                permission whose removal breaks that chain. Multi-agent AI
                platforms orchestrate 19 models from 5 providers behind a
                performance-weighted router, from $1.40 per research run.
              </p>

              <div
                className="bf-path"
                role="group"
                aria-label="An escalation chain with its keystone permission marked. 62 toxic IAM combinations catalogued by hand across 8 attack categories, each with the keystone whose removal breaks that chain."
              >
                <p className="bf-path-label" aria-hidden="true">Escalation path · cut</p>
                <div className="bf-path-chain" aria-hidden="true">
                  {ATTACK_PATH.map((p, i) => (
                    <span key={p.node} className="bf-path-seg">
                      {i > 0 && <span className={`bf-path-edge${p.state === "cut" ? " bf-path-edge--cut" : ""}`} />}
                      <span className={`bf-path-node bf-path-node--${p.state}`}>{p.node}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <aside className="bf-marginalia" aria-label="At a glance">
              <p className="bf-margin-head" aria-hidden="true">At a glance</p>
              <ul className="bf-margin-list" role="list">
                {MARGINALIA.map((m) => (
                  <li key={m.k}>
                    <span className="bf-margin-k">{m.k}</span>
                    <span className="bf-margin-v">{m.v}</span>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </section>

        <div className="bf-rule" aria-hidden="true" />

        {/* ── Feature index — "in this issue": numbered rows, each with a
            large ghost numeral behind the title instead of a bordered card ── */}
        <section className="bf-index" aria-labelledby="bf-index-head">
          <div className="bf-index-head-row">
            <h2 id="bf-index-head" className="bf-h2">In this issue</h2>
            <span className="bf-index-count" aria-hidden="true">04</span>
          </div>
          <ol className="bf-index-list" role="list">
            {WORK.map((w, i) => (
              <li key={w.name} className="bf-index-row" aria-label={`Feature ${i + 1}: ${w.name} — ${w.metric}`}>
                <span className="bf-index-num" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                <div className="bf-index-body">
                  <h3 className="bf-index-name">{w.name}</h3>
                  <p className="bf-index-desc">{w.desc}</p>
                </div>
                <span className="bf-index-metric" aria-hidden="true">{w.metric}</span>
              </li>
            ))}
          </ol>
        </section>

        <div className="bf-rule" aria-hidden="true" />

        {/* ── Contact ────────────────────────────────────────────────────── */}
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
