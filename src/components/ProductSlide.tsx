import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import ProductItem from '~/components/ProductItem'
import {baseURL} from '~/constants/Api'
import {Box} from '@mui/material'
import {NavLink} from 'react-router-dom'

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
const ProductSlide: React.FC<ProductSlideProps> = ({products}) => {
  const settings = {
    infinite: true,
    speed: 600,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 2,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  }

  return (
    <Slider {...settings}>
      {products &&
        products.map((product) => (
          <NavLink
            to={`/product/${product.id}`}
            key={product.id}
            className='noUnderline'
          >
            <li className='list-none'>
              <Box sx={{px: '4px'}}>
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
