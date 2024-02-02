import { Box } from '@mui/material'
import React from 'react'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { NavLink } from 'react-router-dom'
import { useTheme } from '@mui/material/styles'
import RegisterForm from './RegisterForm/RegisterForm'

const Register: React.FC = () => {
  const theme = useTheme()

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'end', gap: '20px' }}>
        <NavLink to='/login' style={{ textDecoration: 'none' }}>
          <Button variant='contained' sx={{ mt: '20px', mb: '30px' }}>
            ログイン
          </Button>
        </NavLink>
        <NavLink to='/' style={{ textDecoration: 'none' }}>
          <Button variant='contained' sx={{ mt: '20px', mb: '30px' }}>
            ショップへ戻る
          </Button>
        </NavLink>
      </Box>
      <Typography
        variant='h6'
        component='h2'
        align='center'
        sx={{ mt: '10px', mb: '30px' }}
      >
        新規会員登録
      </Typography>
      <Box
        sx={{
          my: '30px',
          p: '20px',
          background: theme.palette.customBg.btnAndFileSmall,
        }}
      >
        <Typography variant='body2' component='p' sx={{ color: '#607d8b' }}>
          新規会員登録を行います。登録情報を入力後、「確認」ボタンをクリックしてください。
        </Typography>
      </Box>
      <RegisterForm />
    </Box>
  )
}

export default Register
