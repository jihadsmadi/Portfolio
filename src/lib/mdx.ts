import fs from 'fs'
import path from 'path'

const CONTENT_DIR = path.join(process.cwd(), 'content/blog')

export function getMdxContent(slug: string): string | null {
  try {
    const filePath = path.join(CONTENT_DIR, `${slug}.mdx`)
    return fs.readFileSync(filePath, 'utf-8')
  } catch {
    return null
  }
}

export function getAllBlogSlugs(): string[] {
  try {
    return fs
      .readdirSync(CONTENT_DIR)
      .filter(f => f.endsWith('.mdx'))
      .map(f => f.replace(/\.mdx$/, ''))
  } catch {
    return []
  }
}
