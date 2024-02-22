import DefaultLayout from '~/layout/DefaultLayout'
import Order from '~/pages/Order/Order'

const OrderRouter = [
  {
    path: '/order',
    element: <DefaultLayout />,
    children: [
      {
        path: '',
        element: <Order />,
      },
    ],
  },
]

export default OrderRouter
