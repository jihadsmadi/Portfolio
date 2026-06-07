export function formatDate(dateStr: string | null): string {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export function initialsFromTitle(title: string, max = 3): string {
  return title
    .split(' ')
    .map(w => w[0])
    .join('')
    .slice(0, max)
}
