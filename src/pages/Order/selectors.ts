import {createSelector} from '@reduxjs/toolkit'
import { RootState } from '~/redux/store';



export const cartItemsSelector = (state: RootState) => {
    return state.order.resultOrder?.orderDetails || [];
};


export const cartItemsCountSelector = createSelector(
    cartItemsSelector,
    (cartItems: any) => {
      return cartItems.reduce((count: number, item: any) => count + item.quantity, 0);
    }
)


export const cartTotalSelector = createSelector(
  cartItemsSelector,
  (cartItems: any) =>
    cartItems.reduce(
      (total: number, item: any) => total + item.product.price * item.quantity,
      0,
    ),
)
