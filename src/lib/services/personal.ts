import { unstable_cache } from 'next/cache'
import { createServerClient } from '@/lib/supabase/server'
import type { PersonalInfo, SocialLink } from '@/lib/types'

export const getPersonalInfo = unstable_cache(
  async (): Promise<PersonalInfo | null> => {
    const db = createServerClient()
    const { data } = await db.from('personal_info').select('*').single()
    return data
  },
  ['personal_info'],
  { revalidate: 3600, tags: ['personal'] },
)

export const getSocialLinks = unstable_cache(
  async (): Promise<SocialLink[]> => {
    const db = createServerClient()
    const { data } = await db.from('social_links').select('*').order('order')
    return data ?? []
  },
  ['social_links'],
  { revalidate: 3600, tags: ['social'] },
)
