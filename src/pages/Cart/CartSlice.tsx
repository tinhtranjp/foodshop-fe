import {createSlice} from '@reduxjs/toolkit'
import {CartItem} from '~/model/CartModel'

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    showMiniCart: false,
    cartItems: [] as CartItem[],
  },
  reducers: {
    showMiniCart(state) {
      state.showMiniCart = true
    },

    hideMiniCart(state) {
      state.showMiniCart = false
    },

    addToCart(state, action: {payload: CartItem}) {
      const newItem = action.payload
      const index = state.cartItems.findIndex((x) => x.id === newItem.id)
      if (index >= 0) {
        state.cartItems[index].quantity += newItem.quantity
      } else {
        state.cartItems.push(newItem)
      }
    },

    setQuantity(state, action) {
      const {id, quantity} = action.payload
      const index = state.cartItems.findIndex((x) => x.id === id)
      if (index >= 0) {
        state.cartItems[index].quantity = quantity
      }
    },

    removeFromCart(state, action) {
      const idNeedtoRemove = action.payload
      state.cartItems = state.cartItems.filter((x) => x.id !== idNeedtoRemove)
    },

    removeAll(state) {
      state.cartItems = [] as CartItem[]
    },
  },
})

const {actions, reducer} = cartSlice
export const {
  showMiniCart,
  hideMiniCart,
  addToCart,
  removeFromCart,
  setQuantity,
  removeAll,
} = actions

export default reducer
