"use client";

import { SR_SUMMARY } from "@/lib/stats";
import "./theme-base.css";

/* ─────────────────────────────────────────────────────────────────────────────
   THEME PRIMITIVES — the parts every theme must ship identically.

   Extracted 2026-08. These four are the pieces where variation is a bug rather
   than a feature: the skip link, the CTA row, the availability chip, and the
   screen-reader summary. Everything a theme actually differentiates on (layout,
   surfaces, motion, type) stays in the theme.

   Deliberately NOT extracted: a shared <Masthead>. Four themes whose entire
   purpose is structural difference each want different DOM for the same
   semantic block; that component would grow a prop per theme and become the
   most fragile abstraction in the repo. The masthead stays a documented
   snippet in theme-plans/CONVENTIONS-extracted-2026-08.md §7.

   Importing any of these pulls in theme-base.css, which is opt-in via the
   `th-root` class — see that file's header.
───────────────────────────────────────────────────────────────────────────── */

export const EMAIL = "koushik.kotamraju1610@gmail.com";
export const EMAIL_HREF = `mailto:${EMAIL}`;

/** Canonical availability copy. Targets the role rather than stating a status. */
export const AVAILABILITY =
  "Open to Staff & Principal Security Engineer roles · AI Security";

/** Shared external links, in the order every theme lists them. */
export const CONTACT_LINKS = [
  { k: "Email", v: EMAIL, href: EMAIL_HREF, ext: false },
  { k: "LinkedIn", v: "in/koushikkotamraju", href: "https://www.linkedin.com/in/koushikkotamraju/", ext: true },
  { k: "GitHub", v: "github.com/koushik1610", href: "https://github.com/koushik1610", ext: true },
] as const;

/**
 * First child of the theme root, before the nav. `targetId` is the id on the
 * theme's <main>. Pair it with skipTarget() — see below for why.
 */
export function SkipLink({ targetId }: { targetId: string }) {
  return (
    <a href={`#${targetId}`} className="th-skip">
      Skip to main content
    </a>
  );
}

/**
 * Props every skip-link target must carry. Fragment navigation sets the
 * sequential focus navigation starting point but does NOT move focus to a
 * non-focusable element, and VoiceOver in particular does not reliably follow.
 * `tabIndex={-1}` makes the target programmatically focusable so the skip
 * actually skips.
 *
 * Spread it onto the theme's <main>:
 *
 *   <main {...skipTarget("c1-main")} className="c1-main">
 *
 * Extracting the link without this contract would have left each theme to
 * rediscover it — the exact copy-paste tax this layer exists to end.
 */
export function skipTarget(id: string) {
  return { id, tabIndex: -1 } as const;
}

/**
 * The mandatory above-fold action pair. Primary first, ghost second, always.
 * Themes position this; they do not restyle it.
 */
export function CtaRow({ className }: { className?: string }) {
  return (
    <div className={className ? `th-cta-row ${className}` : "th-cta-row"}>
      <a href={EMAIL_HREF} className="th-btn th-btn--primary">Email me</a>
      {/* Trailing slash is required: next.config.ts sets trailingSlash: true,
          so "/resume" costs every visitor a redirect hop on GitHub Pages. */}
      <a href="/resume/" className="th-btn th-btn--ghost">Résumé</a>
    </div>
  );
}

/**
 * Renders once per page, in the masthead beside the CTA row. The dot is
 * aria-hidden; the text carries the meaning.
 */
export function AvailabilityChip({ className }: { className?: string }) {
  return (
    <p className={className ? `th-avail ${className}` : "th-avail"}>
      <span className="th-avail-dot" aria-hidden="true" />
      {AVAILABILITY}
    </p>
  );
}

/**
 * The theme-independent extractable floor.
 *
 * Render this once as the LAST child of <main>, never the first. It is ~120
 * words of dense stats; as the first child a screen-reader user hears the
 * entire quantitative story before reaching any actual content, on every
 * visit, and it duplicates whatever the theme renders visibly. It is the
 * backstop, not the primary path — the primary path is cross-cutting mandate 1
 * (real headings and paragraphs).
 *
 * Scope note: every hero is a client-only dynamic import (ssr: false), so the
 * statically exported HTML contains no theme markup at all. This helps agents
 * that execute JS; it does nothing for a raw-HTML crawler. public/llms.txt is
 * the no-JS story.
 */
export function SrSummary() {
  return <p className="th-sr-only">{SR_SUMMARY}</p>;
}
