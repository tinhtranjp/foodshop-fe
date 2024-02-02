import 'react-toastify/dist/ReactToastify.css'
import { toast } from 'react-toastify'

export const toastSuccess = (message: string) => {
  toast.success(message)
}

export const toastSuccess2 = (message: string) => {
  toast.success(message, { style: { top: '50px' } })
}

export const toastError = (message: string) => {
  toast.error(message)
}

export const toastWarning = (message: string) => {
  toast.warn(message)
}

export const toastInfo = (message: string) => {
  toast.info(message)
}
