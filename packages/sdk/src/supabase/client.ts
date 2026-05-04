/**
 * Cliente Supabase tipado y agnóstico.
 *
 * Uso:
 *   import { createAleiaClient } from '@aleia/sdk/supabase';
 *   const client = createAleiaClient(
 *     process.env.NEXT_PUBLIC_SUPABASE_URL!,
 *     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
 *   );
 */

import { createClient, SupabaseClient } from '@supabase/supabase-js';
import type { Database } from './database.types.js';

export type AleiaClient = SupabaseClient<Database>;

export function createAleiaClient(
  supabaseUrl: string,
  supabaseKey: string,
  opts?: { tenantId?: string }
): AleiaClient {
  const client = createClient<Database>(supabaseUrl, supabaseKey, {
    auth: { persistSession: true, autoRefreshToken: true },
    global: {
      headers: opts?.tenantId
        ? { 'x-tenant-id': opts.tenantId }
        : undefined,
    },
  });
  return client;
}
