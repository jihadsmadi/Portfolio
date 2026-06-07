'use client'

import { motion } from 'framer-motion'
import { EASE, DURATION } from './constants'

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.normal, ease: EASE },
  },
}

type ContainerProps = {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
  margin?: string
}

export function ScrollReveal({ children, className, style, margin = '-60px' }: ContainerProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: margin as `${number}px` }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  )
}

type ItemProps = {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
  delay?: number
}

export function RevealItem({ children, className, style, delay = 0 }: ItemProps) {
  return (
    <motion.div
      variants={{
        hidden: itemVariants.hidden,
        show: {
          ...itemVariants.show,
          transition: { duration: DURATION.normal, ease: EASE, delay },
        },
      }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  )
}

export function RevealBlock({
  children,
  inView,
  delay = 0,
  y = 20,
  className,
  style,
}: {
  children: React.ReactNode
  inView: boolean
  delay?: number
  y?: number
  className?: string
  style?: React.CSSProperties
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: DURATION.normal, ease: EASE, delay }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  )
}
