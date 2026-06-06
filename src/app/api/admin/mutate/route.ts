import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { revalidateTag } from 'next/cache'
import { createAdminClient } from '@/lib/supabase/admin-server'
import { COOKIE_NAME, deriveToken } from '@/lib/admin/auth'

const TABLE_TAGS: Record<string, string[]> = {
  personal_info: ['personal'],
  social_links: ['social'],
  capabilities: ['capabilities'],
  skills: ['skills'],
  projects: ['projects'],
  blog_posts: ['blog'],
  categories: ['projects', 'blog'],
  tags: ['projects', 'blog'],
  work_experience: ['experience'],
  education: ['education'],
  tech_stack: ['tech_stack'],
  contact_msgs: [],
}

type Operation = 'insert' | 'update' | 'delete' | 'upsert'

async function isAuthorized(): Promise<boolean> {
  const cookieStore = await cookies()
  const token = cookieStore.get(COOKIE_NAME)?.value
  if (!token) return false
  const password = process.env.ADMIN_PASSWORD
  const secret = process.env.ADMIN_SECRET
  if (!password || !secret) return false
  const expected = await deriveToken(password, secret)
  return token === expected
}

export async function POST(req: NextRequest) {
  if (!await isAuthorized()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body: { table: string; operation: Operation; payload?: Record<string, unknown>; id?: string } = await req.json()
  const { table, operation, payload, id } = body

  if (!table || !operation) {
    return NextResponse.json({ error: 'table and operation are required' }, { status: 400 })
  }

  const db = createAdminClient()
  let error: { message: string } | null = null
  let data: unknown = null

  if (operation === 'insert') {
    ;({ error, data } = await db.from(table as never).insert(payload as never).select())
  } else if (operation === 'update') {
    if (!id) return NextResponse.json({ error: 'id required for update' }, { status: 400 })
    ;({ error, data } = await db.from(table as never).update(payload as never).eq('id', id).select())
  } else if (operation === 'upsert') {
    ;({ error, data } = await db.from(table as never).upsert(payload as never).select())
  } else if (operation === 'delete') {
    if (!id) return NextResponse.json({ error: 'id required for delete' }, { status: 400 })
    ;({ error } = await db.from(table as never).delete().eq('id', id))
  }

  if (error) return NextResponse.json({ error: error.message }, { status: 400 })

  for (const tag of TABLE_TAGS[table] ?? []) revalidateTag(tag, 'default')

  return NextResponse.json({ data })
}
