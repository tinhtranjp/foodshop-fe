import { Box, Grid } from '@mui/material'
import React from 'react'
import Skeleton from '@mui/material/Skeleton'

interface propsItem {
  length: number
}

const ProductSkeletonList: React.FC<propsItem> = ({ length }) => {
  return (
    <div>
      <Box>
        <Grid container>
          {Array.from(new Array(length)).map((x, index) => (
            <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
              <Box padding={1} sx={{ minHeight: '190px' }}>
                <Skeleton variant='rectangular' width='100%' height={118} />
                <Skeleton />
                <Skeleton />
                <Skeleton width='60%' />
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  )
}

export default ProductSkeletonList
