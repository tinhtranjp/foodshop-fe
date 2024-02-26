import MenuItem from '@mui/material/MenuItem'
import {TextField} from '@mui/material'
import {Controller} from 'react-hook-form'
import type {Control, FieldValues, Path} from 'react-hook-form'

type InputProps<T extends FieldValues> = {
  id: string
  text: string
  name: Path<T>
  label: string
  size?: 'small' | 'medium'
  error?: string
  control: Control<T>
  values: {
    value: string
    label: string
  }[]
}

export const SelectInput = <T extends FieldValues>({
  id,
  text,
  name,
  label,
  error,
  control,
  size,
  values,
}: InputProps<T>) => {
  const opitions = values
  return (
    <Controller
      name={name}
      control={control}
      render={({field}) => (
        <TextField
          sx={{py: '10px'}}
          id={id}
          select
          label={label}
          value={field.value}
          onChange={field.onChange}
          variant='filled'
          error={!!error}
          helperText={text}
          size={size || 'medium'}
          fullWidth
        >
          {opitions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      )}
    />
  )
}
