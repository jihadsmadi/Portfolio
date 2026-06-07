import SectionLabel from './SectionLabel'

type Props = {
  label: string
  title: React.ReactNode
  lead?: string
  className?: string
  leadClassName?: string
}

export default function PageHeader({ label, title, lead, className, leadClassName }: Props) {
  return (
    <header className={['page-header', className].filter(Boolean).join(' ')}>
      <SectionLabel>{label}</SectionLabel>
      <h1 className="headline-page">{title}</h1>
      {lead && (
        <p className={['page-lead', leadClassName].filter(Boolean).join(' ')}>
          {lead}
        </p>
      )}
    </header>
  )
}
