import { SR_SUMMARY } from "@/lib/stats";
import { EMAIL_HREF } from "@/lib/profile";

/* ─────────────────────────────────────────────────────────────────────────────
   THEME PRIMITIVES. The parts every theme ships identically, because variation
   in them is a bug: the skip link, the action pair, the screen-reader summary.

   Rebuilt 2026-10-31 for the Hallmark themes. The CtaRow keeps its DOM, labels
   and order (Email first, Résumé second, on every theme), and gives up its
   shared look: each Hallmark theme styles .th-btn inside its own [data-theme]
   scope, because each theme material defines its own primary control. Base
   defaults live in app/globals.css and use tokens only.

   The availability chip is gone. Its dot failed Hallmark Floor 10 (decorative
   status dots), and the sentence it carried is in lib/profile.ts for any theme
   that wants it as plain text.
───────────────────────────────────────────────────────────────────────────── */

export { EMAIL, EMAIL_HREF, AVAILABILITY, CONTACT } from "@/lib/profile";

/** First child of the theme root. Pair with skipTarget() on <main>. */
export function SkipLink({ targetId }: { targetId: string }) {
  return (
    <a href={`#${targetId}`} className="th-skip">
      Skip to main content
    </a>
  );
}

/** Fragment navigation does not move focus to a non-focusable element, so the
 *  skip target needs tabIndex -1 for the skip to actually skip. */
export function skipTarget(id: string) {
  return { id, tabIndex: -1 } as const;
}

/** The mandatory action pair. Primary first, secondary second, always. */
export function CtaRow({ className }: { className?: string }) {
  return (
    <div className={className ? `th-cta-row ${className}` : "th-cta-row"}>
      <a href={EMAIL_HREF} className="th-btn th-btn--primary">Email me</a>
      {/* Trailing slash: next.config.ts sets trailingSlash, so /resume costs a redirect. */}
      <a href="/resume/" className="th-btn th-btn--secondary">Résumé</a>
    </div>
  );
}

/** The theme-independent text floor. Last child of <main>, never first. */
export function SrSummary() {
  return <p className="visually-hidden">{SR_SUMMARY}</p>;
}
