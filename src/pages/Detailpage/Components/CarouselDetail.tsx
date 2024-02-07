import React from 'react'
import {Carousel} from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import {listProductImgModel} from '~/model/ProductModel'
import {baseURL} from '~/constants/Api'
interface propsItem {
  listImg: listProductImgModel[]
}

export const CarouselDetail: React.FC<propsItem> = ({listImg}) => {
  return (
    <Carousel showArrows={true} showIndicators={true}>
      {listImg.map((img) => (
        <div key={img.image_url} className='h-[440px]'>
          <img
            src={`${baseURL}/images/${img.image_url}`}
            className='w-full h-full object-cover'
          />
        </div>
      ))}
    </Carousel>
  )
}
