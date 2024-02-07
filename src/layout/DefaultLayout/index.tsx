import Header from '~/layout/DefaultLayout/components/Header'
import Footer from '~/layout/DefaultLayout/components/Footer'
import {Outlet} from 'react-router-dom'

export default function DefaultLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}
