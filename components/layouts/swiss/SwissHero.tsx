"use client";

import { useRef } from "react";
import type { Theme } from "@/lib/themes";
import { gsap, useGSAP } from "@/lib/gsap";
import { createSettle, SETTLE_INTRO, SETTLE_ONFOLD } from "@/lib/settle";
import CountUp from "@/components/CountUp";
import {
  SkipLink,
  skipTarget,
  CtaRow,
  AvailabilityChip,
  SrSummary,
  CONTACT_LINKS,
} from "@/components/layouts/_shared/ThemePrimitives";
import { STATS } from "@/lib/stats";
import { IDENTITY, CAREER as ROLES } from "@/lib/profile";
import "./styles.css";

/* ─────────────────────────────────────────────────────────────────────────────
   SWISS · layout variant: swiss · class prefix: sw-
   The career typeset as a Swiss editorial spread. A dotted full-height column
   grid is laid OVER the page as a measuring instrument, and the content bleeds
   underneath it — the grid measures the work rather than containing it.

   Format argues: rigor and restraint. A fixed instrument applied to many
   different objects is what 100+ security reviews actually are, and it is what
   the reader is looking at.

   Owns: career progression (9 years, four roles) and 100+ security reviews —
   the narrative load left behind by the retiring `route` and `ide`.

   Palette: warm bone #f2f0eb · charcoal #191817 (15.57:1) · muted #5d5b55
   (5.96:1). Never pure black on the type (impeccable/minimalist-ui both ban it,
   and on a warm ground it reads as a hole).

   Owned accent: oxblood #9a3328 (6.41:1 on bone; white-on-accent 7.29:1).
   ACCENT PLACEMENT BUDGET — 4 discretionary placements beyond the five the
   shared primitives already spend (skip-link bg, focus ring, .th-btn--primary
   fill, .th-btn--ghost:hover border, .th-avail-dot):
     1. the parenthesised count numerals in every section eyebrow
     2. the single hairline under the <h1>
     3. the "current" marker on the Yahoo row in the career list
     4. the <strong> in the lede
   Nothing else. None of the five references uses color for hierarchy, and this
   theme's hierarchy comes entirely from four type treatments per section.

   Radius scale: 0. There is not a rounded corner in this theme, deliberately —
   a measuring instrument has none.

   On the condensed face: R2's headline is a condensed heavy grotesque and
   CLAUDE.md §3.1 permits Geist only. `transform: scaleX()` is NOT used to fake
   it — horizontal strokes stay heavy while verticals thin, and the optical
   weight breaks at exactly the display size this hero lives at. Density is
   recovered with weight 800, letter-spacing -0.045em, line-height 0.88, and
   sizing each headline to fill its column measure.

   Motion: ONE signature move — the dotted column rules draw down from the top
   on load and the masthead type is revealed in their wake, on a single
   timeline so the two can never drift. Per plan.md mandate 7b the CSS resting
   state of every animated element is the REVEALED state; the hidden state is
   applied by gsap.set() inside the non-reduced-motion branch only. Under
   `prefers-reduced-motion` nothing runs and nothing is missing.
───────────────────────────────────────────────────────────────────────────── */

/* Career comes from the shared layer. The `sw-` id prefix is this theme's DOM
   namespace, not a fact about the role, so it is applied here rather than
   pushed into the layer where three other themes would have to ignore it. */
const CAREER = ROLES.map((r) => ({ ...r, id: `sw-${r.id}` }));

/* The review practice, stated as what a fixed instrument applied repeatedly
   actually produces. Values come from lib/stats.ts — never inlined. */
const PRACTICE = [
  { k: STATS.securityReviews, scope: "Mail · Sports · Finance · Central Tech" },
  { k: STATS.signatures, scope: "Python / Lambda, evaluated continuously" },
  { k: STATS.awsDetectionScope, scope: "the CSPM detection estate" },
] as const;

export default function SwissHero({ theme }: { theme: Theme }) {
  void theme;
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const { settle, dispose } = createSettle();
      if (prefersReduced) return dispose;

      // ── The signature move ────────────────────────────────────────────────
      // Resting state in CSS is REVEALED (mandate 7b). Everything hidden here
      // is hidden in JS, so a reduced-motion or no-JS reader loses nothing.
      const rules = gsap.utils.toArray<HTMLElement>(".sw-rule");
      const mast = gsap.utils.toArray<HTMLElement>(".sw-mast-reveal");
      gsap.set(rules, { scaleY: 0, transformOrigin: "top center" });
      gsap.set(mast, { autoAlpha: 0, y: 16 });

      const intro = gsap.timeline({ delay: 0.08 });
      intro
        .to(rules, { scaleY: 1, duration: 0.85, ease: "power2.inOut", stagger: 0.06 }, 0)
        // The type is revealed IN THE WAKE of the rules, not alongside them —
        // it starts once the rules are ~40% down the page.
        .to(mast, { autoAlpha: 1, y: 0, duration: 0.6, ease: "power3.out", stagger: 0.075 }, 0.34);
      settle(intro, SETTLE_INTRO);

      // ── On-fold reveals ───────────────────────────────────────────────────
      // Plain settle-protected fade-ups. No second signature move competes.
      gsap.utils.toArray<HTMLElement>(".sw-reveal").forEach((el) => {
        gsap.set(el, { autoAlpha: 0, y: 18 });
        gsap.to(el, {
          autoAlpha: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 84%",
            once: true,
            onEnter: (self) => settle(self.animation as gsap.core.Tween, SETTLE_ONFOLD),
          },
        });
      });

      return dispose;
    },
    { scope: rootRef }
  );

  return (
    <div className="sw-root th-root" ref={rootRef}>
      <SkipLink targetId="sw-main" />

      {/* ── The measuring instrument ───────────────────────────────────────
          ONE absolutely-positioned layer at z-index 0, beneath the content,
          never per-column borders — per-column borders lose alignment at every
          breakpoint because they resolve against each column's own box. The
          rules are separate elements only so the signature move can stagger
          them; the spacing is still a single grid definition. */}
      <div className="sw-grid" aria-hidden="true">
        <span className="sw-rule" />
        <span className="sw-rule" />
        <span className="sw-rule" />
      </div>

      {/* Decorative and aria-hidden. The real, full-scale, unrotated <h1> lives
          in the main column — rotated letterspaced caps at rail size is both a
          person-first violation and a low-vision legibility problem. */}
      <span className="sw-rail" aria-hidden="true">Koushik Kotamraju</span>

      <nav className="sw-nav" aria-label="Primary navigation">
        <span className="sw-nav-mark" aria-hidden="true">KK</span>
        <span className="sw-nav-meta" aria-hidden="true">Portfolio · 2026</span>
      </nav>

      <main {...skipTarget("sw-main")} className="sw-main">
        {/* ── Masthead ─────────────────────────────────────────────────── */}
        <header className="sw-masthead">
          {/* Counterweight, upper right — R2's third-column device. Without it
              the headline has nothing to measure against and the right two
              thirds read as unfinished rather than as deliberate whitespace.
              It also carries the domain claim: the grid-as-instrument metaphor
              means nothing until it is attached to what a review actually is. */}
          <p className="sw-counter sw-mast-reveal">
            A security review is a fixed instrument applied to work that is different every
            time. One hundred and fifty of them, across every business unit, before launch.
          </p>
          <p className="sw-kicker sw-mast-reveal">
            Sr. Technical Security Engineer · Yahoo Paranoids
          </p>
          <h1 className="sw-name sw-mast-reveal">Koushik Kotamraju</h1>
          <span className="sw-name-rule sw-mast-reveal" aria-hidden="true" />
          <p className="sw-lede sw-mast-reveal">
            Cloud security engineer building AI-native security platforms.{" "}
            <strong className="sw-em">Production systems, not prototypes.</strong>
          </p>
          <p className="sw-hook sw-mast-reveal">
            {IDENTITY.hook}
          </p>

          {/* The CTA obeys the index grammar via a WRAPPER. <CtaRow /> renders
              unmodified — same fill, same ghost, same order, same 44px. .sw-cta
              sets position and margin only; it never touches .th-btn. */}
          <div className="sw-index-row sw-mast-reveal">
            <span className="sw-index-num" aria-hidden="true">(00)</span>
            <span className="sw-index-label" aria-hidden="true">CONTACT</span>
            <CtaRow className="sw-cta" />
          </div>

          <AvailabilityChip className="sw-avail sw-mast-reveal" />
        </header>

        {/* ── (09) The career ──────────────────────────────────────────── */}
        <section className="sw-section" aria-labelledby="sw-career-head">
          <div className="sw-section-head sw-reveal">
            <p className="sw-eyebrow">
              <span className="sw-eyebrow-num">(09)</span> YEARS
            </p>
            <h2 id="sw-career-head" className="sw-h2">Four roles, one direction</h2>
            <p className="sw-sub">FROM PRODUCTION SYSTEMS INTO CLOUD SECURITY</p>
            <p className="sw-body">
              Nine years across detection engineering, IAM privilege analysis and identity
              governance, and multi-agent orchestration at enterprise scale. The order matters:
              the infrastructure work came first, which is why the security work is built rather
              than bolted on.
            </p>
          </div>

          <ol className="sw-roles" role="list">
            {CAREER.map((r) => (
              <li key={r.id} id={r.id} className="sw-role sw-reveal">
                <p className="sw-role-period">{r.period}</p>
                <div className="sw-role-body">
                  <h3 className="sw-role-org">
                    {r.org}
                    {r.current && (
                      <span className="sw-role-current" aria-label="current role">
                        <span aria-hidden="true">· current</span>
                      </span>
                    )}
                  </h3>
                  <p className="sw-role-title">{r.title}</p>
                  <p className="sw-role-note">{r.note}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* ── (100+) The practice ──────────────────────────────────────── */}
        <section className="sw-section" aria-labelledby="sw-practice-head">
          <div className="sw-section-head sw-reveal">
            <p className="sw-eyebrow">
              <span className="sw-eyebrow-num">(100+)</span> REVIEWS
            </p>
            <h2 id="sw-practice-head" className="sw-h2">One instrument, many objects</h2>
            <p className="sw-sub">PARANOID SECURITY REVIEW · THREAT MODELLING BEFORE LAUNCH</p>
            <p className="sw-body">
              A security review is a fixed instrument applied to work that is different every
              time. Partnering with Product Security, Network, and Identity to threat-model and
              approve new cloud architectures before they ship, and building the agentic review
              platform underneath it that removed the backlog.
            </p>
          </div>

          <dl className="sw-measures">
            {PRACTICE.map((p) => (
              <div key={p.k.label} className="sw-measure sw-reveal">
                <dt className="sw-measure-label">{p.k.label}</dt>
                <dd className="sw-measure-val">
                  <CountUp value={p.k.value} className="sw-measure-num" />
                  <span className="sw-measure-scope">{p.scope}</span>
                  <span className="sw-measure-ctx">{p.k.context}</span>
                </dd>
              </div>
            ))}
          </dl>
        </section>

        {/* ── Terminus ─────────────────────────────────────────────────── */}
        <section className="sw-terminus sw-reveal" aria-labelledby="sw-end-head">
          <p className="sw-eyebrow">
            <span className="sw-eyebrow-num">(00)</span> CONTACT
          </p>
          <h2 id="sw-end-head" className="sw-h2">Open to what&apos;s next</h2>
          <p className="sw-body">
            Staff and Principal Security Engineer roles, and AI Security Engineer roles, at FAANG
            and AI-native startups.
          </p>
          <CtaRow className="sw-cta sw-cta--end" />
          <ul className="sw-contacts" role="list">
            {CONTACT_LINKS.map((c) => (
              <li key={c.k}>
                <a
                  href={c.href}
                  className="sw-contact"
                  {...(c.ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  <span className="sw-contact-k">{c.k}</span>
                  <span className="sw-contact-v">{c.v}</span>
                </a>
              </li>
            ))}
          </ul>
        </section>

        {/* Last child of <main>, never first (mandate 2). */}
        <SrSummary />
      </main>
    </div>
  );
}
