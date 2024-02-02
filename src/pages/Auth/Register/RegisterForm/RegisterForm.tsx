import React, { useState } from 'react'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import { Box } from '@mui/material'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { zodResolver } from '@hookform/resolvers/zod'
import { schema } from '~/utils/validationLogister'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import IconButton from '@mui/material/IconButton'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import InputAdornment from '@mui/material/InputAdornment'
import FormControl from '@mui/material/FormControl'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import FormHelperText from '@mui/material/FormHelperText'
import { RegisterModel } from '~/model/RegisterModel'
import prefectures from '~/utils/Prefectures'
import addressApi from '~/api/addressApi'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '~/redux/store'
import { register } from '../../UserSlice'
import { unwrapResult } from '@reduxjs/toolkit'
import { ToastContainer } from 'react-toastify'
import { toastError, toastSuccess } from '~/components/CustomToast'

//need Refacter

const RegisterForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showCheckPassword, setShowCheckPassword] = useState(false)
  const [zipcode, setZipcode] = useState('')

  const handleClickShowPassword = () => setShowPassword((show) => !show)
  const handleClickShowCheckPassword = () =>
    setShowCheckPassword((show) => !show)

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault()
  }
  const {
    control,
    handleSubmit,
    clearErrors,
    setValue,
    setError,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    resolver: zodResolver(schema),
    defaultValues: {
      full_name: '',
      furigana_name: '',
      post_id: '',
      prefecture: '',
      address1: '',
      address2: '',
      email: '',
      phone_number: '',
      fax_number: '',
      gender: '',
      year: '',
      month: '',
      day: '',
      login_id: '',
      pass_word: '',
      checkPassword: '',
      email_accept: '',
    },
  })
  const handleFocus = (name: keyof RegisterModel) => {
    clearErrors(name)
  }
  const dispatch = useDispatch<AppDispatch>()

  const onSubmit: SubmitHandler<RegisterModel> = async (data) => {
    console.log('submit')

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { year, month, day, checkPassword, ...subData } = data
    const monthStr = month.toString().padStart(2, '0')
    const dayStr = day.toString().padStart(2, '0')
    const date_of_birth = `${year}-${monthStr}-${dayStr}`

    const subData1 = { date_of_birth, ...subData }
    const { post_id, prefecture, address1, address2, ...submitData } = subData1

    submitData.gender = Number(submitData.gender)
    submitData.email_accept = Number(submitData.email_accept)

    try {
      const action = register(submitData)
      const resultAction = await dispatch(action)
      const user = unwrapResult(resultAction)

      if (user && user.id) {
        try {
          const address = {
            post_id,
            prefecture,
            address1,
            address2,
            user_id: user.id,
          }
          await addressApi.add(address)
          reset()
        } catch (error) {
          console.log(error)
        }
      }
      toastSuccess('アカウントを登録出来ました。')
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toastError(error.message)
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleZipcodeChange = (event: any) => {
    setZipcode(event.target.value)
  }

  // Hàm để xử lý khi nhấn nút
  const handleButtonClick = async () => {
    if (zipcode.trim() === '') {
      // Nếu postId rỗng
      setError('post_id', {
        type: 'manual',
        message: '番号を入力してから探します。',
      })
      return
    }
    if (zipcode.trim().length < 7) {
      return
    }
    try {
      const response = await fetch(
        `https://zipcloud.ibsnet.co.jp/api/search?zipcode=${zipcode}`,
      )
      if (!response.ok) {
        throw new Error('Network response was not ok')
        console.log('loi fetch')
      }
      const data = await response.json()
      if (!data.results) {
        setError('post_id', {
          type: 'manual',
          message: 'ポストIDにより、情報が出ません。',
        })
      }
      if (data && data.results && data.results.length > 0) {
        const res = data.results[0]
        setValue('prefecture', res.address1, { shouldValidate: true })
        setValue('address1', res.address2 + res.address3, {
          shouldValidate: true,
        })
      }
    } catch (error) {
      console.error('post error: ', error)
    }
  }

  return (
    <Box
      component='form'
      sx={{ width: '100%' }}
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* full name */}
      <Box sx={{ width: '80%', mx: 'auto' }}>
        <Controller
          name='full_name'
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label='お名前（必須）'
              variant='outlined'
              error={!!errors.full_name}
              helperText={errors.full_name ? errors.full_name?.message : ''}
              onFocus={() => handleFocus('full_name')}
              size='small'
              fullWidth
            />
          )}
        />
        <Typography variant='caption' component='p' sx={{ p: '5px 14px 16px' }}>
          例) 山田 太郎
        </Typography>
      </Box>
      {/* furigana name */}
      <Box sx={{ width: '80%', mx: 'auto' }}>
        <Controller
          name='furigana_name'
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label='お名前(フリガナ)'
              variant='outlined'
              error={!!errors.furigana_name}
              helperText={
                errors.furigana_name ? errors.furigana_name?.message : ''
              }
              onFocus={() => handleFocus('furigana_name')}
              size='small'
              fullWidth
            />
          )}
        />
        <Typography variant='caption' component='p' sx={{ p: '5px 14px 16px' }}>
          例) ヤマダ タロウ
        </Typography>
      </Box>
      {/* Post */}
      <Box sx={{ width: '80%', mx: 'auto' }}>
        <Controller
          name='post_id'
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label='お名前(フリガナ)'
              variant='outlined'
              error={!!errors.post_id}
              helperText={errors.post_id ? errors.post_id?.message : ''}
              onFocus={() => handleFocus('post_id')}
              value={zipcode}
              onChange={(e) => {
                field.onChange(e)
                handleZipcodeChange(e)
              }}
              size='small'
              sx={{ width: '45%' }}
            />
          )}
        />
        <Button
          variant='contained'
          sx={{ ml: '20px', background: '#eff2f4' }}
          onClick={handleButtonClick}
        >
          郵便番号から入力
        </Button>
        <Typography variant='caption' component='p' sx={{ p: '5px 14px 16px' }}>
          例) 1000000
        </Typography>
      </Box>
      {/* adress 都道府県*/}
      <Box sx={{ width: '80%', mx: 'auto', mb: '16px' }}>
        <Controller
          name='prefecture'
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              select
              label='都道府県（必須）'
              variant='filled'
              error={!!errors.prefecture}
              helperText={errors.prefecture ? errors.prefecture?.message : ''}
              onFocus={() => handleFocus('prefecture')}
              size='small'
              fullWidth
            >
              {prefectures.map((option) => (
                <MenuItem key={option.id} value={option.name + ''}>
                  {option.name}
                </MenuItem>
              ))}
            </TextField>
          )}
        />
      </Box>
      {/* address1 市区町村、番地等*/}
      <Box sx={{ width: '80%', mx: 'auto' }}>
        <Controller
          name='address1'
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label='住所１（必須）'
              variant='outlined'
              error={!!errors.address1}
              helperText={errors.address1 ? errors.address1?.message : ''}
              onFocus={() => handleFocus('address1')}
              size='small'
              fullWidth
            />
          )}
        />
        <Typography variant='caption' component='p' sx={{ p: '5px 14px 16px' }}>
          市区町村、番地等
        </Typography>
      </Box>
      {/* address2 アパート・マンション名、部屋番号等*/}
      <Box sx={{ width: '80%', mx: 'auto' }}>
        <Controller
          name='address2'
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label='住所２（必須）'
              variant='outlined'
              error={!!errors.address2}
              helperText={errors.address2 ? errors.address2?.message : ''}
              onFocus={() => handleFocus('address2')}
              size='small'
              fullWidth
            />
          )}
        />
        <Typography variant='caption' component='p' sx={{ p: '5px 14px 16px' }}>
          アパート・マンション名、部屋番号等
        </Typography>
      </Box>
      {/* Email */}
      <Box sx={{ width: '80%', mx: 'auto' }}>
        <Controller
          name='email'
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label='Email'
              variant='outlined'
              error={!!errors.email}
              helperText={errors.email ? errors.email?.message : ''}
              onFocus={() => handleFocus('email')}
              size='small'
              fullWidth
              autoComplete='email'
            />
          )}
        />
        <Typography variant='caption' component='p' sx={{ p: '5px 14px 16px' }}>
          例) skyblue@gmail.com
        </Typography>
      </Box>
      {/* Phone Number */}
      <Box sx={{ width: '80%', mx: 'auto' }}>
        <Controller
          name='phone_number'
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label='電話番号（必須）'
              variant='outlined'
              error={!!errors.phone_number}
              helperText={
                errors.phone_number ? errors.phone_number?.message : ''
              }
              onFocus={() => handleFocus('phone_number')}
              size='small'
              fullWidth
            />
          )}
        />
        <Typography variant='caption' component='p' sx={{ p: '5px 14px 16px' }}>
          例) 090-1234-5678
        </Typography>
      </Box>

      {/* FAX */}
      <Box sx={{ width: '80%', mx: 'auto' }}>
        <Controller
          name='fax_number'
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label='FAX番号'
              variant='outlined'
              error={!!errors.fax_number}
              helperText={errors.fax_number ? errors.fax_number?.message : ''}
              onFocus={() => handleFocus('fax_number')}
              size='small'
              fullWidth
            />
          )}
        />
        <Typography variant='caption' component='p' sx={{ p: '5px 14px 16px' }}>
          例) 03-1234-5678
        </Typography>
      </Box>
      {/* Gender */}
      <Box sx={{ width: '80%', mx: 'auto', mb: '16px' }}>
        <Controller
          name='gender'
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              select
              label='性別（必須）'
              variant='filled'
              error={!!errors.gender}
              helperText={errors.gender ? errors.gender?.message : ''}
              onFocus={() => handleFocus('gender')}
              size='small'
              fullWidth
            >
              <MenuItem value='1'>男性</MenuItem>
              <MenuItem value='0'>女性</MenuItem>
            </TextField>
          )}
        />
      </Box>
      {/* Birth Day */}
      <Box
        sx={{
          width: '80%',
          mx: 'auto',
          display: 'flex',
          alignItems: 'center',
          gap: '20px',
        }}
      >
        <Controller
          name='year'
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label='生年月日 （必須）'
              variant='outlined'
              error={!!errors.year}
              onFocus={() => handleFocus('year')}
              size='small'
              sx={{
                width: '30%',
              }}
            />
          )}
        />
        <Controller
          name='month'
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              select
              label='月'
              variant='filled'
              error={!!errors.month}
              onFocus={() => handleFocus('month')}
              size='small'
              sx={{ width: '15%' }}
            >
              {Array.from({ length: 12 }, (_, i) => (
                <MenuItem key={i} value={(i + 1).toString()}>
                  {i + 1}
                </MenuItem>
              ))}
            </TextField>
          )}
        />
        <Controller
          name='day'
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              select
              label='日'
              variant='filled'
              error={!!errors.day}
              onFocus={() => handleFocus('day')}
              size='small'
              sx={{ width: '15%' }}
            >
              {Array.from({ length: 31 }, (_, i) => (
                <MenuItem key={i} value={(i + 1).toString()}>
                  {i + 1}
                </MenuItem>
              ))}
            </TextField>
          )}
        />
      </Box>
      {(errors.year || errors.month || errors.day) && (
        <Typography
          variant='caption'
          component='p'
          sx={{
            width: '80%',
            mx: 'auto',
            p: '10px 14px 16px',
            color: '#f44336',
          }}
        >
          {errors.year
            ? '4文字で入力してください。'
            : 'こちらの項目は必死です。'}
        </Typography>
      )}
      <Typography
        variant='caption'
        component='p'
        sx={{ width: '80%', mx: 'auto', p: '10px 14px 16px' }}
      >
        誕生年は4桁で指定してください 例) 1970
      </Typography>

      <Box sx={{ width: '80%', mx: 'auto', mb: '16px' }}>
        <Controller
          name='email_accept'
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              select
              label='メール受信（必須）'
              variant='filled'
              error={!!errors.email_accept}
              helperText={
                errors.email_accept ? errors.email_accept?.message : ''
              }
              onFocus={() => handleFocus('email_accept')}
              size='small'
              fullWidth
            >
              <MenuItem value='1'>受信する</MenuItem>
              <MenuItem value='0'>受信しない</MenuItem>
            </TextField>
          )}
        />
      </Box>
      <Typography
        variant='h6'
        component='h3'
        align='center'
        sx={{ mt: '10x', mb: '30px', width: '100%' }}
      >
        ユーザー登録
      </Typography>
      {/* Logister ID */}
      <Box sx={{ width: '80%', mx: 'auto' }}>
        <Controller
          name='login_id'
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label='ログイン ID（必須）'
              variant='outlined'
              error={!!errors.login_id}
              helperText={errors.login_id ? errors.login_id?.message : ''}
              onFocus={() => handleFocus('login_id')}
              size='small'
              fullWidth
            />
          )}
        />
        <Typography variant='caption' component='p' sx={{ p: '5px 14px 16px' }}>
          例) skyblue98
        </Typography>
      </Box>
      {/*Password file*/}
      <Controller
        name='pass_word'
        control={control}
        render={({ field }) => (
          <FormControl
            sx={{ width: '80%', mx: 'auto', display: 'flex' }}
            size='small'
            variant='outlined'
          >
            <InputLabel htmlFor='password' error={!!errors.pass_word}>
              パスワード （必須）
            </InputLabel>
            <OutlinedInput
              {...field}
              error={!!errors.pass_word}
              onFocus={() => handleFocus('pass_word')}
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

      <Typography
        variant='caption'
        component='p'
        sx={{ width: '80%', mx: 'auto', mt: '10px', p: '5px 14px' }}
      >
        ※7～128文字の英数字、半角記号でご指定ください。
      </Typography>
      {/* Repeat password */}
      <Controller
        name='checkPassword'
        control={control}
        render={({ field }) => (
          <FormControl
            sx={{ width: '80%', mx: 'auto', display: 'flex' }}
            size='small'
            variant='outlined'
          >
            <InputLabel htmlFor='checkPassword' error={!!errors.checkPassword}>
              パスワード （必須）
            </InputLabel>
            <OutlinedInput
              {...field}
              error={!!errors.checkPassword}
              onFocus={() => handleFocus('checkPassword')}
              id='checkPassword'
              type={showCheckPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position='end'>
                  <IconButton
                    aria-label='toggle password visibility'
                    onClick={handleClickShowCheckPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge='end'
                  >
                    {showCheckPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label='パスワード （必須）'
            />
            <FormHelperText sx={{ color: '#f44336' }}>
              {errors.checkPassword ? errors.checkPassword.message : ''}
            </FormHelperText>
          </FormControl>
        )}
      />
      <Box sx={{ width: '100%' }}>
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
      <ToastContainer />
    </Box>
  )
}

export default RegisterForm
