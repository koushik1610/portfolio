"use client";
import { useEffect } from "react";
import { getCurrentTheme } from "@/lib/themes";

export default function ThemeApplier() {
  useEffect(() => {
    const apply = () => {
      const theme = getCurrentTheme();
      const root = document.documentElement;
      Object.entries(theme.vars).forEach(([k, v]) => root.style.setProperty(k, v));
      root.dataset.layout = theme.layout;
    };
    apply();
    window.addEventListener("themechange", apply);
    return () => window.removeEventListener("themechange", apply);
  }, []);
  return null;
}
