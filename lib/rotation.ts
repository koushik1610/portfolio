import { THEME_SLUGS, isThemeSlug, type ThemeSlug } from "@/lib/themes";

/* ─────────────────────────────────────────────────────────────────────────────
   WHICH THEME A VISITOR SEES.

   1. A /theme/<slug>/ URL forces that theme. Shared links stay stable.
   2. Otherwise the theme stored for this visitor, if any.
   3. Otherwise the week's theme, which is then stored.

   Rule 3's store is the change from the 2026-08 rotation, made on the council's
   first-principles finding: a recruiter who returns to a link days later should
   find the page where they left it, with the Email and Résumé buttons where
   they were. The week still decides what a NEW visitor sees; "Next theme"
   is the only thing that changes it for a returning one.

   The same logic runs twice: as `resolveTheme()` in React, and as the inline
   <head> script from `rotationScript()`, which sets data-theme before first
   paint so a dark theme never flashes white. The script is generated from the
   constants below rather than written by hand, so the two cannot disagree.
───────────────────────────────────────────────────────────────────────────── */

const WEEK_MS = 7 * 24 * 60 * 60 * 1000;
const STORAGE_KEY = "koushik_theme";

function weekSlug(): ThemeSlug {
  return THEME_SLUGS[Math.floor(Date.now() / WEEK_MS) % THEME_SLUGS.length];
}

function readStored(): ThemeSlug | null {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    return v && isThemeSlug(v) ? v : null;
  } catch {
    return null;
  }
}

function store(slug: ThemeSlug): void {
  try {
    localStorage.setItem(STORAGE_KEY, slug);
  } catch {
    /* Private mode or blocked storage: the week's theme still renders. */
  }
}

function forcedSlug(): ThemeSlug | null {
  const m = window.location.pathname.match(/^\/theme\/([^/]+)/);
  return m && isThemeSlug(m[1]) ? m[1] : null;
}

export function resolveTheme(): ThemeSlug {
  if (typeof window === "undefined") return THEME_SLUGS[0];
  const forced = forcedSlug();
  if (forced) return forced;
  const stored = readStored();
  if (stored) return stored;
  const week = weekSlug();
  store(week);
  return week;
}

/** Advance to the next theme and tell the page. On a /theme/<slug>/ route the
 *  URL would keep forcing the old theme, so that case navigates home instead. */
export function nextTheme(): void {
  const current = resolveTheme();
  const next = THEME_SLUGS[(THEME_SLUGS.indexOf(current) + 1) % THEME_SLUGS.length];
  store(next);
  if (forcedSlug()) {
    window.location.assign("/");
    return;
  }
  document.documentElement.dataset.theme = next;
  window.dispatchEvent(new Event("themechange"));
}

export function rotationScript(): string {
  return `(function(){try{var s=${JSON.stringify(THEME_SLUGS)},k=${JSON.stringify(STORAGE_KEY)},w=${WEEK_MS},t=null;` +
    `var m=location.pathname.match(/^\\/theme\\/([^/]+)/);if(m&&s.indexOf(m[1])>-1)t=m[1];` +
    `if(!t&&location.pathname.indexOf("/resume")===0)t="resume";` +
    `if(!t){try{var v=localStorage.getItem(k);if(v&&s.indexOf(v)>-1)t=v;}catch(e){}}` +
    `if(!t)t=s[Math.floor(Date.now()/w)%s.length];` +
    `document.documentElement.setAttribute("data-theme",t);}catch(e){}})();`;
}
