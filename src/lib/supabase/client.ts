import { createBrowserClient } from "@supabase/ssr";

export function createSupabaseBrowserClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // IMPORTANT: Don't throw here. Next.js will prerender client components during build,
  // and missing env vars would fail the whole deployment.
  if (!url || !anonKey) return null;

  return createBrowserClient(url, anonKey);
}
