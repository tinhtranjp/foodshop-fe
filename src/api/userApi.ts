import axiosClient from './axiosClient'
import { UserModel, LoginModel, LoginResponse } from '~/model/UserModel'

const userApi = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register(data: UserModel) {
    const url = '/users/register'
    return axiosClient.post<UserModel, UserModel>(url, data)
  },

  login(data: LoginModel) {
    const url = '/users/login'
    return axiosClient.post<LoginResponse, LoginResponse>(url, data)
  },
}

export default userApi
