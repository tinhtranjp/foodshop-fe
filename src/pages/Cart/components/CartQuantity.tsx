import React, {useState, useRef} from 'react'
import {useDispatch} from 'react-redux'
import {AppDispatch} from '~/redux/store'
import {
  Box,
  Button,
  ButtonGroup,
  Typography,
  OutlinedInput,
} from '@mui/material'
import {CartItem} from '~/model/CartModel'
import {setQuantity} from '../CartSlice'

interface CartQuantityProps {
  cartItem: CartItem
}

export const CartQuantity: React.FC<CartQuantityProps> = ({cartItem}) => {
  const [mount, setMount] = useState(cartItem.quantity)
  const [error, setError] = useState(false)
  const [messErr, setMessErr] = useState('')
  const quantityInputRef = useRef<HTMLInputElement | null>(null)
  const dispatch = useDispatch<AppDispatch>()
  const handleOnchange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.trim().length === 0) {
      setError(true)
      setMessErr('Vui lòng không để trống')
      return
    }

    if (isNaN(Number(event.target.value))) {
      setError(true)
      setMessErr('Vui lòng nhập giá trị là số')
      return
    }

    setError(false)
    setMessErr('')
    const newQuantity = Number(event.target.value)
    setMount(newQuantity)
    dispatch(setQuantity({id: cartItem.id, quantity: newQuantity}))
  }

  const handleIncrement = () => {
    if (error) return
    setMount((prevMount) => prevMount + 1)
    const newQuantity = cartItem.quantity + 1
    dispatch(setQuantity({id: cartItem.id, quantity: newQuantity}))

    if (quantityInputRef.current) {
      quantityInputRef.current.value = newQuantity.toString()
    }
  }

  const handleDecrement = () => {
    if (error) return
    if (cartItem.quantity <= 1) return
    setMount((prevMount) => prevMount - 1)
    const newQuantity = cartItem.quantity - 1

    dispatch(setQuantity({id: cartItem.id, quantity: newQuantity}))
    if (quantityInputRef.current) {
      quantityInputRef.current.value = newQuantity.toString()
    }
  }

  return (
    <Box sx={{position: 'relative'}}>
      <ButtonGroup variant='outlined' aria-label='outlined button group'>
        <Button
          size='small'
          className='border-1 border-[#666]'
          onClick={handleDecrement}
        >
          -
        </Button>
        <OutlinedInput
          id='quantity'
          size='small'
          defaultValue={mount}
          onChange={handleOnchange}
          inputRef={quantityInputRef}
          className='cartQuantity'
          sx={{
            width: '60px',
            '& .css-6dog1p-MuiInputBase-input-MuiOutlinedInput-input': {
              textAlign: 'center',
            },
          }}
        />
        <Button size='small' onClick={handleIncrement}>
          +
        </Button>
      </ButtonGroup>
      {error && messErr && (
        <Typography className='absolute top-[48px]'>{messErr}</Typography>
      )}
    </Box>
  )
}
