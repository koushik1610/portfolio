import type { gsap } from "@/lib/gsap";

/* ─────────────────────────────────────────────────────────────────────────────
   SETTLE FAILSAFE
   A throttled rAF ticker (backgrounded tab, low-power mode, a browser that
   deprioritises an offscreen document) must never leave content permanently
   hidden. Every GSAP tween that reveals content arms a wall-clock timeout that
   force-completes it; wall-clock timers still fire when rAF does not.

   The rule this implements, stated as a property of CONTENT rather than of
   tweens: no element's visibility, opacity, or in-flow position may depend on
   a non-completing animation.

   Consequences:
   - A CSS marquee starting at translate:0 is legal — the content is fully
     visible before the animation begins, so it satisfies the rule by
     construction and needs no timer here.
   - A GSAP reveal from autoAlpha:0 is illegal WITHOUT a timer, because a
     stalled rAF leaves it invisible.
   - A physics tick that positions elements is illegal outright: progress()
     never reaches 1, so no timer can rescue it.

   Extracted 2026-08 from the duplicate copies in aethera/avatar/route (and
   formerly briefing/coverage/rfc/ide), which all declared the same 12 lines
   with a different prefix.

   NOT covered by this extraction: components/CountUp.tsx carries a fourth,
   differently-shaped failsafe (`duration + 1500`). It drives rAF directly
   rather than through GSAP, so it has no `progress()` to force and nothing
   here applies to it. Leave it alone rather than trying to unify them.
───────────────────────────────────────────────────────────────────────────── */

/**
 * House timings. Intro tweens settle at 3000ms, on-fold reveals at 2500ms.
 * Pass one of these explicitly at every call site — see `settle` below.
 */
export const SETTLE_INTRO = 3000;
export const SETTLE_ONFOLD = 2500;

type Animation = gsap.core.Tween | gsap.core.Timeline;

export interface Settle {
  /**
   * Arm a wall-clock failsafe that force-completes `animation` after `ms`.
   *
   * `ms` is REQUIRED on purpose. It defaulted to SETTLE_INTRO briefly, which
   * meant a forgotten second argument silently gave an on-fold reveal 3000ms
   * instead of 2500 — a wrong timing that still "works" and so never gets
   * noticed. Pass SETTLE_INTRO or SETTLE_ONFOLD explicitly.
   */
  settle: (animation: Animation, ms: number) => void;
  /** Clear every armed timer. Call from the useGSAP cleanup. */
  dispose: () => void;
}

/**
 * Usage inside a theme's useGSAP block:
 *
 *   const { settle, dispose } = createSettle();
 *   if (prefersReduced) return dispose;
 *
 *   const intro = gsap.from(".x-masthead > *", { autoAlpha: 0, y: 14 });
 *   settle(intro, SETTLE_INTRO);
 *
 *   gsap.from(el, {
 *     autoAlpha: 0,
 *     scrollTrigger: {
 *       trigger: el,
 *       start: "top 82%",
 *       once: true,
 *       onEnter: (self) => settle(self.animation as gsap.core.Tween, SETTLE_ONFOLD),
 *     },
 *   });
 *
 *   return dispose;
 *
 * Returning `dispose` directly is deliberate: it is already the exact cleanup
 * signature useGSAP expects, so there is no wrapper closure to get wrong.
 */
export function createSettle(): Settle {
  const timers: number[] = [];

  return {
    settle(animation: Animation, ms: number) {
      timers.push(
        window.setTimeout(() => {
          if (animation.progress() < 1) animation.progress(1);
        }, ms)
      );
    },
    dispose() {
      timers.forEach((t) => window.clearTimeout(t));
      timers.length = 0;
    },
  };
}
