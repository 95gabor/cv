import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import type { ReactNode } from 'react';

import type { AppLocale } from '@/i18n/config';

type LocaleProviderProps = {
  locale: AppLocale;
  children: ReactNode;
};

export async function LocaleProvider({ locale, children }: LocaleProviderProps) {
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
