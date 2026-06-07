import type { PersonalInfo } from '@/lib/types'
import type { AboutStat } from './AboutStatsStrip'

function engagementLabel(raw: string) {
  if (raw === 'fulltime') return 'Full-time'
  if (raw === 'parttime') return 'Part-time'
  return raw
}

function locationTypeLabel(raw: string) {
  if (raw === 'remote') return 'Remote'
  if (raw === 'hybrid') return 'Hybrid'
  if (raw === 'onsite') return 'On-site'
  return raw
}

export function buildAboutStats(personal: PersonalInfo | null): AboutStat[] {
  const locationCity = personal?.location_city ?? 'Damascus'
  const locationCountry = personal?.location_country ?? 'SY'
  const openToWork = personal?.open_to_work ?? true
  const yearsExp = personal?.years_experience ?? 2

  const stats: AboutStat[] = [
    {
      label: 'Location',
      value: locationCity,
      sub: locationCountry === 'SY' ? 'Syria' : locationCountry,
      numeric: false,
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
          <circle cx="12" cy="9" r="2.5" />
        </svg>
      ),
    },
    {
      label: 'Experience',
      value: yearsExp,
      suffix: '+',
      sub: 'years',
      numeric: true,
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 6v6l4 2" />
        </svg>
      ),
    },
    {
      label: 'Status',
      value: openToWork ? 'Open' : 'Busy',
      sub: 'to work',
      highlight: openToWork,
      numeric: false,
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <path d="M22 4L12 14.01l-3-3" />
        </svg>
      ),
    },
  ]

  if (openToWork) {
    stats.push({
      label: 'Mode',
      value: engagementLabel(personal?.work_engagement ?? 'parttime'),
      sub: locationTypeLabel(personal?.work_location_type ?? 'remote'),
      numeric: false,
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="7" width="20" height="14" rx="2" />
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </svg>
      ),
    })
  }

  return stats
}
