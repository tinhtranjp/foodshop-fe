import React from 'react'
import {Box, Typography} from '@mui/material'
import {AddtoCartForm} from './AddtoCartForm'
import {NavLink} from 'react-router-dom'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import {ProductDetail} from '~/model/ProductModel'
import Rating from '@mui/material/Rating'

interface productItem {
  product: ProductDetail | undefined
}

export const InforDetail: React.FC<productItem> = ({product}) => {
  return (
    <Box sx={{pl: {xs: '5px', lg: '50px'}}}>
      <Typography variant='h1' sx={{fontSize: '25px'}}>
        {product?.name}
      </Typography>
      <Rating name='read-only' value={5} readOnly sx={{mb: '20px', mt: 1}} />
      <Box
        sx={{
          display: 'flex',
          alignItems: 'start',
          justifyContent: 'space-between',
        }}
      >
        <Typography
          variant='subtitle2'
          sx={{fontSize: '16px', fontWeight: '700px', opacity: '0.8'}}
        >
          ID: {product?.id.toString().padStart(2, '0')}{' '}
        </Typography>
      </Box>

      <Typography
        variant='h6'
        sx={{
          py: '16px',
          mt: '20px',
          mb: '32px',
          color: '#444',
          borderTop: '1px solid #777',
          borderBottom: '1px solid #777',
        }}
      >
        価格：{product?.price.toLocaleString()}円(税込)
      </Typography>
      <AddtoCartForm product={product} />
      <Typography variant='subtitle2' sx={{mt: 4, color: 'red'}}>
        6,000円（税込）以上のお買い上げで送料無料
      </Typography>
      <ul className='p-0 m-0 list-none gap-2 flex flex-col first-of-type:mt-5'>
        <li className='flex items-center item-hover'>
          <NavLink to='#!' className='no-underline text-[#222] text-[13px] '>
            配送について
          </NavLink>{' '}
          <KeyboardArrowRightIcon />
        </li>
        <li className='flex items-center item-hover'>
          <NavLink to='#!' className='no-underline text-[#222] text-[13px] '>
            特定商取引法に基づく表記（返品など）
          </NavLink>
          <KeyboardArrowRightIcon />
        </li>
        <li className='flex items-center item-hover'>
          <NavLink to='#!' className='no-underline text-[#222] text-[13px] '>
            ギフトラッピングについて
          </NavLink>
          <KeyboardArrowRightIcon />
        </li>
        <li className='flex items-center item-hover'>
          <NavLink to='#!' className='no-underline text-[#222] text-[13px] '>
            この商品について問い合わせる
          </NavLink>
          <KeyboardArrowRightIcon />
        </li>
      </ul>
    </Box>
  )
}
