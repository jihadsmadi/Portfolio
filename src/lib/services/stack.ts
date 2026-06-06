import { unstable_cache } from 'next/cache'
import { createServerClient } from '@/lib/supabase/server'
import type { TechStack } from '@/lib/types'

export const getTechStack = unstable_cache(
  async (): Promise<TechStack[]> => {
    const db = createServerClient()
    const { data } = await db.from('tech_stack').select('*').order('order')
    return data ?? []
  },
  ['tech_stack'],
  { revalidate: 3600, tags: ['tech_stack'] },
)
