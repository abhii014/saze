'use client'

import { motion } from 'framer-motion'
import InstagramIcon from '@/components/icons/instagram-icon'
import { INSTAGRAM_URL } from '@/lib/instagram'

export default function InstagramContact() {
  return (
    <motion.a
      href={INSTAGRAM_URL}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
      whileHover={{ scale: 1.06, y: -4 }}
      whileTap={{ scale: 0.94 }}
      className="instagram-contact group ring-1 ring-gold/40 shadow-[0_8px_30px_rgba(0,0,0,0.35)]"
      aria-label="Contact SAZÉ on Instagram"
    >
      <span className="absolute -inset-1 rounded-full bg-gold/15 animate-ping pointer-events-none" aria-hidden="true" />
      <InstagramIcon size={20} aria-hidden="true" className="text-gold transition-transform duration-300 group-hover:rotate-12" />
      <span className="hidden sm:inline font-medium tracking-[0.04em]">Let&apos;s talk nails</span>
    </motion.a>
  )
}
