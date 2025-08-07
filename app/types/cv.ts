export interface Personal {
  name: string;
  title: string;
  picture: string;
  links: Link[];
  contact: Contact[];
}

export interface Link {
  platform: string;
  url: string;
  icon: string;
}

export interface Contact {
  title: string;
  type: 'location' | 'phone' | 'email' | 'link';
  value: string;
}

export interface WorkExperience {
  title: string;
  company?: string;
  companyUrl?: string;
  location: string;
  from: string;
  end?: string;
  description?: string;
  technologies: string[];
}

export interface Education {
  degree: string;
  institution: string;
  location: string;
  from: string;
  end?: string;
  note?: string;
}

export interface Hobby {
  name: string;
  link?: string;
}

export interface CV {
  lang: string;
  personal: Personal;
  workExperience: WorkExperience[];
  education: Education[];
  skills: string[];
  hobbies: Hobby[];
} 