import type { Metadata } from "next";
import "./globals.css";
import { Libre_Caslon_Display, Libre_Caslon_Text, Libre_Franklin, JetBrains_Mono } from "next/font/google";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import CursorMagnifier from "@/components/shared/cursor-magnifier";
import RoughFilter from "@/components/shared/rough-filter";
import RevealSystem from "@/components/shared/reveal";
import { Providers } from "./providers";

const caslonDisplay = Libre_Caslon_Display({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-caslon-display",
  display: "swap",
});

const caslonText = Libre_Caslon_Text({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-caslon-text",
  display: "swap",
});

const franklin = Libre_Franklin({
  subsets: ["latin"],
  variable: "--font-franklin",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Amirul Mabruri | The Personal Record of an IT Enthusiast",
  description:
    "Amirul Mabruri is an IT enthusiast in Jakarta, Indonesia — exploring software engineering, data science, machine learning and everything in between. This broadsheet is the personal record of his work.",
  icons: {
    icon: "/logo A.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      suppressHydrationWarning={true}
      className={cn(
        caslonDisplay.variable,
        caslonText.variable,
        franklin.variable,
        jetbrainsMono.variable
      )}
    >
      <body
        suppressHydrationWarning={true}
        className="min-h-screen bg-paper font-text text-ink antialiased relative selection:bg-stamp selection:text-paper-bright"
      >
        <Providers>
          <RevealSystem />
          <div className="relative z-[1] [overflow-x:clip]">{children}</div>
          <CursorMagnifier />
          <RoughFilter />
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
