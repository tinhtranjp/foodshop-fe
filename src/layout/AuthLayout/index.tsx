import Header from './Header'
import Footer from './Footer'
import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom'

export default function AuthLayout() {
  return (
    <>
      <Header />
      <Box
        sx={{
          maxWidth: '700px',
          mx: 'auto',
          p: '20px',
          borderTop: '2px solid #f6f6f6',
          borderBottom: '2px solid #f6f6f6',
        }}
      >
        <Outlet />
      </Box>
      <Footer />
    </>
  )
}
