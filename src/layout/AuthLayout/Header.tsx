import Typography from '@mui/material/Typography'
import {useTheme} from '@mui/material/styles'

import {Box} from '@mui/material'
export default function Header() {
  const theme = useTheme()
  return (
    <Box sx={{display: 'flex', position: 'relative'}}>
      <Typography
        variant='h4'
        component='h1'
        align='center'
        sx={{
          color: theme.palette.textColor.primary,
          padding: '20px 0',
          width: {md: '804px'},
          margin: '0 auto',
        }}
      >
        Food Shopping
      </Typography>
    </Box>
  )
}
