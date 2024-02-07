import {Typography} from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import useSWR from 'swr'
import {fetcherData} from '~/api/axiosClient'
import {CategoryModel} from '~/model/CategoryModel'
import {NavLink, useLocation} from 'react-router-dom'
export const NavSubMobile = () => {
  const {data} = useSWR('categories', fetcherData)
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const categoryId = searchParams.get('category_id')
  const categoryIdNumber = categoryId ? parseInt(categoryId) : null

  return (
    <>
      {data &&
        data.map((category: CategoryModel) => (
          <Grid key={category.id} xs={6}>
            <NavLink
              to={`/product?category_id=${category.id}&category_name=${category.name}`}
              style={{
                color: categoryIdNumber === category.id ? '#2196f3' : '#222',
                textDecoration: 'none',
              }}
            >
              <Typography
                variant='body2'
                sx={{padding: '10px 30px', fontSize: '13px'}}
              >
                {category.name}
              </Typography>
            </NavLink>
          </Grid>
        ))}
    </>
  )
}
