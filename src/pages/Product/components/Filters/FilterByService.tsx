import { Box, Checkbox, FormControlLabel, FormGroup } from '@mui/material'
import { FiltersModel } from '~/model/FiltersModel'

interface FilterByPriceProps {
  filters: FiltersModel
  onChange: (values: FiltersModel) => void
}

const FilterByService: React.FC<FilterByPriceProps> = ({
  filters,
  onChange,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!onChange) return
    const { name, checked } = e.target
    onChange({ [name]: checked })
  }

  return (
    <div>
      <Box sx={{ px: 3, pb: 3 }}>
        <FormGroup>
          <ul className='p-0 m-0 list-none'>
            {[
              { value: 'is_freeship', label: 'Free Ship' },
              { value: 'is_promotion', label: 'Giam gia' },
            ].map((service) => (
              <li key={service.value}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={Boolean(
                        filters[service.value as keyof FiltersModel],
                      )}
                      onChange={handleChange}
                      name={service.value}
                    />
                  }
                  label={service.label}
                />
              </li>
            ))}
          </ul>
        </FormGroup>
      </Box>
    </div>
  )
}

export default FilterByService
