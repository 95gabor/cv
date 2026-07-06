import type { Locale } from '@/lib/cv/types';
import en from '@/messages/en.json';
import hu from '@/messages/hu.json';

const catalogs = { en, hu } as const;

export function uiMessages(locale: Locale) {
  return catalogs[locale];
}
