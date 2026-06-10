import type { Metadata } from "next";
import "./globals.css";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import { Providers } from "./providers";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Amirul | Home",
  description: "Hi, I'm an IT Enthusiast with a passion for learning and growing across all IT fields. With a strong drive and dedication to building fast, reliable, and modern applications, I continuously expand my skills and knowledge. With a history of contributions to projects in both corporate and freelance capacities, I have developed strong collaboration and communication skills, along with an innovative and adaptable approach that allows me to perform well under pressure. I'm always looking for new ways to learn and improve, exploring innovations in open-source space and beyond.",
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
    <html lang="en" suppressHydrationWarning={true}>
      <body
        suppressHydrationWarning={true}
        className={cn(
          "min-h-screen font-sans antialiased relative selection:bg-primary selection:text-black",
          fontSans.variable
        )}
      >
        <Providers>
          <div className="fixed inset-0 -z-10 pattern-dots pattern-black pattern-bg-background pattern-size-4 pattern-opacity-10 dark:pattern-white dark:pattern-opacity-10" />
          
          <div className="relative z-10">
            {children}
          </div>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
