"use client";

import { useEffect, useState } from "react";
import { nextTheme, resolveTheme } from "@/lib/rotation";
import { THEME_SLUGS, themeBySlug } from "@/lib/themes";

/* ─────────────────────────────────────────────────────────────────────────────
   SITE CONTROLS. Replaces the fixed top-right WidgetStack (deleted 2026-10-31).

   That stack failed Hallmark Floors 9 and 11 in every theme (tracked capitals,
   a glass card, a row of brand logos, a pulsing dot), covered the hero at 375px,
   and made every nav reserve 270px for it. The council's ruling: the behaviour
   stays, the floating chrome goes. Each theme places these inside its own nav
   and contact section and restyles the classes in its own scope.
───────────────────────────────────────────────────────────────────────────── */

/** "Next theme: Ink". A text button for the theme's nav. */
export function NextThemeButton({ className }: { className?: string }) {
  const [label, setLabel] = useState<string | null>(null);

  useEffect(() => {
    const update = () => {
      const current = resolveTheme();
      const next = THEME_SLUGS[(THEME_SLUGS.indexOf(current) + 1) % THEME_SLUGS.length];
      setLabel(themeBySlug(next).name);
    };
    update();
    window.addEventListener("themechange", update);
    return () => window.removeEventListener("themechange", update);
  }, []);

  return (
    <button type="button" className={className ? `sc-next ${className}` : "sc-next"} onClick={nextTheme}>
      Next theme{label ? `: ${label}` : ""}
    </button>
  );
}

const LLMS_URL = "https://koushik.io/llms.txt";

/* URL-only on purpose (CLAUDE.md pitfall 3): the facts live in llms.txt, which
   is generated from the same master as the site, so the prompt never carries a
   second copy that can go stale. It asks the tool to stay inside the file. */
const PROMPT =
  `Read ${LLMS_URL}, Koushik Kotamraju's profile, and summarise his background and strongest work ` +
  `for a hiring manager. Use only what that file says, cite it, and say so when something I ask about is not in it.`;

const TOOLS = [
  { name: "Claude", href: `https://claude.ai/new?q=${encodeURIComponent(PROMPT)}` },
  { name: "ChatGPT", href: `https://chatgpt.com/?q=${encodeURIComponent(PROMPT)}` },
  { name: "Gemini", href: `https://gemini.google.com/app?q=${encodeURIComponent(PROMPT)}` },
  { name: "Perplexity", href: `https://www.perplexity.ai/search?q=${encodeURIComponent(PROMPT)}` },
] as const;

/** "Ask an AI about me": plain text links and one line of provenance. */
export function AskAI({ className, headingLevel = 3 }: { className?: string; headingLevel?: 2 | 3 }) {
  const H = headingLevel === 2 ? "h2" : "h3";
  return (
    <div className={className ? `sc-ask ${className}` : "sc-ask"}>
      <H className="sc-ask-head">Ask an AI about me</H>
      <p className="sc-ask-note">
        Each opens with a prompt pointing at koushik.io/llms.txt. The answer is the tool&apos;s, not mine.
      </p>
      <ul className="sc-ask-links">
        {TOOLS.map((t) => (
          <li key={t.name}>
            <a href={t.href} target="_blank" rel="noopener noreferrer">
              Ask {t.name}
              <span className="visually-hidden"> (opens in a new tab)</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
