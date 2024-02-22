import carImg from '~/assets/img/icon_truck.svg'
import searchImg from '~/assets/img/ttl_search.svg'
import categoryImg from '~/assets/img/ttl_category.svg'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import {NavLink, useNavigate} from 'react-router-dom'
import {Coppyright} from './Coppyright'
import useSWR from 'swr'
import {fetcherData} from '~/api/axiosClient'
import {CategoryModel} from '~/model/CategoryModel'
import React, {useState} from 'react'
import {Box, Typography, useTheme} from '@mui/material'

export default function Footer() {
  const [keyword, setKeyword] = useState<string>('')
  const navigate = useNavigate()
  const {data, error} = useSWR<CategoryModel[]>('categories', fetcherData)
  if (error) return <div>failed to load</div>

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const theme = useTheme()
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value)
  }

  const handleSubmit = () => {
    navigate(`/product?keyword=${keyword}`)
    window.scrollTo({top: 0})
  }
  return (
    <div>
      <Box
        component='p'
        sx={{
          background: '#222',
          m: 0,
          display: 'flex',
          color: '#fff',
          fontSize: '14px',
          alignItems: 'center',
          justifyContent: 'center',
          py: 2,
        }}
      >
        <img
          src={carImg}
          alt='car'
          style={{width: '24px', height: '24px', marginRight: '12px'}}
        />
        6,000円（税込）以上のお買い上げで
        <Typography
          component='span'
          sx={{ml: 2, fontSize: '16px', fontWeight: '600'}}
        >
          送料無料
        </Typography>
      </Box>
      <Box
        sx={{
          pt: '60px',
          pb: '23px',
          background: (theme) => theme.palette.customBg.secondary,
        }}
      >
        <Box sx={{width: {lg: '1060px'}, mx: 'auto', px: {md: '30px'}}}>
          <Box
            sx={{
              display: {xs: 'none', md: 'flex'},
              justifyContent: 'space-between',
              marginBottom: 10,
              alignItems: 'baseline',
            }}
          >
            <Typography
              component='h2'
              sx={{
                margin: 0,
                display: 'flex',
                alignItems: 'center',
                position: 'relative',
              }}
              className='searchLine'
            >
              <img src={searchImg} alt='search' />
              <Typography
                variant='body2'
                sx={{
                  marginLeft: 4,
                  fontSize: '14px',
                  fontWeight: 'light',
                }}
              >
                商品を探す
              </Typography>
            </Typography>
            <Box
              sx={{
                display: 'flex',
                width: '50%',
                alignItems: 'center',
              }}
            >
              <TextField
                size='small'
                fullWidth
                label='Search'
                id='search'
                onChange={handleSearch}
              />
              <Button
                variant='contained'
                size='small'
                sx={{
                  marginLeft: '0.75rem',
                  width: '200px',
                  paddingTop: '0.5rem',
                  paddingBottom: '0.5rem',
                }}
                onClick={handleSubmit}
              >
                検索
              </Button>
            </Box>
          </Box>
          <Box
            sx={{
              [theme.breakpoints.up('md')]: {
                justifyContent: 'space-between',
                alignItems: 'baseline',
                display: 'flex',
              },
            }}
          >
            <Typography
              component='h2'
              sx={{
                ml: {xs: '0', md: '0'},
                margin: 0,
                display: 'flex',
                alignItems: 'center',
                position: 'relative',
              }}
              className='searchLine'
            >
              <img src={categoryImg} alt='search' />
              <Typography
                variant='body2'
                sx={{
                  marginLeft: 4,
                  fontSize: '14px',
                  fontWeight: 'light',
                }}
              >
                商品カテゴリー
              </Typography>
            </Typography>
            <Box
              component='ul'
              sx={{
                listStyleType: 'none',
                paddingLeft: '2px',
                padding: 0,
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',

                '&:hover': {
                  opacity: 0.8,
                  transition: 'all 0.3s ease-in-out',
                },
                [theme.breakpoints.down('sm')]: {
                  gap: '20px 15px',
                  px: '50px',
                  mt: '50px',
                  fontSize: '13px',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                },
                [theme.breakpoints.up('sm')]: {
                  gap: '20px 15px',
                  px: '50px',
                  mt: '50px',
                  fontSize: '13px',
                },
                [theme.breakpoints.up('md')]: {
                  gap: '20px 80px',
                  fontSize: '14px',
                },
              }}
            >
              {data &&
                data.map((category) => (
                  <li key={category.id}>
                    <NavLink
                      to={`/product?category_id=${category.id}&category_name=${category.name}`}
                      className='category-bot navLinkBot'
                    >
                      {category.name}
                    </NavLink>
                  </li>
                ))}
            </Box>
          </Box>
        </Box>
      </Box>
      <Coppyright />
    </div>
  )
}
