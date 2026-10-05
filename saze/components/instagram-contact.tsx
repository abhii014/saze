import InstagramIcon from '@/components/icons/instagram-icon'
import { INSTAGRAM_URL } from '@/lib/instagram'

export default function InstagramContact() {
  return (
    <a href={INSTAGRAM_URL} className="instagram-contact" aria-label="Contact SAZÉ on Instagram">
      <InstagramIcon size={20} aria-hidden="true" />
      <span className="hidden sm:inline">Let&apos;s talk nails</span>
    </a>
  )
}
