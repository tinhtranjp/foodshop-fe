import {AdminLayout} from '~/layout/AdminLayout/AdminLayout'
import {Admin} from '~/pages/Admin/Admin'
import {DashBoard} from '~/pages/Admin/pages/DashBoard'
const AdminRouter = [
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      {
        path: '',
        element: <Admin />,
      },
      {
        path: 'dash-board',
        element: <DashBoard />,
      },
    ],
  },
]

export default AdminRouter
