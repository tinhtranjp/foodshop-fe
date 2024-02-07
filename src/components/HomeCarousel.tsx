import React, {useRef, useState} from 'react'
import {Swiper, SwiperSlide} from 'swiper/react'
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import '~/assets/style/styeles.css'
import {EffectFade, Navigation, Pagination, Autoplay} from 'swiper/modules'
import LucKyTuyet1 from '~/assets/img/576a8be1e0496ebc78a2bd5321ed0f37.jpg'
import LucKyTuyet2 from '~/assets/img/8f71d41a7b35ce7194642ffd813a3983.jpg'
import LucKyTuyet3 from '~/assets/img/__lu_xueqi_zhu_xian_drawn_by_liang_zi_n_a__sample-4111c34138ef943871d93a93373b9117.jpg'
import LucKyTuyet4 from '~/assets/img/luc-tuyet-ky-2.jpeg'
import LucKyTuyet5 from '~/assets/img/luc-tuyet-ky-3.jpg'
import {Box} from '@mui/material'

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
            <img src={LucKyTuyet1} />
          </Box>
        </SwiperSlide>
        <SwiperSlide>
          <Box
            sx={{height: 'calc(100vh - 65px)', maxHeight: 'calc(100vh - 65px)'}}
          >
            <img src={LucKyTuyet2} />
          </Box>
        </SwiperSlide>
        <SwiperSlide>
          <Box
            sx={{height: 'calc(100vh - 65px)', maxHeight: 'calc(100vh - 65px)'}}
          >
            <img src={LucKyTuyet3} />
          </Box>
        </SwiperSlide>
        <SwiperSlide>
          <Box
            sx={{height: 'calc(100vh - 65px)', maxHeight: 'calc(100vh - 65px)'}}
          >
            <img src={LucKyTuyet4} />
          </Box>
        </SwiperSlide>
        <SwiperSlide>
          <Box
            sx={{height: 'calc(100vh - 65px)', maxHeight: 'calc(100vh - 65px)'}}
          >
            <img src={LucKyTuyet5} />
          </Box>
        </SwiperSlide>
      </Swiper>
    </>
  )
}
