import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { createClient } from '@supabase/supabase-js';
import { parse } from 'yaml';

import type { Database } from '../lib/supabase/types';

type Localized = { en: string; hu: string };
type Period = { year?: number; month?: number };

interface YamlCv {
  personal: {
    name: Localized;
    title: Localized;
    picture: string;
    links: Array<{
      platform: string;
      url: string;
      icon: { dark: string; light: string };
    }>;
    contact: Array<{ type: string; value: string }>;
  };
  workExperience: Array<{
    title: Localized;
    company: { name: string; link?: string };
    employmentType?: string;
    location: string;
    from: Period;
    end?: Period;
    description: Localized;
    technologies: Array<{ name: string; link?: string }>;
  }>;
  educations: Array<{
    degree: Localized;
    institution: { name: Localized; link?: string };
    location: string;
    from: Period;
    end?: Period;
    note?: Localized;
  }>;
  skills: Array<{ name: string; link?: string }>;
  hobbies: Array<{ name: Localized; link?: string }>;
}

const SITE = {
  url: 'https://95gabor.me',
  title: 'Gábor Pichner | Senior TypeScript Full-Stack Developer',
  description:
    'Gábor Pichner - TypeScript Full-Stack Developer specializing in modern web technologies, cloud architecture, and DevOps.',
  keywords: [
    'Full-Stack',
    'Developer',
    'SRE',
    'DevOps',
    'Cloud',
    'TypeScript',
    'React',
    'Next.js',
  ],
  favicon_path: 'icons/favicons/gabor-pichner.ico',
};

const SLUG = 'gabor-pichner';

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value;
}

function trimLocalized(value: Localized): Localized {
  return { en: value.en.trim(), hu: value.hu.trim() };
}

function periodYear(period: Period): number {
  if (period.year == null) {
    throw new Error('Period year is required');
  }
  return period.year;
}

function requireAnyEnv(...names: string[]): string {
  for (const name of names) {
    const value = process.env[name];
    if (value) {
      return value;
    }
  }
  throw new Error(`Missing environment variable: one of ${names.join(', ')}`);
}

async function main() {
  const supabase = createClient<Database>(
    requireEnv('SUPABASE_URL'),
    requireAnyEnv('SUPABASE_SECRET_KEY', 'SUPABASE_SERVICE_ROLE_KEY'),
    { auth: { persistSession: false, autoRefreshToken: false } },
  );

  const yamlPath = resolve(process.cwd(), 'content/gabor-pichner.yaml');
  const cv = parse(readFileSync(yamlPath, 'utf8')) as YamlCv;

  const { error: siteError } = await supabase.from('site_config').upsert({
    id: 'default',
    url: SITE.url,
    title: SITE.title,
    description: SITE.description,
    keywords: SITE.keywords,
    favicon_path: SITE.favicon_path,
  });

  if (siteError) {
    throw siteError;
  }

  const { data: existing } = await supabase
    .from('cv_profiles')
    .select('id')
    .eq('slug', SLUG)
    .maybeSingle();

  if (existing) {
    const { error: deleteError } = await supabase
      .from('cv_profiles')
      .delete()
      .eq('id', existing.id);
    if (deleteError) {
      throw deleteError;
    }
  }

  const { data: profile, error: profileError } = await supabase
    .from('cv_profiles')
    .insert({
      slug: SLUG,
      name_en: cv.personal.name.en,
      name_hu: cv.personal.name.hu,
      title_en: cv.personal.title.en,
      title_hu: cv.personal.title.hu,
      picture_path: cv.personal.picture,
      is_active: true,
    })
    .select('id')
    .single();

  if (profileError || !profile) {
    throw profileError ?? new Error('Failed to insert cv_profile');
  }

  const profileId = profile.id;

  const { error: linksError } = await supabase.from('personal_links').insert(
    cv.personal.links.map((link, index) => ({
      cv_profile_id: profileId,
      sort_order: index,
      platform: link.platform,
      url: link.url,
      icon_dark_path: link.icon.dark,
      icon_light_path: link.icon.light,
    })),
  );
  if (linksError) {
    throw linksError;
  }

  const { error: contactsError } = await supabase
    .from('personal_contacts')
    .insert(
      cv.personal.contact.map((contact, index) => ({
        cv_profile_id: profileId,
        sort_order: index,
        type: contact.type as 'location' | 'phone' | 'email' | 'link',
        value: contact.value,
      })),
    );
  if (contactsError) {
    throw contactsError;
  }

  for (const [jobIndex, job] of cv.workExperience.entries()) {
    const description = trimLocalized(job.description);

    const { data: workRow, error: workError } = await supabase
      .from('work_experiences')
      .insert({
        cv_profile_id: profileId,
        sort_order: jobIndex,
        title_en: job.title.en,
        title_hu: job.title.hu,
        company_name: job.company.name,
        company_link: job.company.link ?? null,
        location: job.location,
        from_year: periodYear(job.from),
        from_month: job.from.month ?? null,
        end_year: job.end?.year ?? null,
        end_month: job.end?.month ?? null,
        employment_type: job.employmentType ?? null,
        description_en: description.en,
        description_hu: description.hu,
      })
      .select('id')
      .single();

    if (workError || !workRow) {
      throw workError ?? new Error('Failed to insert work_experience');
    }

    if (job.technologies.length > 0) {
      const { error: techError } = await supabase
        .from('work_experience_technologies')
        .insert(
          job.technologies.map((tech, techIndex) => ({
            work_experience_id: workRow.id,
            sort_order: techIndex,
            name: tech.name,
            link: tech.link ?? null,
          })),
        );
      if (techError) {
        throw techError;
      }
    }
  }

  const { error: educationsError } = await supabase.from('educations').insert(
    cv.educations.map((education, index) => ({
      cv_profile_id: profileId,
      sort_order: index,
      degree_en: education.degree.en,
      degree_hu: education.degree.hu,
      institution_name_en: education.institution.name.en,
      institution_name_hu: education.institution.name.hu,
      institution_link: education.institution.link ?? null,
      location: education.location,
      from_year: periodYear(education.from),
      from_month: education.from.month ?? null,
      end_year: education.end?.year ?? null,
      end_month: education.end?.month ?? null,
      note_en: education.note?.en ?? null,
      note_hu: education.note?.hu ?? null,
    })),
  );
  if (educationsError) {
    throw educationsError;
  }

  const { error: skillsError } = await supabase.from('skills').insert(
    cv.skills.map((skill, index) => ({
      cv_profile_id: profileId,
      sort_order: index,
      name: skill.name,
      link: skill.link ?? null,
    })),
  );
  if (skillsError) {
    throw skillsError;
  }

  const { error: hobbiesError } = await supabase.from('hobbies').insert(
    cv.hobbies.map((hobby, index) => ({
      cv_profile_id: profileId,
      sort_order: index,
      name_en: hobby.name.en,
      name_hu: hobby.name.hu,
      link: hobby.link ?? null,
    })),
  );
  if (hobbiesError) {
    throw hobbiesError;
  }

  console.info(
    `Seeded CV "${SLUG}": ${cv.workExperience.length} jobs, ${cv.educations.length} educations, ${cv.skills.length} skills, ${cv.hobbies.length} hobbies`,
  );
}

main().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
