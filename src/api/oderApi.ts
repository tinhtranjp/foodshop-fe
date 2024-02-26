import axiosClient from './axiosClient'
import { OrderModel, OrderResponse } from '~/model/OrderModel'




const orderApi = {
  getAll() {
    const url = '/order'
    return axiosClient.get<OrderModel[], OrderModel[]>(url)
  },

  get(id: string) {
    const url = `/order/${id}`
    return axiosClient.get(url)
  },

  add(data: OrderModel, token: string | undefined) {
    const url = '/order'
    return axiosClient.post<OrderResponse, OrderResponse>(url, data, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  },

  remove(id: string) {
    const url = `/order/${id}`
    return axiosClient.delete(url)
  },
}

export default orderApi
