import { Box, Checkbox, FormControlLabel, FormGroup } from '@mui/material'
import React from 'react'
import { FiltersModel } from '~/model/FiltersModel'

interface FilterByDateProps {
  filters: FiltersModel
  onChange: (values: FiltersModel) => void
}

export const FilterByDate: React.FC<FilterByDateProps> = ({
  filters,
  onChange,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!onChange) return
    const { name, checked } = e.target
    onChange({ ...filters, [name]: checked ? 'desc' : 'asc' })
  }

  return (
    <div>
      <Box sx={{ px: 3 }}>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={filters.sort_by_date === 'desc'}
                onChange={handleChange}
                name='sort_by_date'
              />
            }
            label='New'
          />
        </FormGroup>
      </Box>
    </div>
  )
}
