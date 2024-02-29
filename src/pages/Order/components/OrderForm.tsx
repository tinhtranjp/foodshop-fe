import {useState} from 'react'
import {zodResolver} from '@hookform/resolvers/zod'
import {Box, Button, TextField, Typography} from '@mui/material'
import {Controller, useForm} from 'react-hook-form'
import {z} from 'zod'
import {InputText} from '~/components/InputFile/InputText'
import {SelectInput} from '~/components/InputFile/SelectInput'
import orderSchema from '~/utils/orderSchema'
import dayjs, {Dayjs} from 'dayjs'
import {DemoContainer} from '@mui/x-date-pickers/internals/demo'
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider'
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs'
import {DatePicker} from '@mui/x-date-pickers/DatePicker'
import {useDispatch, useSelector} from 'react-redux'
import {AppDispatch, RootState} from '~/redux/store'
import {cartTotalSelector} from '~/pages/Cart/selectors'
import orderApi from '~/api/oderApi'
import {addToResultOrder} from '../OrderSlice'
import {useNavigate} from 'react-router-dom'
import {removeAll} from '~/pages/Cart/CartSlice'
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'

type InputState = z.infer<typeof orderSchema>
interface cartItems {
  product_id: number | undefined
  total_money: number
  quantity: number
}
export const OrderForm = () => {
  const [value, setValue] = useState<Dayjs | null>(dayjs())
  const [openBackDrop, setOpenBackDrop] = useState(false)
  const handleCloseBackDrop = () => {
    setOpenBackDrop(false)
  }
  const handleOpenBackDrop = () => {
    setOpenBackDrop(true)
  }
  const user = useSelector((state: RootState) => state.user.current.user)
  const token = useSelector((state: RootState) => state.user.current.token)

  const cartItemList = useSelector((state: RootState) => state.cart.cartItems)

  const cartTotal = useSelector(cartTotalSelector)
  const dispatch = useDispatch<AppDispatch>()
  const navigatge = useNavigate()
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<InputState>({
    defaultValues: {
      full_name: '',
      email: '',
      phone_number: '',
      shipping_address: '',
      shipping_method: '',
      payment_method: '',
      note: '',
    },
    resolver: zodResolver(orderSchema),
  })

  const onSubmit = (data: InputState) => {
    if (value?.isBefore(dayjs().format('YYYY-MM-DD'))) {
      return
    }

    const cart_items: cartItems[] = []
    let discount = 0
    const userAddress = user?.address[0]

    cartItemList.forEach((item) => {
      discount =
        discount + (item.product ? item.product.discount * item.quantity : 0)

      const newItem = {
        product_id: item.id,
        quantity: item.quantity,
        total_money: item.product ? item.product.price * item.quantity : 0,
      }
      cart_items.push(newItem)
    })

    const newData = {
      user_id: user?.user_id,
      total_money: cartTotal,
      discount: discount,
      ...data,
      full_name: data.full_name ? data.full_name : user?.full_name,
      email: data.email ? data.email : user?.email,
      shipping_address: data.shipping_address
        ? data.shipping_address
        : `${userAddress?.post_id}  ${userAddress?.prefecture} ${userAddress?.address1} ${userAddress?.address2}`,
      shipping_date: value?.format('YYYY-MM-DD') || '',
      cart_items,
    }

    handleOpenBackDrop()
    setTimeout(() => {
      orderApi
        .add(newData, token)
        .then((response) => {
          dispatch(addToResultOrder(response))
          dispatch(removeAll())
          handleCloseBackDrop()
          navigatge(`/order/result`)
        })
        .catch((error) => {
          handleCloseBackDrop()
          console.error('Error:', error)
        })
    }, 500)
  }

  return (
    <Box component='form' onSubmit={handleSubmit(onSubmit)} sx={{px: 10}}>
      <InputText
        name='full_name'
        control={control}
        error={errors.full_name?.message ?? undefined}
        label={'お名前　(任意)'}
        size='small'
        text='* 入力しない場合はアカウントの情報にします。'
      />
      <InputText
        name='email'
        control={control}
        error={errors.email?.message ?? undefined}
        label={'メールアドレス　(任意)'}
        size='small'
        text='* 入力しない場合はアカウントの情報にします。'
      />
      <InputText
        name='phone_number'
        control={control}
        error={errors.phone_number?.message ?? undefined}
        label={'電話番号'}
        size='small'
      />
      <InputText
        name='shipping_address'
        control={control}
        error={errors.shipping_address?.message ?? undefined}
        label={'お届け住所 (任意)'}
        size='small'
        text='* 入力しない場合はアカウントの情報にします。'
      />
      <SelectInput
        name='payment_method'
        control={control}
        error={errors.payment_method?.message ?? undefined}
        label={'お支払い方法'}
        size='small'
        id='payment_method'
        text={'お支払い方法を選ぶ'}
        values={[{value: '1', label: '現金'}]}
      />
      <SelectInput
        name='shipping_method'
        control={control}
        error={errors.shipping_method?.message ?? undefined}
        label={'配送方法'}
        size='small'
        id='shipping_method'
        text={'配送方法を選ぶ'}
        values={[
          {value: 'amazon', label: 'Amazon'},
          {value: 'uber', label: 'Uber'},
          {value: 'yuubin', label: '郵便'},
        ]}
      />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['DatePicker', 'DatePicker']}>
          <DatePicker
            label='お届け希望日'
            value={value}
            onChange={(newValue) => setValue(newValue)}
          />
        </DemoContainer>
      </LocalizationProvider>
      <Typography
        variant='body2'
        component='p'
        sx={{
          textAlign: 'left',
          px: '14px',
          color: '#d32f2f',
          fontSize: '0.75rem',
          py: '3px',
        }}
      >
        {value?.isBefore(dayjs().format('YYYY-MM-DD'))
          ? '希望日は正しくない'
          : ''}
      </Typography>
      <Controller
        name='note'
        control={control}
        render={({field}) => (
          <TextField
            sx={{
              width: '100%',
              py: '10px',
              display: 'flex',
              mt: '25px',
              justifyContent: 'start',
            }}
            id='outlined-multiline-static'
            name='note'
            label='備考欄 (任意)'
            value={field.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
            multiline
            rows={4}
          />
        )}
      />
      <Button variant='contained' type='submit' sx={{my: 2}}>
        注文する
      </Button>
      <Backdrop
        sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
        open={openBackDrop}
        onClick={handleCloseBackDrop}
      >
        <CircularProgress color='inherit' />
      </Backdrop>
    </Box>
  )
}
