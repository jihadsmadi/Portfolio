import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/lib/types'

// New instance per call — safe to use in Server Components and Route Handlers
export function createServerClient() {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
