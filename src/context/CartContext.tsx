import React, { createContext, useContext, useState, useEffect } from 'react'

export interface CartItem {
  id: number
  name: string
  image: string
  price: number
  quantity: number
  selectedVariant?: string
}

interface CartContextType {
  cart: CartItem[]
  addToCart: (item: Omit<CartItem, 'quantity'>) => void
  removeFromCart: (id: number, variant?: string) => void
  updateQuantity: (id: number, quantity: number, variant?: string) => void
  clearCart: () => void
  isCartOpen: boolean
  setIsCartOpen: (isOpen: boolean) => void
  cartCount: number
  cartTotal: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('easybyte_cart')
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart))
      } catch (e) {
        console.error('Failed to parse cart', e)
      }
    }
  }, [])

  // Save cart to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('easybyte_cart', JSON.stringify(cart))
  }, [cart])

  const addToCart = (newItem: Omit<CartItem, 'quantity'>) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.id === newItem.id &&
          item.selectedVariant === newItem.selectedVariant
      )

      if (existingIndex > -1) {
        const updated = [...prev]
        updated[existingIndex].quantity += 1
        return updated
      }

      return [...prev, { ...newItem, quantity: 1 }]
    })
    setIsCartOpen(true) // Open cart drawer automatically when item is added
  }

  const removeFromCart = (id: number, variant?: string) => {
    setCart((prev) =>
      prev.filter(
        (item) => !(item.id === id && item.selectedVariant === variant)
      )
    )
  }

  const updateQuantity = (id: number, quantity: number, variant?: string) => {
    if (quantity <= 0) {
      removeFromCart(id, variant)
      return
    }
    setCart((prev) =>
      prev.map((item) =>
        item.id === id && item.selectedVariant === variant
          ? { ...item, quantity }
          : item
      )
    )
  }

  const clearCart = () => {
    setCart([])
  }

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0)
  const cartTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
