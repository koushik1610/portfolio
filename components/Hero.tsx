"use client";

import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { getCurrentTheme, type Theme } from "@/lib/themes";
import { ScrollTrigger } from "@/lib/gsap";

// Each theme is its own chunk. These were static imports until 2026-08, which
// meant every visitor downloaded all seven themes to render the one the week's
// rotation picked. ssr:false is correct rather than merely convenient: the
// themes read window/matchMedia at mount, the rotation itself is client-only
// (localStorage offset), and this component already renders a placeholder until
// `theme` resolves — so there was never server-rendered theme markup to lose.
//
// The `loading` fallback is not optional. next/dynamic renders null while a
// chunk is in flight, so without it the document collapses from 100dvh to zero
// height between the line-77 placeholder unmounting and the hero mounting —
// a guaranteed layout shift, and exactly what the double-rAF scroll re-assert
// below exists to fight.
const Placeholder = () => <section id="about" style={{ minHeight: "100dvh" }} />;

const AetheraHero  = dynamic(() => import("./layouts/aethera/AetheraHero"),   { ssr: false, loading: Placeholder });
const AvatarHero   = dynamic(() => import("./layouts/avatar/AvatarHero"),     { ssr: false, loading: Placeholder });
const BriefingHero = dynamic(() => import("./layouts/briefing/BriefingHero"), { ssr: false, loading: Placeholder });
const CoverageHero = dynamic(() => import("./layouts/coverage/CoverageHero"), { ssr: false, loading: Placeholder });
const RfcHero      = dynamic(() => import("./layouts/rfc/RfcHero"),           { ssr: false, loading: Placeholder });
const RouteHero    = dynamic(() => import("./layouts/route/RouteHero"),       { ssr: false, loading: Placeholder });
const IdeHero      = dynamic(() => import("./layouts/ide/IdeHero"),           { ssr: false, loading: Placeholder });
const SwissHero    = dynamic(() => import("./layouts/swiss/SwissHero"),       { ssr: false, loading: Placeholder });

export default function Hero() {
  const [theme, setTheme] = useState<Theme | null>(null);
  // True once a rotation-triggered swap is in flight — distinguishes "just
  // navigated here on this theme" (never force scroll) from "the user
  // clicked rotate" (force scroll on the NEXT theme that mounts).
  const rotatingRef = useRef(false);
  const isFirstMount = useRef(true);

  useEffect(() => {
    // Every theme swap fully unmounts one Hero and mounts another, each
    // creating its own batch of ScrollTriggers. GSAP batches its internal
    // position refresh to the next animation frame for performance; that
    // batched refresh runs independently of React's own commit/cleanup
    // ordering. After enough swaps in succession, a still-pending batched
    // refresh belonging to the theme about to be unmounted can end up
    // interleaved with the next theme's trigger construction, throwing deep
    // inside ScrollTrigger's own internals. Flushing it synchronously here,
    // while the outgoing theme's triggers are still intact, keeps that
    // internal bookkeeping consistent before the swap begins.
    const refresh = () => {
      window.scrollTo({ top: 0, behavior: "auto" });
      rotatingRef.current = true;
      ScrollTrigger.refresh();
      setTheme(getCurrentTheme());
    };
    setTheme(getCurrentTheme());
    window.addEventListener("themechange", refresh);
    return () => window.removeEventListener("themechange", refresh);
  }, []);

  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }
    if (!rotatingRef.current) return;
    rotatingRef.current = false;
    // The incoming theme's own intro tweens (SplitText masks, autoAlpha/y
    // reveals) change element geometry right after mount, and Chromium's
    // scroll-anchoring feature can interpret that as "content changed above
    // the viewport" and silently readjust scrollY away from 0 to compensate
    // — the single scrollTo(0) above the fold in `refresh` landed fine on
    // some themes (route, ide, aethera) but got dragged back down on others
    // (avatar, briefing, coverage) whose intro tweens run heavier layout
    // shifts right at mount. A real bug, caught 2026-07-12: the browser was
    // "correcting" our scroll reset out from under us. Re-asserting scroll
    // top after paint (double rAF, so it runs once layout has settled)
    // wins that fight regardless of which theme just mounted.
    //
    // 2026-08 caveat, since the mechanism above is no longer the whole story:
    // heroes are now dynamic imports, so on a COLD chunk this effect fires
    // while the incoming hero is still `loading` and its DOM does not exist
    // yet — the intro tweens this was written to outrace have not started, and
    // `rotatingRef` is already consumed by the time they do. The guard still
    // works in practice (the `loading` placeholder holds 100dvh, so the
    // document is at scrollY 0 with nothing for anchoring to pull against, and
    // a warm chunk resolves synchronously enough to behave as before), but do
    // not treat the comment above as describing the cold path. If a future
    // theme reintroduces the scroll drag, key this off the resolved component
    // rather than `theme?.id`, or move the re-assert into the hero's own mount.
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        window.scrollTo({ top: 0, behavior: "auto" });
      });
    });
  }, [theme?.id]);

  if (!theme) return <Placeholder />;

  switch (theme.layout) {
    case "aethera":   return <AetheraHero   key={theme.id} theme={theme} />;
    case "avatar":    return <AvatarHero    key={theme.id} theme={theme} />;
    case "briefing":  return <BriefingHero  key={theme.id} theme={theme} />;
    case "coverage":  return <CoverageHero  key={theme.id} theme={theme} />;
    case "rfc":       return <RfcHero       key={theme.id} theme={theme} />;
    case "route":     return <RouteHero     key={theme.id} theme={theme} />;
    case "ide":       return <IdeHero       key={theme.id} theme={theme} />;
    case "swiss":     return <SwissHero     key={theme.id} theme={theme} />;
    default: {
      // Exhaustiveness guard: adding a LayoutVariant without a case above is a
      // compile error here instead of a silent undefined render.
      const exhausted: never = theme.layout;
      return exhausted;
    }
  }
}
