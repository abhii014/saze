'use client'

import { motion } from 'framer-motion'
import { type ReactNode } from 'react'

const pageVariants = {
  hidden: {
    opacity: 0,
    y: 30,
    filter: 'blur(4px)',
  },
  enter: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.08,
    },
  },
  exit: {
    opacity: 0,
    y: -15,
    filter: 'blur(4px)',
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

export default function PageTransition({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial="hidden"
      animate="enter"
      exit="exit"
      variants={pageVariants}
    >
      {children}
    </motion.div>
  )
}
