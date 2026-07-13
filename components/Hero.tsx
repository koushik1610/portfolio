"use client";

import { useState, useEffect, useRef } from "react";
import { getCurrentTheme, type Theme } from "@/lib/themes";
import { ScrollTrigger } from "@/lib/gsap";
import AetheraHero from "./layouts/aethera/AetheraHero";
import AvatarHero from "./layouts/avatar/AvatarHero";
import BriefingHero from "./layouts/briefing/BriefingHero";
import CoverageHero from "./layouts/coverage/CoverageHero";
import RfcHero from "./layouts/rfc/RfcHero";
import RouteHero from "./layouts/route/RouteHero";
import IdeHero from "./layouts/ide/IdeHero";

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
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        window.scrollTo({ top: 0, behavior: "auto" });
      });
    });
  }, [theme?.id]);

  if (!theme) return <section id="about" style={{ minHeight: "100vh" }} />;

  switch (theme.layout) {
    case "aethera":   return <AetheraHero   key={theme.id} theme={theme} />;
    case "avatar":    return <AvatarHero    key={theme.id} theme={theme} />;
    case "briefing":  return <BriefingHero  key={theme.id} theme={theme} />;
    case "coverage":  return <CoverageHero  key={theme.id} theme={theme} />;
    case "rfc":       return <RfcHero       key={theme.id} theme={theme} />;
    case "route":     return <RouteHero     key={theme.id} theme={theme} />;
    case "ide":       return <IdeHero       key={theme.id} theme={theme} />;
    default: {
      // Exhaustiveness guard: adding a LayoutVariant without a case above is a
      // compile error here instead of a silent undefined render.
      const exhausted: never = theme.layout;
      return exhausted;
    }
  }
}
