import Typography from '@mui/material/Typography'
import {useTheme} from '@mui/material/styles'
import {Box} from '@mui/material'
import siteSeal from '~/assets/img/siteSealImage.png'

export default function Footer() {
  const theme = useTheme()
  return (
    <div>
      <Typography
        variant='caption'
        component='p'
        align='center'
        sx={{
          color: theme.palette.textColor.primary,
          padding: '20px 0',
          width: {md: '700px'},
          margin: '0 auto',
          fontSize: '12px',
        }}
      >
        COPYRIGHT© 2024 FOOD SHOPPING. ALL RIGHTS RESERVED.
      </Typography>
      <Box
        sx={{
          width: {sm: '550px'},
          display: 'flex',
          alignItems: 'start',
          mx: 'auto',
        }}
      >
        <a href='#!' style={{width: '155px', height: '57px'}}>
          <img
            src={siteSeal}
            alt='GMO GlobalSign secure'
            style={{
              width: '155px',
              height: '57px',
              objectFit: 'contain',
            }}
          />
        </a>
        <Typography
          variant='caption'
          component='p'
          sx={{fontSize: '12px', ml: '2px'}}
        >
          当サイトでは、通信情報の暗号化と実在性の証明のため、GMOグローバルサイン株式会社のSSLサーバ証明書を使用しております。
          セキュアシールより、サーバ証明書の検証結果をご確認ください。
        </Typography>
      </Box>
    </div>
  )
}
