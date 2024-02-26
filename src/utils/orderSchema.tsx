import {z} from 'zod'

const orderSchema = z.object({
  full_name: z.string().refine(
    (value) => {
      const validation = value.trim().length > 0 && value.trim().length < 4
      return !validation
    },
    {
      message: 'Yeu cau nhap 4 ky tu tro len',
    },
  ),
  email: z.string().refine(
    (value) => {
      const trimmedValue = value.trim()
      if (trimmedValue === '') {
        return true
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return emailRegex.test(trimmedValue)
    },
    {
      message: 'Email không hợp lệ',
    },
  ),
  shipping_address: z.string().refine(
    (value) => {
      const validation = value.trim().length > 0 && value.trim().length < 4
      return !validation
    },
    {
      message: 'Yeu cau nhap 4 ky tu tro len',
    },
  ),
  phone_number: z
    .string()
    .nonempty('こちらの項目は必死です。')
    .refine(
      (val) => {
        const sanitizedVal = val.replace(/-|\s/g, '').trim()
        return !isNaN(Number(sanitizedVal))
      },
      {
        message: '電話番号は数字を入力してください。',
      },
    )
    .refine(
      (val) => {
        const sanitizedVal = val.replace(/-|\s/g, '').trim()
        return sanitizedVal.length >= 10
      },
      {
        message: '10文字以上、入力してください。',
      },
    ),
  shipping_method: z.string().nonempty('こちらの項目は必死です。'),
  payment_method: z.string().nonempty('こちらの項目は必死です。'),
  note: z.string(),
})

export default orderSchema
