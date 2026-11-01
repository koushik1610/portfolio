import type { Metadata } from "next";
import { fontVariables } from "@/lib/fonts";
import { rotationScript } from "@/lib/rotation";
import { SITE_DESCRIPTION } from "@/lib/stats";
import ThemeApplier from "@/components/ThemeApplier";
/* Token files load statically and are each scoped to their own data-theme, so
   colours resolve the instant the attribute is set, before any theme chunk
   arrives. About 2 KB each. globals.css comes last: its responsive gutter rules
   share the token blocks' specificity and must follow them. */
import "@/components/layouts/console/tokens.css";
import "@/components/layouts/ink/tokens.css";
import "@/components/layouts/darkroom/tokens.css";
import "@/components/layouts/brutal/tokens.css";
import "@/components/layouts/blueprint/tokens.css";
import "./resume/tokens.css";
import "./globals.css";

const TITLE = "Koushik Kotamraju, Principal Security Engineer";
const DESCRIPTION = SITE_DESCRIPTION;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "https://koushik.io",
    siteName: "koushik.io",
    locale: "en_US",
    type: "website",
    images: [{ url: "https://koushik.io/profile.jpeg", width: 724, height: 1086, alt: "Koushik Kotamraju" }],
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: ["https://koushik.io/profile.jpeg"] },
  robots: { index: true, follow: true },
  metadataBase: new URL("https://koushik.io"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={fontVariables} suppressHydrationWarning>
      <head>
        {/* Sets data-theme before first paint. Generated from lib/rotation.ts so
            it cannot disagree with the React side. suppressHydrationWarning on
            <html> covers the attribute it adds. */}
        <script dangerouslySetInnerHTML={{ __html: rotationScript() }} />
      </head>
      <body>
        <ThemeApplier />
        {children}
      </body>
    </html>
  );
}
