"use client";

import { useState, useEffect } from "react";
import { getCurrentTheme, type Theme } from "@/lib/themes";
import StudioHero from "./layouts/studio/StudioHero";
import Avatar3dHero from "./layouts/avatar3d/Avatar3dHero";
import AetheraHero from "./layouts/aethera/AetheraHero";
import OrbHero from "./layouts/orb/OrbHero";
import WTheme07Hero from "./layouts/w-theme-07/WTheme07Hero";
import WTheme08Hero from "./layouts/w-theme-08/WTheme08Hero";
import WTheme11Hero from "./layouts/w-theme-11/WTheme11Hero";
import WTheme12Hero from "./layouts/w-theme-12/WTheme12Hero";
import WTheme13Hero from "./layouts/w-theme-13/WTheme13Hero";
import WTheme14Hero from "./layouts/w-theme-14/WTheme14Hero";

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
    case "studio":   return <StudioHero   key={theme.id} theme={theme} />;
    case "avatar3d": return <Avatar3dHero key={theme.id} theme={theme} />;
    case "aethera":  return <AetheraHero  key={theme.id} theme={theme} />;
    case "orb":      return <OrbHero      key={theme.id} theme={theme} />;
    case "w7":       return <WTheme07Hero key={theme.id} theme={theme} />;
    case "w8":       return <WTheme08Hero key={theme.id} theme={theme} />;
    case "w11":      return <WTheme11Hero key={theme.id} theme={theme} />;
    case "w12":      return <WTheme12Hero key={theme.id} theme={theme} />;
    case "w13":      return <WTheme13Hero key={theme.id} theme={theme} />;
    case "w14":      return <WTheme14Hero key={theme.id} theme={theme} />;
  }
}
