import RecomItem from '~/components/ProductItem'
import { NavLink } from 'react-router-dom'
import useSWR from 'swr'
import { fetcherData } from '~/api/axiosClient'
import { ResponProduct } from '~/model/ProductModel'
import { baseURL } from '~/constants/Api'
const RecommendList = () => {
  const { data, error, isLoading } = useSWR<ResponProduct>(
    'products',
    fetcherData,
  )

  const productList = data?.products

  if (error) return <div className='mt-[100px]'>failed to load</div>
  if (isLoading) return <div>loading...</div>

  return (
    <div>
      <ul className='list-none grid grid-cols-5 gap-4 gap-y-10'>
        {productList &&
          productList.map((product) => (
            <li key={product.id}>
              <NavLink to={`/product/${product.id}`} className='no-underline'>
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
          ))}
      </ul>
    </div>
  )
}

export default RecommendList
