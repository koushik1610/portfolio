"use client";

import { useState, useEffect } from "react";
import { getCurrentTheme, type Theme } from "@/lib/themes";
import { ScrollTrigger } from "@/lib/gsap";
import AetheraHero from "./layouts/aethera/AetheraHero";
import AvatarHero from "./layouts/avatar/AvatarHero";
import TelemetryHero from "./layouts/telemetry/TelemetryHero";
import BriefingHero from "./layouts/briefing/BriefingHero";
import PolicyHero from "./layouts/policy/PolicyHero";
import CoverageHero from "./layouts/coverage/CoverageHero";
import RfcHero from "./layouts/rfc/RfcHero";
import WrappedHero from "./layouts/wrapped/WrappedHero";
import RouteHero from "./layouts/route/RouteHero";

export default function Hero() {
  const [theme, setTheme] = useState<Theme | null>(null);

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
      ScrollTrigger.refresh();
      setTheme(getCurrentTheme());
    };
    setTheme(getCurrentTheme());
    window.addEventListener("themechange", refresh);
    return () => window.removeEventListener("themechange", refresh);
  }, []);

  if (!theme) return <section id="about" style={{ minHeight: "100vh" }} />;

  switch (theme.layout) {
    case "aethera":   return <AetheraHero   key={theme.id} theme={theme} />;
    case "avatar":    return <AvatarHero    key={theme.id} theme={theme} />;
    case "telemetry": return <TelemetryHero key={theme.id} theme={theme} />;
    case "briefing":  return <BriefingHero  key={theme.id} theme={theme} />;
    case "policy":    return <PolicyHero    key={theme.id} theme={theme} />;
    case "coverage":  return <CoverageHero  key={theme.id} theme={theme} />;
    case "rfc":       return <RfcHero       key={theme.id} theme={theme} />;
    case "wrapped":   return <WrappedHero   key={theme.id} theme={theme} />;
    case "route":     return <RouteHero     key={theme.id} theme={theme} />;
    default: {
      // Exhaustiveness guard: adding a LayoutVariant without a case above is a
      // compile error here instead of a silent undefined render.
      const exhausted: never = theme.layout;
      return exhausted;
    }
  }
}
