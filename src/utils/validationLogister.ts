import { z } from 'zod'

export const schema = z
  .object({
    full_name: z
      .string()
      .nonempty('こちらの項目は必死です。')
      .min(4, '4文字以上、ご入力ください'),
    furigana_name: z
      .string()
      .nonempty('こちらの項目は必死です。')
      .min(4, '4文字以上、ご入力ください'),
    post_id: z
      .string()
      .nonempty('こちらの項目は必死です。')
      .min(7, '7字以上、ご入力ください'),
    prefecture: z.string().nonempty('こちらの項目は必死です。'),
    address1: z
      .string()
      .nonempty('こちらの項目は必死です。')
      .min(7, '7字以上、ご入力ください'),
    address2: z
      .string()
      .nonempty('こちらの項目は必死です。')
      .min(7, '7字以上、ご入力ください'),
    email: z
      .string()
      .nonempty('こちらの項目は必死です。')
      .email('メールアドレスが正しくない。ご確認お願いします。'),
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
    fax_number: z
      .string()
      .refine(
        (val) => {
          if (val && val.trim() !== '') {
            const sanitizedVal = val.replace(/-|\s/g, '').trim()
            return !isNaN(Number(sanitizedVal))
          }
          return true
        },
        {
          message: 'ファクスは正しくない。ご確認お願いします。',
        },
      )
      .refine(
        (val) => {
          if (val && val.trim() !== '') {
            const sanitizedVal = val.replace(/-|\s/g, '').trim()
            return sanitizedVal.length >= 10
          }
          return true
        },
        {
          message: '10文字以上、入力してください。',
        },
      ),
    gender: z.string().nonempty('こちらの項目は必死です。'),
    email_accept: z.string().nonempty('こちらの項目は必死です。'),
    year: z
      .string()
      .nonempty('こちらの項目は必死です。')
      .regex(/^\d{4}$/, '年は４文字でお願いします。'),
    month: z.string().nonempty('*'),
    day: z.string().nonempty('*'),
    login_id: z
      .string()
      .nonempty('こちらの項目は必死です。')
      .min(7, '7字以上、ご入力ください'),
    pass_word: z
      .string()
      .nonempty('こちらの項目は必死です。')
      .min(7, '7字以上、ご入力ください'),
    checkPassword: z
      .string()
      .nonempty('こちらの項目は必死です。')
      .min(7, '7字以上、ご入力ください'),
  })
  .refine((data) => data.pass_word === data.checkPassword, {
    message: 'パスポートと再入パスポートは一致しません。',
    path: ['checkPassword'], // path of error
  })
