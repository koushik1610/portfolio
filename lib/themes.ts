/* ─────────────────────────────────────────────────────────────────────────────
   THEME REGISTRY. Rebuilt 2026-10-31 under Hallmark (github.com/nutlope/hallmark).

   Six themes, each a Hallmark theme material: console, darkroom, blueprint, ink
   and brutal, chosen by the portfolio design council from Hallmark's dealt
   candidates, and status (theme-plans/NEXT-THEMES-2026-11.md). A theme's colours and faces live in its own
   `components/layouts/<slug>/tokens.css`, scoped to `:root[data-theme="<slug>"]`,
   so this file holds identity only. The old `vars` contract and the
   `layout`/`id` split are gone: one slug names the theme, its folder, its route
   and its data-theme value.

   Order is the rotation order, alternating ground so consecutive weeks do not
   repeat a mode.
───────────────────────────────────────────────────────────────────────────── */

export const THEME_SLUGS = ["console", "ink", "darkroom", "brutal", "blueprint", "status"] as const;

export type ThemeSlug = (typeof THEME_SLUGS)[number];

export interface Theme {
  slug: ThemeSlug;
  /** Display name, used by the "Next theme" control. */
  name: string;
  /** Hallmark genre, passed to sloplint. */
  genre: "modern-minimal" | "editorial" | "atmospheric";
}

export const themes: ReadonlyArray<Theme> = [
  { slug: "console", name: "Console", genre: "modern-minimal" },
  { slug: "ink", name: "Ink", genre: "editorial" },
  { slug: "darkroom", name: "Darkroom", genre: "atmospheric" },
  { slug: "brutal", name: "Brutal", genre: "editorial" },
  { slug: "blueprint", name: "Blueprint", genre: "modern-minimal" },
  { slug: "status", name: "Status", genre: "modern-minimal" },
];

export const isThemeSlug = (s: string): s is ThemeSlug =>
  (THEME_SLUGS as ReadonlyArray<string>).includes(s);

export const themeBySlug = (slug: ThemeSlug): Theme =>
  themes.find((t) => t.slug === slug)!;
