import React, { useState } from 'react'
import { Box, Button, Modal, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { baseURL } from '~/constants/Api'
import { NavLink } from 'react-router-dom'
import { CartQuantity } from './CartQuantity'
import { CartItem } from '~/model/CartModel'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '~/redux/store'
import { removeFromCart } from '../CartSlice'

interface listCartItem {
  cartItem: CartItem
}
const style = {
  // eslint-disable-next-line @typescript-eslint/prefer-as-const
  position: 'absolute' as 'absolute',
  top: '40%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '1px solid #444',
  boxShadow: 24,
  p: 4,
  borderRadius: '5px',
}

export const ListCartItem: React.FC<listCartItem> = ({ cartItem }) => {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const dispatch = useDispatch<AppDispatch>()

  const handleRemoveItem = () => {
    dispatch(removeFromCart(cartItem.id))
    handleClose()
  }
  return (
    <>
      <Box sx={{ display: 'flex', gap: 3, maxWidth: '50%' }}>
        <NavLink to={`/product/${cartItem.id}`}>
          <img
            src={`${baseURL}/images/${cartItem.product?.thumbnail}`}
            alt=''
            className='w-[150px] h-[150px] object-cover'
          />
        </NavLink>
        <Box>
          <Typography
            variant='h2'
            sx={{
              fontSize: '20px',
              fontWeight: '400',
              lineHeight: '1.5',
              mb: 4,
            }}
          >
            {cartItem.product?.name}
          </Typography>
          <Button
            variant='contained'
            size='small'
            endIcon={<DeleteIcon />}
            sx={{ opacity: '0.9' }}
            onClick={handleOpen}
          >
            削除
          </Button>
        </Box>
      </Box>
      <Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant='h6' sx={{ mr: 5 }}>
            {cartItem.product?.price
              ? (cartItem.product?.price * cartItem.quantity).toLocaleString()
              : 0}
            円
          </Typography>
          <Box>
            <CartQuantity cartItem={cartItem} />
          </Box>
        </Box>
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <Typography
            id='modal-modal-title'
            variant='h6'
            fontWeight={600}
            component='h2'
          >
            カートから商品を削除してよろしいですか?
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'start', mt: 2 }}>
            <Typography sx={{ minWidth: '60px' }}>商品 :</Typography>
            <Typography id='modal-modal-description'>
              {cartItem.product?.name}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
            <Typography sx={{ minWidth: '60px' }}>
              {cartItem.quantity}点 :
            </Typography>
            <Typography id='modal-modal-description'>
              {cartItem.product?.price
                ? (cartItem.product?.price * cartItem.quantity).toLocaleString()
                : 0}
              円
            </Typography>
          </Box>
          <Box sx={{ mt: 7, display: 'flex', justifyContent: 'space-between' }}>
            <Button
              variant='contained'
              sx={{
                background: '#607d8b',
                '&:hover': {
                  background: '#607d8b',
                },
              }}
              onClick={handleClose}
            >
              キャンセル
            </Button>
            <Button
              variant='contained'
              sx={{
                background: '#ba000d',
                '&:hover': {
                  background: '#ba000d',
                  opacity: '0.8',
                },
              }}
              onClick={handleRemoveItem}
            >
              削除する
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  )
}
