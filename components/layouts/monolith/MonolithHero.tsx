"use client";

import { useRef } from "react";
import type { Theme } from "@/lib/themes";
import { gsap, useGSAP, SplitText } from "@/lib/gsap";
import "./styles.css";

/* ─────────────────────────────────────────────────────────────────────────────
   MONOLITH · layout variant: monolith · class prefix: mn-
   The rotation's one moment of restraint. An ink-dark poster: the name IS the
   page, one positioning line, one vermilion hairline, ONE motion beat (a
   SplitText mask reveal on load — nothing else animates). The craft lives in
   type, spacing, and what is left out. Animation owner: GSAP only.
───────────────────────────────────────────────────────────────────────────── */

const NUMBERS = [
  "2,800+ cloud accounts",
  "200+ detection signatures",
  "150+ security reviews",
  "62 toxic combinations",
  "19 models · 5 providers",
  "$1.40 / research run",
  "9 years",
] as const;

const WORK = [
  { name: "Artemis", note: "multi-cloud attack-path simulation" },
  { name: "IAM Audit Agent", note: "65+ escalation paths · 10 classes" },
  { name: "Autonomous Threat Intel", note: "performance-weighted model routing" },
  { name: "Detection Engine", note: "Terraform-deployed signature fleet" },
] as const;

const CONTACT = [
  { k: "LinkedIn", href: "https://www.linkedin.com/in/koushikkotamraju/", ext: true },
  { k: "GitHub", href: "https://github.com/koushik1610", ext: true },
  { k: "Résumé", href: "/resume", ext: false },
] as const;

export default function MonolithHero({ theme }: { theme: Theme }) {
  void theme;
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReduced) {
        // CSS pre-hides these under scripting — restore them statically.
        gsap.set(".mn-name, .mn-after-name", { opacity: 1 });
        return;
      }

      // THE one beat: the name rises out of a mask. Everything else is still.
      const split = SplitText.create(".mn-name", { type: "lines", mask: "lines", aria: "none" });
      gsap.set(".mn-name", { opacity: 1 }); // masks now own visibility
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.from(split.lines, {
        yPercent: 105,
        duration: 1.2,
        stagger: 0.12,
        delay: 0.15,
      }).from(
        ".mn-after-name",
        { autoAlpha: 0, duration: 0.7, ease: "power2.out" },
        "-=0.45"
      );
    },
    { scope: rootRef }
  );

  return (
    <div className="mn-root" ref={rootRef}>
      <a href="#mn-main" className="mn-skip">Skip to main content</a>
      <h1 className="mn-sr-only">
        Koushik Kotamraju — Sr. Security Engineer at Yahoo Paranoids. Cloud security
        engineer building AI-native security platforms.
      </h1>

      <nav className="mn-nav" aria-label="Primary navigation">
        <span className="mn-nav-mark" aria-hidden="true">KK</span>
        <span className="mn-nav-status">Open to work</span>
      </nav>

      <main id="mn-main">
        {/* ── The poster ─────────────────────────────────────────────────── */}
        <header className="mn-poster">
          <p className="mn-kicker">Sr. Security Engineer · Yahoo Paranoids</p>
          <p className="mn-name" aria-hidden="true">
            Koushik<br />Kotamraju
          </p>
          <div className="mn-after-name">
            <div className="mn-hairline" aria-hidden="true" />
            <p className="mn-line">
              Cloud security engineer building AI-native security platforms —
              production systems, not prototypes.
            </p>
            <div className="mn-cta-row">
              <a href="mailto:koushik.kotamraju1610@gmail.com" className="mn-btn mn-btn--primary">Email me</a>
              <a href="/resume" className="mn-btn mn-btn--ghost">Résumé</a>
            </div>
          </div>
        </header>

        {/* ── Numbers — one quiet manifest line ──────────────────────────── */}
        <section className="mn-section" aria-label="Numbers">
          <h2 className="mn-section-mark">Numbers</h2>
          <p className="mn-numbers">
            {NUMBERS.map((n, i) => (
              <span key={n} className="mn-number">
                {n}
                {i < NUMBERS.length - 1 && <span className="mn-sep" aria-hidden="true"> · </span>}
              </span>
            ))}
          </p>
        </section>

        {/* ── Work — a bare index ────────────────────────────────────────── */}
        <section className="mn-section" aria-labelledby="mn-work-head">
          <h2 id="mn-work-head" className="mn-section-mark">Work</h2>
          <ol className="mn-work" role="list">
            {WORK.map((w, i) => (
              <li key={w.name} className="mn-work-row">
                <span className="mn-work-num" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                <span className="mn-work-name">{w.name}</span>
                <span className="mn-work-note">{w.note}</span>
              </li>
            ))}
          </ol>
        </section>

        {/* ── Contact — the email is the closing statement ───────────────── */}
        <section className="mn-section mn-section--contact" aria-labelledby="mn-contact-head">
          <h2 id="mn-contact-head" className="mn-section-mark">Contact</h2>
          <a href="mailto:koushik.kotamraju1610@gmail.com" className="mn-email">
            koushik.kotamraju1610<wbr />@gmail.com
          </a>
          <ul className="mn-links" role="list">
            {CONTACT.map((c) => (
              <li key={c.k}>
                <a
                  href={c.href}
                  className="mn-link"
                  {...(c.ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  {c.k}
                </a>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}
