"use client";

import { useState, useEffect } from "react";
import { getCurrentTheme, type Theme } from "@/lib/themes";
import { ScrollTrigger } from "@/lib/gsap";
import AetheraHero from "./layouts/aethera/AetheraHero";
import CommandHero from "./layouts/command/CommandHero";
import LumenHero from "./layouts/lumen/LumenHero";
import AxiomHero from "./layouts/axiom/AxiomHero";
import AvatarHero from "./layouts/avatar/AvatarHero";
import TelemetryHero from "./layouts/telemetry/TelemetryHero";
import SolsticeHero from "./layouts/solstice/SolsticeHero";
import CasefileHero from "./layouts/casefile/CasefileHero";
import BriefingHero from "./layouts/briefing/BriefingHero";
import MonolithHero from "./layouts/monolith/MonolithHero";
import AdvisoryHero from "./layouts/advisory/AdvisoryHero";
import InterceptHero from "./layouts/intercept/InterceptHero";
import UptimeHero from "./layouts/uptime/UptimeHero";
import DispatchHero from "./layouts/dispatch/DispatchHero";
import WaveformHero from "./layouts/waveform/WaveformHero";
import PolicyHero from "./layouts/policy/PolicyHero";
import CoverageHero from "./layouts/coverage/CoverageHero";
import RfcHero from "./layouts/rfc/RfcHero";
import ReferenceHero from "./layouts/reference/ReferenceHero";
import MainlineHero from "./layouts/mainline/MainlineHero";
import OncallHero from "./layouts/oncall/OncallHero";
import WrappedHero from "./layouts/wrapped/WrappedHero";

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
    case "aethera":  return <AetheraHero  key={theme.id} theme={theme} />;
    case "command":   return <CommandHero   key={theme.id} theme={theme} />;
    case "lumen":     return <LumenHero     key={theme.id} theme={theme} />;
    case "axiom":     return <AxiomHero     key={theme.id} theme={theme} />;
    case "avatar":    return <AvatarHero    key={theme.id} theme={theme} />;
    case "telemetry": return <TelemetryHero key={theme.id} theme={theme} />;
    case "solstice":  return <SolsticeHero  key={theme.id} theme={theme} />;
    case "casefile":  return <CasefileHero  key={theme.id} theme={theme} />;
    case "briefing":  return <BriefingHero  key={theme.id} theme={theme} />;
    case "monolith":  return <MonolithHero  key={theme.id} theme={theme} />;
    case "advisory":  return <AdvisoryHero  key={theme.id} theme={theme} />;
    case "intercept": return <InterceptHero key={theme.id} theme={theme} />;
    case "uptime":    return <UptimeHero    key={theme.id} theme={theme} />;
    case "dispatch":  return <DispatchHero  key={theme.id} theme={theme} />;
    case "waveform":  return <WaveformHero  key={theme.id} theme={theme} />;
    case "policy":    return <PolicyHero    key={theme.id} theme={theme} />;
    case "coverage":  return <CoverageHero  key={theme.id} theme={theme} />;
    case "rfc":       return <RfcHero       key={theme.id} theme={theme} />;
    case "reference": return <ReferenceHero key={theme.id} theme={theme} />;
    case "mainline":  return <MainlineHero  key={theme.id} theme={theme} />;
    case "oncall":    return <OncallHero    key={theme.id} theme={theme} />;
    case "wrapped":   return <WrappedHero   key={theme.id} theme={theme} />;
    default: {
      // Exhaustiveness guard: adding a LayoutVariant without a case above is a
      // compile error here instead of a silent undefined render.
      const exhausted: never = theme.layout;
      return exhausted;
    }
  }
}
