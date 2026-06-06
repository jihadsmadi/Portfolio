import { unstable_cache } from 'next/cache'
import { createServerClient } from '@/lib/supabase/server'
import type { WorkExperience, Education } from '@/lib/types'

export const getWorkExperience = unstable_cache(
  async (): Promise<WorkExperience[]> => {
    const db = createServerClient()
    const { data } = await db.from('work_experience').select('*').order('order')
    return data ?? []
  },
  ['work_experience'],
  { revalidate: 3600, tags: ['experience'] },
)

export const getEducation = unstable_cache(
  async (): Promise<Education[]> => {
    const db = createServerClient()
    const { data } = await db.from('education').select('*').order('order')
    return data ?? []
  },
  ['education'],
  { revalidate: 3600, tags: ['education'] },
)
