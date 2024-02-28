import {zodResolver} from '@hookform/resolvers/zod'
import {Box, Button} from '@mui/material'
import {Dayjs} from 'dayjs'
import {useForm} from 'react-hook-form'
import {useSelector} from 'react-redux'
import {z} from 'zod'
import orderApi from '~/api/orderStoreAPI'
import {toastSuccess} from '~/components/CustomToast'
import {InputText} from '~/components/InputFile/InputText'
import {RootState} from '~/redux/store'
import {order} from '~/utils/orderSchema1'

type InputState = z.infer<typeof order>

interface orderDetails {
  id: string
  name: string
  price: string
  quantity: string
  note: string
}

export default function OrderStoreForm({
  orderDetails,
  date,
  onOrderDetailsChange,
}: {
  orderDetails: orderDetails[]
  date: Dayjs | null
  onOrderDetailsChange: (newOrderDetails: orderDetails[]) => void
}) {
  const user = useSelector((state: RootState) => state.user.current.user)
  const token = useSelector((state: RootState) => state.user.current.token)

  const {
    control,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm<InputState>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues: {
      note: '',
    },
    resolver: zodResolver(order),
  })

  const onSubmit = (data: InputState) => {
    if (!token || orderDetails.length === 0) {
      return
    }

    const dateFormat = date ? date.format('YYYY-MM-DD') : ''
    const totalMoney = orderDetails.reduce((total, item) => {
      const price = parseFloat(item.price)
      const quantity = parseFloat(item.quantity)
      const subtotal = price * quantity
      return total + subtotal
    }, 0)

    const newDetails = orderDetails.map(({id, ...rest}) => rest)

    const newData = {
      ...data,
      user_id: user?.user_id,
      order_date: dateFormat,
      total_money: totalMoney,
      order_list: [...newDetails],
    }

    orderApi
      .add(newData, token)
      .then((response) => {
        console.log(response)
      })
      .catch((error) => {
        console.error('Error:', error)
      })
    onOrderDetailsChange([])
    toastSuccess('Ban da them thanh cong!')
    reset()
  }

  return (
    <Box
      component='form'
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        width: '400px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        ml: 'auto',
      }}
    >
      <InputText
        name='note'
        control={control}
        error={errors.note?.message ?? undefined}
        label={'Note'}
        size='small'
      />
      <Box>
        <Button
          variant='contained'
          type='submit'
          color='secondary'
          sx={{width: '140px'}}
        >
          Submit
        </Button>
      </Box>
    </Box>
  )
}
