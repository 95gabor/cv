import { Inter } from 'next/font/google';
import type { Metadata } from 'next';

import { GoogleAnalytics } from '@/components/google-analytics';
import { Providers } from '@/components/providers';
import { siteConfig } from '@/lib/site-config';

import './globals.css';

const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: '%s',
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  icons: {
    icon: `/${siteConfig.favicon}`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="min-h-screen font-sans">
        <Providers>
          <GoogleAnalytics />
          {children}
        </Providers>
      </body>
    </html>
  );
}
