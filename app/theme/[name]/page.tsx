import { notFound } from "next/navigation";
import { THEME_SLUGS, isThemeSlug } from "@/lib/themes";
import Hero from "@/components/Hero";

/* /theme/<slug>/ forces one theme (lib/rotation.ts reads the path), so a link
   to a specific theme stays stable. */
export function generateStaticParams() {
  return THEME_SLUGS.map((name) => ({ name }));
}

export default async function ThemePage({ params }: { params: Promise<{ name: string }> }) {
  const { name } = await params;
  if (!isThemeSlug(name)) notFound();
  return <Hero />;
}
