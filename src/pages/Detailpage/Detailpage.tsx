import {Box} from '@mui/material'
import React, {useEffect, useState} from 'react'
import Grid from '@mui/material/Unstable_Grid2'
import {CarouselDetail} from '~/pages/Detailpage/Components/CarouselDetail'
import {InforDetail} from './Components/InforDetail'
import {useParams} from 'react-router-dom'
import {fetcherData} from '~/api/axiosClient'
import useSWR from 'swr'
import {ProductDetail} from '~/model/ProductModel'
import productApi from '~/api/productApi'
import {listProductImgModel} from '~/model/ProductModel'
import {ToastContainer} from 'react-toastify'
const Detailpage: React.FC = () => {
  const {productId} = useParams()

  const [listImg, setListImg] = useState<listProductImgModel[]>([])

  useEffect(() => {
    window.scrollTo({top: 0})
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (productId) {
          const res = await productApi.getImgByProductId(productId)
          setListImg(res)
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    fetchData()
  }, [productId])

  const {data, error, isLoading} = useSWR<ProductDetail | undefined>(
    `products/${productId}`,
    fetcherData,
  )

  if (isLoading) return <h1 className='pt-[100px]'>Loading...</h1>
  if (error) return <h1 className='pt-[100px]'>Error ban oi...</h1>

  return (
    <Box sx={{pt: '65px'}}>
      <Box sx={{py: '60px', background: '#F4F2EF'}}>
        <Grid container spacing={2} sx={{width: {lg: '1060px'}, mx: 'auto'}}>
          <Grid lg={7} sm={6}>
            <CarouselDetail listImg={listImg} />
          </Grid>
          <Grid lg={5} sm={4}>
            <InforDetail product={data} />
          </Grid>
        </Grid>
      </Box>
      <ToastContainer />
    </Box>
  )
}

export default Detailpage
