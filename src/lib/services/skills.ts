import { unstable_cache } from 'next/cache'
import { createServerClient } from '@/lib/supabase/server'
import type { Skill } from '@/lib/types'

export const getSkills = unstable_cache(
  async (): Promise<Skill[]> => {
    const db = createServerClient()
    const { data } = await db.from('skills').select('*').order('order')
    return data ?? []
  },
  ['skills'],
  { revalidate: 3600, tags: ['skills'] },
)
