import { ResponProduct } from '~/model/ProductModel'
import axiosClient from './axiosClient'
import { listProductImgModel } from '~/model/ProductModel'

interface Params {
  page: number
  limit: number
}

const productApi = {
  getAll(params: Params) {
    params.page = !params.page || params.page <= 1 ? 0 : params.page - 1
    return axiosClient.get<ResponProduct, ResponProduct>('/products', {
      params,
    })
  },

  getById(id: string) {
    const url = `/products/${id}`
    return axiosClient.get(url)
  },

  //   add(data: Product) {
  //     const url = '/products'
  //     return axiosClient.post(url, data)
  //   },

  //   update(data: Product) {
  //     const { id, ...newData } = data
  //     const url = `/products/${id}`
  //     return axiosClient.put(url, newData)
  //   },

  //   remove(id: string) {
  //     const url = `/products/${id}`
  //     return axiosClient.delete(url)
  //   },

  getImg(link: string) {
    const url = `/images/${link}`
    return axiosClient.get(url)
  },
  getImgByProductId(productId: string) {
    const url = `/images/products/${productId}`
    return axiosClient.get<listProductImgModel[], listProductImgModel[]>(url)
  },
}

export default productApi
