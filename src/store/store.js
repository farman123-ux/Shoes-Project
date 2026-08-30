import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './cartSlice'
import orderReducer from './orderSlice'
import productReducer from './productSlice'

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    order: orderReducer,
    product: productReducer,
  },
})

export default store
