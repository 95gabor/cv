import type { Metadata } from 'next';

import type { CV, Locale } from '@/lib/cv/types';
import { siteConfig } from '@/lib/site-config';

type BuildPageMetadataOptions = {
  locale: Locale;
  cv: CV;
};

function getCanonicalUrl(locale: Locale): string {
  return locale === 'en' ? siteConfig.url : `${siteConfig.url}/hu`;
}

export function buildPageMetadata({
  locale,
  cv,
}: BuildPageMetadataOptions): Metadata {
  const canonical = getCanonicalUrl(locale);
  const name = cv.personal.name[locale];
  const title = cv.personal.title[locale];
  const pageTitle = `${name} | ${title}`;

  return {
    title: pageTitle,
    description: siteConfig.description,
    keywords: siteConfig.keywords,
    alternates: {
      canonical,
      languages: {
        en: siteConfig.url,
        hu: `${siteConfig.url}/hu`,
        'x-default': siteConfig.url,
      },
    },
    openGraph: {
      type: 'profile',
      url: canonical,
      title: pageTitle,
      description: siteConfig.description,
      locale: locale === 'hu' ? 'hu_HU' : 'en_US',
      alternateLocale: locale === 'hu' ? ['en_US'] : ['hu_HU'],
      images: [
        {
          url: `${siteConfig.url}${cv.personal.picture}`,
          alt: name,
        },
      ],
    },
    twitter: {
      card: 'summary',
      title: pageTitle,
      description: siteConfig.description,
      images: [`${siteConfig.url}${cv.personal.picture}`],
    },
    robots: {
      index: true,
      follow: true,
    },
    other: {
      'format-detection': 'telephone=no',
    },
  };
}
