import { Box, Chip } from '@mui/material'
import React, { useMemo } from 'react'
import { FiltersModel } from '~/model/FiltersModel'

interface FilterViewerProps {
  filters: FiltersModel
  onChange: (filters: FiltersModel) => void
}

const FILTER_LIST = [
  {
    id: 1,
    getLabel: () => 'Giao hàng miễn phí',
    isActive: (filters: FiltersModel) => filters.is_freeship,
    isVisible: () => true,
    isRemovable: false,
    onRemove: () => {},
    onToggle: (filters: FiltersModel) => {
      const newFilters = { ...filters }
      if (filters.is_freeship) {
        delete newFilters.is_freeship
      } else {
        newFilters.is_freeship = true
      }
      return newFilters
    },
  },

  {
    id: 2,
    getLabel: () => 'Co khuyen mai',
    isActive: () => true,
    isVisible: (filters: FiltersModel) => filters.is_promotion,
    isRemovable: true,
    onRemove: (filters: FiltersModel) => {
      const newFilters = { ...filters }
      delete newFilters.is_promotion
      return newFilters
    },
    onToggle: null,
  },
  {
    id: 3,
    getLabel: (filters: FiltersModel) =>
      `${filters.min_price}¥ ~ ${filters.max_price}¥`,
    isActive: () => true,
    isVisible: (filters: FiltersModel) =>
      Object.keys(filters).includes('min_price') &&
      Object.keys(filters).includes('max_price') &&
      ((filters.min_price && filters.min_price > 0) ||
        (filters.max_price && filters.max_price > 0)),
    isRemovable: true,
    onRemove: (filters: FiltersModel) => {
      const newFilters = { ...filters }
      const ResetPrice = document.getElementById('reset_price')
      ResetPrice?.click()
      delete newFilters.min_price
      delete newFilters.max_price
      return newFilters
    },
    onToggle: null,
  },
  {
    id: 4,
    getLabel: (filters: FiltersModel) => filters.category_name,
    isActive: () => true,
    isVisible: (filters: FiltersModel) => filters.category_id,
    isRemovable: true,
    onRemove: (filters: FiltersModel) => {
      const newFilters = { ...filters }
      delete newFilters.category_id
      delete newFilters.category_name
      return newFilters
    },
    onToggle: null,
  },
  {
    id: 5,
    getLabel: () => 'Moi ra mat',
    isActive: () => true,
    isVisible: (filters: FiltersModel) => filters.sort_by_date === 'desc',
    isRemovable: true,
    onRemove: (filters: FiltersModel) => {
      const newFilters = { ...filters }
      delete newFilters.sort_by_date
      return newFilters
    },
    onToggle: null,
  },
]

const FilterViewer: React.FC<FilterViewerProps> = ({ filters, onChange }) => {
  const visisbleFilters = useMemo(() => {
    return FILTER_LIST.filter((x) => x.isVisible(filters))
  }, [filters])
  return (
    <Box
      component='ul'
      sx={{ listStyle: 'none', display: 'flex', gap: '10px', px: 2 }}
    >
      {visisbleFilters.map((x) => (
        <li key={x.id}>
          <Chip
            label={x.getLabel(filters)}
            color={x.isActive(filters) ? 'primary' : 'default'}
            clickable={!x.isRemovable}
            onClick={
              x.isRemovable
                ? undefined
                : () => {
                    if (onChange && x.onToggle) {
                      const newFilters = x.onToggle(filters)
                      if (newFilters) {
                        onChange(newFilters)
                      }
                    }
                  }
            }
            onDelete={
              x.isRemovable
                ? () => {
                    if (onChange && x.onRemove) {
                      const newFilters = x.onRemove(filters)
                      if (newFilters) {
                        onChange(newFilters)
                      }
                    }
                  }
                : undefined
            }
          />
        </li>
      ))}
    </Box>
  )
}

export default FilterViewer
