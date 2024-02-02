import React from 'react'
import { NavLink } from 'react-router-dom'

interface NewsItemProps {
  date: string
  title: string
}

const NewsItem: React.FC<NewsItemProps> = ({ title, date }) => {
  return (
    <>
      <NavLink to='/' className=' t-item-link flex m-0 p-0'>
        <h4 className='m-0 tracking-[0px] mr-5 w-[110px]  text-[#222] text-[15px] font-normal'>
          {date}
        </h4>
        <h3 className='m-0 text-[#222] text-[15px] font-normal'>{title}</h3>
      </NavLink>
    </>
  )
}

export default NewsItem
