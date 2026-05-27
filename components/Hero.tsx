"use client";

import { useState, useEffect } from "react";
import { getCurrentTheme, type Theme } from "@/lib/themes";
import OracleHero from "./layouts/oracle/OracleHero";
import AssemblyHero from "./layouts/assembly/AssemblyHero";
import StudioHero from "./layouts/studio/StudioHero";
import Avatar3dHero from "./layouts/avatar3d/Avatar3dHero";
import AetheraHero from "./layouts/aethera/AetheraHero";
import OrbHero from "./layouts/orb/OrbHero";

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
    case "oracle":   return <OracleHero   key={theme.id} theme={theme} />;
    case "assembly": return <AssemblyHero key={theme.id} theme={theme} />;
    case "studio":   return <StudioHero   key={theme.id} theme={theme} />;
    case "avatar3d": return <Avatar3dHero key={theme.id} theme={theme} />;
    case "aethera":  return <AetheraHero  key={theme.id} theme={theme} />;
    case "orb":      return <OrbHero      key={theme.id} theme={theme} />;
  }
}
