import AuthLayout from '~/layout/AuthLayout'
import Login from '~/pages/Auth/Login/Login'

const LoginRoutes = [
  {
    path: '/login',
    element: <AuthLayout />,
    children: [
      {
        path: '',
        element: <Login />,
      },
    ],
  },
]

export default LoginRoutes
