import {Admin} from '~/pages/Admin/Admin'
import DashBoard from '~/pages/Admin/pages/DashBoard'
import OrderStore from '~/pages/Admin/pages/OrderStore'
import {OrderStoreCreate} from '~/pages/Admin/components/OrderStoreCreate'
import OrderStoreView from '~/pages/Admin/components/OrderStoreView'

import Order from '~/pages/Admin/pages/Order'
import User from '~/pages/Admin/pages/User'
import Product from '~/pages/Admin/pages/Product'
import OrderStoreDetail from '~/pages/Admin/components/OrderStoreDetail'

const AdminRouter = [
  {
    path: '/admin',
    element: <Admin />,
    children: [
      {
        path: 'dash-board',
        element: <DashBoard />,
      },
      {
        path: 'order-store',
        element: <OrderStore />,
        children: [
          {
            path: 'view',
            element: <OrderStoreView />,
          },
          {
            path: 'view/:orderId',
            element: <OrderStoreDetail />,
          },
          {
            path: 'create',
            element: <OrderStoreCreate />,
          },
        ],
      },
      {
        path: 'order',
        element: <Order />,
      },
      {
        path: 'user',
        element: <User />,
      },
      {
        path: 'product',
        element: <Product />,
      },
    ],
  },
]

export default AdminRouter
