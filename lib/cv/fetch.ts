import {
  mapToCvModel,
  type CvProfileWithRelations,
} from '@/lib/cv/map-from-db';
import type { CV, Locale } from '@/lib/cv/types';
import { createBuildClient } from '@/lib/supabase/server';

const CV_PROFILE_SELECT = `
  *,
  personal_links (*),
  personal_contacts (*),
  work_experiences (
    *,
    work_experience_technologies (*)
  ),
  educations (*),
  skills (*),
  hobbies (*)
`;

export async function getCvProfile(slug: string, locale: Locale): Promise<CV> {
  const supabase = createBuildClient();

  const { data, error } = await supabase
    .from('cv_profiles')
    .select(CV_PROFILE_SELECT)
    .eq('slug', slug)
    .eq('is_active', true)
    .single();

  if (error) {
    throw new Error(`Failed to fetch CV profile "${slug}": ${error.message}`);
  }

  if (process.env.NODE_ENV === 'development') {
    console.info(
      `[cv] loaded "${slug}" (${locale}) — ${data.work_experiences.length} jobs, ${data.skills.length} skills`,
    );
  }

  return mapToCvModel(data as CvProfileWithRelations, locale);
}
