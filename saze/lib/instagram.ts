import type { CartItem } from '@/lib/cart-context'
import { formatPrice } from '@/lib/products'

// Update this once if the brand's Instagram handle changes.
export const INSTAGRAM_USERNAME = '_saze.in_'
export const INSTAGRAM_URL = `https://www.instagram.com/${INSTAGRAM_USERNAME}/`

export function buildOrderMessage(items: CartItem[], subtotal: number): string {
  return [
    "Hi SAZÉ! I'd love to order:",
    '',
    ...items.map(({ product, quantity }) =>
      `• ${product.name} × ${quantity}: ${formatPrice(product.price * quantity)}`
    ),
    '',
    `Subtotal: ${formatPrice(subtotal)} (before shipping)`,
    '',
    'Please confirm availability, sizing, shipping, and payment details. Thank you!',
  ].join('\n')
}
