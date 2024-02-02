import { Box, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import categoryApi from '~/api/categoryApi'
import { CategoryModel } from '~/model/CategoryModel'

interface FilterByCategoryProps {
  onChange: (newCategoryId: number, newCategoryName: string) => void
}

const FilterByCategory: React.FC<FilterByCategoryProps> = ({ onChange }) => {
  const [categoryList, setCategoryList] = useState<CategoryModel[]>([])

  useEffect(() => {
    // eslint-disable-next-line no-extra-semi
    ;(async () => {
      try {
        const listCategory = await categoryApi.getAll()
        setCategoryList(listCategory)
      } catch (error) {
        console.log(error)
      }
    })()
  }, [])

  const handleCategoryClick = (category: CategoryModel) => {
    if (onChange) {
      onChange(category.id, category.name)
    }
  }

  return (
    <div>
      <Box>
        <Typography sx={{ p: 3, pb: 2 }}>Danh Muc San Pham</Typography>
        <ul className='list-none m-0 p-0 max-h-[400px] overflow-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200'>
          {categoryList &&
            categoryList.map((category) => (
              <li
                className='py-2 hover:cursor-pointer item-hover hover:shadow-lg p-6 border-2 border-gray-300'
                key={category.id}
                onClick={() => handleCategoryClick(category)}
              >
                <Typography variant='body2'>{category.name}</Typography>
              </li>
            ))}
        </ul>
      </Box>
    </div>
  )
}

export default FilterByCategory
