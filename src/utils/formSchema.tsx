import { z } from 'zod'

export const formSchema = z
  .object({
    fullName: z.string({
      required_error: "Yeu cau khong duoc de trong",
    })
    .min(7, '7字以上、ご入力ください'),
    age: z.string()
  })