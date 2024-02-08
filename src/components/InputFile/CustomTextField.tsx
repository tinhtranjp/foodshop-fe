import {Stack, TextField} from '@mui/material'
import Typography from '@mui/material/Typography'
import {FieldValues, useController} from 'react-hook-form'
import {RHFProps} from '~/model/RHFProps'

const CustomTextField = <T extends FieldValues>({
  name,
  control,
  onFocus,
  label,
  exampleText,
}: RHFProps<T>) => {
  const {
    field,
    formState: {errors},
  } = useController({name, control})

  const errorMessage = errors?.[name]?.message as string

  return (
    <>
      <Stack direction='row' alignItems='center'>
        <TextField
          variant='outlined'
          label={label}
          value={field.value ?? ''}
          name={field.name}
          onChange={field.onChange}
          onBlur={field.onBlur}
          onFocus={onFocus}
          error={!!errors[name]}
          size='small'
          fullWidth
        />
      </Stack>
      {errorMessage && (
        <Typography
          variant='caption'
          component='p'
          color='red'
          mt={1}
          sx={{px: '14px'}}
        >
          {errorMessage}
        </Typography>
      )}
      <Typography variant='caption' component='p' sx={{p: '5px 14px 16px'}}>
        {exampleText}
      </Typography>
    </>
  )
}

export default CustomTextField
