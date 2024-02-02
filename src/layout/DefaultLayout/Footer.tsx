import carImg from '~/assets/img/icon_truck.svg'
import searchImg from '~/assets/img/ttl_search.svg'
import categoryImg from '~/assets/img/ttl_category.svg'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { NavLink, useNavigate } from 'react-router-dom'
import { Coppyright } from './Coppyright'
import useSWR from 'swr'
import { fetcherData } from '~/api/axiosClient'
import { CategoryModel } from '~/model/CategoryModel'
import React, { useState } from 'react'

export default function Footer() {
  const [keyword, setKeyword] = useState<string>('')
  const navigate = useNavigate()
  const { data, error } = useSWR<CategoryModel[]>('categories', fetcherData)
  if (error) return <div>failed to load</div>

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value)
  }

  const handleSubmit = () => {
    navigate(`/product?keyword=${keyword}`)
    window.scrollTo({ top: 0 })
  }
  return (
    <div>
      <p className='bg-[#222] m-0 flex text-[#fff] text-[14px] items-center justify-center py-2 '>
        <img src={carImg} alt='car' className='w-[24px] h-[24px] mr-3' />
        6,000円（税込）以上のお買い上げで
        <span className='ml-2 text-[16px] font-semibold'>送料無料</span>
      </p>
      <div className='bg-backGround-2 pt-[60px] pb-[23px]'>
        <div className='container-1060'>
          <div className='flex justify-between mb-10 items-baseline'>
            <h2 className='m-0 flex items-center relative searchLine'>
              <img src={searchImg} alt='search' />
              <span className='ml-4 text-[14px] font-light'>商品を探す</span>
            </h2>
            <div className='flex w-1/2 items-center'>
              <TextField
                className='input-text'
                size='small'
                fullWidth
                label='Search'
                id='search'
                onChange={handleSearch}
              />
              <Button
                variant='contained'
                size='small'
                className='mr-10 ml-3 w-[200px] py-2'
                onClick={handleSubmit}
              >
                検索
              </Button>
            </div>
          </div>
          <div className='flex justify-between items-baseline'>
            <h2 className='m-0 flex items-center relative searchLine'>
              <img src={categoryImg} alt='search' />
              <span className='ml-4 text-[14px] font-light'>
                商品カテゴリー
              </span>
            </h2>
            <ul className='w-1/2 list-none pl-[2px] p-0 grid grid-cols-3 gap-y-5 gap-x-20'>
              {data &&
                data.map((category) => (
                  <li key={category.id}>
                    <NavLink
                      to={`/product?category_id=${category.id}&category_name=${category.name}`}
                      className='category-bot t-item-link text-[#444] p-0 '
                    >
                      {category.name}
                    </NavLink>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
      <Coppyright />
    </div>
  )
}
