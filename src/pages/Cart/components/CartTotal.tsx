import { Box, Typography } from '@mui/material'

import { useSelector } from 'react-redux'
import { cartTotalSelector } from '../selectors'

export const CartTotal = () => {
  const cartTotal = useSelector(cartTotalSelector)

  return (
    <Box>
      <div>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant='h6' fontWeight={400}>
            小計
          </Typography>
          <Typography variant='h6' fontWeight={400}>
            {cartTotal.toLocaleString()}円
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            mt: 3,
            pt: 2,
            borderTop: '1px solid #E8E8E8',
          }}
        >
          <Typography variant='h5' fontWeight={600} sx={{ color: '#444' }}>
            ご請求額
          </Typography>
          <Typography variant='h5' fontWeight={600} sx={{ color: '#FE4A49' }}>
            {cartTotal.toLocaleString()}円
          </Typography>
        </Box>
      </div>
    </Box>
  )
}
