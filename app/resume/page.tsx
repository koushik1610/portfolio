import type { Metadata } from "next";
import Link from "next/link";
import ResumeSection from "@/components/ResumeSection";

export const metadata: Metadata = {
  title: "Résumé — Koushik Kotamraju",
  description:
    "Résumé of Koushik Kotamraju, Sr. Technical Security Engineer at Yahoo Paranoids. Cloud security, detection engineering, AI-native security platforms.",
};

// Standalone, print-friendly résumé. Every theme's above-fold "Résumé" link
// points here; the .resume-page class exempts it from the global rule that
// hides section#resume on themed pages. Theme nav is hidden here, so the page
// carries its own minimal header (back link + email CTA) — keep it.
export default function ResumePage() {
  return (
    <main className="resume-page">
      <header className="resume-page-bar">
        <Link href="/" className="resume-page-back">← koushik.io</Link>
        <a href="mailto:koushik.kotamraju1610@gmail.com" className="resume-page-email">Email me</a>
      </header>
      <ResumeSection />
    </main>
  );
}
