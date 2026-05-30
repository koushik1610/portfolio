import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import ResumeSection from "@/components/ResumeSection";
import AskAI, { AskAIFloat } from "@/components/AskAI";
import Contact from "@/components/Contact";
import ThemeBadge from "@/components/ThemeBadge";

export default function Home() {
  return (
    <>
      <Nav />
      <ThemeBadge />
      <AskAIFloat />
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
