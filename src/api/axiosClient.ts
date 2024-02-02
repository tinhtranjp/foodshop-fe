import axios from 'axios'

export const fetcherData = (url: string) =>
  axios.get(`http://localhost:8088/api/v1/${url}`).then((res) => res.data)

const axiosClient = axios.create({
  baseURL: 'http://localhost:8088/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add a request interceptor
axiosClient.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  },
)

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response) {
    return response.data
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    // console.log(error)
    console.log(error)

    const { config, status, data } = error.response

    if (config.url === '/users/login' && status === 400) {
      throw new Error(data.message)
    }

    if (config.url === '/users/register' && status === 400) {
      throw new Error(data)
    }
    return Promise.reject(error)
  },
)

export default axiosClient
