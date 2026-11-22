/* ─────────────────────────────────────────────────────────────────────────────
   THEME REGISTRY. Rebuilt 2026-10-31 under Hallmark (github.com/nutlope/hallmark).

   Eleven themes, each a Hallmark theme material: console, darkroom, blueprint, ink
   and brutal, chosen by the portfolio design council from Hallmark's dealt
   candidates; status (theme-plans/NEXT-THEMES-2026-11.md); and depth, fold,
   helix, deck and badge, chosen on 2026-11-20 from the owner's reference reels
   and saved templates (docs/ui-guidelines.md sections 10 to 12). A theme's colours and faces live in its own
   `components/layouts/<slug>/tokens.css`, scoped to `:root[data-theme="<slug>"]`,
   so this file holds identity only. The old `vars` contract and the
   `layout`/`id` split are gone: one slug names the theme, its folder, its route
   and its data-theme value.

   Order is the rotation order, alternating ground so consecutive weeks do not
   repeat a mode.
───────────────────────────────────────────────────────────────────────────── */

export const THEME_SLUGS = ["console", "ink", "darkroom", "brutal", "blueprint", "status", "depth", "fold", "helix", "deck", "badge"] as const;

export type ThemeSlug = (typeof THEME_SLUGS)[number];

export interface Theme {
  slug: ThemeSlug;
  /** Display name, used by the "Next theme" control. */
  name: string;
  /** Hallmark genre, passed to sloplint. */
  genre: "modern-minimal" | "editorial" | "atmospheric" | "playful";
}

export const themes: ReadonlyArray<Theme> = [
  { slug: "console", name: "Console", genre: "modern-minimal" },
  { slug: "ink", name: "Ink", genre: "editorial" },
  { slug: "darkroom", name: "Darkroom", genre: "atmospheric" },
  { slug: "brutal", name: "Brutal", genre: "editorial" },
  { slug: "blueprint", name: "Blueprint", genre: "modern-minimal" },
  { slug: "status", name: "Status", genre: "modern-minimal" },
  { slug: "depth", name: "Depth", genre: "editorial" },
  { slug: "fold", name: "Fold", genre: "playful" },
  { slug: "helix", name: "Helix", genre: "editorial" },
  { slug: "deck", name: "Deck", genre: "editorial" },
  { slug: "badge", name: "Badge", genre: "atmospheric" },
];

export const isThemeSlug = (s: string): s is ThemeSlug =>
  (THEME_SLUGS as ReadonlyArray<string>).includes(s);

export const themeBySlug = (slug: ThemeSlug): Theme =>
  themes.find((t) => t.slug === slug)!;
