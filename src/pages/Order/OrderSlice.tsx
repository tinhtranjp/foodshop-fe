import {createSlice} from '@reduxjs/toolkit'
import {OrderResponse} from '~/model/OrderModel'

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    resultOrder: {} as OrderResponse,
  },
  reducers: {
    addToResultOrder(state, action: {payload: OrderResponse}) {
      state.resultOrder = {...action.payload}
    },

    removeFromResultOrder(state) {
      state.resultOrder = {} as OrderResponse
    },
  },
})

const {actions, reducer} = orderSlice
export const {addToResultOrder, removeFromResultOrder} = actions

export default reducer
