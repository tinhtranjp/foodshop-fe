import { Box, Button, Typography } from '@mui/material'
import React, { useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '~/redux/store'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { NavLink } from 'react-router-dom'
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
import { toastError } from '~/components/CustomToast'
import { login } from '~/pages/Auth/UserSlice'
import { LoginModel } from '~/model/UserModel'
import { useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'

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
export const CartInfor = () => {
  const [open, setOpen] = useState(false)
  const [openBackdrop, setOpenBackdrop] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  const handleClickShowPassword = () => setShowPassword((show) => !show)

  const user = useSelector((state: RootState) => state.user.current.user)
  const address = user?.address[0]

  const logoutTimeoutRef = useRef<number | undefined>(undefined)

  const handleCloseBackdrop = () => {
    setOpenBackdrop(false)
  }
  const handleOpenBackdrop = () => {
    setOpenBackdrop(true)
  }

  const handleClickOpen = () => {
    handleOpenBackdrop()

    if (logoutTimeoutRef.current) {
      clearTimeout(logoutTimeoutRef.current)
    }

    logoutTimeoutRef.current = setTimeout(() => {
      handleCloseBackdrop()
      setOpen(true)
    }, 500)

    setOpenBackdrop(true)
  }

  const handleClose = () => {
    setOpen(false)
  }
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault()
  }
  const {
    control,
    handleSubmit,
    clearErrors,
    setError,
    setValue,
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
        setOpen(false)
        setValue('login_id', '')
        setValue('pass_word', '')
        navigate('/cart')
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setError('login_id', {
        type: 'manual',
        message: '',
      })
      setError('pass_word', {
        type: 'manual',
        message: '',
      })
      toastError(error.message)
    }
  }

  if (!user) {
    return (
      <>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'start',
            justifyContent: 'space-between',
          }}
        >
          <Typography sx={{ maxWidth: '60%' }}>ログインから進みます</Typography>
          <Button variant='contained' onClick={handleClickOpen}>
            Login
          </Button>
        </Box>
        <>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby='alert-dialog-title'
            aria-describedby='alert-dialog-description'
            sx={{ top: '-15%' }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'baseline',
                justifyContent: 'space-between',
                paddingRight: '25px',
              }}
            >
              <DialogTitle id='alert-dialog-title'>
                ショップ会員ログイン
              </DialogTitle>
              <NavLink
                to='/register'
                style={{ color: 'rgb(65, 131, 196)', textDecoration: 'none' }}
                className='customNavLink'
              >
                会員登録する
              </NavLink>
            </Box>
            <DialogContent>
              <Box
                component='form'
                sx={{ width: '500px' }}
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
                        helperText={
                          errors.login_id ? errors.login_id?.message : ''
                        }
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
                      sx={{
                        width: '80%',
                        mx: 'auto',
                        display: 'flex',
                        mt: '40px',
                      }}
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
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
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
                  to='#!'
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
            </DialogContent>
          </Dialog>
          <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={openBackdrop}
            onClick={handleCloseBackdrop}
          >
            <CircularProgress color='inherit' />
          </Backdrop>
          <ToastContainer />
        </>
      </>
    )
  }
  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          mb: 3,
        }}
      >
        <Typography variant='h6' fontWeight={600}>
          お届け情報
        </Typography>
        <Typography
          variant='h6'
          fontWeight={600}
          sx={{
            ':hover': {
              opacity: '0.9',
              cursor: 'pointer',
            },
          }}
        >
          変更
        </Typography>
      </Box>
      <Typography variant='subtitle1'>
        {user?.full_name.toLocaleUpperCase()}
        <span className='ml-20'>{user?.phone_number}</span>
      </Typography>
      <Typography sx={{ my: '2px' }}>{user?.email}</Typography>
      <Typography variant='subtitle1'>{`${address?.post_id} - ${address?.prefecture} ${address?.address1} ${address?.address2}`}</Typography>
    </Box>
  )
}
