import Typography from '@mui/material/Typography'
import iconMail from '~/assets/img/icon_mail.svg'
import mailText from '~/assets/img/ttl_mailmagazine.svg'
import CopyrightIcon from '@mui/icons-material/Copyright'
import {NavLink} from 'react-router-dom'
import {Box, Button, useTheme} from '@mui/material'
export const Coppyright = () => {
  const theme = useTheme()
  return (
    <Box
      sx={{
        backgroundColor: '#222',
        paddingTop: {xs: '30px', md: '70px'},
        paddingBottom: '5px',
      }}
    >
      <Box sx={{width: {md: '800px', lg: '1160px'}, mx: 'auto'}}>
        <Typography
          variant='h2'
          component='h2'
          align='center'
          sx={{
            margin: 0,
            color: '#fff',
            fontSize: '30px',
          }}
        >
          T-Shop
        </Typography>
        <Box
          sx={{
            width: {lg: '900px'},
            display: 'flex',
            justifyContent: {sm: 'space-between'},
            px: {sm: '50px', lg: 'unset'},
            flexDirection: {xs: 'column-reverse', sm: 'unset'},
            margin: 'auto',
            marginTop: {xs: '40px', sm: '50px'},
          }}
        >
          <Box
            component='ul'
            sx={{
              mt: {xs: '30px', sm: 'unset'},
              gap: {xs: '10px', sm: ''},
              listStyleType: 'none',
              padding: 0,
              margin: 0,
              display: {xs: 'flex', sm: 'grid'},
              flexDirection: {xs: 'column', sm: 'unset'},
              alignItems: {xs: 'center', sm: 'unset'},
              gridTemplateColumns: {sm: 'repeat(2, 1fr)'},
              width: {sm: '50%'},
            }}
          >
            <li>
              <NavLink
                to='/'
                className='item-hover'
                style={{color: '#fff', textDecoration: 'none'}}
              >
                商品のご案内
              </NavLink>
            </li>
            <li>
              <NavLink
                to='/'
                className='item-hover'
                style={{color: '#fff', textDecoration: 'none'}}
              >
                お知らせ
              </NavLink>
            </li>
            <li>
              <NavLink
                to='/'
                className='item-hover'
                style={{color: '#fff', textDecoration: 'none'}}
              >
                酢重正之商店について
              </NavLink>
            </li>
            <li>
              <NavLink
                to='/'
                className='item-hover'
                style={{color: '#fff', textDecoration: 'none'}}
              >
                店舗情報
              </NavLink>
            </li>
            <li>
              <NavLink
                to='/'
                className='item-hover'
                style={{color: '#fff', textDecoration: 'none'}}
              >
                酢重レシピ
              </NavLink>
            </li>
            <li>
              <NavLink
                to='/'
                className='item-hover'
                style={{color: '#fff', textDecoration: 'none'}}
              >
                酢重正之ホームページ
              </NavLink>
            </li>
          </Box>
          <Box
            sx={{
              paddingLeft: {md: '17%'},
              display: {xs: 'flex', md: 'unset'},
              flexDirection: {xs: 'column', md: 'unset'},
              alignItems: {xs: 'center', md: 'unset'},
            }}
          >
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
                '&:hover': {borderColor: '#fff'},
              }}
            >
              お問い合わせ
            </Button>
            <Typography
              variant='body2'
              gutterBottom
              sx={{mt: 3, color: '#fff'}}
            >
              お電話によるお問い合わせ
            </Typography>
            <Typography variant='h5' gutterBottom sx={{color: '#fff'}}>
              0267-41-2929
            </Typography>
            <Typography variant='body2' gutterBottom sx={{color: '#fff'}}>
              営業時間：10:00 - 18:00（季節変動あり）
            </Typography>
          </Box>
        </Box>
        <Box
          component='p'
          sx={{
            maxWidth: '758px',
            display: {xs: 'none', md: 'flex'},
            alignItems: 'center',
            '&:hover': {
              opacity: 0.8,
            },
            marginX: 'auto',
            border: '3px double #fff',
            padding: '12px',
            marginTop: '40px',
            cursor: 'pointer',
          }}
        >
          <img src={mailText} alt='mail magazine' />
          <img src={iconMail} alt='' className='mx-4' />
          <Typography
            component='span'
            sx={{
              fontSize: '14px',
              color: '#fff',
            }}
          >
            酢重正之商店のメールマガジンでは、新商品やお得な情報をお届けしています。
          </Typography>
        </Box>
        <Box
          component='ul'
          sx={{
            listStyle: 'none',
            padding: 0,
            margin: 0,
            display: 'flex',
            justifyContent: 'center',
            gap: 3,
            marginTop: 8,
            [theme.breakpoints.up('md')]: {
              display: 'flex',
              px: '40px',
              flexWrap: 'wrap',
              my: 4,
              gap: '10px 30px',
            },
          }}
        >
          {[
            '運営会社',
            'ギフトラッピング',
            '大口注文・法人の方へ',
            '特定商取引に基づく表記',
            'プライバシーポリシー',
            'お買い物ガイド',
          ].map((item) => (
            <li key={item}>
              <NavLink
                to='/'
                className='item-hover'
                style={{textDecoration: 'none'}}
              >
                <Typography
                  component='span'
                  sx={{
                    color: '#fff',
                    fontSize: '13px',
                    writingMode: {xs: 'vertical-lr', sm: 'unset'},
                    letterSpacing: {xs: '5px', sm: '1px'},
                  }}
                >
                  {item}
                </Typography>
              </NavLink>
            </li>
          ))}
        </Box>
      </Box>

      <p className='flex justify-center items-center text-[13px] text-[#fff]'>
        COPYRIGHT
        <CopyrightIcon fontSize='small' sx={{mr: 2}} />
        2024 T-SHOP ALL RIGHTS RESERVED.
      </p>
    </Box>
  )
}
