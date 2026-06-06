'use client'

import { motion } from 'framer-motion'

const EASE = [0.23, 1, 0.32, 1] as const

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE },
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
      viewport={{ once: true, margin }}
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
        hidden: { opacity: 0, y: 22 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.55, ease: EASE, delay },
        },
      }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  )
}
