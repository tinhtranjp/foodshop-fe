import {Swiper, SwiperSlide} from 'swiper/react'
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import '~/assets/style/styeles.css'
import {EffectFade, Navigation, Pagination, Autoplay} from 'swiper/modules'
import {Box} from '@mui/material'
import img1 from '~/assets/img/1.jpg'
import img2 from '~/assets/img/2.png'
import img3 from '~/assets/img/3.png'
import img4 from '~/assets/img/4.png'
import img5 from '~/assets/img/5.jpeg'
import img6 from '~/assets/img/6.jpg'
import img7 from '~/assets/img/7.jpg'

export default function HomeCarousel() {
  return (
    <>
      <Swiper
        spaceBetween={30}
        effect={'fade'}
        navigation={true}
        loop={true}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, EffectFade, Navigation, Pagination]}
        className='mySwiper'
      >
        <SwiperSlide>
          <Box
            sx={{height: 'calc(100vh - 65px)', maxHeight: 'calc(100vh - 65px)'}}
          >
            <img src={img1} />
          </Box>
        </SwiperSlide>
        <SwiperSlide>
          <Box
            sx={{height: 'calc(100vh - 65px)', maxHeight: 'calc(100vh - 65px)'}}
          >
            <img src={img2} />
          </Box>
        </SwiperSlide>
        <SwiperSlide>
          <Box
            sx={{height: 'calc(100vh - 65px)', maxHeight: 'calc(100vh - 65px)'}}
          >
            <img src={img3} />
          </Box>
        </SwiperSlide>
        <SwiperSlide>
          <Box
            sx={{height: 'calc(100vh - 65px)', maxHeight: 'calc(100vh - 65px)'}}
          >
            <img src={img4} />
          </Box>
        </SwiperSlide>
        <SwiperSlide>
          <Box
            sx={{height: 'calc(100vh - 65px)', maxHeight: 'calc(100vh - 65px)'}}
          >
            <img src={img5} />
          </Box>
        </SwiperSlide>
        <SwiperSlide>
          <Box
            sx={{height: 'calc(100vh - 65px)', maxHeight: 'calc(100vh - 65px)'}}
          >
            <img src={img6} />
          </Box>
        </SwiperSlide>
        <SwiperSlide>
          <Box
            sx={{height: 'calc(100vh - 65px)', maxHeight: 'calc(100vh - 65px)'}}
          >
            <img src={img7} />
          </Box>
        </SwiperSlide>
      </Swiper>
    </>
  )
}
