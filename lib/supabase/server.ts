import { createClient } from '@supabase/supabase-js';

import type { Database } from '@/lib/supabase/types';

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value;
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

export function createBuildClient() {
  return createClient<Database>(
    requireEnv('SUPABASE_URL'),
    requireAnyEnv('SUPABASE_PUBLISHABLE_KEY', 'SUPABASE_ANON_KEY'),
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    },
  );
}
