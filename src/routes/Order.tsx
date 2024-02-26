import DefaultLayout from '~/layout/DefaultLayout'
import Order from '~/pages/Order/Order'
import OrderResult from '~/pages/Order/components/OrderResult'

const OrderRouter = [
  {
    path: '/order',
    element: <DefaultLayout />,
    children: [
      {
        path: '',
        element: <Order />,
      },
      {path: 'result', element: <OrderResult />},
    ],
  },
]

export default OrderRouter
