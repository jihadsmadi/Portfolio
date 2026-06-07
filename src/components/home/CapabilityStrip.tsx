'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import type { Capability } from '@/lib/types'
import SectionLabel from '@/components/ui/SectionLabel'
import SectionShell from '@/components/ui/SectionShell'
import AccentBar from '@/components/ui/AccentBar'
import { CapabilityIcon } from '@/components/icons/CapabilityIcons'
import { EASE, DURATION, VIEWPORT_MARGIN_LOOSE } from '@/components/motion/constants'

type Props = { capabilities: Capability[] }

export default function CapabilityStrip({ capabilities }: Props) {
  const track = [...capabilities, ...capabilities]
  const headerRef = useRef<HTMLDivElement>(null)
  const headerInView = useInView(headerRef, { once: true, margin: VIEWPORT_MARGIN_LOOSE })

  return (
    <SectionShell className="cap-strip" padding="strip">
      <motion.div
        ref={headerRef}
        initial={{ opacity: 0, y: 20 }}
        animate={headerInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: DURATION.normal, ease: EASE }}
      >
        <SectionLabel>What I build</SectionLabel>
      </motion.div>

      <div className="cap-marquee-mask">
        <div className="cap-marquee-track">
          {track.map((cap, i) => (
            <CapabilityCard key={`${cap.id}-${i}`} cap={cap} />
          ))}
        </div>
      </div>
    </SectionShell>
  )
}

function CapabilityCard({ cap }: { cap: Capability }) {
  return (
    <div className="cap-card">
      <AccentBar className="accent-bar-top" />
      <div className="cap-card-icon">
        <CapabilityIcon name={cap.icon_name} />
      </div>
      <div>
        <div className="cap-card-title">{cap.title}</div>
        <div className="cap-card-body">{cap.body}</div>
      </div>
    </div>
  )
}
