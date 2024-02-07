import {Typography} from '@mui/material'
import React from 'react'
import {NavLink} from 'react-router-dom'

interface NewsItemProps {
  date: string
  title: string
}

const NewsItem: React.FC<NewsItemProps> = ({title, date}) => {
  return (
    <>
      <NavLink
        to='/'
        className=' item-hover '
        style={{
          display: 'flex',
          margin: '0',
          padding: '0',
          textDecoration: 'none',
        }}
      >
        <Typography
          component='h4'
          sx={{
            margin: 0,
            letterSpacing: '0px',
            marginRight: '20px',
            minWidth: '110px',
            color: '#222',
            fontSize: '15px',
            fontWeight: 'normal',
          }}
        >
          {date}
        </Typography>
        <Typography
          component='h3'
          sx={{
            margin: 0,
            color: '#222',
            fontSize: '15px',
            fontWeight: 'normal',
          }}
        >
          {title}
        </Typography>
      </NavLink>
    </>
  )
}

export default NewsItem
