import type { MetadataRoute } from "next";

export const dynamic = "force-static";

/* robots.txt has pointed at /sitemap.xml since it was written; nothing produced
   one. The theme routes are left out on purpose: they are the same page in a
   different dress, and listing them would split the home page's ranking. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://koushik.io/", changeFrequency: "monthly", priority: 1 },
    { url: "https://koushik.io/resume/", changeFrequency: "monthly", priority: 0.8 },
  ];
}
