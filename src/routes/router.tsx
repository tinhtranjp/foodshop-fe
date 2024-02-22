import {createBrowserRouter} from 'react-router-dom'
import HomeRoutes from './Home'
import RegisterRoutes from './Register'
import LoginRoutes from './Login'
import ProductRouter from './Product'
import Cart from './Cart'
import AdminRouter from '~/routes/Admin'
import OrderRouter from './Order'
const router = createBrowserRouter([
  ...HomeRoutes,
  ...RegisterRoutes,
  ...LoginRoutes,
  ...ProductRouter,
  ...Cart,
  ...AdminRouter,
  ...OrderRouter,
])

export default router
