import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import ProductItem from '~/components/ProductItem'
import { baseURL } from '~/constants/Api'
import { Box } from '@mui/material'
import { NavLink } from 'react-router-dom'

interface ProductSlideProps {
  products: {
    id: number
    thumbnail: string
    name: string
    description: string
    price: number
    height?: number
    minHeight?: string
  }[]
}
const ProductSlide: React.FC<ProductSlideProps> = ({ products }) => {
  const settings = {
    infinite: true,
    speed: 600,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 2,
  }

  return (
    <Slider {...settings}>
      {products.map((product) => (
        <NavLink
          to={`/product/${product.id}`}
          className='no-underline'
          key={product.id}
        >
          <li className='list-none'>
            <Box sx={{ px: '4px' }}>
              <ProductItem
                img={`${baseURL}/images/${product.thumbnail}`}
                alt={product.name}
                title={product.name}
                desc={product.description}
                price={product.price}
                height={140}
                minHeight='min-h-[208px]'
              />
            </Box>
          </li>
        </NavLink>
      ))}
    </Slider>
  )
}

export default ProductSlide
