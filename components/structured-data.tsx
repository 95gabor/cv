import { buildPersonJsonLd } from '@/lib/seo/structured-data';
import type { CV, Locale } from '@/lib/cv/types';

type StructuredDataProps = {
  cv: CV;
  locale: Locale;
};

export function StructuredData({ cv, locale }: StructuredDataProps) {
  const jsonLd = buildPersonJsonLd(cv, locale);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
