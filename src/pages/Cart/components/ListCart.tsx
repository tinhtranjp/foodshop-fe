import {useSelector} from 'react-redux'
import {RootState} from '~/redux/store'
import {ListCartItem} from './ListCartItem'
import {Box, Typography, useTheme} from '@mui/material'

export const ListCart = () => {
  const cartItemList = useSelector((state: RootState) => state.cart.cartItems)
  const theme = useTheme()
  return (
    <div>
      <ul className='no-underline list-none m-0 p-0'>
        {cartItemList.length === 0 && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: {md: '500px'},
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
                <Box
                  sx={{
                    width: {xs: '200px', md: '300px'},
                    height: {xs: '200px', md: '300px'},
                  }}
                >
                  <img
                    src='https://wallpapercave.com/wp/wp6947543.jpg'
                    alt='pikachu'
                    style={{
                      width: '100%',
                      display: 'block',
                      height: '100%',
                      borderRadius: '5px',
                    }}
                  />
                </Box>
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
            <Box
              component='li'
              sx={{
                display: {md: 'flex'},
                justifyContent: 'space-between',
                alignItems: 'flex-start',

                marginBottom: 4,
                background: (theme) => theme.palette.customBg.secondary,
                p: 2,
              }}
              className=' mrLastItemBottom-0'
              key={cartItem.id}
            >
              <ListCartItem cartItem={cartItem} />
            </Box>
          ))}
      </ul>
    </div>
  )
}
