"use client";
import { useLayoutEffect } from "react";
import { getCurrentTheme } from "@/lib/themes";

export default function ThemeApplier() {
  // useLayoutEffect (not useEffect): CSS vars + data-layout must land before
  // the browser's first paint of the real theme content, not after, or that
  // first frame paints with default/unset vars.
  useLayoutEffect(() => {
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
