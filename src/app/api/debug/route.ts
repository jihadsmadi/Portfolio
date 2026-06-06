import { createServerClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

// GET /api/debug?table=personal_info
// Only available in development
export async function GET(req: Request) {
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json({ error: 'Not available in production' }, { status: 403 })
  }

  const { searchParams } = new URL(req.url)
  const table = searchParams.get('table')

  const db = createServerClient()

  const ALLOWED_TABLES = [
    'personal_info',
    'social_links',
    'work_experience',
    'education',
    'categories',
    'tags',
    'projects',
    'project_images',
    'skills',
    'blog_posts',
    'contact_msgs',
  ] as const

  type AllowedTable = (typeof ALLOWED_TABLES)[number]

  if (!table) {
    // No table specified — return row counts for all tables
    const counts = await Promise.all(
      ALLOWED_TABLES.map(async t => {
        const { count, error } = await db
          .from(t)
          .select('*', { count: 'exact', head: true })
        return { table: t, count, error: error?.message ?? null }
      })
    )
    return NextResponse.json(counts, { status: 200 })
  }

  if (!ALLOWED_TABLES.includes(table as AllowedTable)) {
    return NextResponse.json({ error: `Unknown table: ${table}` }, { status: 400 })
  }

  const { data, error, count } = await db
    .from(table as AllowedTable)
    .select('*', { count: 'estimated' })

  return NextResponse.json({ table, count, data, error }, { status: error ? 500 : 200 })
}
