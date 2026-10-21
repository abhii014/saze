'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import type { ComponentProps, ReactNode } from 'react'

type LinkProps = ComponentProps<typeof Link>

export default function SmoothLink({
  children,
  className = '',
  ...props
}: LinkProps & { children: ReactNode }) {
  return (
    <motion.div
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.15 }}
      className="inline-block"
    >
      <Link className={className} {...props}>
        {children}
      </Link>
    </motion.div>
  )
}
