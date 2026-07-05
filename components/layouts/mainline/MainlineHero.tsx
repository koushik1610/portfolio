"use client";

import { useRef } from "react";
import type { Theme } from "@/lib/themes";
import { gsap, useGSAP } from "@/lib/gsap";
import CountUp from "@/components/CountUp";
import "./styles.css";

/* ─────────────────────────────────────────────────────────────────────────────
   MAINLINE · layout variant: mainline · class prefix: ml-
   `git log --graph --all` for a career: a vertical commit graph where
   feature branches (detection, identity, ai-platforms) merge into
   mainline, ending at HEAD -> staff/principal. Palette: near-black
   #0b0d0a · text #eaf0e8 · muted #9aa896 · owned accent: merge-green,
   derived from the registry token, used as graph STRUCTURE (not status).
   Animation owner: GSAP. Hashes/dots/connectors are decorative — every
   row's branch and kind (feat/merge/init) is real, visible text.
───────────────────────────────────────────────────────────────────────────── */

type Lane = 0 | 1;
type Kind = "head" | "merge" | "commit" | "init";

interface Row {
  id: string;
  lane: Lane;
  kind: Kind;
  refChip: string;
  hash: string;
  message: string;
  body?: string;
  date: string;
}

const ROWS: readonly Row[] = [
  {
    id: "head",
    lane: 0,
    kind: "head",
    refChip: "HEAD → staff/principal",
    hash: "a1f9c02",
    message: "feat: open to your organization",
    body: "the math only works if you build the right systems",
    date: "2026",
  },
  {
    id: "merge-ai",
    lane: 0,
    kind: "merge",
    refChip: "ai-platforms → mainline",
    hash: "7e2b481",
    message: "merge: 19-model router, deterministic advisor, MCP review agent",
    body: "$1.40/run · hard deny gates · daily production use",
    date: "2025–26",
  },
  {
    id: "commit-ai",
    lane: 1,
    kind: "commit",
    refChip: "ai-platforms",
    hash: "c934f10",
    message: "feat: GOAT benchmark — 32 ground-truth findings; agent evaluated against all 32",
    date: "2025",
  },
  {
    id: "merge-identity",
    lane: 0,
    kind: "merge",
    refChip: "identity → mainline",
    hash: "5d0a7e3",
    message: "merge: 65+ escalation paths · 62 toxic combinations (Antitoxin)",
    date: "2025",
  },
  {
    id: "merge-detection",
    lane: 0,
    kind: "merge",
    refChip: "detection → mainline",
    hash: "b41f9c8",
    message: "merge: v6.0 — 50+ new baselines, largest release in program history",
    date: "2024–25",
  },
  {
    id: "commit-detection",
    lane: 1,
    kind: "commit",
    refChip: "detection",
    hash: "2a77d0e",
    message: "feat: 200+ signatures · 1,400+ AWS accounts · posture scores the company is measured against",
    date: "2024",
  },
  {
    id: "commit-mainline",
    lane: 0,
    kind: "commit",
    refChip: "mainline",
    hash: "f80c3b6",
    message: "feat: 150+ Paranoid Security Reviews — Product Security, Network, Identity",
    date: "2022–26",
  },
  {
    id: "init",
    lane: 0,
    kind: "init",
    refChip: "mainline",
    hash: "0000001",
    message: "init: 9 years in security — Infosys → CYR3CON → Yahoo Paranoids",
    date: "2017",
  },
] as const;

const STATS = [
  { value: "2,800+", label: "accounts" },
  { value: "200+", label: "signatures" },
  { value: "150+", label: "reviews" },
  { value: "32", label: "GOAT benchmarks" },
] as const;

const CONTACT = [
  { k: "Email", v: "koushik.kotamraju1610@gmail.com", href: "mailto:koushik.kotamraju1610@gmail.com", ext: false },
  { k: "LinkedIn", v: "in/koushikkotamraju", href: "https://www.linkedin.com/in/koushikkotamraju/", ext: true },
  { k: "GitHub", v: "github.com/koushik1610", href: "https://github.com/koushik1610", ext: true },
] as const;

export default function MainlineHero({ theme }: { theme: Theme }) {
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

      const intro = gsap.from(".ml-masthead > *", {
        autoAlpha: 0,
        y: 12,
        duration: 0.5,
        stagger: 0.06,
        ease: "power3.out",
        delay: 0.1,
      });
      settle(intro, 3000);

      // onEnter can fire synchronously during ScrollTrigger's own
      // construction (trigger already past its start point when this mounts,
      // e.g. after a theme switch at a scrolled position) — before the outer
      // `const` below finishes assigning, so read the tween off `self`
      // instead of closing over that name (TDZ crash otherwise).
      gsap.from(".ml-mainline-line", {
        scaleY: 0,
        transformOrigin: "top center",
        duration: 0.9,
        ease: "power3.inOut",
        scrollTrigger: {
          trigger: ".ml-graph-wrap",
          start: "top 85%",
          once: true,
          onEnter: (self) => settle(self.animation as gsap.core.Tween, 3000),
        },
      });

      gsap.from(".ml-row", {
        autoAlpha: 0,
        x: -10,
        duration: 0.45,
        stagger: 0.06,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".ml-graph-wrap",
          start: "top 82%",
          once: true,
          onEnter: (self) => settle(self.animation as gsap.core.Tween, 3500),
        },
      });

      // HEAD chip pops in last — the payoff frame.
      const head = gsap.from(".ml-row--head .ml-ref-chip", {
        scale: 0.85,
        autoAlpha: 0,
        duration: 0.25,
        ease: "back.out(1.6)",
        delay: 0.5,
        scrollTrigger: { trigger: ".ml-graph-wrap", start: "top 82%", once: true },
      });
      settle(head, 4000);

      gsap.utils.toArray<HTMLElement>(".ml-reveal").forEach((el) => {
        gsap.from(el, {
          autoAlpha: 0,
          y: 14,
          duration: 0.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            once: true,
            onEnter: (self) => settle(self.animation as gsap.core.Tween, 2500),
          },
        });
      });

      return () => settleTimers.forEach((t) => window.clearTimeout(t));
    },
    { scope: rootRef }
  );

  return (
    <div className="ml-root" ref={rootRef}>
      <a href="#ml-main" className="ml-skip">Skip to main content</a>

      <nav className="ml-nav" aria-label="Primary navigation">
        <span className="ml-meta" aria-hidden="true">git log --graph · repo: koushik · branch: mainline</span>
        <span className="ml-open">
          <span className="ml-open-dot" aria-hidden="true" />
          Open to opportunities
        </span>
      </nav>

      <main id="ml-main" className="ml-main">
        {/* ── Masthead ──────────────────────────────────────────────────── */}
        <header className="ml-masthead">
          <p className="ml-eyebrow">HEAD → staff/principal</p>
          <h1 className="ml-name">Koushik Kotamraju</h1>
          <p className="ml-lede">
            Cloud security engineer building AI-native security platforms —{" "}
            <strong className="ml-em">production systems, not prototypes.</strong>
          </p>
          <p className="ml-hook">
            A small team. 2,800+ cloud accounts. The math only works if you build the right systems.
          </p>
          <div className="ml-cta-row">
            <a href="mailto:koushik.kotamraju1610@gmail.com" className="ml-btn ml-btn--primary">Email me</a>
            <a href="/resume" className="ml-btn ml-btn--ghost">Résumé</a>
          </div>
          <p className="ml-avail">
            <span className="ml-open-dot" aria-hidden="true" /> Open to opportunities
          </p>
        </header>

        {/* ── The commit graph ─────────────────────────────────────────── */}
        <section aria-labelledby="ml-graph-head">
          <h2 id="ml-graph-head" className="ml-sr-only">Commit history</h2>
          <div className="ml-graph-wrap">
            <div className="ml-mainline-line" aria-hidden="true" />
            <ol className="ml-graph">
              {ROWS.map((r) => (
                <li key={r.id} className={`ml-row ml-row--${r.kind}`}>
                  <div className="ml-rail-cell">
                    <span className={`ml-dot ml-dot--${r.kind} ml-lane${r.lane}`} aria-hidden="true" />
                    {r.lane === 1 && <div className="ml-connector" aria-hidden="true" />}
                  </div>
                  <div className="ml-content">
                    <div className="ml-row-top">
                      <span className={`ml-ref-chip ml-ref-chip--${r.kind}`}>{r.refChip}</span>
                      <span className="ml-hash" aria-hidden="true">{r.hash}</span>
                      <span className="ml-date">{r.date}</span>
                    </div>
                    <p className="ml-message">{r.message}</p>
                    {r.body && <p className="ml-body">{r.body}</p>}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ── git shortlog ─────────────────────────────────────────────── */}
        <section className="ml-stats ml-reveal" aria-label="Key metrics">
          {STATS.map((s) => (
            <div key={s.label} className="ml-stat">
              <CountUp value={s.value} className="ml-stat-num" />
              <span className="ml-stat-label">{s.label}</span>
            </div>
          ))}
        </section>

        {/* ── Contact ───────────────────────────────────────────────────── */}
        <section className="ml-contact ml-reveal" aria-labelledby="ml-contact-head">
          <h2 id="ml-contact-head">git remote add you</h2>
          <p className="ml-contact-note">
            Open to Staff &amp; Principal Security Engineer roles · AI Security · Detection.
          </p>
          <ul className="ml-contacts" role="list">
            {CONTACT.map((c) => (
              <li key={c.k}>
                <a
                  href={c.href}
                  className="ml-contact-link"
                  {...(c.ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  <span className="ml-contact-k">{c.k}</span>
                  <span className="ml-contact-v">{c.v}</span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}
