import {styled} from '@mui/material/styles'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Unstable_Grid2'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import {Typography} from '@mui/material'
import PersonIcon from '@mui/icons-material/Person'
import {NavLink, Outlet} from 'react-router-dom'
import CreditCardIcon from '@mui/icons-material/CreditCard'
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag'
import {Theme} from '@mui/material/styles'
import MocAvatar from '~/assets/img/moc.jpg'
const Item = styled(Paper)(({theme}: {theme: Theme}) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}))

export const Admin = () => {
  return (
    <Box sx={{flexGrow: 1}}>
      <Grid container>
        <Grid xs={2}>
          <Item>
            <Box sx={{height: '100vh', pt: 6}}>
              <Typography
                component='h1'
                variant='h4'
                fontWeight={600}
                sx={{'&:hover': {cursor: 'pointer'}}}
              >
                <NavLink
                  to='/admin'
                  style={({isActive}) => ({
                    color: isActive ? '#2196f3' : '#666666',
                    textDecoration: 'none',
                  })}
                >
                  <img
                    src={MocAvatar}
                    alt='moc'
                    style={{width: '80px', height: '80px'}}
                  />
                </NavLink>
              </Typography>
              <Box
                component='ul'
                sx={{
                  listStyle: 'none',
                  p: '0',
                  textAlign: 'left',
                  px: 2,
                }}
              >
                <NavLink
                  to='/admin/order-store'
                  style={({isActive}) => ({
                    color: isActive ? '#2196f3' : '#666666',
                    textDecoration: 'none',
                  })}
                >
                  <Box
                    component='li'
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      '&:hover': {cursor: 'pointer'},
                      py: 1,
                    }}
                  >
                    <CreditCardIcon />
                    <Typography variant='h6' ml={2}>
                      Store Expenses
                    </Typography>
                  </Box>
                </NavLink>
                <NavLink
                  to='/admin/user'
                  style={({isActive}) => ({
                    color: isActive ? '#2196f3' : '#666666',
                    textDecoration: 'none',
                  })}
                >
                  <Box
                    component='li'
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      '&:hover': {cursor: 'pointer'},
                      py: 1,
                    }}
                  >
                    <PersonIcon />
                    <Typography variant='h6' ml={2}>
                      Custom
                    </Typography>
                  </Box>
                </NavLink>
                <NavLink
                  to='/admin/order'
                  style={({isActive}) => ({
                    color: isActive ? '#2196f3' : '#666666',
                    textDecoration: 'none',
                  })}
                >
                  <Box
                    component='li'
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      '&:hover': {cursor: 'pointer'},
                      py: 1,
                    }}
                  >
                    <ShoppingCartIcon />
                    <Typography variant='h6' ml={2}>
                      Order
                    </Typography>
                  </Box>
                </NavLink>
                <NavLink
                  to='/admin/product'
                  style={({isActive}) => ({
                    color: isActive ? '#2196f3' : '#666666',
                    textDecoration: 'none',
                  })}
                >
                  <Box
                    component='li'
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      '&:hover': {cursor: 'pointer'},
                      py: 1,
                    }}
                  >
                    <ShoppingBagIcon />
                    <Typography variant='h6' ml={2}>
                      Product
                    </Typography>
                  </Box>
                </NavLink>
              </Box>
            </Box>
          </Item>
        </Grid>
        <Grid xs={9.9} sx={{ml: 'auto'}}>
          <Item>
            <Box sx={{height: '100vh', ml: 2, pt: 6, pr: 2}}>
              <Outlet />
            </Box>
          </Item>
        </Grid>
      </Grid>
    </Box>
  )
}
