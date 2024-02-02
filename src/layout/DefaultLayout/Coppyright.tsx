import React from 'react'
import Typography from '@mui/material/Typography'
import iconMail from '~/assets/img/icon_mail.svg'
import mailText from '~/assets/img/ttl_mailmagazine.svg'
import CopyrightIcon from '@mui/icons-material/Copyright'
import { NavLink } from 'react-router-dom'
import { Button } from '@mui/material'
export const Coppyright = () => {
  return (
    <div className='bg-[#222] pt-[70px] pb-5'>
      <div className='container-1160'>
        <h2 className='text-center m-0 text-[#fff]'>T-Shop</h2>
        <div className='w-[900px] mx-auto flex mt-[75px]'>
          <ul className='list-none p-0 m-0 grid grid-cols-2 w-1/2'>
            <li>
              <NavLink
                to='/'
                className='t-item-link text-[14px] p-0 tracking-widest'
              >
                商品のご案内
              </NavLink>
            </li>
          </ul>
          <div className='pl-[17%]'>
            <Button
              variant='outlined'
              className='item-hover'
              sx={{
                letterSpacing: '5px',
                px: 8,
                py: 1,
                fontWeight: '300',
                borderColor: '#fff',
                color: '#fff',
                '&:hover': { borderColor: '#fff' },
              }}
            >
              お問い合わせ
            </Button>
            <Typography
              variant='body2'
              gutterBottom
              sx={{ mt: 3, color: '#fff' }}
            >
              お電話によるお問い合わせ
            </Typography>
            <Typography variant='h5' gutterBottom sx={{ color: '#fff' }}>
              0267-41-2929
            </Typography>
            <Typography variant='body2' gutterBottom sx={{ color: '#fff' }}>
              営業時間：10:00 - 18:00（季節変動あり）
            </Typography>
          </div>
        </div>
        <p className='max-w-[758px] flex items-center item-hover mx-auto border-3 border-double border-[#fff] py-3 px-3 mt-10'>
          <img src={mailText} alt='mail magazine' />
          <img src={iconMail} alt='' className='mx-4' />
          <span className='text-[14px] text-[#fff] tracking-widest'>
            酢重正之商店のメールマガジンでは、新商品やお得な情報をお届けしています。
          </span>
        </p>
        <ul className='list-none p-0 m-0 flex justify-center gap-4 mt-10'>
          <li>
            <NavLink
              to='/'
              className='t-item-link text-[13px] p-0 tracking-widest'
            >
              商品のご案内
            </NavLink>
          </li>
        </ul>
      </div>

      <p className='flex justify-center items-center text-[13px] text-[#fff]'>
        COPYRIGHT
        <CopyrightIcon fontSize='small' sx={{ mr: 2 }} />
        2024 T-SHOP ALL RIGHTS RESERVED.
      </p>
    </div>
  )
}
