import type { CV, Locale } from '@/lib/cv/types';
import { formatPeriodDate } from '@/lib/period';
import type { SiteConfig } from '@/lib/site-config.types';

function translate(value: Record<Locale, string>, locale: Locale = 'en'): string {
  return value[locale];
}

export function buildLlmsTxt(cv: CV, siteConfig: SiteConfig): string {
  const sections = [
    `# ${siteConfig.title}`,
    '',
    `> ${siteConfig.description}`,
    '',
    '## Personal Information',
    '',
    `Name: ${translate(cv.personal.name)}, Title: ${translate(cv.personal.title)}`,
    '',
    ...cv.personal.links.map((link) => `- [${link.platform}](${link.url})`),
    '',
    '## Work Experience',
    '',
    'Professional and company history.',
    '',
    ...cv.workExperience.flatMap((exp) => {
      const employment = exp.employmentType ? ` - ${exp.employmentType}` : '';
      const period = exp.end
        ? `From: ${formatPeriodDate(exp.from)} To: ${formatPeriodDate(exp.end)}`
        : `From: ${formatPeriodDate(exp.from)}`;

      return [
        `- [${translate(exp.title)} at ${exp.company.name} (${exp.location})${employment}](${exp.company.link ?? '#'}): ${translate(exp.description)}`,
        '',
        period,
        `Technologies: ${exp.technologies.map((tech) => tech.name).join(', ')}`,
      ];
    }),
    '',
    '## Education',
    '',
    'Academic background.',
    '',
    ...cv.educations.map((edu) => {
      const note = edu.note ? translate(edu.note) : undefined;
      const line = `- [${translate(edu.degree)} - ${translate(edu.institution.name)} (${edu.location})](${edu.institution.link ?? '#'})`;

      return note ? `${line}: ${note}` : line;
    }),
    '',
    '## Skills',
    '',
    'Professional competencies.',
    '',
    ...cv.skills.map((skill) => `- [${skill.name}](${skill.link ?? '#'})`),
    '',
    '## Hobbies',
    '',
    'Personal interests and activities.',
    '',
    ...cv.hobbies.map((hobby) => `- [${translate(hobby.name)}](${hobby.link ?? '#'})`),
    '',
  ];

  return `${sections.join('\n')}\n`;
}
