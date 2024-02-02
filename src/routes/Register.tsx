import AuthLayout from '~/layout/AuthLayout'
import Register from '~/pages/Auth/Register/Register'

const RegisterRoutes = [
  {
    path: '/register',
    element: <AuthLayout />,
    children: [
      {
        path: '',
        element: <Register />,
      },
    ],
  },
]

export default RegisterRoutes
