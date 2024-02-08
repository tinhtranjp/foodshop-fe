import {createBrowserRouter} from 'react-router-dom'
import HomeRoutes from './Home'
import RegisterRoutes from './Register'
import LoginRoutes from './Login'
import ProductRouter from './Product'
import Cart from './Cart'
import {Test} from '~/utils/test'
const router = createBrowserRouter([
  ...HomeRoutes,
  ...RegisterRoutes,
  ...LoginRoutes,
  ...ProductRouter,
  ...Cart,
  {
    path: '/test',
    element: <Test />,
  },
])

export default router
