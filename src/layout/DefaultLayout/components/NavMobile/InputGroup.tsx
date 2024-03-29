import {Button, Stack, TextField} from '@mui/material'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import SearchIcon from '@mui/icons-material/Search'
import {useNavigate} from 'react-router-dom'
export const InputGroup = () => {
  const navige = useNavigate()
  return (
    <Stack
      direction='row'
      spacing={2}
      sx={{display: 'flex', flexDirection: 'column', gap: '16px'}}
    >
      <Button
        onClick={() => {
          navige('/login')
        }}
        variant='outlined'
        endIcon={
          <ArrowRightIcon
            sx={{position: 'absolute', right: '5px', top: '7px'}}
          />
        }
      >
        ロギング
      </Button>
      <Button
        variant='outlined'
        endIcon={
          <ArrowRightIcon
            sx={{position: 'absolute', right: '5px', top: '7px'}}
          />
        }
        className='inputXs'
        onClick={() => {
          navige('/register')
        }}
      >
        新規登録
      </Button>
      <TextField
        id='outlined-basic'
        variant='outlined'
        placeholder='キーワードから探す'
        size='small'
        sx={{
          '& input::placeholder': {
            textAlign: 'center',
            fontSize: '14px',
          },
          '& fieldset': {
            borderColor: '#898 !important',
          },
          '&:hover fieldset': {
            borderWidth: '1px !important',
          },
        }}
        className='inputXs'
        InputProps={{
          endAdornment: <SearchIcon />,
        }}
      />
    </Stack>
  )
}
