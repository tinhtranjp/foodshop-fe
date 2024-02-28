import {z} from 'zod'

export const orderDetail = z.object({
  name: z.string().min(4, 'yeu cau nhap 4 ky tu tro len'),
  price: z.string().refine(
    (val) => {
      const parsedVal = parseInt(val, 10)
      return !Number.isNaN(parsedVal) && parsedVal >= 0
    },
    {
      message: 'Yêu cầu nhập vào là số và phải lớn hơn hoặc bằng 0',
    },
  ),
  quantity: z.string().refine(
    (val) => {
      const parsedVal = parseInt(val, 10)
      return !Number.isNaN(parsedVal) && parsedVal >= 1
    },
    {
      message: 'Yêu cầu nhập vào là số và phải lớn hơn hoặc bằng 1',
    },
  ),
  note: z.string(),
})

export const order = z.object({
  note: z.string(),
})
