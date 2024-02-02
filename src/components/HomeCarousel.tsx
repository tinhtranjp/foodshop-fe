import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import LucKyTuyet1 from '~/assets/img/576a8be1e0496ebc78a2bd5321ed0f37.jpg'
import LucKyTuyet2 from '~/assets/img/8f71d41a7b35ce7194642ffd813a3983.jpg'
import LucKyTuyet3 from '~/assets/img/__lu_xueqi_zhu_xian_drawn_by_liang_zi_n_a__sample-4111c34138ef943871d93a93373b9117.jpg'
import LucKyTuyet4 from '~/assets/img/luc-tuyet-ky-2.jpeg'
import LucKyTuyet5 from '~/assets/img/luc-tuyet-ky-3.jpg'

export default function HomeCarousel() {
  const settings = {
    dots: true,
    fade: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
  }
  return (
    <div className='bg-[#222] homeCarousel'>
      <Slider {...settings} className='w-[600px] mx-auto mt-24'>
        <div className='px-10'>
          <img
            src={LucKyTuyet1}
            className='w-[500px] h-[500px] mx-auto object-cover rounded-[999px]'
          />
        </div>
        <div className='px-10'>
          <img
            src={LucKyTuyet2}
            className='w-[500px] h-[500px] mx-auto object-cover rounded-[999px]'
          />
        </div>
        <div className='px-10'>
          <img
            src={LucKyTuyet3}
            className='w-[500px] h-[500px] mx-auto object-cover rounded-[999px]'
          />
        </div>
        <div className='px-10'>
          <img
            src={LucKyTuyet4}
            className='w-[500px] h-[500px] mx-auto object-cover rounded-[999px]'
          />
        </div>{' '}
        <div className='px-10'>
          <img
            src={LucKyTuyet5}
            className='w-[500px] h-[500px] mx-auto object-cover rounded-[999px]'
          />
        </div>
      </Slider>
    </div>
  )
}
