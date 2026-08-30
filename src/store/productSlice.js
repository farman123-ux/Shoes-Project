import { createSlice } from '@reduxjs/toolkit'

const CUSTOM_PRODUCTS_KEY = 'stepstyle-custom-products'

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
  customProducts: readStorage(CUSTOM_PRODUCTS_KEY, []),
  isAddProductOpen: false,
}

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    addProduct(state, action) {
      const newProduct = {
        ...action.payload,
        id: `PROD-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      }
      state.customProducts = [newProduct, ...state.customProducts]
      state.isAddProductOpen = false
      writeStorage(CUSTOM_PRODUCTS_KEY, state.customProducts)
    },

    editProduct(state, action) {
      const updated = action.payload
      const index = state.customProducts.findIndex((p) => p.id === updated.id)
      if (index !== -1) {
        state.customProducts[index] = { ...state.customProducts[index], ...updated }
        writeStorage(CUSTOM_PRODUCTS_KEY, state.customProducts)
      }
    },

    deleteProduct(state, action) {
      const productId = action.payload
      state.customProducts = state.customProducts.filter((p) => p.id !== productId)
      writeStorage(CUSTOM_PRODUCTS_KEY, state.customProducts)
    },

    toggleAddProductModal(state) {
      state.isAddProductOpen = !state.isAddProductOpen
    },

    setAddProductOpen(state, action) {
      state.isAddProductOpen = action.payload
    },
  },
})

export const {
  addProduct,
  editProduct,
  deleteProduct,
  toggleAddProductModal,
  setAddProductOpen,
} = productSlice.actions

export default productSlice.reducer
