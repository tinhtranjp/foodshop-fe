import { Box, Stack, TextField } from '@mui/material'
import Typography from '@mui/material/Typography'
import { FieldValues, useController } from 'react-hook-form'
import { RHFProps } from '~/model/RHFProps'

const RHFTextField = <T extends FieldValues>({
  name,
  control,
  onFocus,
  label,
}: RHFProps<T>) => {
  const {
    field,
    formState: { errors  },
  } = useController({ name, control })

  const errorMessage = errors?.[name]?.message as string

  return (
    <Box>
        <Stack direction="row" alignItems="center" m={2}>
          <TextField
            variant="outlined"
            label={label}
            value={field.value ?? ''}
            name={field.name}
            onChange={field.onChange}
            onBlur={field.onBlur}
            onFocus={onFocus}
            error={!!errors[name]}
          />
        </Stack>
          {errorMessage && (
            <Typography variant="body1" ml={3} mt={1} color="red">
              {errorMessage}
            </Typography>
          )}
    </Box>
  )
}
{/* <Controller
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
/> */}
export default RHFTextField