import { createSlice } from '@reduxjs/toolkit'

const ORDERS_KEY = 'stepstyle-orders'
const USER_KEY = 'stepstyle-user'

const readStorage = (key, fallback) => {
  if (typeof window === 'undefined') return fallback
  try {
    const storedValue = window.localStorage.getItem(key)
    return storedValue ? JSON.parse(storedValue) : fallback
  } catch (error) {
    console.error(`Error reading ${key} from localStorage`, error)
    return fallback
  }
}

const writeStorage = (key, value) => {
  if (typeof window !== 'undefined') {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error(`Error writing ${key} to localStorage`, error)
    }
  }
}

const initialState = {
  user: readStorage(USER_KEY, null),
  orders: readStorage(ORDERS_KEY, []),
}

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    loginUser(state, action) {
      state.user = action.payload
      writeStorage(USER_KEY, action.payload)
    },

    logoutUser(state) {
      state.user = null
      writeStorage(USER_KEY, null)
    },

    placeOrder(state, action) {
      const order = {
        ...action.payload,
        id: `ORD-${Date.now()}-${Math.floor(100 + Math.random() * 900)}`,
        status: 'Confirmed - Cash on Delivery upon arrival',
      }

      state.orders = [order, ...state.orders]
      writeStorage(ORDERS_KEY, state.orders)
    },

    editOrder(state, action) {
      const updatedOrder = action.payload
      const index = state.orders.findIndex((o) => o.id === updatedOrder.id)
      if (index !== -1) {
        state.orders[index] = { ...state.orders[index], ...updatedOrder }
        writeStorage(ORDERS_KEY, state.orders)
      }
    },

    deleteOrder(state, action) {
      const orderId = action.payload
      state.orders = state.orders.filter((o) => o.id !== orderId)
      writeStorage(ORDERS_KEY, state.orders)
    },

    clearAllOrders(state) {
      state.orders = []
      writeStorage(ORDERS_KEY, [])
    },
  },
})

export const {
  loginUser,
  logoutUser,
  placeOrder,
  editOrder,
  deleteOrder,
  clearAllOrders,
} = orderSlice.actions

export default orderSlice.reducer
