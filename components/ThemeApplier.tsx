"use client";
import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";
import { resolveTheme } from "@/lib/rotation";

/* The <head> script from rotationScript() sets data-theme before first paint.
   This keeps it right after hydration, after every rotation, and after every
   client-side navigation. The root layout persists across navigations, so the
   head script runs once per full load; without the pathname dependency, the
   résumé's "Back to koushik.io" link left data-theme="resume" on the home page
   and every theme rule, all scoped to [data-theme="<slug>"], stopped matching. */
export default function ThemeApplier() {
  const pathname = usePathname();
  useLayoutEffect(() => {
    const apply = () => {
      document.documentElement.dataset.theme = window.location.pathname.startsWith("/resume")
        ? "resume"
        : resolveTheme();
    };
    apply();
    window.addEventListener("themechange", apply);
    return () => window.removeEventListener("themechange", apply);
  }, [pathname]);
  return null;
}
