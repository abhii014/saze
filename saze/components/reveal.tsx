'use client'

import { useEffect, useRef, type ReactNode } from 'react'

export default function Reveal({ children, className = '' }: {
  children: ReactNode
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element || window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      !('IntersectionObserver' in window)) return

    element.dataset.revealReady = 'true'
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        element.dataset.visible = 'true'
        observer.disconnect()
      }
    }, { threshold: 0.08 })
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return <div ref={ref} className={`reveal ${className}`}>{children}</div>
}
