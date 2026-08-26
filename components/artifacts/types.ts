/* ─────────────────────────────────────────────────────────────────────────────
   ARTIFACT LAYER — shared contract
   Added 2026-08. The rotation's defining defect was that every theme was
   type-only while every reference site is dense with real visual artifacts.
   These components are the things worth looking at.

   THE RULE THAT KEEPS THIS HONEST: an artifact draws real data or it does not
   ship. That is the line between a chart (which design-taste-frontend permits)
   and hand-rolled decorative SVG (which it bans). Every artifact below sources
   its numbers from lib/stats.ts or from its own typed `as const` dataset.
   Nothing is invented to look technical.

   Every artifact obeys these rules. They are a checklist, not an enforced
   contract — TypeScript cannot express most of them. The two that MUST hold
   are made structural instead: artifacts render their own text equivalent, and
   artifacts pin their own `color` rather than inheriting it.

   Rules:
     1. Data-driven, per above.
     2. Inline SVG. Not canvas (never completes, breaks the settle contract),
        not a static asset (goes stale, cannot retheme).
     3. Themeable — colors come from currentColor and CSS custom properties, so
        the same matrix renders glacier in one theme and oxblood in another.
     4. Resting state IS the revealed state. Any undrawn state is applied by
        gsap.set() inside the non-reduced-motion branch only, so reduced-motion
        and no-JS readers get a complete artifact.
     5. The <svg> is aria-hidden + focusable="false"; a real text equivalent
        renders as a sibling. A screen reader gets the claim, not a decoration.
        5b. The equivalent carries the artifact's DATA, not a summary of it.
        Prefer real semantics (a <table>) over prose where the data is tabular:
        a caption saying "20 of 24 covered" without naming which is a summary,
        and leaves a screen-reader user with no way to learn the rest.
     6. No infinite animation. Every tween completes.
     7. An artifact that encodes an ordinal or categorical variable renders a
        VISIBLE key. An encoding without a key is decoration. The screen reader
        must never receive more information than the eye.
     8. Every encoding carries a second, non-color channel (a rule, a glyph, a
        stroke style). Opacity and fill both flatten to a single system colour
        under `forced-colors: active`, so a color-only encoding loses 100% of
        its meaning there rather than degrading.
     9. Prefer HTML to SVG for anything that is really a table or a grid of
        labelled boxes. SVG-unit type ignores browser text zoom and any
        minimum-font-size setting and never reflows, so it renders at ~3px on a
        phone with no recourse for the reader. Reserve inline SVG for genuinely
        vector work (paths, graphs, curves).
    10. UNIT CONVENTION for SVG artifacts: 1 user unit = 1 CSS px at the
        artifact's design width, with the artifact capped at that width. Type
        sizes are then real px values, comparable across artifacts.
───────────────────────────────────────────────────────────────────────────── */

export interface ArtifactProps {
  /** Extra class on the wrapping figure. Themes position; they do not restyle. */
  className?: string;
  /**
   * Stable id prefix for SVG-internal ids (gradients, clip paths, masks).
   * SVG ids are document-global, so two instances of the same artifact on one
   * page collide and the second silently inherits the first's paint server.
   * Every artifact that defines an id MUST namespace it with this.
   */
  idPrefix?: string;
}

/** Marks the animatable sub-parts so a theme's GSAP block can target them. */
export const ARTIFACT_ANIM = {
  /** Elements that draw in via stroke-dashoffset. */
  draw: "af-draw",
  /** Elements that fade/scale in, staggered. */
  enter: "af-enter",
} as const;
