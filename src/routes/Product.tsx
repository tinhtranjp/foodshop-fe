import DefaultLayout from '~/layout/DefaultLayout'
import Detailpage from '~/pages/Detailpage/Detailpage'
import Product from '~/pages/Product/Product'
const ProductRouter = [
  {
    path: '/product',
    element: <Product />,
  },
  {
    path: '/product/:productId',
    element: <DefaultLayout />,
    children: [
      {
        path: '',
        element: <Detailpage />,
      },
    ],
  },
]

export default ProductRouter
