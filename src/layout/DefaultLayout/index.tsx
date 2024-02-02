import Header from '~/layout/DefaultLayout/Header'
import Footer from '~/layout/DefaultLayout/Footer'
import { Outlet } from 'react-router-dom'

export default function DefaultLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}
