import Yaml from 'yaml';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import type { LLMsSection, ModuleOptions } from 'nuxt-llms';
import type { SiteConfig } from '../config.types';
import { CVSchema, type CV, type CVSupportedLangs } from '../app/types/cv';

const readCV = async (filename: string): Promise<CV> => {
  const fileContent = await readFile(
    resolve(__dirname, '../content/', `${filename}.yaml`),
    'utf8',
  );
  const parsedContent = Yaml.parse(fileContent);
  const validate = await CVSchema.safeParseAsync(parsedContent);
  if (!validate.success) {
    throw validate.error;
  }
  return validate.data;
};

const translate = (
  obj: Record<CVSupportedLangs, string>,
  lang: CVSupportedLangs = 'en',
) => obj[lang];

const getSections = (cv: CV): LLMsSection[] => [
  {
    title: 'Personal Information',
    description: `Name: ${translate(cv.personal.name)}, Title: ${translate(cv.personal.title)}`,
    links: cv.personal.links.map(link => ({
      title: link.platform,
      href: link.url,
    })),
  },
  {
    title: 'Work Experience',
    description: 'Professional and company history.',
    links: cv.workExperience.map(exp => ({
      title: `${translate(exp.title)} at ${exp.company.name} (${exp.location})${exp.employmentType ? ` - ${exp.employmentType}` : ''}`,
      description: `${translate(exp.description)}
From: ${exp.from}${exp.end ? ` To: ${exp.end}` : ''}
Technologies: ${exp.technologies.map(tech => tech.name).join(', ')}`,
      href: exp.company.link || '#',
    })),
  },
  {
    title: 'Education',
    description: 'Academic background.',
    links: cv.educations.map(edu => ({
      title: `${translate(edu.degree)} - ${translate(edu.institution.name)} (${edu.location})`,
      description: edu.note ? translate(edu.note) : undefined,
      href: edu.institution.link || '#',
    })),
  },
  {
    title: 'Skills',
    description: 'Professional competencies.',
    links: cv.skills.map(skill => ({
      title: skill.name,
      href: skill.link || '#',
    })),
  },
  {
    title: 'Hobbies',
    description: 'Personal interests and activities.',
    links: cv.hobbies.map(hobby => ({
      title: translate(hobby.name),
      href: hobby.link || '#',
    })),
  },
];

export const getConfig = async (
  siteConfig: SiteConfig,
): Promise<ModuleOptions> => {
  const cv = await readCV(siteConfig.cv.filename);

  return {
    domain: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    sections: getSections(cv),
    notes: [],
  };
};
