import type { Metadata } from 'next';
import Link from 'next/link';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { LocaleProvider } from '@/components/locale-provider';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: '404',
  robots: {
    index: false,
    follow: false,
  },
};

export default async function NotFound() {
  setRequestLocale('en');
  const t = await getTranslations('notFound');

  return (
    <LocaleProvider locale="en">
      <main
        className="flex min-h-screen flex-col items-center justify-center gap-6 bg-background px-4 text-center"
        data-testid="not-found-page"
      >
        <p className="text-sm font-semibold tracking-[0.2em] text-primary uppercase">
          404
        </p>
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
          {t('title')}
        </h1>
        <p className="max-w-md text-muted-foreground">{t('description')}</p>
        <Button asChild>
          <Link href="/" data-testid="not-found-back-home">
            {t('backHome')}
          </Link>
        </Button>
      </main>
    </LocaleProvider>
  );
}
