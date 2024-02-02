import DefaultLayout from '~/layout/DefaultLayout'
import { Cart } from '~/pages/Cart/Cart'
const ProductRouter = [
  {
    path: '/Cart',
    element: <DefaultLayout />,
    children: [
      {
        path: '',
        element: <Cart />,
      },
    ],
  },
]

export default ProductRouter
