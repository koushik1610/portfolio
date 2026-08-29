"use client";

import { useRef } from "react";
import type { Theme } from "@/lib/themes";
import { gsap, useGSAP } from "@/lib/gsap";
import CountUp from "@/components/CountUp";
import { EMAIL, EMAIL_HREF, IDENTITY, CONTACT, CAPABILITIES, projectById } from "@/lib/profile";
import { STATS } from "@/lib/stats";
import "./styles.css";

/* ─────────────────────────────────────────────────────────────────────────────
   RFC · layout variant: rfc · class prefix: rc-
   RFC 9161 — The Kotamraju Protocol: a standards-track document rendered
   faithfully. Canonical two-column header block, numbered sections,
   RFC 2119 MUST/SHOULD language, a References section that is his evidence.
   Palette: paper #fcfbf8 · ink #191817 · muted #5d5b55 (~7.3:1) · owned
   accent: ink-teal, derived from the registry token (~5.2:1 on paper).
   Mono throughout except the h1 name (the one deliberate Sans break).
   Animation owner: GSAP only — near-none by genre; documents don't slide.

   2026-07 polish pass (00-STRATEGY-2026-07-cull-and-rebuild.md §5.5): the
   strongest of the three "improve, don't rework" themes per Koushik's own
   review, so the fix is tightening the format's own conceits, not new
   structure — a fuller document-control header (Obsoletes/Updates lines,
   real RFC convention) and heavier, more consistent use of RFC 2119
   MUST/SHOULD/MAY language through the body sections (previously confined
   to §2's own definition, then almost never used again).

   2026-07-12 asset rework: added a real "Status of This Memo" paragraph —
   every published RFC has one and this document was conspicuously missing
   it. Textual-only, zero motion, zero layout risk, deliberately the only
   addition: this theme's own stated genre is "documents don't slide," and
   it was already reviewed as the strongest of its cluster pre-rework, so
   authenticity is the right lever here, not a new visual mechanic.
───────────────────────────────────────────────────────────────────────────── */

const TOC = [
  { href: "#rc-abstract", label: "1.  Abstract" },
  { href: "#rc-lang", label: "2.  Requirements Language" },
  { href: "#rc-overview", label: "3.  Protocol Overview" },
  { href: "#rc-security", label: "4.  Security Considerations" },
  { href: "#rc-iana", label: "5.  IANA Considerations" },
  { href: "#rc-refs", label: "6.  References" },
  { href: "#rc-author", label: "Author's Address" },
] as const;

/* Composed, not copied. The fact comes from the shared layer; the requirements
   language is this theme's voice and stays here. That split is the point: RFC
   2119 keywords are a costume, and a costume must never be the reason a claim
   is phrased differently from how the other six themes phrase it. */
const SECTION_TITLE: Record<string, string> = {
  detection: "Detection",
  identity: "Identity",
  review: "Review",
  "ai-platforms": "AI Platforms",
};

const REQUIREMENTS: Record<string, string> = {
  detection:
    "Coverage claims MUST be measured against the full account estate; a signature fleet SHOULD NOT be represented as complete on the basis of a sample.",
  identity:
    "A path catalogue that originates elsewhere MUST be attributed to its maintainer. An agent SHOULD NOT be trusted before it has been measured against ground truth authored in advance.",
  review:
    "A new cloud architecture MUST undergo review before it is permitted to serve production traffic; this requirement covers every business unit.",
  "ai-platforms":
    "Implementations MUST remain auditable, and an agentic recommendation SHOULD NOT bypass human review on a hard-deny path. A cost comparison MUST NOT be published without a recorded baseline run.",
};

const OVERVIEW = (["detection", "identity", "review", "ai-platforms"] as const).map((id, i) => {
  const c = CAPABILITIES.find((x) => x.id === id)!;
  return { n: `3.${i + 1}`, title: SECTION_TITLE[id], body: `${c.prose.medium} ${REQUIREMENTS[id]}` };
});

/* Values read from the canonical table. ARTEMIS carries a build state rather
   than a figure, because the honest answer to "how many clouds" is one, and a
   number there would imply two. The baseline-expansion row deliberately does
   NOT name the release version: an internal version number is a scrubbed
   figure under the number policy, and "V6" was published here for months. */
const REFERENCES = [
  { tag: "GOAT", value: STATS.goatFindings.value, label: "ground-truth IAM findings" },
  { tag: "ANTITOXIN", value: STATS.toxicCombinations.value, label: "toxic combinations, catalogued by hand" },
  { tag: "ARTEMIS", value: "GCP", label: projectById("artemis").caveat! },
  { tag: "BASELINES", value: STATS.baselines.value, label: "new controls, largest release in program history" },
] as const;

export default function RfcHero({ theme }: { theme: Theme }) {
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

      // Header block settles once — documents don't slide, so no y movement.
      const intro = gsap.from(".rc-header, .rc-title-block, .rc-abstract", {
        autoAlpha: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: "power2.out",
        delay: 0.1,
      });
      settle(intro, 3000);

      // Sections reveal on scroll, once, autoAlpha only.
      gsap.utils.toArray<HTMLElement>(".rc-reveal").forEach((el) => {
        gsap.from(el, {
          autoAlpha: 0,
          duration: 0.5,
          ease: "power2.out",
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
    <div className="rc-root" ref={rootRef}>
      <a href="#rc-main" className="rc-skip">Skip to main content</a>

      <nav className="rc-nav" aria-label="Primary navigation">
        <span className="rc-meta" aria-hidden="true">rfc 9161 · standards track · category: hire</span>
        <span className="rc-open">
          <span className="rc-open-dot" aria-hidden="true" />
          Open to opportunities
        </span>
      </nav>

      <main id="rc-main" className="rc-main">
        {/* ── Canonical RFC header block ──────────────────────────────── */}
        <div className="rc-header">
          <div className="rc-header-col">
            <p>Independent Submission</p>
            <p>Request for Comments: 9161</p>
            <p>Obsoletes: none</p>
            <p>Updates: none</p>
            <p>Category: Standards Track</p>
            <p>ISSN: none (one of one)</p>
          </div>
          <div className="rc-header-col rc-header-col--right">
            <p>K. Kotamraju</p>
            <p>Yahoo Paranoids</p>
            <p>July 2026</p>
          </div>
        </div>

        {/* ── Status of This Memo — real RFC convention, every published
            RFC has one; this document was conspicuously missing it ────── */}
        <div className="rc-status">
          <p className="rc-status-label">Status of This Memo</p>
          <p>
            This document is not an Internet Standards Track specification; it
            is published as an informational reference for interested
            employers. Distribution of this document is unlimited.
          </p>
        </div>

        {/* ── Title block ──────────────────────────────────────────────── */}
        <div className="rc-title-block">
          <p className="rc-eyebrow">The Kotamraju Protocol</p>
          <h1 className="rc-name">Koushik Kotamraju</h1>
          <p className="rc-subtitle">Requirements for Staff-Level Cloud Security Engineering</p>
        </div>

        {/* ── 1. Abstract ──────────────────────────────────────────────── */}
        <section className="rc-abstract" aria-labelledby="rc-abstract">
          <h2 id="rc-abstract">1.  Abstract</h2>
          <p>
            Cloud security engineer building AI-native security platforms —{" "}
            <strong>production systems, not prototypes.</strong> {IDENTITY.hook}
          </p>
          <div className="rc-cta-row">
            <a href={EMAIL_HREF} className="rc-btn rc-btn--primary">Email me</a>
            <a href="/resume/" className="rc-btn rc-btn--ghost">Résumé</a>
          </div>
          <p className="rc-avail">
            <span className="rc-open-dot" aria-hidden="true" /> Open to opportunities
          </p>
        </section>

        {/* ── Table of contents (after the Abstract — real RFC convention) ── */}
        <nav className="rc-toc" aria-label="Table of contents">
          <ol>
            {TOC.map((t) => (
              <li key={t.href}>
                <a href={t.href}>
                  <span>{t.label}</span>
                  <span className="rc-toc-leader" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ol>
        </nav>

        {/* ── 2. Requirements Language ─────────────────────────────────── */}
        <section className="rc-reveal" aria-labelledby="rc-lang">
          <h2 id="rc-lang">2.  Requirements Language</h2>
          <p>
            The key words &quot;<strong className="rc-key">MUST</strong>&quot;,
            &quot;<strong className="rc-key">SHOULD</strong>&quot;, and
            &quot;<strong className="rc-key">MAY</strong>&quot; are to be
            interpreted as described in RFC 2119. The hiring organization{" "}
            <strong className="rc-key">MUST</strong> provide production
            scale. Prototypes <strong className="rc-key">SHOULD NOT</strong>{" "}
            be mistaken for platforms.
          </p>
        </section>

        {/* ── 3. Protocol Overview ─────────────────────────────────────── */}
        <section className="rc-reveal" aria-labelledby="rc-overview">
          <h2 id="rc-overview">3.  Protocol Overview</h2>
          {OVERVIEW.map((o) => (
            <div key={o.n} className="rc-subsection">
              <h3>{o.n}.  {o.title}</h3>
              <p>{o.body}</p>
            </div>
          ))}
        </section>

        {/* ── 4. Security Considerations ───────────────────────────────── */}
        <section className="rc-reveal" aria-labelledby="rc-security">
          <h2 id="rc-security">4.  Security Considerations</h2>
          <p>
            This document IS the security considerations. Every claim above
            MUST trace to a benchmarked artifact, a shipped control, or a
            production system; a claim that cannot be traced this way MUST
            NOT appear in this document — nothing here is aspirational.
          </p>
        </section>

        {/* ── 5. IANA Considerations ───────────────────────────────────── */}
        <section className="rc-reveal" aria-labelledby="rc-iana">
          <h2 id="rc-iana">5.  IANA Considerations</h2>
          <p>
            This document registers one value:{" "}
            <a href={EMAIL_HREF}>{EMAIL}</a>{" "}
            (permanent).
          </p>
        </section>

        {/* ── 6. References ────────────────────────────────────────────── */}
        <section className="rc-reveal" aria-labelledby="rc-refs">
          <h2 id="rc-refs">6.  References</h2>
          <dl className="rc-refs">
            {REFERENCES.map((r) => (
              <div key={r.tag} className="rc-ref-row">
                <dt>[{r.tag}]</dt>
                <dd>
                  <CountUp value={r.value} className="rc-ref-num" /> {r.label}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        {/* ── Author's Address ─────────────────────────────────────────── */}
        <section className="rc-reveal" aria-labelledby="rc-author">
          <h2 id="rc-author">Author&apos;s Address</h2>
          <ul className="rc-contacts" role="list">
            {CONTACT.map((c) => (
              <li key={c.k}>
                <a
                  href={c.href}
                  className="rc-contact-link"
                  {...(c.ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  <span className="rc-contact-k">{c.k}</span>
                  <span className="rc-contact-v">{c.v}</span>
                </a>
              </li>
            ))}
          </ul>
          <p className="rc-eof" aria-hidden="true">[Page 1 of 1]</p>
        </section>
      </main>
    </div>
  );
}
