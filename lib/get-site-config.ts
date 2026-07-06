import { createBuildClient } from '@/lib/supabase/server';
import type { SiteConfig } from '@/lib/site-config.types';

import { siteConfig as fallbackSiteConfig } from './site-config';

export async function getSiteConfig(): Promise<SiteConfig> {
  try {
    const supabase = createBuildClient();
    const { data, error } = await supabase
      .from('site_config')
      .select('*')
      .eq('id', 'default')
      .maybeSingle();

    if (error || !data) {
      return fallbackSiteConfig;
    }

    return {
      url: data.url,
      title: data.title,
      description: data.description,
      keywords: data.keywords,
      ...(data.favicon_path ? { favicon: data.favicon_path } : {}),
      cv: fallbackSiteConfig.cv,
    };
  } catch {
    return fallbackSiteConfig;
  }
}
