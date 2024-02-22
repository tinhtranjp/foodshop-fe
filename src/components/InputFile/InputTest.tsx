import {FormControl, FormHelperText, TextField} from '@mui/material'
import {Controller} from 'react-hook-form'
import type {Control, FieldValues, Path} from 'react-hook-form'

type InputProps<T extends FieldValues> = {
  name: Path<T>
  label: string
  size?: 'small' | 'medium'
  error?: string
  control: Control<T>
}

export const InputTest = <T extends FieldValues>({
  name,
  label,
  error,
  control,
  size,
}: InputProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({field}) => (
        <FormControl sx={{width: '100%', py: 2}}>
          <TextField
            name={name}
            label={label}
            value={field.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
            size={size || 'medium'}
          />
          {error && <FormHelperText error>{error}</FormHelperText>}
        </FormControl>
      )}
    />
  )
}
