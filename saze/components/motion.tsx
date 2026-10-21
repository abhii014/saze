'use client'

import { motion, useInView, type Variants } from 'framer-motion'
import { useRef, type ReactNode } from 'react'

// Luxurious easing curves
const luxeEase = [0.22, 1, 0.36, 1] as const
const softEase = [0.33, 1, 0.68, 1] as const

// ── Fade-up on scroll ──
export function FadeIn({
  children,
  className = '',
  delay = 0,
  duration = 0.7,
  y = 40,
  once = true,
  blur = true,
}: {
  children: ReactNode
  className?: string
  delay?: number
  duration?: number
  y?: number
  once?: boolean
  blur?: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y, filter: blur ? 'blur(4px)' : 'blur(0px)' }}
      animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
      transition={{ duration, delay, ease: luxeEase }}
    >
      {children}
    </motion.div>
  )
}

// ── Staggered children ──
const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
}

const staggerItem: Variants = {
  hidden: { opacity: 0, y: 30, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.6, ease: luxeEase },
  },
}

export function StaggerContainer({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={staggerContainer}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <motion.div className={className} variants={staggerItem}>
      {children}
    </motion.div>
  )
}

// ── Scale on hover (for cards/images) ──
export function HoverScale({
  children,
  className = '',
  scale = 1.03,
}: {
  children: ReactNode
  className?: string
  scale?: number
}) {
  return (
    <motion.div
      className={className}
      whileHover={{ scale }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.4, ease: softEase }}
    >
      {children}
    </motion.div>
  )
}

// ── Magnetic hover effect ──
export function MagneticHover({
  children,
  className = '',
  strength = 0.3,
}: {
  children: ReactNode
  className?: string
  strength?: number
}) {
  const ref = useRef<HTMLDivElement>(null)

  function handleMouseMove(e: React.MouseEvent) {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left - rect.width / 2) * strength
    const y = (e.clientY - rect.top - rect.height / 2) * strength
    el.style.transform = `translate(${x}px, ${y}px)`
  }

  function handleMouseLeave() {
    const el = ref.current
    if (!el) return
    el.style.transform = 'translate(0px, 0px)'
    el.style.transition = 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)'
  }

  return (
    <div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transition: 'transform 0.15s ease-out' }}
    >
      {children}
    </div>
  )
}

// ── Text reveal char-by-char ──
export function TextReveal({
  text,
  className = '',
  delay = 0,
  as: Tag = 'h1',
}: {
  text: string
  className?: string
  delay?: number
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span'
}) {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  const words = text.split(' ')

  return (
    <Tag ref={ref as any} className={className}>
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          className="inline-block mr-[0.25em]"
          initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
          animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{
            duration: 0.5,
            delay: delay + i * 0.04,
            ease: luxeEase,
          }}
        >
          {word}
        </motion.span>
      ))}
    </Tag>
  )
}

// ── Parallax on scroll ──
export function Parallax({
  children,
  className = '',
  speed = 0.5,
}: {
  children: ReactNode
  className?: string
  speed?: number
}) {
  const ref = useRef<HTMLDivElement>(null)

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ willChange: 'transform' }}
      whileInView={{ y: 0 }}
      initial={{ y: speed * 40 }}
      transition={{ duration: 0 }}
      viewport={{ once: false }}
    >
      {children}
    </motion.div>
  )
}

// ── Gold shimmer line divider ──
export function ShimmerLine({ className = '' }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })

  return (
    <motion.div
      ref={ref}
      className={`h-px bg-gradient-to-r from-transparent via-gold to-transparent ${className}`}
      initial={{ scaleX: 0, opacity: 0 }}
      animate={isInView ? { scaleX: 1, opacity: 1 } : {}}
      transition={{ duration: 1.2, ease: luxeEase }}
    />
  )
}

// ── Counter animation ──
export function AnimatedCounter({
  value,
  className = '',
  duration = 2,
}: {
  value: number
  className?: string
  duration?: number
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })

  return (
    <motion.span
      ref={ref}
      className={className}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
    >
      {isInView ? (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {value}
        </motion.span>
      ) : (
        '0'
      )}
    </motion.span>
  )
}
