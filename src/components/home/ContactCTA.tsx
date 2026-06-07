'use client'

import AccentBar from '@/components/ui/AccentBar'
import GradientText from '@/components/ui/GradientText'
import Button from '@/components/ui/Button'
import SectionShell from '@/components/ui/SectionShell'

export default function ContactCTA() {
  return (
    <SectionShell className="contact-cta-section" padding="inset">
      <div className="contact-cta-card">
        <AccentBar className="accent-bar-top" />

        <div className="contact-cta-glow contact-cta-glow--tr" aria-hidden />
        <div className="contact-cta-glow contact-cta-glow--bl" aria-hidden />

        <div className="contact-cta-inner">
          <div className="contact-cta-badge">
            <span className="contact-cta-badge-dot" />
            Open to work
          </div>

          <h2 className="contact-cta-headline">
            Have a project in mind? <GradientText>Let&apos;s talk.</GradientText>
          </h2>

          <p className="contact-cta-lead">
            From architecture reviews to full-stack builds — I work best on complex problems that need clean, maintainable solutions.
          </p>

          <div className="home-cta-row contact-cta-actions">
            <Button href="/contact" variant="primary" arrow>
              Start a conversation
            </Button>
            <Button href="mailto:jihadsmadi41@gmail.com" variant="ghost">
              Send email directly
            </Button>
          </div>
        </div>
      </div>
    </SectionShell>
  )
}
