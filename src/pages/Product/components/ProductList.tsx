import { Box, Grid } from '@mui/material'
import React from 'react'
import { ProductModel } from '~/model/ProductModel'
import ProductItem from './ProductItem'

interface ProductListProps {
  data: ProductModel[]
}

const ProductList: React.FC<ProductListProps> = ({ data }) => {
  return (
    <div>
      <Box>
        <Grid container>
          {data &&
            data.map((product: ProductModel) => (
              <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                <ProductItem product={product} />
              </Grid>
            ))}
        </Grid>
      </Box>
    </div>
  )
}

export default ProductList
