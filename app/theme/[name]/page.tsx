import { notFound } from "next/navigation";
import { themes } from "@/lib/themes";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import ResumeSection from "@/components/ResumeSection";
import AskAI from "@/components/AskAI";
import Contact from "@/components/Contact";
import WidgetStack from "@/components/WidgetStack";

// Generate a static page for every theme layout name and ID
export function generateStaticParams() {
  const slugs = new Set<string>();
  themes.forEach((t) => {
    slugs.add(t.layout);
    slugs.add(t.id);
  });
  return [...slugs].map((name) => ({ name }));
}

export default async function ThemeDevPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  const exists = themes.some((t) => t.layout === name || t.id === name);
  if (!exists) notFound();

  // ThemeApplier (in root layout) reads getCurrentTheme(), which detects
  // /theme/[name] in window.location.pathname and returns the forced theme.
  // No client-side hydration trick needed — the URL is the source of truth.
  return (
    <>
      <Nav />
      <WidgetStack />
      <main>
        <Hero />
        <Experience />
        <Projects />
        <ResumeSection />
        <AskAI />
        <Contact />
      </main>
    </>
  );
}
