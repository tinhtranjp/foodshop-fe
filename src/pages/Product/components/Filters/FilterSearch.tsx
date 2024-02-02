import { Box, IconButton, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import SearchIcon from '@mui/icons-material/Search'
import useDebounce from '~/hook/useDebounce'
interface FilterSearchModel {
  keyword: string | (string | null)[]
  onChange: (keyword: string | (string | null)[]) => void
}

const FilterSearch: React.FC<FilterSearchModel> = ({ keyword, onChange }) => {
  const [debouncedKeyword, setDebouncedKeyword] = useState(keyword)

  const keyWordDebounce = useDebounce(debouncedKeyword, 500)

  useEffect(() => {
    onChange(debouncedKeyword)
  }, [keyWordDebounce])

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newKeyword = event.target.value
    setDebouncedKeyword(newKeyword)
  }

  return (
    <Box
      sx={{
        width: 450,
        maxWidth: '100%',
        pt: 4,
        mr: 10,
        position: 'relative',
      }}
    >
      <TextField
        fullWidth
        label='Search'
        id='fullWidth'
        onChange={handleSearch}
        value={debouncedKeyword}
        size='small'
      />
      <IconButton
        type='button'
        sx={{ position: 'absolute', right: 5, zIndex: '100' }}
        aria-label='search'
      >
        <SearchIcon />
      </IconButton>
    </Box>
  )
}

export default FilterSearch
