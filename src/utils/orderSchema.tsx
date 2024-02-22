import {z} from 'zod'

const orderSchema = z.object({
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
  shipping_address: z.string().nonempty('こちらの項目は必死です。'),
  shipping_method: z.string().nonempty('こちらの項目は必死です。'),
  year: z
    .string()
    .nonempty('こちらの項目は必死です。')
    .regex(/^\d{4}$/, '年は４文字でお願いします。'),
  month: z.string().nonempty('*'),
  day: z.string().nonempty('*'),
  payment_method: z.string().nonempty('こちらの項目は必死です。'),
})

export default orderSchema
