import type { Database } from '@/lib/supabase/types';
import type {
  Contact,
  CV,
  Education,
  Hobby,
  Locale,
  PeriodDate,
  Skill,
  WorkExperience,
} from '@/lib/cv/types';

type CvProfileRow = Database['public']['Tables']['cv_profiles']['Row'];
type PersonalLinkRow = Database['public']['Tables']['personal_links']['Row'];
type PersonalContactRow =
  Database['public']['Tables']['personal_contacts']['Row'];
type WorkExperienceRow = Database['public']['Tables']['work_experiences']['Row'];
type WorkExperienceTechnologyRow =
  Database['public']['Tables']['work_experience_technologies']['Row'];
type EducationRow = Database['public']['Tables']['educations']['Row'];
type SkillRow = Database['public']['Tables']['skills']['Row'];
type HobbyRow = Database['public']['Tables']['hobbies']['Row'];

export type CvProfileWithRelations = CvProfileRow & {
  personal_links: PersonalLinkRow[];
  personal_contacts: PersonalContactRow[];
  work_experiences: (WorkExperienceRow & {
    work_experience_technologies: WorkExperienceTechnologyRow[];
  })[];
  educations: EducationRow[];
  skills: SkillRow[];
  hobbies: HobbyRow[];
};

function bySortOrder<T extends { sort_order: number }>(a: T, b: T) {
  return a.sort_order - b.sort_order;
}

function toPeriod(
  year: number,
  month: number | null,
): PeriodDate {
  return {
    year,
    ...(month != null ? { month } : {}),
  };
}

function toOptionalPeriod(
  year: number | null,
  month: number | null,
): PeriodDate | undefined {
  if (year == null) {
    return undefined;
  }
  return toPeriod(year, month);
}

function mapWorkExperience(
  row: WorkExperienceRow & {
    work_experience_technologies: WorkExperienceTechnologyRow[];
  },
): WorkExperience {
  return {
    title: { en: row.title_en, hu: row.title_hu },
    company: {
      name: row.company_name,
      ...(row.company_link ? { link: row.company_link } : {}),
    },
    ...(row.employment_type ? { employmentType: row.employment_type } : {}),
    location: row.location,
    from: toPeriod(row.from_year, row.from_month),
    end: toOptionalPeriod(row.end_year, row.end_month),
    description: { en: row.description_en, hu: row.description_hu },
    technologies: [...row.work_experience_technologies]
      .sort(bySortOrder)
      .map((tech) => ({
        name: tech.name,
        link: tech.link ?? '',
      })),
  };
}

function mapEducation(row: EducationRow): Education {
  return {
    degree: { en: row.degree_en, hu: row.degree_hu },
    institution: {
      name: {
        en: row.institution_name_en,
        hu: row.institution_name_hu,
      },
      ...(row.institution_link ? { link: row.institution_link } : {}),
    },
    location: row.location,
    from: toPeriod(row.from_year, row.from_month),
    end: toOptionalPeriod(row.end_year, row.end_month),
    ...(row.note_en && row.note_hu
      ? { note: { en: row.note_en, hu: row.note_hu } }
      : {}),
  };
}

function mapSkill(row: SkillRow): Skill {
  return {
    name: row.name,
    ...(row.link ? { link: row.link } : {}),
  };
}

function mapHobby(row: HobbyRow): Hobby {
  return {
    name: { en: row.name_en, hu: row.name_hu },
    ...(row.link ? { link: row.link } : {}),
  };
}

export function mapToCvModel(data: CvProfileWithRelations, locale: Locale): CV {
  void locale;

  return {
    personal: {
      name: { en: data.name_en, hu: data.name_hu },
      title: { en: data.title_en, hu: data.title_hu },
      picture: data.picture_path,
      links: [...data.personal_links].sort(bySortOrder).map((link) => ({
        platform: link.platform,
        url: link.url,
        icon: {
          dark: link.icon_dark_path,
          light: link.icon_light_path,
        },
      })),
      contact: [...data.personal_contacts]
        .sort(bySortOrder)
        .map(
          (contact): Contact => ({
            type: contact.type,
            value: contact.value,
          }),
        ),
    },
    workExperience: [...data.work_experiences]
      .sort(bySortOrder)
      .map(mapWorkExperience),
    educations: [...data.educations].sort(bySortOrder).map(mapEducation),
    skills: [...data.skills].sort(bySortOrder).map(mapSkill),
    hobbies: [...data.hobbies].sort(bySortOrder).map(mapHobby),
  };
}
