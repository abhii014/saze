import type { ReactNode } from 'react'
import { ArrowUpRight } from 'lucide-react'
import InstagramIcon from '@/components/icons/instagram-icon'
import { INSTAGRAM_URL } from '@/lib/instagram'

interface Props {
  children?: ReactNode
  className?: string
  label?: string
}

export default function InstagramOrderLink({
  children = 'Order on Instagram',
  className = 'button-primary',
  label,
}: Props) {
  return (
    <a href={INSTAGRAM_URL} className={className} aria-label={label}>
      <InstagramIcon size={17} aria-hidden="true" />
      {children}
      <ArrowUpRight size={16} aria-hidden="true" />
    </a>
  )
}
