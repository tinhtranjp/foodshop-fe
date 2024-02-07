import {Box} from '@mui/material'
import HomeCarousel from '~/components/HomeCarousel'
import Footer from '~/layout/DefaultLayout/components/Footer'
import Header from '~/layout/DefaultLayout/components/Header'

export const Test = () => {
  return (
    <Box sx={{pt: '65px'}}>
      <Header />
      <HomeCarousel />
      <Footer />
    </Box>
  )
}
