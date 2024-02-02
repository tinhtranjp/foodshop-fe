import React from 'react'
import { ProductModel } from '~/model/ProductModel'
import ProductItems from '~/components/ProductItem'
import { NavLink } from 'react-router-dom'

interface ProductItemProps {
  product: ProductModel
}
const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
  const thumbnailUrl = `http://localhost:8088/api/v1/images/${product.thumbnail}`

  //   const formattedPrice = new Intl.NumberFormat('ja-JP', {
  //     style: 'decimal',
  //   }).format(product.price)

  return (
    <div>
      <NavLink
        to={`/product/${product.id}`}
        className='no-underline p-[6px] block'
        key={product.id}
      >
        <ProductItems
          title={product.name}
          desc={product.description}
          alt={product.name}
          price={product.price}
          img={thumbnailUrl}
          height={140}
          minHeight='min-h-[190px]'
        />
      </NavLink>
    </div>
  )
}

export default ProductItem
