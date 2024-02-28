import axiosClient from './axiosClient'
import { Order, OrderRespon } from '~/model/OrderStoreModel'




const orderApi = {
  getAll() {
    const url = '/order1'
    return axiosClient.get<Order[], Order[]>(url)
  },

  get(id: any) {
    const url = `/order1/${id}`
    return axiosClient.get<OrderRespon>(url)
  },

  add(data: any, token: string | undefined) {
    const url = '/order1'
    return axiosClient.post<OrderRespon, OrderRespon>(url, data, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  },

  remove(id: string) {
    const url = `/order1/${id}`
    return axiosClient.delete(url)
  },
}

export default orderApi
