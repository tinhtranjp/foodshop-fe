import {Box, Typography} from '@mui/material'
import {NavLink, Outlet} from 'react-router-dom'
import ViewModuleIcon from '@mui/icons-material/ViewModule'
import BorderColorIcon from '@mui/icons-material/BorderColor'
export default function OrderStore() {
  return (
    <Box>
      <Box
        component='ul'
        sx={{listStyle: 'none', p: 0, display: 'flex', gap: 5, m: 0, mb: 4}}
      >
        <NavLink
          to='/admin/order-store/view'
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
            }}
          >
            <ViewModuleIcon />
            <Typography variant='h6' ml={1}>
              Order View
            </Typography>
          </Box>
        </NavLink>
        <NavLink
          to='/admin/order-store/create'
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
            }}
          >
            <BorderColorIcon />
            <Typography variant='h6' ml={1}>
              Create Order
            </Typography>
          </Box>
        </NavLink>
      </Box>
      <Outlet />
    </Box>
  )
}
