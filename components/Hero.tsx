"use client";

import { useState, useEffect } from "react";
import { getCurrentTheme, type Theme } from "@/lib/themes";
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

export default function Hero() {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    const refresh = () => setTheme(getCurrentTheme());
    refresh();
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
    default: {
      // Exhaustiveness guard: adding a LayoutVariant without a case above is a
      // compile error here instead of a silent undefined render.
      const exhausted: never = theme.layout;
      return exhausted;
    }
  }
}
