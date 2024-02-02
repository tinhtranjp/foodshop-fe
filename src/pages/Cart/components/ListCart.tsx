import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '~/redux/store'
import { ListCartItem } from './ListCartItem'
import { Box, Typography } from '@mui/material'

export const ListCart = () => {
  const cartItemList = useSelector((state: RootState) => state.cart.cartItems)

  return (
    <div>
      <ul className='no-underline list-none m-0 p-0'>
        {cartItemList.length === 0 && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '500px',
            }}
          >
            <Box>
              <Typography>Pika pika..</Typography>
              <Box
                sx={{
                  textAlign: 'center',
                  borderRadius: '5px',
                  backgroundColor: '#fff',
                  writingMode: 'vertical-lr',
                }}
              >
                <img
                  src='https://wallpapercave.com/wp/wp6947543.jpg'
                  alt='pikachu'
                  className='w-[300px] h-[300px] object-cover block rounded-[5px]'
                />
                <Typography
                  sx={{
                    ml: 5,
                    letterSpacing: '3px',
                    fontSize: '15px',
                    maxHeight: '300px',
                  }}
                >
                  お買い物をよろしくお願いします。
                </Typography>
              </Box>
            </Box>
          </Box>
        )}
        {cartItemList &&
          cartItemList.map((cartItem) => (
            <li
              className='flex justify-between items-start first-of-type:mt-0 mt-4'
              key={cartItem.id}
            >
              <ListCartItem cartItem={cartItem} />
            </li>
          ))}
      </ul>
    </div>
  )
}
