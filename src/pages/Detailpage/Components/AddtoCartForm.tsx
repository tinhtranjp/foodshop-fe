import React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { Box, TextField, Button, Typography } from '@mui/material'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '~/redux/store'
import { addToCart } from '~/pages/Cart/CartSlice'
import { ProductDetail } from '~/model/ProductModel'
import { toastSuccess2 } from '~/components/CustomToast'

interface cartFormProps {
  product: ProductDetail | undefined
}

export const AddtoCartForm: React.FC<cartFormProps> = ({ product }) => {
  const dispatch = useDispatch<AppDispatch>()

  const schema = z.object({
    quantity: z.string().refine(
      (val) => {
        const parsedValue = Number(val)
        return !isNaN(parsedValue) && parsedValue >= 1
      },
      {
        message: 'Số luong phai lon hon 1',
      },
    ),
  })

  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm({
    mode: 'onSubmit',
    resolver: zodResolver(schema),
    defaultValues: {
      quantity: '1',
    },
  })

  const handleAddToCartSubmit = async (values: { quantity: string }) => {
    const action = addToCart({
      id: product?.id,
      product: product,
      quantity: Number(values.quantity),
    })
    dispatch(action)
    toastSuccess2('Ban da them hang thanh cong!!!')
  }

  return (
    <div>
      <Box component='form' onSubmit={handleSubmit(handleAddToCartSubmit)}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'start',
          }}
        >
          <span
            className='w-[20px] h-[20px]'
            onClick={() => {
              if (Number(getValues().quantity) <= 1) {
                return
              }
              const values = getValues().quantity
              const newValue = Number(values) - 1
              setValue('quantity', newValue.toString())
            }}
          >
            <RemoveCircleIcon
              sx={{
                transition: 'ease-in-out .3s all',
                color: '#222',
                cursor: 'pointer',
                '&:hover': {
                  opacity: '0.9',
                },
              }}
            />
          </span>

          <Box sx={{ width: '100px', ml: 2, mr: '9px' }}>
            <Controller
              name='quantity'
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  id='outlined'
                  type='text'
                  InputLabelProps={{
                    shrink: true,
                  }}
                  size='small'
                  inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                  error={!!errors.quantity}
                  sx={{
                    '& .css-6dog1p-MuiInputBase-input-MuiOutlinedInput-input': {
                      textAlign: 'center',
                    },
                  }}
                />
              )}
            />
          </Box>
          <span
            className='w-[20px] h-[20px]'
            onClick={() => {
              const values = getValues().quantity
              const newValue = Number(values) + 1
              setValue('quantity', newValue.toString())
            }}
          >
            <AddCircleIcon
              sx={{
                transition: 'ease-in-out .3s all',
                color: '#222',
                cursor: 'pointer',
                '&:hover': {
                  opacity: '0.9',
                },
              }}
            />
          </span>
        </Box>
        <Typography variant='subtitle2' sx={{ color: 'red', mt: 2, ml: 2 }}>
          {errors.quantity ? errors.quantity.message : ''}
        </Typography>
        <Button
          variant='contained'
          type='submit'
          sx={{
            mt: '30px',
            padding: '15px 90px',
            fontSize: '20px',
            fontWeight: '600',
            background: '#DD6541',
            opacity: '0.8',
            borderRadius: '0px',
            '&:hover': {
              background: '#DD6541',
              opacity: '1',
            },
          }}
        >
          カートに入れる
        </Button>
      </Box>
    </div>
  )
}
