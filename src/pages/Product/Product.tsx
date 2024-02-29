import {Box, Grid, Pagination, Paper} from '@mui/material'
import {useEffect, useMemo} from 'react'
import productApi from '~/api/productApi'
import React, {useState} from 'react'
import ProductSkeletonList from './components/ProductSkeletonList'
import {PaginationModel, ProductModel} from '~/model/ProductModel'
import ProductList from '~/pages/Product/components/ProductList'
import ProductSort from './components/ProductSort'
import ProductFilter from './components/ProductFilter'
import {FiltersModel} from '~/model/FiltersModel'
import FilterViewer from './components/Filters/FilterViewer'
import FilterSearch from './components/Filters/FilterSearch'
import {useLocation, useNavigate} from 'react-router-dom'
import queryString from 'query-string'
import Header from '~/layout/DefaultLayout/components/Header'
import Footer from '~/layout/DefaultLayout/components/Footer'

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
    window.scrollTo({top: 0})
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
    console.log(event)
    window.scrollTo({top: 0})
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
    <Box>
      <Header />
      <Box
        sx={{
          paddingTop: '100px',
          px: {sm: '3%', lg: '5%'},
          paddingBottom: '5%',
          backgroundColor: (theme) => theme.palette.customBg.secondary,
        }}
      >
        <Grid container spacing={2}>
          <Grid
            item
            xl={2}
            lg={4}
            md={3}
            sx={{display: {xs: 'none', md: 'block'}}}
          >
            <Paper elevation={0}>
              <ProductFilter
                filters={queryParams}
                onChange={handleFilterChange}
              />
            </Paper>
          </Grid>
          <Grid item xl={10} lg={8} md={9} sm={12} xs={12} sx={{flex: '1 1 0'}}>
            <Paper elevation={0}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  px: {xs: '5px', md: 'unset'},
                }}
              >
                <ProductSort
                  currentSort={queryParams.sort_by_price}
                  onChange={handleSortChange}
                />
                <FilterSearch
                  keyword={queryParams.keyword}
                  onChange={handleSearch}
                />
              </Box>
              <FilterViewer filters={queryParams} onChange={setNewFilters} />
              {loading ? (
                <ProductSkeletonList length={8} />
              ) : (
                productList && <ProductList data={productList} />
              )}
              <Box sx={{display: 'flex', justifyContent: 'center', py: 5}}>
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
      <Footer />
    </Box>
  )
}
