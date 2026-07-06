export type Locale = 'en' | 'hu';

export type LocalizedString = Record<Locale, string>;

export interface Link {
  platform: string;
  url: string;
  icon: {
    dark: string;
    light: string;
  };
}

export interface Contact {
  type: 'location' | 'phone' | 'email' | 'link';
  value: string;
}

export interface Personal {
  name: LocalizedString;
  title: LocalizedString;
  picture: string;
  links: Link[];
  contact: Contact[];
}

export interface Company {
  name: string;
  link?: string;
}

export interface Technology {
  name: string;
  link: string;
}

export interface PeriodDate {
  year?: number;
  month?: number;
}

export interface WorkExperience {
  title: LocalizedString;
  company: Company;
  employmentType?: string;
  location: string;
  from: PeriodDate;
  end?: PeriodDate;
  description: LocalizedString;
  technologies: Technology[];
}

export interface Institution {
  name: LocalizedString;
  link?: string;
}

export interface Education {
  degree: LocalizedString;
  institution: Institution;
  location: string;
  from: PeriodDate;
  end?: PeriodDate;
  note?: LocalizedString;
}

export interface Skill {
  name: string;
  link?: string;
}

export interface Hobby {
  name: LocalizedString;
  link?: string;
}

export interface CV {
  personal: Personal;
  workExperience: WorkExperience[];
  educations: Education[];
  skills: Skill[];
  hobbies: Hobby[];
}
