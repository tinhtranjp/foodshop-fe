import {NavLink} from 'react-router-dom'
import '~/assets/style/styeles.css'
import '../DefaultLayout.css'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import useSWR from 'swr'
import {fetcherData} from '~/api/axiosClient'
import {CategoryModel} from '~/model/CategoryModel'
import {Badge, Box, IconButton} from '@mui/material'
import {useDispatch, useSelector} from 'react-redux'
import {cartItemsCountSelector, cartTotalSelector} from '~/pages/Cart/selectors'
import {AppDispatch, RootState} from '~/redux/store'
import {resetCurrentUser} from '~/pages/Auth/UserSlice'
import AccountCircle from '@mui/icons-material/AccountCircle'
import MenuItem from '@mui/material/MenuItem'
import Menu from '@mui/material/Menu'
import {useRef, useState} from 'react'
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'
import MenuIcon from '@mui/icons-material/Menu'
import {NavMobile} from './NavMobile/NavMobile'
import CloseIcon from '@mui/icons-material/Close'
export default function Header() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [open, setOpen] = useState(false)
  const [isNavMobileOpen, setIsNavMobileOpen] = useState(false)
  const logoutTimeoutRef = useRef<number | undefined>(undefined)

  const handleMenuIconClick = () => {
    setIsNavMobileOpen(!isNavMobileOpen)
  }
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
  let isLoggedIn
  if (loggedInUser) {
    isLoggedIn = !!loggedInUser.token
  }

  const {data, error} = useSWR<CategoryModel[]>('categories', fetcherData)

  if (error) return <div>failed to load</div>
  return (
    <Box
      sx={{
        background: (theme) => theme.palette.customBg.dark,
        position: 'fixed',
        top: 0,
        zIndex: 100,
        left: 0,
        right: 0,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: {xs: '100%', lg: '1060px'},
          marginX: 'auto',
          height: (theme) => theme.tCustom.navTopHeight,
        }}
      >
        <NavLink
          to='/'
          style={({isActive}) => ({
            color: isActive ? '#2196f3' : 'white',
          })}
          className='navLinkTop'
        >
          T-Shop
        </NavLink>
        <Box
          component='ul'
          sx={{
            display: {xs: 'none', md: 'flex'},
            alignItems: 'center',
            listStyle: 'none',
          }}
        >
          <li>
            <NavLink
              to='/product'
              style={({isActive}) => ({
                color: isActive ? '#2196f3' : 'white',
              })}
              className='category-top navLinkTop'
            >
              商品カテゴリー
            </NavLink>
            <ul className='nav-menu-top'>
              {data &&
                data.map((category) => (
                  <li key={category.id}>
                    <NavLink
                      to={`/product?category_id=${category.id}&category_name=${category.name}`}
                      className='navLinkTop'
                      style={{padding: '16px', color: '#222'}}
                    >
                      {category.name}
                    </NavLink>
                  </li>
                ))}
            </ul>
          </li>
          <li>
            <NavLink
              to='/recipe'
              style={({isActive}) => ({
                color: isActive ? '#2196f3' : 'white',
              })}
              className='navLinkTop'
            >
              酢重レシピ
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/about'
              style={({isActive}) => ({
                color: isActive ? '#2196f3' : 'white',
              })}
              className='navLinkTop'
            >
              酢重正之商店について
            </NavLink>
          </li>
          {!isLoggedIn && (
            <li>
              <NavLink
                to='/login'
                style={({isActive}) => ({
                  color: isActive ? '#2196f3' : 'white',
                })}
                className='navLinkTop'
              >
                ログイン
              </NavLink>
            </li>
          )}
          {!isLoggedIn && (
            <li>
              <NavLink
                to='/register'
                style={({isActive}) => ({
                  color: isActive ? '#2196f3' : 'white',
                })}
                className='navLinkTop'
              >
                新規登録
              </NavLink>
            </li>
          )}
        </Box>
        <Box sx={{display: 'flex', alignItems: 'center', marginRight: '20px'}}>
          <Box>
            <NavLink
              to='/cart'
              style={({isActive}) => ({
                color: isActive ? '#2196f3' : 'white',
                display: 'flex',
                paddingTop: 0,
                paddingBottom: 0,
                alignItems: 'center',
              })}
              className='navLinkTop'
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
              <span style={{marginLeft: '4px'}}>
                合計：{Number(cartTotal).toLocaleString()}円
              </span>
            </NavLink>
          </Box>
          {isLoggedIn && (
            <div>
              <IconButton
                size='large'
                aria-label='account of current user'
                aria-controls='menu-appbar'
                aria-haspopup='true'
                onClick={handleMenu}
                sx={{color: '#fff'}}
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
                sx={{top: '-6px'}}
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
          <Box
            onClick={handleMenuIconClick}
            sx={{height: '24px', display: {md: 'none'}}}
          >
            <IconButton
              sx={{
                p: 0,
                transition: 'transform 0.3s ease',
                transform: isNavMobileOpen ? 'rotate(90deg)' : 'rotate(0deg)',
              }}
            >
              {isNavMobileOpen ? (
                <CloseIcon
                  sx={{md: 'none', color: '#fff', cursor: 'pointer'}}
                />
              ) : (
                <MenuIcon sx={{md: 'none', color: '#fff', cursor: 'pointer'}} />
              )}
            </IconButton>
          </Box>
          <NavMobile isNavMobileOpen={isNavMobileOpen} />
        </Box>
      </Box>
      <Backdrop
        sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
        open={open}
        onClick={handleCloseBackdrop}
      >
        <CircularProgress color='inherit' />
      </Backdrop>
    </Box>
  )
}
