import Hero from "@/components/Hero";
import WidgetStack from "@/components/WidgetStack";

/* Only Hero and WidgetStack are composed here, deliberately.
   This page used to also render <Nav/>, <Experience/>, <Projects/>,
   <ResumeSection/>, <AskAI/> and <Contact/>. None of them rendered anything in
   any reachable state: Experience and Projects `return null` outright, and the
   other four were painted into the static HTML and then suppressed by a
   display:none selector list in globals.css once ThemeApplier set data-layout.

   That cost 77% of the exported HTML (≈38 kB of markup that is never visible)
   AND produced a visible flash on every cold load — the real site nav, the
   resume section, and the contact block all painted before hydration and then
   vanished. Adding another suppression selector could not fix that, because
   `data-layout` does not exist at first paint; only deleting the composition
   does. Each theme owns its whole page (CONVENTIONS §13).

   Nothing is lost: the résumé stays indexable at its own /resume/ route, and
   the Ask-AI button is rendered by WidgetStack, not by <AskAI/>. */
export default function Home() {
  return (
    <>
      <WidgetStack />
      <main>
        <Hero />
      </main>
    </>
  );
}
