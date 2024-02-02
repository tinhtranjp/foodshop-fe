import axiosClient from './axiosClient'
import { AddressModel } from '../model/AddressModel'

const addressApi = {
  //   getAll() {
  //     const url = '/categories'
  //     return axiosClient.get(url)
  //   },

  //   get(id: string) {
  //     const url = `/categories/${id}`
  //     return axiosClient.get(url)
  //   },

  add(data: AddressModel) {
    const url = '/address'
    return axiosClient.post(url, data)
  },

  //   update(data: Category) {
  //     const { id, ...newData } = data
  //     const url = `/categories/${id}`
  //     return axiosClient.put(url, newData)
  //   },

  //   remove(id: string) {
  //     const url = `/categories/${id}`
  //     return axiosClient.delete(url)
  //   },
}

export default addressApi
