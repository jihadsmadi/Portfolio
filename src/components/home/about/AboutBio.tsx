'use client'

import { motion } from 'framer-motion'
import { EASE } from '@/components/motion/constants'

type Props = {
  bioParagraphs: string[]
  inView: boolean
}

export default function AboutBio({ bioParagraphs, inView }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.65, ease: EASE, delay: 0.22 }}
    >
      <h3 className="about-subhead">
        I design and build production-grade systems with clean architecture, strong domain
        modeling, and real-time capabilities.
      </h3>

      {bioParagraphs.map((para, i) => (
        <p key={i} className={`about-bio-para${i === 0 ? ' about-bio-para--lead' : ''}`}>
          {para}
        </p>
      ))}
    </motion.div>
  )
}
