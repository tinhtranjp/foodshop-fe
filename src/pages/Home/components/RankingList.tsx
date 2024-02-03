import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import useSWR from 'swr'
import { fetcherData } from '~/api/axiosClient'
import ProductSlide from '~/components/ProductSlide'

interface propsItem {
pagination: {}
products:{
  id: number
  thumbnail: string
  name: string
  description: string
  price: number
  height?: number
  minHeight?: string
}[]
}

const RankingList = () => {
  const { data, error, isLoading } = useSWR<propsItem>(
    'products?page=8&limit=20',
    fetcherData,
  )
  
  if (error) return <div>failed to load</div>
  if (isLoading) return <div>loading...ranking</div>

  return (
    <div>
      <ul>{data && <ProductSlide products={data.products} />}</ul>
    </div>
  )
}

export default RankingList
