import { createSlice } from '@reduxjs/toolkit'

const CART_KEY = 'stepstyle-cart'

const readStorage = (key, fallback) => {
  if (typeof window === 'undefined') return fallback
  try {
    const item = window.localStorage.getItem(key)
    return item ? JSON.parse(item) : fallback
  } catch (error) {
    console.error(`Error reading ${key} from localStorage`, error)
    return fallback
  }
}

const writeStorage = (key, value) => {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.error(`Error writing ${key} to localStorage`, error)
  }
}

const initialState = {
  items: readStorage(CART_KEY, []),
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const newItem = action.payload
      const existingIndex = state.items.findIndex(
        (item) => item.id === newItem.id && item.size === newItem.size
      )

      if (existingIndex >= 0) {
        const existingItem = state.items[existingIndex]
        const newQty = existingItem.quantity + (newItem.quantity || 1)
        const subtotal = existingItem.price * newQty
        const delivery = Math.max(500 + (newQty - 1) * 400)
        const total = subtotal + delivery

        state.items[existingIndex] = {
          ...existingItem,
          quantity: newQty,
          subtotal,
          delivery,
          total,
        }
      } else {
        const qty = newItem.quantity || 1
        const subtotal = newItem.price * qty
        const delivery = Math.max(500 + (qty - 1) * 400)
        const total = subtotal + delivery

        state.items.push({
          ...newItem,
          quantity: qty,
          subtotal,
          delivery,
          total,
        })
      }

      writeStorage(CART_KEY, state.items)
    },

    removeFromCart(state, action) {
      const { id, size } = action.payload
      state.items = state.items.filter(
        (item) => !(item.id === id && item.size === size)
      )
      writeStorage(CART_KEY, state.items)
    },

    updateQuantity(state, action) {
      const { id, size, quantity } = action.payload
      if (quantity <= 0) return

      const item = state.items.find((i) => i.id === id && i.size === size)

      if (item) {
        item.quantity = quantity
        item.subtotal = item.price * quantity
        item.delivery = Math.max(500 + (quantity - 1) * 400)
        item.total = item.subtotal + item.delivery
      }

      writeStorage(CART_KEY, state.items)
    },

    clearCart(state) {
      state.items = []
      writeStorage(CART_KEY, [])
    },
  },
})

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions
export default cartSlice.reducer
