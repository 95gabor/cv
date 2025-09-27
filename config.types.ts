export interface CVConfig {
  filename: string;
}

export interface SiteConfig {
  url: string;
  title: string;
  description: string;
  keywords: string[];
  favicon?: string;
  cv: CVConfig;
}
