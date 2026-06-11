import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import ResumeSection from "@/components/ResumeSection";
import AskAI from "@/components/AskAI";
import Contact from "@/components/Contact";
import WidgetStack from "@/components/WidgetStack";

export default function Home() {
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
