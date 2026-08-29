import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Instrument_Serif } from "next/font/google";
import ThemeApplier from "@/components/ThemeApplier";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
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
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable} ${instrumentSerif.variable}`}>
      <body style={{ fontFamily: "var(--font-geist-sans), system-ui, sans-serif" }}>
        <ThemeApplier />
        {children}
      </body>
    </html>
  );
}
