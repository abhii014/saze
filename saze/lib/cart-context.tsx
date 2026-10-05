'use client'

import React, { createContext, useContext, useReducer, useEffect, useState } from 'react'
import type { Product } from './products'
import { getProductById } from './products'

export interface CartItem {
  product: Product
  quantity: number
}

interface CartState {
  items: CartItem[]
}

type CartAction =
  | { type: 'ADD_ITEM'; product: Product }
  | { type: 'REMOVE_ITEM'; productId: string }
  | { type: 'UPDATE_QTY'; productId: string; quantity: number }
  | { type: 'CLEAR_CART' }
  | { type: 'HYDRATE'; items: CartItem[] }

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.items.find((i) => i.product.id === action.product.id)
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.product.id === action.product.id ? { ...i, quantity: i.quantity + 1 } : i
          ),
        }
      }
      return { items: [...state.items, { product: action.product, quantity: 1 }] }
    }
    case 'REMOVE_ITEM':
      return { items: state.items.filter((i) => i.product.id !== action.productId) }
    case 'UPDATE_QTY': {
      if (action.quantity <= 0) {
        return { items: state.items.filter((i) => i.product.id !== action.productId) }
      }
      return {
        items: state.items.map((i) =>
          i.product.id === action.productId ? { ...i, quantity: action.quantity } : i
        ),
      }
    }
    case 'CLEAR_CART':
      return { items: [] }
    case 'HYDRATE':
      return { items: action.items }
    default:
      return state
  }
}

interface CartContextValue {
  items: CartItem[]
  addItem: (product: Product) => void
  removeItem: (productId: string) => void
  updateQty: (productId: string, quantity: number) => void
  clearCart: () => void
  totalItems: number
  subtotal: number
  isHydrated: boolean
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] })
  const [isHydrated, setIsHydrated] = useState(false)

  // Hydrate from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('saze-cart')
      if (saved) {
        const savedItems: unknown = JSON.parse(saved)
        if (Array.isArray(savedItems)) {
          const items: CartItem[] = []
          for (const candidate of savedItems) {
            if (!candidate || typeof candidate !== 'object') continue
            const item = candidate as Partial<CartItem>
            const product = getProductById(item.product?.id ?? '')
            if (product?.available && typeof item.quantity === 'number' && Number.isSafeInteger(item.quantity) && item.quantity > 0) {
              items.push({ product, quantity: item.quantity })
            }
          }
          dispatch({ type: 'HYDRATE', items })
        }
      }
    } catch {
      // ignore
    } finally {
      setIsHydrated(true)
    }
  }, [])

  // Persist to localStorage
  useEffect(() => {
    if (!isHydrated) return
    try {
      localStorage.setItem('saze-cart', JSON.stringify(state.items))
    } catch {
      // ignore
    }
  }, [state.items, isHydrated])

  const totalItems = state.items.reduce((sum, i) => sum + i.quantity, 0)
  const subtotal = state.items.reduce((sum, i) => sum + i.product.price * i.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        addItem: (product) => dispatch({ type: 'ADD_ITEM', product }),
        removeItem: (productId) => dispatch({ type: 'REMOVE_ITEM', productId }),
        updateQty: (productId, quantity) => dispatch({ type: 'UPDATE_QTY', productId, quantity }),
        clearCart: () => dispatch({ type: 'CLEAR_CART' }),
        totalItems,
        subtotal,
        isHydrated,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside CartProvider')
  return ctx
}
