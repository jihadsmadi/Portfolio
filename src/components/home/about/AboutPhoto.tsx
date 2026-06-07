'use client'

import { motion } from 'framer-motion'
import { EASE } from '@/components/motion/constants'

type Props = {
  avatarUrl: string | null
  openToWork: boolean
  inView: boolean
}

export default function AboutPhoto({ avatarUrl, openToWork, inView }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -24 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.65, ease: EASE, delay: 0.18 }}
      style={{ position: 'sticky', top: 96 }}
    >
      <div className="about-photo">
        {avatarUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={avatarUrl} alt="Jihad Al-Smadi" className="about-photo-img" />
        ) : (
          <>
            <div className="about-photo-gradient" />
            <div className="about-photo-head" />
            <div className="about-photo-shoulders" />
            <span className="about-photo-label">Jihad Al-Smadi</span>
          </>
        )}

        <span className="about-photo-badge">
          <span className="about-photo-badge-dot">
            {openToWork && <span className="status-pulse about-photo-badge-pulse" />}
          </span>
          {openToWork ? 'Open to work' : 'Not available'}
        </span>
      </div>
    </motion.div>
  )
}
