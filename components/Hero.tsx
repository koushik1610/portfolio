"use client";

import { useEffect, useRef, useState, type ComponentType } from "react";
import dynamic from "next/dynamic";
import { resolveTheme } from "@/lib/rotation";
import type { ThemeSlug } from "@/lib/themes";
import { IDENTITY, EMAIL_HREF } from "@/lib/profile";
import { SR_SUMMARY } from "@/lib/stats";

/* Each theme is its own chunk, so a visitor downloads one theme's code and
   styles. ssr:false is correct: the rotation is client-only (localStorage), and
   the <head> script has already set data-theme, so the placeholder paints in
   the right colours. The placeholder holds 100dvh so nothing shifts while the
   chunk loads. */
const Placeholder = () => (
  <div style={{ minHeight: "100dvh" }}>
    {/* The exported HTML has no theme markup (every theme is client-only), so
        this is what a crawler or a no-JS fetcher reads. Inert when JS runs. */}
    <noscript>
      <main style={{ maxWidth: "65ch", margin: "0 auto", padding: "48px 16px" }}>
        <h1>{IDENTITY.name}</h1>
        <p>{IDENTITY.lede}</p>
        <p>{SR_SUMMARY}</p>
        <p>
          <a href={EMAIL_HREF}>Email me</a>, or read the <a href="/resume/">résumé</a>.
        </p>
      </main>
    </noscript>
  </div>
);

/* A Record, not a switch: a slug added to THEME_SLUGS without a component here
   is a compile error. */
const HEROES: Record<ThemeSlug, ComponentType> = {
  console: dynamic(() => import("./layouts/console/ConsoleHero"), { ssr: false, loading: Placeholder }),
  ink: dynamic(() => import("./layouts/ink/InkHero"), { ssr: false, loading: Placeholder }),
  darkroom: dynamic(() => import("./layouts/darkroom/DarkroomHero"), { ssr: false, loading: Placeholder }),
  brutal: dynamic(() => import("./layouts/brutal/BrutalHero"), { ssr: false, loading: Placeholder }),
  blueprint: dynamic(() => import("./layouts/blueprint/BlueprintHero"), { ssr: false, loading: Placeholder }),
};

export default function Hero() {
  const [slug, setSlug] = useState<ThemeSlug | null>(null);
  const rotated = useRef(false);

  useEffect(() => {
    setSlug(resolveTheme());
    const onChange = () => {
      rotated.current = true;
      window.scrollTo({ top: 0, behavior: "auto" });
      setSlug(resolveTheme());
    };
    window.addEventListener("themechange", onChange);
    return () => window.removeEventListener("themechange", onChange);
  }, []);

  /* After "Next theme", move focus to the new page's <h1> so a keyboard or
     screen-reader user lands at the top of what changed. The incoming chunk
     may still be loading, so look for the heading for up to two seconds. */
  useEffect(() => {
    if (!rotated.current || !slug) return;
    rotated.current = false;
    let tries = 0;
    const id = window.setInterval(() => {
      const h1 = document.querySelector<HTMLElement>("main h1");
      if (h1 || ++tries > 40) {
        window.clearInterval(id);
        if (h1) {
          if (!h1.hasAttribute("tabindex")) h1.setAttribute("tabindex", "-1");
          h1.focus({ preventScroll: true });
          window.scrollTo({ top: 0, behavior: "auto" });
        }
      }
    }, 50);
    return () => window.clearInterval(id);
  }, [slug]);

  if (!slug) return <Placeholder />;
  const Page = HEROES[slug];
  return <Page key={slug} />;
}
