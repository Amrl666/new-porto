'use client';

import { ThemeProvider } from 'next-themes';
import { ReactNode } from 'react';
import { EasterEggHandler } from '@/components/ui/easter-egg-handler';

export function Providers({ children }: { children: ReactNode }) {
  return (
    // Light by default; visitor can switch to the night edition.
    <ThemeProvider attribute="class" defaultTheme="light">
      <EasterEggHandler />
      {children}
    </ThemeProvider>
  );
}
