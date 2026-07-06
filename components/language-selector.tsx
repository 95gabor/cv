'use client';

import { useLocale } from 'next-intl';
import Link from 'next/link';

export function LanguageSelector() {
  const locale = useLocale();
  const nextLocale = locale === 'en' ? 'hu' : 'en';
  const href = nextLocale === 'en' ? '/' : '/hu';
  const label = locale === 'en' ? 'EN' : 'HU';
  const nextLabel = nextLocale === 'en' ? 'EN' : 'HU';

  return (
    <Link
      href={href}
      className="rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 text-xs font-semibold tracking-widest text-primary uppercase transition-colors hover:bg-primary/20"
      data-testid="language-toggle"
      aria-label={`Switch language to ${nextLabel}`}
    >
      {label}
    </Link>
  );
}
