import { Box, Grid, Pagination, Paper } from '@mui/material'
import { useEffect, useMemo } from 'react'
import productApi from '~/api/productApi'
import React, { useState } from 'react'
import ProductSkeletonList from './components/ProductSkeletonList'
import { PaginationModel, ProductModel } from '~/model/ProductModel'
import ProductList from '~/pages/Product/components/ProductList'
import ProductSort from './components/ProductSort'
import ProductFilter from './components/ProductFilter'
import { FiltersModel } from '~/model/FiltersModel'
import FilterViewer from './components/Filters/FilterViewer'
import FilterSearch from './components/Filters/FilterSearch'
import { useLocation, useNavigate } from 'react-router-dom'
import queryString from 'query-string'
import Header from '~/layout/DefaultLayout/Header'
import Typography from '@mui/material/Typography'
import iconMail from '~/assets/img/icon_mail.svg'
import mailText from '~/assets/img/ttl_mailmagazine.svg'
import CopyrightIcon from '@mui/icons-material/Copyright'
import { NavLink } from 'react-router-dom'
import { Button } from '@mui/material'
export default function Product() {
  const [productList, setProductList] = useState<ProductModel[]>([])
  const [loading, setLoading] = useState(true)
  const [pagination, setPagination] = useState<PaginationModel>({
    limit: 8,
    total: 10,
    page: 1,
  })

  const location = useLocation()
  const navigate = useNavigate()
  const queryParams = useMemo(() => {
    const params = queryString.parse(location.search)
    return {
      ...params,
      sort_by_date: params.sort_by_date || 'asc',
      page: params.page ? Number(params.page) : 1,
      limit: params.limit ? Number(params.limit) : 8,
      sort_by_price: params.sort_by_price || 'asc',
      keyword: params.keyword || ' ',
      is_promotion: params.is_promotion === 'true',
      is_freeship: params.is_freeship === 'true',
    }
  }, [location.search])

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [])
  useEffect(() => {
    // eslint-disable-next-line no-extra-semi
    ;(async () => {
      try {
        const data = await productApi.getAll(queryParams)
        if (data && data.products) {
          setProductList(data.products)
          setPagination(data.pagination)
        }
      } catch (error) {
        console.log(error)
      }
      setLoading(false)
    })()
  }, [queryParams])

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number,
  ) => {
    const filters = {
      ...queryParams,
      page: page,
    }

    navigate({
      pathname: location.pathname,
      search: queryString.stringify(filters),
    })
  }

  const handleSortChange = (newSortValue: string) => {
    const filters = {
      ...queryParams,
      sort_by_price: newSortValue,
    }

    navigate({
      pathname: location.pathname,
      search: queryString.stringify(filters),
    })
  }

  const handleFilterChange = (newFilters: FiltersModel) => {
    const filters = {
      ...queryParams,
      ...newFilters,
    }

    navigate({
      pathname: location.pathname,
      search: queryString.stringify(filters),
    })
  }

  const setNewFilters = (newFilters: FiltersModel) => {
    navigate({
      pathname: location.pathname,
      search: queryString.stringify(newFilters),
    })
  }

  const handleSearch = (keyword: string | (string | null)[]) => {
    const filters = {
      ...queryParams,
      keyword,
    }

    navigate({
      pathname: location.pathname,
      search: queryString.stringify(filters),
    })
  }

  return (
    <div>
      <Header />
      <Box className='pt-[100px] px-[10%] pb-5 bg-product'>
        <Grid container spacing={2}>
          <Grid item sx={{ width: '250px' }}>
            <Paper elevation={0}>
              <ProductFilter
                filters={queryParams}
                onChange={handleFilterChange}
              />
            </Paper>
          </Grid>
          <Grid item sx={{ flex: '1 1 0' }}>
            <Paper elevation={0}>
              <div className='flex items-center justify-between'>
                <ProductSort
                  currentSort={queryParams.sort_by_price}
                  onChange={handleSortChange}
                />
                <FilterSearch
                  keyword={queryParams.keyword}
                  onChange={handleSearch}
                />
              </div>
              <FilterViewer filters={queryParams} onChange={setNewFilters} />
              {loading ? (
                <ProductSkeletonList length={8} />
              ) : (
                productList && <ProductList data={productList} />
              )}
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 5 }}>
                <Pagination
                  color='primary'
                  count={pagination.total}
                  page={pagination.page}
                  onChange={handlePageChange}
                />
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
      <div className='bg-[#222] pt-[40px] pb-5'>
        <h2 className='text-center m-0 text-[#fff]'>T-Shop</h2>
        <div className='w-[1160px] mx-auto flex mt-[75px] justify-between'>
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
        <p className='flex justify-center items-center text-[13px] text-[#fff]'>
          COPYRIGHT
          <CopyrightIcon fontSize='small' sx={{ mr: 2 }} />
          2024 T-SHOP ALL RIGHTS RESERVED.
        </p>
      </div>
    </div>
  )
}
