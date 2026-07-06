import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';

import { CvPage } from '@/components/cv-page';
import { getCvProfile } from '@/lib/cv/fetch';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { siteConfig } from '@/lib/site-config';

export async function generateMetadata(): Promise<Metadata> {
  setRequestLocale('hu');
  const cv = await getCvProfile(siteConfig.cv.slug, 'hu');

  return buildPageMetadata({ locale: 'hu', cv });
}

export default async function HungarianPage() {
  setRequestLocale('hu');
  const cv = await getCvProfile(siteConfig.cv.slug, 'hu');

  return <CvPage cv={cv} locale="hu" />;
}
