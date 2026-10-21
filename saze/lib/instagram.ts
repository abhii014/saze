import type { CartItem } from '@/lib/cart-context'
import { formatPrice } from '@/lib/products'

export const INSTAGRAM_USERNAME = '_saze.in_'
export const INSTAGRAM_URL = `https://www.instagram.com/${INSTAGRAM_USERNAME}/`
// Official Instagram DM shortlink: opens directly in Instagram app chat on mobile
export const INSTAGRAM_DM_URL = `https://ig.me/m/${INSTAGRAM_USERNAME}`

export function buildOrderMessage(items: CartItem[], subtotal: number): string {
  return [
    "Hi SAZÉ! ✦ I'd love to order:",
    '',
    ...items.map(({ product, quantity }) =>
      `• ${product.name} × ${quantity}: ${formatPrice(product.price * quantity)}`
    ),
    '',
    `Total: ${formatPrice(subtotal)}`,
    '',
    'Could you let me know availability and how to pay? Thank you! 💛',
  ].join('\n')
}

export function buildSingleProductMessage(productName: string, price: number): string {
  return [
    "Hi SAZÉ! ✦ I'd love to order:",
    '',
    `• ${productName} × 1: ${formatPrice(price)}`,
    '',
    `Total: ${formatPrice(price)}`,
    '',
    'Could you let me know availability and how to pay? Thank you! 💛',
  ].join('\n')
}
