import axios from 'axios'
import axiosClient from './axiosClient'
import { CategoryModel } from '~/model/CategoryModel'

const categoryApi = {
  getAll() {
    const url = '/categories'
    return axiosClient.get<CategoryModel[], CategoryModel[]>(url)
  },

  get(id: string) {
    const url = `/categories/${id}`
    return axiosClient.get(url)
  },

  add(formData: CategoryModel) {
    return axios.post('/api/insertCategory', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },

  update(data: CategoryModel) {
    const { id, ...newData } = data
    const url = `/categories/${id}`
    return axiosClient.put(url, newData)
  },

  remove(id: string) {
    const url = `/categories/${id}`
    return axiosClient.delete(url)
  },
}

export default categoryApi
