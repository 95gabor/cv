export interface CVConfig {
  slug: string;
}

export interface SiteConfig {
  url: string;
  title: string;
  description: string;
  keywords: string[];
  favicon?: string;
  cv: CVConfig;
}

export type Locale = 'en' | 'hu';
