import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

import { parse } from 'yaml';

import type { CV, Locale, WorkExperience } from '@/lib/cv/types';

const CONTENT_DIR = resolve(process.cwd(), 'content');
const SLUG_PATTERN = /^[a-z0-9-]+$/;
const REQUIRED_KEYS = [
  'personal',
  'workExperience',
  'educations',
  'skills',
  'hobbies',
] as const;

function normalize(cv: CV): CV {
  return {
    ...cv,
    workExperience: cv.workExperience.map(
      (job): WorkExperience => ({
        ...job,
        description: {
          en: job.description.en.trim(),
          hu: job.description.hu.trim(),
        },
        technologies: job.technologies.map((tech) => ({
          ...tech,
          link: tech.link ?? '',
        })),
      }),
    ),
  };
}

export async function getCvProfile(slug: string, locale: Locale): Promise<CV> {
  if (!SLUG_PATTERN.test(slug)) {
    throw new Error(`Invalid CV slug "${slug}"`);
  }

  const filePath = resolve(CONTENT_DIR, `${slug}.yaml`);
  let raw: string;
  try {
    raw = await readFile(filePath, 'utf8');
  } catch (error) {
    throw new Error(`Failed to read CV profile "${slug}" at ${filePath}`, {
      cause: error,
    });
  }

  const data = parse(raw) as Partial<CV> | null;
  const missing = REQUIRED_KEYS.filter((key) => data?.[key] == null);
  if (!data || missing.length > 0) {
    throw new Error(
      `Invalid CV profile "${slug}": missing ${missing.join(', ') || 'content'}`,
    );
  }

  const cv = normalize(data as CV);

  if (process.env.NODE_ENV === 'development') {
    console.info(
      `[cv] loaded "${slug}" (${locale}) — ${cv.workExperience.length} jobs, ${cv.skills.length} skills`,
    );
  }

  return cv;
}
