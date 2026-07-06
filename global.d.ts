import type en from '../messages/en.json';

type Messages = typeof en;

declare module 'next-intl' {
  interface AppConfig {
    Locale: (typeof import('./config').locales)[number];
    Messages: Messages;
  }
}
