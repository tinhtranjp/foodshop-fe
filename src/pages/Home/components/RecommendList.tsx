import RecomItem from '~/components/ProductItem'
import {NavLink} from 'react-router-dom'
import useSWR from 'swr'
import {fetcherData} from '~/api/axiosClient'
import {ResponProduct} from '~/model/ProductModel'
import {baseURL} from '~/constants/Api'
import Grid from '@mui/material/Unstable_Grid2'
import {useTheme} from '@mui/material'
const RecommendList = () => {
  const theme = useTheme()
  const {data, error, isLoading} = useSWR<ResponProduct>(
    'products?page=1&limit=10',
    fetcherData,
  )

  const productList = data?.products

  if (error) return <div className='mt-[100px]'>failed to load</div>
  if (isLoading) return <div>loading...</div>

  return (
    <div>
      <Grid container>
        {productList &&
          productList.map((product) => (
            <Grid
              xs={6}
              md={3}
              lg={12 / 5}
              key={product.id}
              p='4px'
              sx={{px: {sm: '20px', md: '4px'}, mx: 'auto'}}
            >
              <li style={{listStyle: 'none'}}>
                <NavLink
                  to={`/product/${product.id}`}
                  style={{
                    textDecoration: 'none',
                    width: '345px !important',
                    maxWidth: '345px !important',
                  }}
                >
                  <RecomItem
                    img={`${baseURL}/images/${product.thumbnail}`}
                    alt={product.thumbnail}
                    title={product.name}
                    desc={product.description}
                    price={product.price}
                    height={140}
                    minHeight='min-h-[208px]'
                  />
                </NavLink>
              </li>
            </Grid>
          ))}
      </Grid>
    </div>
  )
}

export default RecommendList
