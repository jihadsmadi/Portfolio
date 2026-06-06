import { unstable_cache } from 'next/cache'
import { createServerClient } from '@/lib/supabase/server'
import type { Capability } from '@/lib/types'

export const getCapabilities = unstable_cache(
  async (): Promise<Capability[]> => {
    const db = createServerClient()
    const { data } = await db.from('capabilities').select('*').order('order')
    return data ?? []
  },
  ['capabilities'],
  { revalidate: 3600, tags: ['capabilities'] },
)
