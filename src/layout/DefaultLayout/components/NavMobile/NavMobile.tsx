import {Box, Stack, Typography} from '@mui/material'
import {InputGroup} from './InputGroup'
import Grid from '@mui/material/Unstable_Grid2'
import {NavSubMobile} from './NavSubMobile'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import {NavLink} from 'react-router-dom'

interface NavMobile {
  isNavMobileOpen: boolean
}

export const NavMobile = (props: NavMobile) => {
  const {isNavMobileOpen} = props
  return (
    <Box
      id='navMobile'
      sx={{
        background: '#fff',
        visibility: isNavMobileOpen ? 'visible' : 'hidden',
        position: 'absolute',
        top: '100%',
        right: 0,
        left: 0,
        zIndex: '100',
        height: '100vh',
        overflowY: 'auto',
        pb: '65px',
        transition: 'opacity 0.3s ease-in-out, transform 0.3s ease-in-out',
        opacity: isNavMobileOpen ? 1 : 0,
      }}
    >
      <Box sx={{padding: '15px 30px'}}>
        <InputGroup />
      </Box>
      <Box>
        <Typography
          variant='body1'
          sx={{
            px: '30px',
            color: '#FFF',
            background: '#222',
            mb: 2,
            py: 1,
            fontSize: '15px',
            letterSpacing: '2px',
          }}
        >
          商品カテゴリー
        </Typography>
        <Grid container component='ul' p={0}>
          <NavSubMobile />
        </Grid>
      </Box>
      <Stack>
        <NavLink
          to='/recipe'
          style={({isActive}) => ({
            color: isActive ? '#2196f3' : '#222',
            textDecoration: 'none',
          })}
        >
          <Box
            sx={{
              padding: '10px 30px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: '#DCDCDC',
            }}
          >
            <Typography component='span'>酢重のレシピ</Typography>
            <ArrowRightIcon />
          </Box>
        </NavLink>
        <NavLink
          to='/about'
          style={({isActive}) => ({
            color: isActive ? '#2196f3' : '#222',
            textDecoration: 'none',
          })}
        >
          <Box
            sx={{
              padding: '10px 30px',
              my: '1px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: '#DCDCDC',
            }}
          >
            <Typography component='span'>酢重正之商店について</Typography>
            <ArrowRightIcon />
          </Box>
        </NavLink>
        <NavLink
          to='/news'
          style={({isActive}) => ({
            color: isActive ? '#2196f3' : '#222',
            textDecoration: 'none',
          })}
        >
          <Box
            sx={{
              padding: '10px 30px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: '#DCDCDC',
            }}
          >
            <Typography component='span'>お知らせ</Typography>
            <ArrowRightIcon />
          </Box>
        </NavLink>
      </Stack>
      <Grid
        container
        component='ul'
        p={0}
        sx={{background: '#222', paddingBottom: '10px'}}
      >
        <Grid
          xs={6}
          sx={{padding: '10px 30px', color: '#fff', fontSize: '12px'}}
        >
          お買い物ガイド
        </Grid>
        <Grid
          xs={6}
          sx={{padding: '10px 30px', color: '#fff', fontSize: '12px'}}
        >
          ギフトラッピング
        </Grid>
        <Grid
          xs={6}
          sx={{padding: '10px 30px', color: '#fff', fontSize: '12px'}}
        >
          大口注文・法人の方へ
        </Grid>
        <Grid
          xs={6}
          sx={{padding: '10px 30px', color: '#fff', fontSize: '12px'}}
        >
          プライバシーポリシー
        </Grid>
        <Grid
          xs={6}
          sx={{padding: '10px 30px', color: '#fff', fontSize: '12px'}}
        >
          特定商取引に基づく表記
        </Grid>
        <Grid
          xs={6}
          sx={{padding: '10px 30px', color: '#fff', fontSize: '12px'}}
        >
          お問い合わせ
        </Grid>
      </Grid>
    </Box>
  )
}
