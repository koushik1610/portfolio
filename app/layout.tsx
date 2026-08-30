import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Instrument_Serif } from "next/font/google";
import localFont from "next/font/local";
import ThemeApplier from "@/components/ThemeApplier";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
});

/* Bricolage Grotesque, SIL OFL 1.1, the `ledger` theme's bespoke display face.
   Self-hosted rather than fetched, per the 2026-08-29 amendment to CLAUDE.md
   section 3.1: each theme owns one non-Geist display face, shipped in
   public/fonts and loaded with next/font/local, never from a CDN.

   next/font/local rather than next/font/google on purpose. The Google loader
   fetches at BUILD time, which makes a static export in CI depend on a network
   call to a third party; the file in the repo does not. 128K, latin subset,
   variable across weight, width and optical size.

   The axes are the reason this face was chosen and are not decoration. The
   theme sets two headings of different string lengths at the same OPTICAL
   weight, which is what makes its equal-weight claim true rather than asserted,
   and a static face cannot do that without fighting the tracking. */
const bricolage = localFont({
  src: "../public/fonts/BricolageGrotesque-latin.woff2",
  variable: "--font-bricolage",
  display: "swap",
  weight: "200 800",
  style: "normal",
  /* Matched to Geist's metrics so the swap does not reflow the name. */
  fallback: ["Geist Sans", "system-ui", "sans-serif"],
});

export const metadata: Metadata = {
  title: "Koushik Kotamraju — Security Engineer & Builder",
  description:
    "Senior Technical Security Engineer at Yahoo Paranoids. 200+ detection signatures across 1,400+ AWS accounts, 2,800+ cloud accounts secured, AI-native security platforms at enterprise scale.",
  openGraph: {
    title: "Koushik Kotamraju — Security Engineer & Builder",
    description: "Senior Technical Security Engineer at Yahoo. 200+ detection signatures across 1,400+ AWS accounts. 100+ security reviews. AI-native security infrastructure.",
    url: "https://koushik.io",
    siteName: "koushik.io",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://koushik.io/profile.jpeg",
        width: 800,
        height: 1067,
        alt: "Koushik Kotamraju — Senior Security Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Koushik Kotamraju — Security Engineer & Builder",
    description: "Sr. Technical Security Engineer at Yahoo. Cloud security and AI-native security platforms at enterprise scale.",
    images: ["https://koushik.io/profile.jpeg"],
  },
  robots: { index: true, follow: true },
  metadataBase: new URL("https://koushik.io"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable} ${instrumentSerif.variable} ${bricolage.variable}`}>
      <body style={{ fontFamily: "var(--font-geist-sans), system-ui, sans-serif" }}>
        <ThemeApplier />
        {children}
      </body>
    </html>
  );
}
