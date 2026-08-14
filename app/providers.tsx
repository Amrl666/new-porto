'use client';

import { ThemeProvider } from 'next-themes';
import { ReactNode } from 'react';
import { EasterEggHandler } from '@/components/ui/easter-egg-handler';

export function Providers({ children }: { children: ReactNode }) {
  return (
    // The broadsheet is a light paper edition - no dark mode.
    <ThemeProvider attribute="class" defaultTheme="light" forcedTheme="light">
      <EasterEggHandler />
      {children}
    </ThemeProvider>
  );
}
