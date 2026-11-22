import type { BuildStatus } from "@/lib/profile";

/* Shared display helpers for the themes. Each theme renders these strings in its
   own material; the wording lives here once so a status never reads two ways. */

/** A project's build status as visible text. `progress` is never flattened into shipped. */
export const STATUS_LABEL: Record<BuildStatus, string> = {
  shipped: "Shipped",
  partial: "Partly built",
  progress: "In progress",
};

/** A CAREER period with its en or em dash spelled out ("Feb 2022 to Sep 2026"),
 *  because the site's copy rules allow no dash as a separator. */
export const period = (p: string): string => p.replace(/\s*[–—]\s*/, " to ");

/** A CAREER period split into its two ends ({ from: "Feb 2022", to: "Sep 2026" }),
 *  for themes that set the years in their own columns. No dash survives. */
export const periodParts = (p: string): { from: string; to: string } => {
  const [from, to = ""] = p.split(/\s*[–—]\s*/);
  return { from, to };
};
