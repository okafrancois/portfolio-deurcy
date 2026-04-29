import type { Metadata } from "next";
import { Fraunces, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { fetchSiteContent } from "@/lib/content";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});
const spaceGrotesk = Space_Grotesk({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});
const jetbrains = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  try {
    const { settings } = await fetchSiteContent();
    if (settings) {
      return {
        title: settings.siteTitle,
        description: settings.metaDescription,
      };
    }
  } catch {
    // fall through
  }
  return {
    title: "D3VisionProd — Portfolio",
    description:
      "Vidéaste freelance — captation, photo, post-production, écriture.",
  };
}

const BG_TONE_VARS: Record<
  string,
  { bg: string; bgElev: string; line: string }
> = {
  "warm-black": { bg: "#0a0908", bgElev: "#131211", line: "#2a2724" },
  "pure-black": { bg: "#000000", bgElev: "#0a0a0a", line: "#1f1f1f" },
  "deep-charcoal": { bg: "#0e0d0c", bgElev: "#181614", line: "#33302c" },
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  let accent = "#f5c518";
  let bgTone: keyof typeof BG_TONE_VARS = "warm-black";
  let grain = true;
  try {
    const { settings } = await fetchSiteContent();
    if (settings) {
      accent = settings.accent;
      bgTone = settings.bgTone;
      grain = settings.grain;
    }
  } catch {
    // pre-init
  }
  const tone = BG_TONE_VARS[bgTone];
  const dynamicStyle = `:root {
    --accent: ${accent};
    --accent-soft: ${accent}1a;
    --bg: ${tone.bg};
    --bg-elev: ${tone.bgElev};
    --line: ${tone.line};
  }`;

  return (
    <html
      lang="fr"
      className={`${fraunces.variable} ${spaceGrotesk.variable} ${jetbrains.variable}`}
    >
      <head>
        <style dangerouslySetInnerHTML={{ __html: dynamicStyle }} />
      </head>
      <body>
        {grain ? <div className="grain" /> : null}
        <div style={{ position: "relative", zIndex: 2 }}>{children}</div>
      </body>
    </html>
  );
}
