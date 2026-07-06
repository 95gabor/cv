import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';

import { LocaleProvider } from '@/components/locale-provider';
import { CvPage } from '@/components/cv-page';
import { getCvProfile } from '@/lib/cv/fetch';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { siteConfig } from '@/lib/site-config';

export async function generateMetadata(): Promise<Metadata> {
  setRequestLocale('en');
  const cv = await getCvProfile(siteConfig.cv.slug, 'en');

  return buildPageMetadata({ locale: 'en', cv });
}

export default async function HomePage() {
  const cv = await getCvProfile(siteConfig.cv.slug, 'en');

  return (
    <LocaleProvider locale="en">
      <CvPage cv={cv} locale="en" />
    </LocaleProvider>
  );
}
