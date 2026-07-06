'use client';

import { ThemeProvider } from 'next-themes';
import type { ReactNode } from 'react';

type ProvidersProps = {
  children: ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      storageKey="cv-theme"
    >
      {children}
    </ThemeProvider>
  );
}
