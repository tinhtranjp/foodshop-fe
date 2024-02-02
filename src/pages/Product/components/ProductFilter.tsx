import { Box } from '@mui/material'
import React from 'react'
import FilterByCategory from './Filters/FilterByCategory'
import FilterByPrice from './Filters/FilterByPrice'
import { FiltersModel } from '~/model/FiltersModel'
import FilterByService from './Filters/FilterByService'
import { FilterByDate } from './Filters/FilterByDate'
interface ProductFilterProps {
  filters: FiltersModel
  onChange: (newFilters: FiltersModel) => void
}

const ProductFilter: React.FC<ProductFilterProps> = ({ filters, onChange }) => {
  const handleFilterChange = (
    newCategoryId: number,
    newCategoryName: string,
  ) => {
    if (!onChange) return

    const newFilters = {
      category_id: newCategoryId,
      category_name: newCategoryName,
    }
    onChange(newFilters)
  }

  const handleChange = (values: FiltersModel) => {
    if (onChange) onChange(values)
  }
  return (
    <div>
      <Box>
        <FilterByCategory onChange={handleFilterChange} />
        <FilterByPrice onChange={handleChange} />
        <FilterByDate filters={filters} onChange={handleChange} />
        <FilterByService filters={filters} onChange={handleChange} />
      </Box>
    </div>
  )
}

export default ProductFilter
