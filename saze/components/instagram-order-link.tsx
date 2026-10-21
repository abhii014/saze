'use client'

import type { AnchorHTMLAttributes, ReactNode } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { motion } from 'framer-motion'
import InstagramIcon from '@/components/icons/instagram-icon'
import { INSTAGRAM_URL } from '@/lib/instagram'

interface Props {
  children?: ReactNode
  className?: string
  label?: string
  target?: AnchorHTMLAttributes<HTMLAnchorElement>['target']
  rel?: string
}

export default function InstagramOrderLink({
  children = 'Order on Instagram',
  className = 'button-primary',
  label,
  target,
  rel,
}: Props) {
  return (
    <motion.a
      href={INSTAGRAM_URL}
      className={className}
      aria-label={label}
      target={target}
      rel={rel}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.2 }}
    >
      <InstagramIcon size={17} aria-hidden="true" />
      <span>{children}</span>
      <ArrowUpRight size={16} aria-hidden="true" className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </motion.a>
  )
}
