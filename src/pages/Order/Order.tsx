import {Box, Typography, useTheme} from '@mui/material'
import {styled} from '@mui/material/styles'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Unstable_Grid2'
import {OrderForm} from './components/OrderForm'
import OrderList from './components/OrderList'

const Item = styled(Paper)(({theme}) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}))

export default function Order() {
  const theme = useTheme()
  return (
    <Box sx={{pt: theme.tCustom.navTopHeight}}>
      <Typography
        component='h1'
        variant='h3'
        textAlign='center'
        sx={{py: '50px'}}
      >
        Order Page
      </Typography>

      <Box sx={{flexGrow: 1}}>
        <Grid container spacing={2} m={2}>
          <Grid xs={6}>
            <Item>
              <Typography component='h2' variant='h4' fontWeight={600}>
                届け先
              </Typography>
              <OrderForm />
            </Item>
          </Grid>
          <Grid xs={6}>
            <Item>
              <Typography component='h2' variant='h4' fontWeight={600}>
                ショッピングカート
              </Typography>
              <OrderList />
            </Item>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}
