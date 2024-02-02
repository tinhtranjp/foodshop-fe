import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { cartItemsCountSelector } from './selectors'
import { styled } from '@mui/material/styles'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Unstable_Grid2'
import { Box, Typography } from '@mui/material'
import { ListCart } from './components/ListCart'
import { CartInfor } from './components/CartInfor'
import { CartTotal } from './components/CartTotal'
import Button from '@mui/material/Button'
import { RootState } from '~/redux/store'
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
}))

export const Cart = () => {
  const cartItemsCount = useSelector(cartItemsCountSelector)
  const user = useSelector((state: RootState) => state.user.current.user)

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [])

  return (
    <Box sx={{ pt: '100px', pb: '60px', width: '1160px', mx: 'auto' }}>
      <Typography variant='h4' fontWeight={600} sx={{ color: '#444', mb: 5 }}>
        ショッピングカート{' '}
        <span className='text-[30px] ml-6 text-[#444]'>
          {cartItemsCount} 商品
        </span>
      </Typography>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid xs={9}>
            <Item className='min-h-[500px]'>
              <ListCart />
            </Item>
          </Grid>
          <Grid xs={3}>
            <Item>
              <CartInfor />
            </Item>
            <Item sx={{ mt: 3 }}>
              <CartTotal />
            </Item>
            {user && (
              <Button
                variant='contained'
                sx={{
                  mt: 3,
                  width: '100%',
                  background: '#FE4A49',
                  '&:hover': {
                    background: '#FE4A49',
                    opacity: 1,
                    transition: 'all .3s ease-out',
                  },
                }}
              >
                次に進む
              </Button>
            )}
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}