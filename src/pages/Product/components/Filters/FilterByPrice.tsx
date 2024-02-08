import {Box, Button, TextField, Typography} from '@mui/material'
import {useState} from 'react'
import {FiltersModel} from '~/model/FiltersModel'

interface FilterByPriceProps {
  onChange: (values: FiltersModel) => void
}

interface FilterValues {
  min_price: number
  max_price: number
}
const FilterByPrice: React.FC<FilterByPriceProps> = ({onChange}) => {
  const [values, setValues] = useState<FilterValues>({
    min_price: 0,
    max_price: 0,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }))
  }
  const handleSubmit = () => {
    if (onChange) onChange(values)
  }
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (onChange) onChange(values)
    }
  }
  const handleReset = () => {
    setValues({min_price: 0, max_price: 0})
    if (onChange) onChange({min_price: 0, max_price: 0})
  }
  return (
    <div>
      <Box sx={{p: 3}}>
        <Typography variant='subtitle2'>Price</Typography>
        <Box>
          <TextField
            id='min_price'
            label='Min Price'
            type='text'
            variant='standard'
            name='min_price'
            value={values.min_price}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            size='small'
            sx={{my: 2}}
          />
          <TextField
            id='standard-max_price'
            label='Max Price'
            type='text'
            variant='standard'
            name='max_price'
            value={values.max_price}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            size='small'
          />
        </Box>
        <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
          <Button
            variant='contained'
            size='small'
            color='primary'
            onClick={handleSubmit}
            sx={{mt: 3}}
          >
            Submit
          </Button>
          <Button
            id='reset_price'
            variant='contained'
            size='small'
            color='primary'
            onClick={handleReset}
            sx={{mt: 3}}
          >
            Reset
          </Button>
        </Box>
      </Box>
    </div>
  )
}

export default FilterByPrice
