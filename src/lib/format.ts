export function formatDate(dateStr: string | null): string {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export function formatMonthYear(dateStr: string | null): string {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
  })
}

export function formatPeriod(
  start: string,
  end: string | null,
  current: boolean,
): string {
  const startLabel = formatMonthYear(start)
  const endLabel = current ? 'Present' : end ? formatMonthYear(end) : 'Present'
  return `${startLabel} — ${endLabel}`
}

export function descriptionBullets(description: string | null): string[] {
  if (!description) return []
  return description
    .split(/\n+/)
    .map(line => line.replace(/^[-•*]\s*/, '').trim())
    .filter(Boolean)
}

export function initialsFromTitle(title: string, max = 3): string {
  return title
    .split(' ')
    .map(w => w[0])
    .join('')
    .slice(0, max)
}
