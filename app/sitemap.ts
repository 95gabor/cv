import type { MetadataRoute } from 'next';

import { siteConfig } from '@/lib/site-config';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: siteConfig.url,
      lastModified,
      changeFrequency: 'monthly',
      priority: 1,
      alternates: {
        languages: {
          en: siteConfig.url,
          hu: `${siteConfig.url}/hu`,
        },
      },
    },
    {
      url: `${siteConfig.url}/hu`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
      alternates: {
        languages: {
          en: siteConfig.url,
          hu: `${siteConfig.url}/hu`,
        },
      },
    },
  ];
}
