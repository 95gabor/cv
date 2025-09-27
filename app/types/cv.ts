import { z } from 'zod';

export type CVSupportedLangs = 'en' | 'hu';

export const LocalizedStringSchema = z.object({ en: z.string(), hu: z.string() });
export type TranslatedProperty<Value = string> = Record<CVSupportedLangs, Value>;

export const LinkSchema = z.object({
  platform: z.string(),
  url: z.string(),
  icon: z.string(),
});

export const ContactSchema = z.object({
  type: z.enum(['location', 'phone', 'email', 'link']),
  value: z.string(),
});

export const PersonalSchema = z.object({
  name: LocalizedStringSchema,
  title: LocalizedStringSchema,
  picture: z.string(),
  links: z.array(LinkSchema),
  contact: z.array(ContactSchema),
});

export const CompanySchema = z.object({
  name: z.string(),
  link: z.string().optional(),
});

export const WorkExperienceSchema = z.object({
  title: LocalizedStringSchema,
  company: CompanySchema,
  employmentType: z.string().optional(),
  location: z.string(),
  from: z.string(),
  end: z.string().optional(),
  description: LocalizedStringSchema,
  technologies: z.array(z.string()),
});

export const InstitutionSchema = z.object({
  name: LocalizedStringSchema,
  link: z.string().optional(),
});

export const EducationSchema = z.object({
  degree: LocalizedStringSchema,
  institution: InstitutionSchema,
  location: z.string(),
  from: z.string(),
  end: z.string().optional(),
  note: LocalizedStringSchema.optional(),
});

export const HobbySchema = z.object({
  name: LocalizedStringSchema,
  link: z.string().optional(),
});

export const SkillSchema = LocalizedStringSchema;

export const CVSchema = z.object({
  personal: PersonalSchema,
  workExperience: z.array(WorkExperienceSchema),
  educations: z.array(EducationSchema),
  skills: z.array(SkillSchema),
  hobbies: z.array(HobbySchema),
});

export type Link = z.infer<typeof LinkSchema>;
export type Contact = z.infer<typeof ContactSchema>;
export type Personal = z.infer<typeof PersonalSchema>;
export type WorkExperience = z.infer<typeof WorkExperienceSchema>;
export type Education = z.infer<typeof EducationSchema>;
export type Skill = z.infer<typeof SkillSchema>;
export type Hobby = z.infer<typeof HobbySchema>;
export type CV = z.infer<typeof CVSchema>;
