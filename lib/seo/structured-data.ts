import type { CV, Locale } from '@/lib/cv/types';
import { toIsoDate } from '@/lib/period';
import { siteConfig } from '@/lib/site-config';

export function buildPersonJsonLd(cv: CV, locale: Locale) {
  const email = cv.personal.contact.find((contact) => contact.type === 'email')?.value;
  const phone = cv.personal.contact.find((contact) => contact.type === 'phone')?.value;

  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: cv.personal.name[locale],
    jobTitle: cv.personal.title[locale],
    image: `${siteConfig.url}${cv.personal.picture}`,
    url: siteConfig.url,
    sameAs: cv.personal.links.map((link) => link.url),
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'HU',
      addressLocality: 'Hungary',
    },
    email,
    telephone: phone,
    worksFor: cv.workExperience.map((job) => ({
      '@type': 'Organization',
      name: job.company.name,
      url: job.company.link || undefined,
    })),
    alumniOf: cv.educations.map((edu) => ({
      '@type': 'EducationalOrganization',
      name: edu.institution.name[locale],
      address: {
        '@type': 'PostalAddress',
        addressLocality: edu.location,
      },
    })),
    knowsAbout: cv.skills.map((skill) => skill.name),
    hasOccupation: cv.workExperience.map((job) => ({
      '@type': 'Occupation',
      name: job.title[locale],
      occupationLocation: {
        '@type': 'City',
        name: job.location,
      },
      description: job.description[locale],
      skills: job.technologies.map((tech) => tech.name),
      startDate: toIsoDate(job.from),
      endDate: job.end ? toIsoDate(job.end) : undefined,
    })),
  };
}
