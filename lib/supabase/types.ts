export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      site_config: {
        Row: {
          id: string;
          url: string;
          title: string;
          description: string;
          keywords: string[];
          favicon_path: string | null;
        };
        Insert: {
          id?: string;
          url: string;
          title: string;
          description: string;
          keywords?: string[];
          favicon_path?: string | null;
        };
        Update: {
          id?: string;
          url?: string;
          title?: string;
          description?: string;
          keywords?: string[];
          favicon_path?: string | null;
        };
        Relationships: [];
      };
      cv_profiles: {
        Row: {
          id: string;
          slug: string;
          name_en: string;
          name_hu: string;
          title_en: string;
          title_hu: string;
          picture_path: string;
          is_active: boolean;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          name_en: string;
          name_hu: string;
          title_en: string;
          title_hu: string;
          picture_path: string;
          is_active?: boolean;
          updated_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          name_en?: string;
          name_hu?: string;
          title_en?: string;
          title_hu?: string;
          picture_path?: string;
          is_active?: boolean;
          updated_at?: string;
        };
        Relationships: [];
      };
      personal_links: {
        Row: {
          id: string;
          cv_profile_id: string;
          sort_order: number;
          platform: string;
          url: string;
          icon_dark_path: string;
          icon_light_path: string;
        };
        Insert: {
          id?: string;
          cv_profile_id: string;
          sort_order: number;
          platform: string;
          url: string;
          icon_dark_path: string;
          icon_light_path: string;
        };
        Update: {
          id?: string;
          cv_profile_id?: string;
          sort_order?: number;
          platform?: string;
          url?: string;
          icon_dark_path?: string;
          icon_light_path?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'personal_links_cv_profile_id_fkey';
            columns: ['cv_profile_id'];
            isOneToOne: false;
            referencedRelation: 'cv_profiles';
            referencedColumns: ['id'];
          },
        ];
      };
      personal_contacts: {
        Row: {
          id: string;
          cv_profile_id: string;
          sort_order: number;
          type: 'location' | 'phone' | 'email' | 'link';
          value: string;
        };
        Insert: {
          id?: string;
          cv_profile_id: string;
          sort_order: number;
          type: 'location' | 'phone' | 'email' | 'link';
          value: string;
        };
        Update: {
          id?: string;
          cv_profile_id?: string;
          sort_order?: number;
          type?: 'location' | 'phone' | 'email' | 'link';
          value?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'personal_contacts_cv_profile_id_fkey';
            columns: ['cv_profile_id'];
            isOneToOne: false;
            referencedRelation: 'cv_profiles';
            referencedColumns: ['id'];
          },
        ];
      };
      work_experiences: {
        Row: {
          id: string;
          cv_profile_id: string;
          sort_order: number;
          title_en: string;
          title_hu: string;
          company_name: string;
          company_link: string | null;
          location: string;
          from_year: number;
          from_month: number | null;
          end_year: number | null;
          end_month: number | null;
          employment_type: string | null;
          description_en: string;
          description_hu: string;
        };
        Insert: {
          id?: string;
          cv_profile_id: string;
          sort_order: number;
          title_en: string;
          title_hu: string;
          company_name: string;
          company_link?: string | null;
          location: string;
          from_year: number;
          from_month?: number | null;
          end_year?: number | null;
          end_month?: number | null;
          employment_type?: string | null;
          description_en: string;
          description_hu: string;
        };
        Update: {
          id?: string;
          cv_profile_id?: string;
          sort_order?: number;
          title_en?: string;
          title_hu?: string;
          company_name?: string;
          company_link?: string | null;
          location?: string;
          from_year?: number;
          from_month?: number | null;
          end_year?: number | null;
          end_month?: number | null;
          employment_type?: string | null;
          description_en?: string;
          description_hu?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'work_experiences_cv_profile_id_fkey';
            columns: ['cv_profile_id'];
            isOneToOne: false;
            referencedRelation: 'cv_profiles';
            referencedColumns: ['id'];
          },
        ];
      };
      work_experience_technologies: {
        Row: {
          id: string;
          work_experience_id: string;
          sort_order: number;
          name: string;
          link: string | null;
        };
        Insert: {
          id?: string;
          work_experience_id: string;
          sort_order: number;
          name: string;
          link?: string | null;
        };
        Update: {
          id?: string;
          work_experience_id?: string;
          sort_order?: number;
          name?: string;
          link?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'work_experience_technologies_work_experience_id_fkey';
            columns: ['work_experience_id'];
            isOneToOne: false;
            referencedRelation: 'work_experiences';
            referencedColumns: ['id'];
          },
        ];
      };
      educations: {
        Row: {
          id: string;
          cv_profile_id: string;
          sort_order: number;
          degree_en: string;
          degree_hu: string;
          institution_name_en: string;
          institution_name_hu: string;
          institution_link: string | null;
          location: string;
          from_year: number;
          from_month: number | null;
          end_year: number | null;
          end_month: number | null;
          note_en: string | null;
          note_hu: string | null;
        };
        Insert: {
          id?: string;
          cv_profile_id: string;
          sort_order: number;
          degree_en: string;
          degree_hu: string;
          institution_name_en: string;
          institution_name_hu: string;
          institution_link?: string | null;
          location: string;
          from_year: number;
          from_month?: number | null;
          end_year?: number | null;
          end_month?: number | null;
          note_en?: string | null;
          note_hu?: string | null;
        };
        Update: {
          id?: string;
          cv_profile_id?: string;
          sort_order?: number;
          degree_en?: string;
          degree_hu?: string;
          institution_name_en?: string;
          institution_name_hu?: string;
          institution_link?: string | null;
          location?: string;
          from_year?: number;
          from_month?: number | null;
          end_year?: number | null;
          end_month?: number | null;
          note_en?: string | null;
          note_hu?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'educations_cv_profile_id_fkey';
            columns: ['cv_profile_id'];
            isOneToOne: false;
            referencedRelation: 'cv_profiles';
            referencedColumns: ['id'];
          },
        ];
      };
      skills: {
        Row: {
          id: string;
          cv_profile_id: string;
          sort_order: number;
          name: string;
          link: string | null;
        };
        Insert: {
          id?: string;
          cv_profile_id: string;
          sort_order: number;
          name: string;
          link?: string | null;
        };
        Update: {
          id?: string;
          cv_profile_id?: string;
          sort_order?: number;
          name?: string;
          link?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'skills_cv_profile_id_fkey';
            columns: ['cv_profile_id'];
            isOneToOne: false;
            referencedRelation: 'cv_profiles';
            referencedColumns: ['id'];
          },
        ];
      };
      hobbies: {
        Row: {
          id: string;
          cv_profile_id: string;
          sort_order: number;
          name_en: string;
          name_hu: string;
          link: string | null;
        };
        Insert: {
          id?: string;
          cv_profile_id: string;
          sort_order: number;
          name_en: string;
          name_hu: string;
          link?: string | null;
        };
        Update: {
          id?: string;
          cv_profile_id?: string;
          sort_order?: number;
          name_en?: string;
          name_hu?: string;
          link?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'hobbies_cv_profile_id_fkey';
            columns: ['cv_profile_id'];
            isOneToOne: false;
            referencedRelation: 'cv_profiles';
            referencedColumns: ['id'];
          },
        ];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}
