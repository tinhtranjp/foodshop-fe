import HomeCarousel from '~/components/HomeCarousel'
import { NavLink, useNavigate } from 'react-router-dom'
import NewsLogo from '~/assets/img/ttl_news.svg'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import miso from '~/assets/img/img_category_miso.jpg'
import okazu from '~/assets/img/img_category_okazu.jpg'
import sauce from '~/assets/img/img_category_02.jpg'
import dashi from '~/assets/img/img_category_03.jpg'
import shinshu from '~/assets/img/img_category_04.jpg'
import forgift from '~/assets/img/ttl_gift_sub.svg'
import Button from '@mui/material/Button'
import NewsItem from './components/NewsItem'
import RankingImg from '~/assets/img/ttl_ranking.svg'
import RecommendImg from '~/assets/img/ttl_recommend.svg'
import RecommendList from './components/RecommendList'
import RankingList from './components/RankingList'
import cateBotImg1 from '~/assets/img/cateBot_img1.jpg'
import cateBotImg2 from '~/assets/img/cateBot_img2.jpg'
import cateBotImg3 from '~/assets/img/cateBot_img3.jpg'
import cateBotImg4 from '~/assets/img/cateBot_img4.jpg'
import cateBotImg5 from '~/assets/img/cateBot_img5.jpg'
import cateBotImg6 from '~/assets/img/cateBot_img6.jpg'

export default function Home() {
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
    <div>
      <HomeCarousel />
      <div className='mt-10 bg-backGround-2 pt-16 pb-10'>
        <div className='container-1060'>
          <div className='flex items-start'>
            <h2 className='pr-[15%] leading-[0px] m-0'>
              <img src={NewsLogo} alt='news' className='w-full h-full block' />
            </h2>
            <ul className='list-none m-0 p-0 flex flex-col gap-y-3 tracking-[2px]'>
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
            </ul>
          </div>
          <div className='flex justify-end mt-10 t-item-link hover:cursor-pointer text-[#222] p-0'>
            <NavLink to='/' className='text-[#222] mr-3'>
              もっと見る
            </NavLink>
            <KeyboardArrowRightIcon />
          </div>
          <div className='grid grid-cols-6 gap-x-10 gap-y-6 pt-[63px] pb-[100px]'>
            <NavLink
              to='/product?category_id=6&category_name=味噌'
              className='col-span-3 item-hover'
            >
              <img src={miso} alt='miso' />
            </NavLink>
            <NavLink
              to='/product?category_id=13&category_name=おかず・惣菜'
              className='col-span-3 item-hover'
            >
              <img src={okazu} alt='okazu' />
            </NavLink>
            <NavLink
              to='/product?category_id=12&category_name=醤油'
              className='col-span-2 item-hover'
            >
              <img src={sauce} alt='sauce' />
            </NavLink>
            <NavLink
              to='/product?category_id=17&category_name=だし・かえし'
              className='col-span-2 item-hover'
            >
              <img src={dashi} alt='dashi' />
            </NavLink>
            <NavLink
              to='/product?category_id=19&category_name=信州名物'
              className='col-span-2 item-hover'
            >
              <img src={shinshu} alt='shishu' />
            </NavLink>
          </div>
        </div>
        <div className='bg-img-gift'>
          <div className='container-1060 py-[5px]'>
            <h2>
              <img src={forgift} alt='gift' />
            </h2>
            <p className='w-[420px] text-[16px] tracking-[3px] leading-8'>
              酢重正之商店では、大切な方への贈り物をご用意しております。
              じっくり丁寧に作られた味噌や醤油、オリジナルのたれや
              ドレッシングなどを詰め合わせ、心をこめてお包みします。
              気軽に送れる小瓶セットから、和の調味料を揃えたセットまで、
              贈るシーンやお相手に合わせてお選びください。
            </p>
            <Button
              variant='contained'
              size='large'
              onClick={() => {
                navigate(`/product?category_id=16&category_name=贈り物`)
              }}
            >
              贈り物
            </Button>
          </div>
        </div>
        <div className='container-1160  pt-[107px] pb-10 '>
          <div className='mb-24'>
            <h2 className='text-center'>
              <img src={RecommendImg} alt='recommend' />
            </h2>
            <h3 className='text-center mt-5 text-[16px] bold tracking-[2px] relative title-boder'>
              季節のおすすめ商品
            </h3>
          </div>
          <RecommendList />
        </div>
        <div className='bg-backGround-2'>
          <div className='container-1160'>
            <div className='mb-24'>
              <h2 className='text-center'>
                <img src={RankingImg} alt='recommend' />
              </h2>
              <h3 className='text-center mt-5 text-[16px] bold tracking-[2px] relative title-boder'>
                売れ筋商品
              </h3>
            </div>
            <div className='w-[880px] mx-auto'>
              <RankingList />
            </div>
            <ul className='list-none grid grid-cols-3 gap-6 pt-[150px]'>
              {cateBotImgs &&
                cateBotImgs.map((img, index) => (
                  <li className='item-hover' key={index}>
                    <NavLink to='#'>
                      <img
                        src={img}
                        alt=''
                        className='w-full max-w-[100%] h-[116px] object-cover'
                      />
                    </NavLink>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
