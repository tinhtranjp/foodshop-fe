import HomeCarousel from '~/components/HomeCarousel'
import {NavLink, useNavigate} from 'react-router-dom'
import NewsLogo from '~/assets/img/ttl_news.svg'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import miso from '~/assets/img/img_category_miso.jpg'
import okazu from '~/assets/img/img_category_okazu.jpg'
import sauce from '~/assets/img/img_category_02.jpg'
import dashi from '~/assets/img/img_category_03.jpg'
import shinshu from '~/assets/img/img_category_04.jpg'
import forgift from '~/assets/img/ttl_gift_sub.svg'
import Button from '@mui/material/Button'
import RankingImg from '~/assets/img/ttl_ranking.svg'
import RecommendImg from '~/assets/img/ttl_recommend.svg'
import RecommendList from './components/RecommendList'
import RankingList from './components/RankingList'
import NewsItem from './components/NewsItem'
import cateBotImg1 from '~/assets/img/cateBot_img1.jpg'
import cateBotImg2 from '~/assets/img/cateBot_img2.jpg'
import cateBotImg3 from '~/assets/img/cateBot_img3.jpg'
import cateBotImg4 from '~/assets/img/cateBot_img4.jpg'
import cateBotImg5 from '~/assets/img/cateBot_img5.jpg'
import cateBotImg6 from '~/assets/img/cateBot_img6.jpg'
import {Box, Typography, useTheme} from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
export default function Home() {
  const theme = useTheme()
  const cateBotImgs = [
    cateBotImg1,
    cateBotImg2,
    cateBotImg3,
    cateBotImg4,
    cateBotImg5,
    cateBotImg6,
  ]

  const navigate = useNavigate()

  return (
    <Box sx={{pt: '65px'}}>
      <HomeCarousel />
      <Box
        sx={{
          paddingTop: '64px',
          paddingBottom: '40px',
          background: (theme) => theme.palette.customBg.secondary,
        }}
      >
        <Box sx={{width: {xl: '1060px'}, mx: 'auto'}}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'start',
              flexDirection: {xs: 'column', sm: 'unset'},
              px: {xs: '15px', md: '50px'},
            }}
          >
            <Typography component='h2' sx={{pr: {sm: '8%', lg: '15%'}}}>
              <img src={NewsLogo} alt='news' className='w-full h-full block' />
            </Typography>
            <Box
              component='ul'
              sx={{
                listStyle: 'none',
                mt: {xs: '40px', sm: '0'},
                margin: 0,
                padding: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: {xs: '30px 0', md: '12px 0'},
                letterSpacing: '2px',
              }}
            >
              <li>
                <NewsItem
                  date='2024.01.16'
                  title='【ご案内】「国産 粉山椒 細挽き」の内容量変更'
                />
              </li>
              <li>
                <NewsItem
                  date='2023.12.12'
                  title='【酢重の福袋 2024】本日12月12日より予約受付開始！'
                />
              </li>
              <li>
                <NewsItem
                  date='2023.12.23'
                  title='【早い者勝ち！】ご好評につき「冬季の限定惣菜」を再仕込みいたしました。'
                />
              </li>
              <li>
                <NewsItem
                  date='2023.12.22'
                  title='  【重要】大雪や荒天に伴う荷受けの停止やお届け遅延のお知らせ'
                />
              </li>
              <li>
                <NewsItem
                  date=' 2024.01.16'
                  title=' 【ご案内】「国産 粉山椒 細挽き」の内容量変更'
                />
              </li>
            </Box>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'end',
              mt: '40px',
              color: '#222',
              textDecoration: 'none',
            }}
            className='item-hover'
          >
            <NavLink to='/' style={{marginRight: '12px', color: '#222'}}>
              もっと見る
            </NavLink>
            <KeyboardArrowRightIcon />
          </Box>
          <Grid
            container
            sx={{
              paddingTop: '63px',
              paddingBottom: '100px',
            }}
          >
            <Grid xs={12} md={6} lg={6} p={1}>
              <NavLink
                to='/product?category_id=6&category_name=味噌'
                className=' item-hover'
                style={{width: '100%', maxWidth: '100%', display: 'block'}}
              >
                <img
                  src={miso}
                  alt='miso'
                  style={{display: 'block', width: '100%'}}
                />
              </NavLink>
            </Grid>
            <Grid xs={12} md={6} lg={6} p={1}>
              <NavLink
                to='/product?category_id=13&category_name=おかず・惣菜'
                className=' item-hover'
                style={{width: '100%', maxWidth: '100%', display: 'block'}}
              >
                <img
                  src={okazu}
                  alt='okazu'
                  style={{
                    display: 'block',
                    width: '100%',
                    height: '100%',
                    objectFit: 'fill',
                  }}
                />
              </NavLink>
            </Grid>
            <Grid
              xs={12}
              md={4}
              lg={4}
              p={1}
              sx={{
                [theme.breakpoints.down('md')]: {
                  height: '344px',
                },
              }}
            >
              <NavLink
                to='/product?category_id=12&category_name=醤油'
                className=' item-hover'
                style={{width: '100%', maxWidth: '100%', display: 'block'}}
              >
                <img
                  src={sauce}
                  alt='sauce'
                  style={{
                    display: 'block',
                    width: '100%',
                    height: '100%',
                    objectFit: 'fill',
                  }}
                />
              </NavLink>
            </Grid>
            <Grid
              xs={12}
              md={4}
              lg={4}
              sx={{
                [theme.breakpoints.down('md')]: {
                  height: '344px',
                },
              }}
              p={1}
            >
              <NavLink
                to='/product?category_id=17&category_name=だし・かえし'
                className='item-hover'
                style={{width: '100%', maxWidth: '100%', display: 'block'}}
              >
                <img
                  src={dashi}
                  alt='dashi'
                  style={{
                    display: 'block',
                    width: '100%',
                    height: '100%',
                    objectFit: 'fill',
                  }}
                />
              </NavLink>
            </Grid>
            <Grid
              xs={12}
              md={4}
              lg={4}
              sx={{
                [theme.breakpoints.down('md')]: {
                  height: '344px',
                },
              }}
              p={1}
            >
              <NavLink
                to='/product?category_id=19&category_name=信州名物'
                className=' item-hover'
                style={{width: '100%', height: '100%', display: 'block'}}
              >
                <img
                  src={shinshu}
                  alt='shishu'
                  style={{
                    display: 'block',
                    width: '100%',
                    height: '100%',
                    objectFit: 'fill',
                  }}
                />
              </NavLink>
            </Grid>
          </Grid>
        </Box>
        <div className='bg-img-gift'>
          <Box
            sx={{
              display: {xs: 'none', lg: 'block'},
              width: {lg: '1060px'},
              mx: 'auto',
              py: '5px',
              px: {xs: '40px'},
            }}
          >
            <h2>
              <img src={forgift} alt='gift' />
            </h2>
            <Typography
              component='p'
              sx={{
                width: {lg: '420px'},
                fontSize: '16px',
                letterSpacing: '3px',
                lineHeight: '1.8',
                mb: 3,
              }}
            >
              酢重正之商店では、大切な方への贈り物をご用意しております。
              じっくり丁寧に作られた味噌や醤油、オリジナルのたれや
              ドレッシングなどを詰め合わせ、心をこめてお包みします。
              気軽に送れる小瓶セットから、和の調味料を揃えたセットまで、
              贈るシーンやお相手に合わせてお選びください。
            </Typography>
            <Button
              variant='contained'
              size='large'
              onClick={() => {
                navigate(`/product?category_id=16&category_name=贈り物`)
              }}
            >
              贈り物
            </Button>
          </Box>
        </div>
        <Box sx={{width: {xl: '1160px'}, mx: 'auto', pt: '107px', pb: '40px'}}>
          <Box sx={{mb: '88px'}}>
            <Typography component='h2' sx={{textAlign: 'center'}}>
              <img src={RecommendImg} alt='recommend' />
            </Typography>
            <Typography
              component='h3'
              sx={{
                textAlign: 'center',
                marginTop: '20px',
                fontSize: '16px',
                fontWeight: 'bold',
                letterSpacing: '2px',
                position: 'relative',
              }}
              className='title-boder'
            >
              季節のおすすめ商品
            </Typography>
          </Box>
          <Box sx={{px: '4px'}}>
            <RecommendList />
          </Box>
        </Box>
        <Box sx={{background: (theme) => theme.palette.customBg.secondary}}>
          <Box sx={{width: {lg: '1060px'}, mx: 'auto'}}>
            <Box sx={{mb: '96px'}}>
              <Typography component='h2' textAlign='center'>
                <img src={RankingImg} alt='recommend' />
              </Typography>
              <Typography
                component='h3'
                sx={{
                  textAlign: 'center',
                  marginTop: '20px',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  letterSpacing: '2px',
                  position: 'relative',
                }}
                className='title-boder'
              >
                売れ筋商品
              </Typography>
            </Box>
            <Box
              sx={{width: {xs: '250px', sm: '600px', md: '880px'}, mx: 'auto'}}
            >
              <RankingList />
            </Box>
            <Grid
              component='ul'
              container
              sx={{listStyle: 'none', pt: '150px', padding: 0, mt: '120px'}}
            >
              {cateBotImgs &&
                cateBotImgs.map((img, index) => (
                  <Grid
                    component='li'
                    xs={12}
                    sm={6}
                    md={4}
                    p={1}
                    className='item-hover'
                    key={index}
                  >
                    <NavLink to='#'>
                      <img
                        src={img}
                        alt=''
                        style={{
                          width: '100%',
                          maxWidth: '100%',
                          height: '116px',
                          objectFit: 'cover',
                        }}
                      />
                    </NavLink>
                  </Grid>
                ))}
            </Grid>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
