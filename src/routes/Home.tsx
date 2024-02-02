import { Outlet } from 'react-router-dom'
import DefaultLayout from '~/layout/DefaultLayout/index'
import Home from '~/pages/Home/Home'
// import Counter from '~/pages/Counter/Counter'

const HomeRoutes = [
  {
    path: '/',
    element: <DefaultLayout />,
    children: [
      {
        path: '',
        // element: <Counter />,
        element: <Home />,
      },
      {
        path: 'about',
        element: (
          <div>
            <h1>About ha</h1>
            <Outlet />
          </div>
        ),
        children: [
          {
            path: '',
            element: <div>Cung duoc nha</div>,
          },
        ],
      },
    ],
  },
]

export default HomeRoutes
