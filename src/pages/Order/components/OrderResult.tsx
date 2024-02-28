import {Box, Button, Typography, useTheme} from '@mui/material'
import {useSelector} from 'react-redux'
import {RootState} from '~/redux/store'
import {
  cartItemsCountSelector,
  cartTotalSelector,
} from '~/pages/Order/selectors'
import {styled} from '@mui/material/styles'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Unstable_Grid2'
import {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'

const Item = styled(Paper)(({theme}) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}))

export default function OrderResult() {
  const theme = useTheme()
  const orderResult = useSelector((state: RootState) => state.order.resultOrder)
  const orderCount = useSelector(cartItemsCountSelector)
  const orderTotal = useSelector(cartTotalSelector)
  const navigatge = useNavigate()

  useEffect(() => {
    window.scrollTo({top: 0})
  }, [])

  return (
    <Box sx={{pt: theme.tCustom.navTopHeight}}>
      <Typography
        variant='h4'
        component='h1'
        textAlign='center'
        paddingY={5}
        fontWeight={600}
        letterSpacing={5}
      >
        注文した内容
      </Typography>
      <Box sx={{display: 'flex', justifyContent: 'end', px: 20}}>
        <Button
          variant='contained'
          onClick={() => {
            navigatge(`/product`)
          }}
        >
          ショッピング続き
        </Button>
      </Box>
      <Box sx={{flexGrow: 1}}>
        <Grid container spacing={2} m={2}>
          <Grid xs={5}>
            <Item sx={{px: 6}}>
              <Typography py={1} component='h2' variant='h4' fontWeight={600}>
                お客様の情報
              </Typography>
              <Typography
                py={1}
                component='p'
                variant='body1'
                textAlign='left'
                fontWeight={600}
              >
                注文した時間：{orderResult.orderDate}
              </Typography>
              <Typography
                py={1}
                component='p'
                variant='body1'
                textAlign='left'
                fontWeight={600}
              >
                ご希望の日：{orderResult.shippingDate}
              </Typography>
              <Typography
                py={1}
                component='p'
                variant='body1'
                textAlign='left'
                fontWeight={600}
              >
                お名前：{orderResult.fullName}
              </Typography>
              <Typography
                py={1}
                component='p'
                variant='body1'
                textAlign='left'
                fontWeight={600}
              >
                電話番号：{orderResult.phoneNumber}
              </Typography>
              <Typography
                py={1}
                component='p'
                variant='body1'
                textAlign='left'
                fontWeight={600}
              >
                メールアドレス：{orderResult.email}
              </Typography>
              <Typography
                py={1}
                component='p'
                variant='body1'
                textAlign='left'
                fontWeight={600}
              >
                お届け先：{orderResult.shippingAddress}
              </Typography>

              <Typography
                py={1}
                component='p'
                variant='body1'
                textAlign='left'
                fontWeight={600}
              >
                配達方法：{orderResult.shippingMethod}
              </Typography>

              <Typography
                py={1}
                component='p'
                variant='body1'
                textAlign='left'
                fontWeight={600}
              >
                お支払方法：現金
              </Typography>

              {orderResult.note && (
                <Typography
                  py={1}
                  component='p'
                  variant='body1'
                  textAlign='left'
                  fontWeight={600}
                >
                  備考欄 : {orderResult.note}
                </Typography>
              )}
            </Item>
          </Grid>
          <Grid xs={7}>
            <Item>
              <Typography component='h2' variant='h4' fontWeight={600}>
                ショッピングカート
              </Typography>
              <Box sx={{display: 'flex', justifyContent: 'center', py: 2}}>
                <Typography variant='h5' component='p' fontWeight={600}>
                  商品：
                  <Typography
                    variant='h5'
                    component='span'
                    fontWeight={600}
                    color='#FE4A72'
                  >
                    {orderCount}
                  </Typography>
                </Typography>
                <Typography variant='h5' component='p' ml={4} fontWeight={600}>
                  合計額：
                  <Typography
                    variant='h5'
                    component='span'
                    fontWeight={600}
                    color='#FE4A72'
                  >
                    {Number(orderTotal).toLocaleString()}円
                  </Typography>
                </Typography>
              </Box>
              <ul style={{listStyle: 'none'}}>
                {orderResult &&
                  orderResult.orderDetails.map((item) => (
                    <li key={item.id} style={{margin: '10px 0'}}>
                      <Box sx={{display: 'flex'}}>
                        <img
                          src={
                            item.product?.thumbnail
                              ? `http://localhost:8088/api/v1/images/${item.product?.thumbnail}`
                              : 'data:image/png;base64,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'
                          }
                          alt=''
                          style={{
                            width: '120px',
                            height: '120px',
                            border: '1px solid #999',
                          }}
                        />
                        <Box sx={{ml: 5}}>
                          <Typography
                            variant='h6'
                            component='p'
                            sx={{textAlign: 'left'}}
                          >
                            {item.product?.name}
                          </Typography>
                          <Typography
                            variant='body1'
                            component='p'
                            sx={{py: 1, textAlign: 'left'}}
                          >
                            Price:{' '}
                            {Number(item.product?.price).toLocaleString()} 円
                          </Typography>
                          <Typography
                            variant='body1'
                            component='p'
                            sx={{textAlign: 'left'}}
                          >
                            {item.quantity}点{' : '}
                            {Number(
                              Number(item.product?.price) * item.quantity,
                            ).toLocaleString()}{' '}
                            円
                          </Typography>
                        </Box>
                      </Box>
                    </li>
                  ))}
              </ul>
            </Item>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}
