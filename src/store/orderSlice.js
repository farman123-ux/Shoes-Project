import { createSlice } from '@reduxjs/toolkit'

const USER_KEY = 'stepstyle-user'
const ORDERS_KEY = 'stepstyle-orders'
const CART_KEY = 'stepstyle-cart'

const readStorage = (key, fallback) => {
  if (typeof window === 'undefined') {
    return fallback
  }

  try {
    const storedValue = window.localStorage.getItem(key)
    return storedValue ? JSON.parse(storedValue) : fallback
  } catch {
    return fallback
  }
}

const writeStorage = (key, value) => {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(key, JSON.stringify(value))
  }
}

const initialState = {
  user: readStorage(USER_KEY, null),
  orders: readStorage(ORDERS_KEY, []),
  cart: readStorage(CART_KEY, []),
}

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    login(state, action) {
      state.user = action.payload
      writeStorage(USER_KEY, action.payload)
    },
    logout(state) {
      state.user = null
      writeStorage(USER_KEY, null)
    },
    addToCart(state, action) {
      state.cart = [action.payload]
      writeStorage(CART_KEY, state.cart)
    },
    clearCart(state) {
      state.cart = []
      writeStorage(CART_KEY, [])
    },
    placeOrder(state, action) {
      const order = {
        ...action.payload,
        id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
        createdAt: new Date().toISOString(),
      }

      state.orders = [order, ...state.orders]
      state.cart = []
      writeStorage(ORDERS_KEY, state.orders)
      writeStorage(CART_KEY, [])
    },
  },
})

export const { login, logout, addToCart, clearCart, placeOrder } = orderSlice.actions
export default orderSlice.reducer
