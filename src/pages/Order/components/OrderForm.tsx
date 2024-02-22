import {zodResolver} from '@hookform/resolvers/zod'
import {Box} from '@mui/material'
import {useForm} from 'react-hook-form'
import {z} from 'zod'
import {InputTest} from '~/components/InputFile/InputTest'
import {SelectInput} from '~/components/InputFile/SelectInput'
import orderSchema from '~/utils/orderSchema'

type InputState = z.infer<typeof orderSchema>

export const OrderForm = () => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<InputState>({
    defaultValues: {
      phone_number: '',
      shipping_address: '',
      shipping_method: '',
      year: '',
      month: '',
      day: '',
      payment_method: '',
    },
    resolver: zodResolver(orderSchema), // zodをRHFに流し込むことでバリデーションができる
  })

  const onSubmit = (data: InputState) => {
    console.log(data)
  }

  return (
    <Box component='form' onSubmit={handleSubmit(onSubmit)} sx={{px: 10}}>
      <InputTest
        name='phone_number'
        control={control}
        error={errors.phone_number?.message ?? undefined}
        label={'phone_number'}
        size='small'
      />
      <InputTest
        name='shipping_address'
        control={control}
        error={errors.shipping_address?.message ?? undefined}
        label={'shipping_address'}
        size='small'
      />
      <SelectInput
        name='payment_method'
        control={control}
        error={errors.payment_method?.message ?? undefined}
        label={'payment_method'}
        size='small'
        id='payment_method'
        text={'vui long chon phuong thuc thanh toan'}
        values={[
          {value: 'tien mat', label: 'tien mat'},
          {value: 'the ngan hang', label: 'the ngan hang'},
        ]}
      />
      <button type='submit'>Submit</button>
    </Box>
  )
}
