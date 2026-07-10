"use client";

import { useRef } from "react";
import type { Theme } from "@/lib/themes";
import { gsap, useGSAP, SplitText } from "@/lib/gsap";
import CountUp from "@/components/CountUp";
import "./styles.css";

/* ─────────────────────────────────────────────────────────────────────────────
   POLICY · layout variant: policy · class prefix: pol-
   The hero IS the artifact: an AWS IAM policy document open read-only in a
   quiet editor buffer — gutter line numbers, indent guides, syntax tones.
   "Koushik Kotamraju" is the policy's principal, rendered at display scale;
   the CTA is the first statement (Sid: HireKoushik). One owned accent:
   AWS orange #ff9900 — semantic for an IAM artifact, used sparingly.
   Animation owner: GSAP only (buffer lines print once; CountUp owns its spans).

   2026-07 polish pass (00-STRATEGY-2026-07-cull-and-rebuild.md §5.5): the
   Principal name was previously swept into the same uniform tiny-stagger
   line fade as every surrounding JSON punctuation line, so the one moment
   that should read as a hero beat ("the person is the subject") arrived
   with no more ceremony than a comma. It now gets its own SplitText
   word-mask reveal, separate from the buffer-line fade around it.
───────────────────────────────────────────────────────────────────────────── */

const FILE_META = "~/policies/koushik-kotamraju.iam.json · read-only";

const STATEMENTS = [
  {
    sid: "DetectionEngineering",
    action: "detect:*",
    resource: "1,400+ AWS accounts",
    doc: "200+ Python/Lambda signatures. CIS-benchmarked baselines, MITRE ATT&CK gap analysis, Terraform-deployed. The posture scores the company is measured against.",
  },
  {
    sid: "IAMPrivilegeAnalysis",
    action: "iam:Audit*",
    resource: "65+ escalation paths · 10 vulnerability classes",
    doc: "AI-native audit agent fusing privilege-graph traversal with LLM semantic reasoning. Built the GOAT benchmark first — 32 ground-truth findings — then evaluated against all 32.",
  },
  {
    sid: "SecurityReviews",
    action: "psr:ThreatModel",
    resource: "150+ reviews · every business unit",
    doc: "Paranoid Security Review — partnering with Product Security, Network, and Identity to approve new cloud architectures before launch. Multi-week backlog eliminated.",
  },
  {
    sid: "AISecurityPlatforms",
    action: "ai:Orchestrate",
    resource: "19 models · 5 providers",
    doc: "Self-learning research router at $1.40/run, an MCP-integrated agentic review platform, and a deterministic CSPM advisor with hard deny gates. All in daily production use.",
  },
  {
    sid: "CIEMResearch",
    action: "ciem:Dissolve",
    resource: "62 toxic combinations · 8 attack categories",
    doc: "Antitoxin — graph-theoretic minimum cut-set dissolution. Find the keystone permission whose removal collapses the whole escalation chain.",
  },
] as const;

const CONDITIONS = [
  { key: "cloud:AccountsSecured", value: "2,800+" },
  { key: "detect:ActiveSignatures", value: "200+" },
  { key: "psr:ReviewsConducted", value: "150+" },
  { key: "goat:BenchmarksEvaluated", value: "32" },
] as const;

const CONTACT = [
  { k: "email", v: "koushik.kotamraju1610@gmail.com", href: "mailto:koushik.kotamraju1610@gmail.com", ext: false },
  { k: "linkedin", v: "in/koushikkotamraju", href: "https://www.linkedin.com/in/koushikkotamraju/", ext: true },
  { k: "github", v: "github.com/koushik1610", href: "https://github.com/koushik1610", ext: true },
] as const;

/* Punctuation is editor chrome, not content — screen readers skip it. */
function Punct({ children }: { children: string }) {
  return <span className="pol-punct" aria-hidden="true">{children}</span>;
}

function Key({ children, className }: { children: string; className?: string }) {
  return (
    <span className={className ? `pol-key ${className}` : "pol-key"}>
      &quot;{children}&quot;<Punct>:</Punct>
    </span>
  );
}

export default function PolicyHero({ theme }: { theme: Theme }) {
  void theme;
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReduced) return;

      // The buffer prints — one quick line stagger, no typing theater. The
      // Principal name is excluded here and given its own reveal below —
      // it's the hero beat, not another punctuation line.
      const intro = gsap.from(".pol-doc--intro .pol-line:not(.pol-name)", {
        autoAlpha: 0,
        duration: 0.16,
        stagger: 0.055,
        ease: "none",
        delay: 0.15,
      });
      // The name arrives as its own moment — a word-mask slide, timed to
      // land right after the two lines above it ("Version", "Principal")
      // have printed, so the buffer still feels continuous. .pol-name is a
      // real, visible h1 (not aria-hidden) so this split uses aria: "auto"
      // per CLAUDE.md §3.4b, unlike the decorative aria-hidden splits used
      // elsewhere in the rotation.
      const nameSplit = SplitText.create(".pol-name", { type: "words", mask: "words", aria: "auto" });
      const nameIn = gsap.from(nameSplit.words, {
        yPercent: 115,
        duration: 0.7,
        stagger: 0.05,
        ease: "power3.out",
        delay: 0.4,
      });
      // Failsafe: if the rAF ticker is throttled (background tab, low-power
      // mode), never leave the above-fold content hidden — settle it by
      // wall clock. setTimeout still fires when rAF does not.
      const settle = window.setTimeout(() => {
        if (intro.progress() < 1) intro.progress(1);
      }, 3000);
      const nameSettle = window.setTimeout(() => {
        if (nameIn.progress() < 1) nameIn.progress(1);
      }, 3000);

      // Statement blocks print as they scroll in, once each. Each gets the
      // same wall-clock settle once its trigger fires (see failsafe above).
      const settleTimers: number[] = [];
      gsap.utils.toArray<HTMLElement>(".pol-doc--scroll").forEach((block) => {
        gsap.from(block.querySelectorAll(".pol-line"), {
          autoAlpha: 0,
          duration: 0.14,
          stagger: 0.04,
          ease: "none",
          scrollTrigger: {
            trigger: block,
            start: "top 82%",
            once: true,
            // onEnter can fire synchronously during ScrollTrigger's own
            // construction (trigger already past its start point when this
            // mounts, e.g. after a theme switch at a scrolled position) —
            // before an outer `const tw` would finish assigning, so read the
            // tween off `self` instead of closing over that name.
            onEnter: (self) => {
              const tw = self.animation as gsap.core.Tween;
              settleTimers.push(
                window.setTimeout(() => {
                  if (tw.progress() < 1) tw.progress(1);
                }, 2500)
              );
            },
          },
        });
      });

      // The status bar validates last — a single quiet confirmation beat.
      gsap.from(".pol-valid", {
        autoAlpha: 0,
        duration: 0.5,
        ease: "power2.out",
        delay: 1.4,
      });

      return () => {
        window.clearTimeout(settle);
        window.clearTimeout(nameSettle);
        settleTimers.forEach((t) => window.clearTimeout(t));
      };
    },
    { scope: rootRef }
  );

  return (
    <div className="pol-root" ref={rootRef}>
      <a href="#pol-main" className="pol-skip">Skip to main content</a>

      <nav className="pol-nav" aria-label="Primary navigation">
        <span className="pol-file" aria-hidden="true">{FILE_META}</span>
        <span className="pol-open">
          <span className="pol-open-dot" aria-hidden="true" />
          Open to opportunities
        </span>
      </nav>

      <main id="pol-main" className="pol-main">
        {/* NOTE: the sections below compose ONE JSON document — braces and
            commas are hand-placed across section boundaries, so reordering
            or removing a section breaks the document's closing structure. */}
        {/* ── Document head: version → principal → description → CTA ───── */}
        <section className="pol-doc pol-doc--intro" aria-labelledby="pol-name">
          {/* IAM's fixed grammar date — the insider handshake, never stale */}
          <div className="pol-line"><Punct>{"{"}</Punct></div>
          <div className="pol-line pol-i1">
            <Key>Version</Key> <span className="pol-str">&quot;2012-10-17&quot;</span><Punct>,</Punct>
          </div>
          <div className="pol-line pol-i1 pol-principal-line">
            <Key>Principal</Key>
          </div>
          <h1 id="pol-name" className="pol-line pol-i1 pol-name">Koushik Kotamraju</h1>
          <p className="pol-line pol-i1 pol-role">
            <Key>Role</Key> <span className="pol-str">&quot;Sr. Security Engineer · Yahoo Paranoids · 9 years&quot;</span><Punct>,</Punct>
          </p>
          <p className="pol-line pol-i1 pol-desc">
            <Key>Description</Key>{" "}
            <span className="pol-str">
              &quot;Cloud security engineer building AI-native security platforms —{" "}
              <strong className="pol-em">production systems, not prototypes.</strong>{" "}
              A small team. 2,800+ cloud accounts. The math only works if you build the right systems.&quot;
            </span><Punct>,</Punct>
          </p>

          {/* ── Statement[0]: the CTA ─────────────────────────────────── */}
          <div className="pol-line pol-i1"><Key>Statement</Key> <Punct>[</Punct></div>
          <div className="pol-line pol-i2"><Punct>{"{"}</Punct></div>
          <div className="pol-line pol-i3">
            <Key>Sid</Key> <span className="pol-sid">&quot;HireKoushik&quot;</span><Punct>,</Punct>
          </div>
          <div className="pol-line pol-i3">
            <Key>Effect</Key> <span className="pol-allow">&quot;Allow&quot;</span><Punct>,</Punct>
          </div>
          <div className="pol-line pol-i3 pol-cta-line">
            <Key>Action</Key>
            <span className="pol-cta-row">
              <a href="mailto:koushik.kotamraju1610@gmail.com" className="pol-btn pol-btn--primary">Email me</a>
              <a href="/resume" className="pol-btn pol-btn--ghost">Résumé</a>
            </span>
          </div>
          <div className="pol-line pol-i2"><Punct>{"},"}</Punct></div>
          {/* Availability chip lives in the nav on desktop; phones hide that
              bar under the WidgetStack, so it surfaces here instead. */}
          <p className="pol-line pol-avail">
            <span className="pol-open-dot" aria-hidden="true" /> Open to opportunities
          </p>
        </section>

        {/* ── Career statements ─────────────────────────────────────────── */}
        <section className="pol-doc pol-doc--scroll" aria-label="What I build — policy statements">
          {STATEMENTS.map((s, i) => (
            <article className="pol-stmt" key={s.sid} aria-labelledby={`pol-sid-${i}`}>
              <div className="pol-line pol-i2"><Punct>{"{"}</Punct></div>
              <h2 className="pol-line pol-i3 pol-stmt-head" id={`pol-sid-${i}`}>
                <Key>Sid</Key> <span className="pol-sid">&quot;{s.sid}&quot;</span><Punct>,</Punct>
              </h2>
              <div className="pol-line pol-i3">
                <Key>Action</Key> <span className="pol-str">&quot;{s.action}&quot;</span><Punct>,</Punct>
              </div>
              <div className="pol-line pol-i3">
                <Key>Resource</Key> <span className="pol-str pol-str--res">&quot;{s.resource}&quot;</span><Punct>,</Punct>
              </div>
              <p className="pol-line pol-i3 pol-doc-line">
                <Key>Doc</Key> <span className="pol-str pol-str--doc">&quot;{s.doc}&quot;</span>
              </p>
              <div className="pol-line pol-i2"><Punct>{i < STATEMENTS.length - 1 ? "}," : "}"}</Punct></div>
            </article>
          ))}
          <div className="pol-line pol-i1"><Punct>],</Punct></div>
        </section>

        {/* ── Condition: the numbers hold ───────────────────────────────── */}
        <section className="pol-doc pol-doc--scroll" aria-label="Key metrics">
          <div className="pol-line pol-i1"><Key>Condition</Key> <Punct>{"{"}</Punct></div>
          <dl className="pol-conditions">
            {CONDITIONS.map((c, i) => (
              <div key={c.key} className="pol-line pol-i2 pol-cond">
                <dt className="pol-cond-key">
                  <Key>{c.key}</Key>
                </dt>
                <dd className="pol-cond-val">
                  {/* CountUp's own aria-label carries the final value */}
                  <CountUp value={c.value} className="pol-cond-num" />
                  {i < CONDITIONS.length - 1 && <Punct>,</Punct>}
                </dd>
              </div>
            ))}
          </dl>
          <div className="pol-line pol-i1"><Punct>{"},"}</Punct></div>
        </section>

        {/* ── Contact ───────────────────────────────────────────────────── */}
        <section className="pol-doc pol-doc--scroll" aria-label="Contact">
          <div className="pol-line pol-i1"><Key>Contact</Key> <Punct>{"{"}</Punct></div>
          <ul className="pol-contacts" role="list">
            {CONTACT.map((c) => (
              <li key={c.k} className="pol-line pol-i2">
                <a
                  href={c.href}
                  className="pol-contact-link"
                  {...(c.ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  <Key className="pol-contact-k">{c.k}</Key>
                  <span className="pol-contact-v">&quot;{c.v}&quot;</span>
                </a>
              </li>
            ))}
          </ul>
          <div className="pol-line pol-i1"><Punct>{"}"}</Punct></div>
          <div className="pol-line">
            <Punct>{"}"}</Punct>
            {/* Static text cursor at EOF — no blink, no motion cost */}
            <span className="pol-caret" aria-hidden="true" />
          </div>
        </section>
      </main>

      {/* Editor status line — decorative chrome */}
      <footer className="pol-status" aria-hidden="true">
        <span>JSON · UTF-8</span>
        <span className="pol-valid">
          <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M20 6 9 17l-5-5" />
          </svg>
          policy valid · 0 findings
        </span>
      </footer>
    </div>
  );
}
