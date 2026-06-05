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
      {/* Top-right fixed stack: theme badge above, Ask AI below */}
      <div style={{
        position: "fixed",
        top: "1rem",
        right: "1rem",
        zIndex: 10000,
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        gap: "0.4rem",
        pointerEvents: "none",
      }}>
        <ThemeBadge />
        <AskAIFloat />
      </div>
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
