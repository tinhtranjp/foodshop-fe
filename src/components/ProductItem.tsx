import React from 'react'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import {Box, CardActionArea} from '@mui/material'
import Rating from '@mui/material/Rating'

interface Cart {
  img: string
  alt: string
  title: string
  desc: string
  price: number
  height: number
  minHeight?: string
}

const ProductItem: React.FC<Cart> = (props) => {
  const {img, alt, title, desc, price, height, minHeight} = props
  return (
    <Card>
      <CardActionArea>
        <CardMedia component='img' height={height} image={img} alt={alt} />
        <CardContent className={minHeight}>
          <Typography gutterBottom variant='subtitle1' component='h2'>
            {title}
          </Typography>
          <Typography
            variant='body2'
            color='text.secondary'
            sx={{
              my: '8px',
            }}
          >
            {desc}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Typography variant='body2' color='text.secondary'>
              {price.toLocaleString()}円
            </Typography>
            <Rating
              name='read-only'
              value={5}
              readOnly
              sx={{fontSize: {xs: '15px', sm: '20px'}}}
            />
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default ProductItem
