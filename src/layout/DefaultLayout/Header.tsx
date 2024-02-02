import { NavLink } from 'react-router-dom'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import '~/assets/style/styeles.css'
import useSWR from 'swr'
import { fetcherData } from '~/api/axiosClient'
import { CategoryModel } from '~/model/CategoryModel'
import { Badge, IconButton } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import {
  cartItemsCountSelector,
  cartTotalSelector,
} from '~/pages/Cart/selectors'
import { AppDispatch, RootState } from '~/redux/store'
import { resetCurrentUser } from '~/pages/Auth/UserSlice'
import AccountCircle from '@mui/icons-material/AccountCircle'
import MenuItem from '@mui/material/MenuItem'
import Menu from '@mui/material/Menu'
import { useRef, useState } from 'react'
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'

export default function Header() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [open, setOpen] = useState(false)
  const logoutTimeoutRef = useRef<number | undefined>(undefined)
  const handleCloseBackdrop = () => {
    setOpen(false)
  }
  const handleOpenBackdrop = () => {
    setOpen(true)
  }
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const dispatch = useDispatch<AppDispatch>()

  const cartItemsCount = useSelector(cartItemsCountSelector)
  const cartTotal = useSelector(cartTotalSelector)
  const loggedInUser = useSelector((state: RootState) => state.user.current)
  const handleLogout = () => {
    handleOpenBackdrop()

    if (logoutTimeoutRef.current) {
      clearTimeout(logoutTimeoutRef.current)
    }

    logoutTimeoutRef.current = setTimeout(() => {
      dispatch(resetCurrentUser())
      handleCloseBackdrop()
      handleClose()
    }, 500)
  }
  const isLoggedIn = !!loggedInUser.token

  const { data, error } = useSWR<CategoryModel[]>('categories', fetcherData)

  if (error) return <div>failed to load</div>
  return (
    <div className='bg-[#222]  fixed top-0 z-50 inset-x-0'>
      <div className='flex items-center justify-between w-[1060px] mx-auto h-[65px] '>
        <NavLink to='/' className='t-item-link text-[14px]'>
          T-Shop
        </NavLink>
        <ul className='flex items-center'>
          <li className='list-none'>
            <NavLink to='#!' className='category-top t-item-link text-[14px]'>
              商品カテゴリー
            </NavLink>
            <ul className='nav-menu-top w-full flex flex-wrap justify-center z-10 gap-y-4 pt-10 pb-8 px-[25%] bg-[#fff] absolute top-[100%] inset-x-0 list-none'>
              {data &&
                data.map((category) => (
                  <li key={category.id}>
                    <NavLink
                      to={`/product?category_id=${category.id}&category_name=${category.name}`}
                      className='t-item-link text-[#222] p-4 text-[14px]'
                    >
                      {category.name}
                    </NavLink>
                  </li>
                ))}
            </ul>
          </li>
          <li className='list-none'>
            <NavLink to='/' className='t-item-link text-[14px]'>
              酢重レシピ
            </NavLink>
          </li>
          <li className='list-none'>
            <NavLink to='/' className='t-item-link text-[14px]'>
              酢重正之商店について
            </NavLink>
          </li>
          {!isLoggedIn && (
            <li className='list-none'>
              <NavLink to='/login' className='t-item-link text-[14px]'>
                ログイン
              </NavLink>
            </li>
          )}
          <li className='list-none'>
            <NavLink to='/register' className='t-item-link text-[14px]'>
              新規登録
            </NavLink>
          </li>
          <li className='list-none'>
            <NavLink
              to='/cart'
              className='t-item-link text-[14px] flex py-0 items-center'
            >
              <IconButton
                size='large'
                aria-label='show 4 new mails'
                color='inherit'
              >
                <Badge badgeContent={cartItemsCount} color='error'>
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
              <span className='ml-1'>
                合計：{Number(cartTotal).toLocaleString()}円
              </span>
            </NavLink>
          </li>
          {isLoggedIn && (
            // <li className='list-none' onClick={handleLogout}>
            //   <NavLink to='#!' className='t-item-link text-[14px]'>
            //     <AccountCircleIcon sx={{ mt: '10px' }} />
            //   </NavLink>

            // </li>
            <div>
              <IconButton
                size='large'
                aria-label='account of current user'
                aria-controls='menu-appbar'
                aria-haspopup='true'
                onClick={handleMenu}
                sx={{ color: '#fff' }}
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id='menu-appbar'
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                sx={{ top: '-6px' }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </div>
          )}
        </ul>
      </div>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleCloseBackdrop}
      >
        <CircularProgress color='inherit' />
      </Backdrop>
    </div>
  )
}
