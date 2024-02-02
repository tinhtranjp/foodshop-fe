import { Box } from '@mui/material'
import React, { useState } from 'react'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { NavLink } from 'react-router-dom'
import { useTheme } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import IconButton from '@mui/material/IconButton'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import InputAdornment from '@mui/material/InputAdornment'
import FormControl from '@mui/material/FormControl'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import FormHelperText from '@mui/material/FormHelperText'
import { z } from 'zod'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '~/redux/store'
import { unwrapResult } from '@reduxjs/toolkit'
import { ToastContainer } from 'react-toastify'
import { toastError } from '~/components/CustomToast'
import { login } from '../UserSlice'
import { LoginModel } from '~/model/UserModel'
import { useNavigate } from 'react-router-dom'

const schema = z.object({
  login_id: z
    .string()
    .nonempty('こちらの項目は必死です。')
    .min(4, '4文字以上、入力してください。'),
  pass_word: z
    .string()
    .nonempty('こちらの項目は必死です。')
    .min(7, '７文字以上、入力してください。'),
})
const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  const handleClickShowPassword = () => setShowPassword((show) => !show)

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault()
  }
  const theme = useTheme()
  const {
    control,
    handleSubmit,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    resolver: zodResolver(schema),
    defaultValues: {
      login_id: '',
      pass_word: '',
    },
  })

  const dispatch = useDispatch<AppDispatch>()
  const onSubmit: SubmitHandler<LoginModel> = async (data) => {
    try {
      const action = login(data)
      const resultAction = await dispatch(action)
      const dataLogin = unwrapResult(resultAction)
      if (dataLogin) {
        navigate('/')
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error)

      toastError(error.message)
    }
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'end', gap: '20px' }}>
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
        会員ログインページ
      </Typography>
      <Typography variant='body2' component='h4' sx={{ m: '13px 0' }}>
        会員ページへようこそ！
      </Typography>
      <Box
        sx={{
          my: '30px',
          p: '20px',
          background: theme.palette.customBg.btnAndFileSmall,
        }}
      >
        <Typography variant='body2' component='p' sx={{ color: '#607d8b' }}>
          ログインID（メールアドレス）とパスワードを入力してください。
        </Typography>
        <NavLink to='/register' style={{ color: '#4183c4', fontSize: '13px' }}>
          新規会員登録はこちら
        </NavLink>
      </Box>
      <Box
        component='form'
        sx={{ width: '100%' }}
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* full name */}
        <Box sx={{ width: '80%', mx: 'auto' }}>
          <Controller
            name='login_id'
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label='お名前（必須）'
                variant='outlined'
                error={!!errors.login_id}
                helperText={errors.login_id ? errors.login_id?.message : ''}
                onFocus={() => clearErrors('login_id')}
                size='medium'
                fullWidth
              />
            )}
          />
        </Box>
        <Controller
          name='pass_word'
          control={control}
          render={({ field }) => (
            <FormControl
              sx={{ width: '80%', mx: 'auto', display: 'flex', mt: '40px' }}
              size='medium'
              variant='outlined'
            >
              <InputLabel htmlFor='password' error={!!errors.pass_word}>
                パスワード （必須）
              </InputLabel>
              <OutlinedInput
                {...field}
                error={!!errors.pass_word}
                onFocus={() => clearErrors('pass_word')}
                id='password'
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='toggle password visibility'
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge='end'
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label='パスワード （必須）'
              />
              <FormHelperText sx={{ color: '#f44336' }}>
                {errors.pass_word ? errors.pass_word.message : ''}
              </FormHelperText>
            </FormControl>
          )}
        />
        <NavLink
          to='/'
          style={{
            color: '#4183c4',
            fontSize: '13px',
            width: '80%',
            margin: '10px auto',
            display: 'flex',
          }}
        >
          パスワードを忘れた方はこちら
        </NavLink>
        <Box sx={{ width: '100%', pt: '30px' }}>
          <Button
            variant='contained'
            type='submit'
            size='large'
            sx={{
              color: 'white',
              p: '10px 60px',
              m: '20px auto',
              fontSize: '20px',
              display: 'flex',
            }}
            disabled={isSubmitting}
          >
            確 認
          </Button>
        </Box>
      </Box>
      <ToastContainer />
    </Box>
  )
}

export default Login
