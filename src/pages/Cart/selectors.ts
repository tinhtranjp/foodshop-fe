import {createSelector} from '@reduxjs/toolkit'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const cartItemsSelector = (state: any) => state.cart.cartItems

export const cartItemsCountSelector = createSelector(
  cartItemsSelector,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (cartItems) =>
    cartItems.reduce((count: any, item: any) => count + item.quantity, 0),
)

export const cartTotalSelector = createSelector(
  cartItemsSelector,
  (cartItems) =>
    cartItems.reduce(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (total: any, item: any) => total + item.product.price * item.quantity,
      0,
    ),
)
