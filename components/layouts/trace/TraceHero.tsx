"use client";

import { useRef } from "react";
import type { Theme } from "@/lib/themes";
import { gsap, useGSAP } from "@/lib/gsap";
import CountUp from "@/components/CountUp";
import "./styles.css";

/* ─────────────────────────────────────────────────────────────────────────────
   TRACE · layout variant: trace · class prefix: tr-
   theme-plans/05-trace.md, salvaged and re-grounded post-cull (its original
   exemplar, casefile, was removed — the concept itself survives: no
   surviving theme uses a conversational/replay trace structure).

   The most AI-native page in the rotation: an agent-trace viewer (LangSmith/
   Braintrust energy) replaying should_we_hire("staff security engineer") —
   thought → tool call → result, seven spans, ending in a verdict card:
   HIRE, confidence clamped at 95% (the deterministic-advisor "never claim
   certainty" signature, a wink for anyone who's read his actual work).

   Distinctiveness: closest sibling in spirit is Policy (both a technical-
   artifact document), differentiated by information shape — Policy is a
   static JSON buffer, this is a turn-by-turn replay with span semantics
   (chips, durations, a verdict payoff), never a JSON blob (Policy owns
   that register). vs Telemetry: nothing live/looping — a completed,
   settled replay, no "now" pretense. vs the deleted casefile: no `$`
   prompts, no filesystem listings — agent-run UI, not a shell transcript.

   Palette: near-black #070a09 · mint accent #5eead4 (~13:1 on bg) — hue is
   near RFC's ink-teal, but RFC is a light/paper theme with a deep muted
   teal; this is a dark theme with a bright pale mint, opposite treatment,
   never seen adjacent in practice. Fonts: mono-dominant; sans only for the
   h1 and the verdict headline. Radius 4/6.

   Motion: the trace replays ONCE as a single GSAP timeline (each span
   prints in turn, ~1.8s total), scroll-triggered, settle-protected — no
   fake live timers, no looping, durations are static text.
───────────────────────────────────────────────────────────────────────────── */

type SpanKind = "thought" | "tool_call" | "result" | "verdict";

interface Span {
  kind: SpanKind;
  chip: string;
  call?: string;
  text: string;
  duration: string;
}

const SPANS: ReadonlyArray<Span> = [
  {
    kind: "thought",
    chip: "thought",
    text: "Need evidence of production security engineering at scale, not prototypes.",
    duration: "8ms",
  },
  {
    kind: "tool_call",
    chip: "tool_call",
    call: 'resume.search(scope="detection")',
    text: "",
    duration: "340ms",
  },
  {
    kind: "result",
    chip: "result",
    text: "200+ Python/Lambda signatures across 1,400+ AWS accounts; v6.0 release added 50+ baselines — largest in program history.",
    duration: "12ms",
  },
  {
    kind: "tool_call",
    chip: "tool_call",
    call: 'benchmarks.verify(agent="iam-audit")',
    text: "",
    duration: "410ms",
  },
  {
    kind: "result",
    chip: "result",
    text: "Built GOAT first: 32 ground-truth findings; evaluated against all 32. 65+ escalation paths, 10 classes. 62 toxic combinations catalogued (Antitoxin).",
    duration: "15ms",
  },
  {
    kind: "tool_call",
    chip: "tool_call",
    call: 'production.check(platforms="ai")',
    text: "19-model self-learning router at $1.40/run · MCP agentic review platform · deterministic CSPM advisor with hard deny gates. All in daily use. 150+ reviews shipped.",
    duration: "390ms",
  },
  {
    kind: "verdict",
    chip: "verdict",
    text: "HIRE",
    duration: "9y",
  },
] as const;

const STATS = [
  { value: "2,800+", label: "cloud accounts" },
  { value: "32", label: "GOAT benchmarks" },
  { value: "150+", label: "security reviews" },
  { value: "$1.40", label: "per research run" },
] as const;

const CONTACT = [
  { k: "Email", v: "koushik.kotamraju1610@gmail.com", href: "mailto:koushik.kotamraju1610@gmail.com", ext: false },
  { k: "LinkedIn", v: "in/koushikkotamraju", href: "https://www.linkedin.com/in/koushikkotamraju/", ext: true },
  { k: "GitHub", v: "github.com/koushik1610", href: "https://github.com/koushik1610", ext: true },
] as const;

function SpanIcon({ kind }: { kind: SpanKind }) {
  if (kind === "thought") {
    return (
      <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9.5 18h5M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.45 1 1.15 1 1.9V16h5v-.2c0-.75.4-1.45 1-1.9A6 6 0 0 0 12 3z" />
      </svg>
    );
  }
  if (kind === "tool_call") {
    return (
      <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a4 4 0 0 1-5.4 5.4L4 17l3 3 5.3-5.3a4 4 0 0 1 5.4-5.4l-2.6 2.6-2-2 2.6-2.6z" />
      </svg>
    );
  }
  if (kind === "result") {
    return (
      <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 4v13M6 11l6 6 6-6" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

export default function TraceHero({ theme }: { theme: Theme }) {
  void theme;
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReduced) return;

      const settleTimers: number[] = [];
      const settle = (tw: gsap.core.Tween | gsap.core.Timeline, ms: number) => {
        settleTimers.push(
          window.setTimeout(() => {
            if (tw.progress() < 1) tw.progress(1);
          }, ms)
        );
      };

      const intro = gsap.from(".tr-masthead > *", {
        autoAlpha: 0,
        y: 14,
        duration: 0.5,
        stagger: 0.06,
        ease: "power3.out",
        delay: 0.1,
      });
      settle(intro, 3000);

      // The trace replays ONCE as a single timeline — each span prints in
      // turn (this reads as a replay), ending on the verdict card's payoff
      // beat. Scroll-triggered, settle-protected, never re-triggers.
      const traceTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".tr-trace",
          start: "top 85%",
          once: true,
          onEnter: (self) => settle(self.animation as gsap.core.Timeline, 3500),
        },
      });
      gsap.utils.toArray<HTMLElement>(".tr-span:not(.tr-span--verdict)").forEach((row) => {
        traceTl.from(row, { autoAlpha: 0, x: -8, duration: 0.25, ease: "power2.out" }, "+=0.18");
      });
      traceTl.from(".tr-verdict", { autoAlpha: 0, scale: 0.97, duration: 0.4, ease: "power4.out" }, "+=0.18");

      // Stats + contact settle in on scroll, once each.
      gsap.utils.toArray<HTMLElement>(".tr-reveal").forEach((el) => {
        gsap.from(el, {
          autoAlpha: 0,
          y: 16,
          duration: 0.55,
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
    <div className="tr-root" ref={rootRef}>
      <a href="#tr-main" className="tr-skip">Skip to main content</a>

      <nav className="tr-nav" aria-label="Primary navigation">
        <span className="tr-meta" aria-hidden="true">trace viewer · run_id: kk-2026-hire · spans: 7 · status: ok</span>
        <span className="tr-open">
          <span className="tr-open-dot" aria-hidden="true" />
          Open to opportunities
        </span>
      </nav>

      <main id="tr-main" className="tr-main">
        <header className="tr-masthead">
          <p className="tr-eyebrow">AGENT RUN · COMPLETED</p>
          <h1 className="tr-name">Koushik Kotamraju</h1>
          <p className="tr-input-chip">
            <span className="tr-input-k" aria-hidden="true">input</span>
            &quot;should we hire a staff security engineer?&quot;
          </p>
          <p className="tr-lede">
            Cloud security engineer building AI-native security platforms —{" "}
            <strong className="tr-em">production systems, not prototypes.</strong>
          </p>
          <p className="tr-hook">
            A small team. 2,800+ cloud accounts. The math only works if you build the right systems.
          </p>
          <div className="tr-cta-row">
            <a href="mailto:koushik.kotamraju1610@gmail.com" className="tr-btn tr-btn--primary">Email me</a>
            <a href="/resume" className="tr-btn tr-btn--ghost">Résumé</a>
          </div>
          <p className="tr-avail">
            <span className="tr-open-dot" aria-hidden="true" /> Open to opportunities
          </p>
        </header>

        <section className="tr-trace-section" aria-labelledby="tr-trace-head">
          <h2 id="tr-trace-head" className="tr-sr-only">Agent run trace</h2>
          <ol className="tr-trace" role="list">
            {SPANS.map((s, i) => {
              if (s.kind === "verdict") {
                return (
                  <li key={i} className="tr-span tr-span--verdict">
                    <section className="tr-verdict" aria-label="Verdict">
                      <span className="tr-verdict-chip" aria-hidden="true">
                        <SpanIcon kind="verdict" /> verdict
                      </span>
                      <p className="tr-verdict-headline">HIRE</p>
                      <p className="tr-verdict-sub">
                        confidence: 95% (clamped — he never lets an advisor claim certainty)
                      </p>
                      <a href="mailto:koushik.kotamraju1610@gmail.com" className="tr-verdict-cta">Email me</a>
                    </section>
                  </li>
                );
              }
              return (
                <li key={i} className="tr-span" aria-label={`${s.chip}: ${s.call ?? ""} ${s.text}`.trim()}>
                  <span className="tr-span-icon" aria-hidden="true"><SpanIcon kind={s.kind} /></span>
                  <span className={`tr-span-chip tr-span-chip--${s.kind}`} aria-hidden="true">{s.chip}</span>
                  <span className="tr-span-body" aria-hidden="true">
                    {s.call && <span className="tr-span-call">{s.call}</span>}
                    {s.text && <span className="tr-span-text">{s.text}</span>}
                  </span>
                  <span className="tr-span-dur" aria-hidden="true">{s.duration}</span>
                </li>
              );
            })}
          </ol>
        </section>

        <section className="tr-stats tr-reveal" aria-label="Key metrics">
          {STATS.map((s) => (
            <div key={s.label} className="tr-stat">
              <CountUp value={s.value} className="tr-stat-num" />
              <span className="tr-stat-label">{s.label}</span>
            </div>
          ))}
        </section>

        <section className="tr-contact tr-reveal" aria-labelledby="tr-contact-head">
          <h2 id="tr-contact-head" className="tr-h2">Hand off to a human</h2>
          <p className="tr-contact-note">
            The trace ends in a verdict; the next step is a conversation. Open to Staff &amp;
            Principal Security Engineer and AI Security roles.
          </p>
          <ul className="tr-contacts" role="list">
            {CONTACT.map((c) => (
              <li key={c.k}>
                <a
                  href={c.href}
                  className="tr-contact-link"
                  {...(c.ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  <span className="tr-contact-k">{c.k}</span>
                  <span className="tr-contact-v">{c.v}</span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}
