import ErrorPage from '@/screens/ErrorPage'
import Login from '@/screens/auth/Login'
import Home from '@/screens/home/Home'
import { createBrowserRouter } from 'react-router-dom'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
    errorElement: <ErrorPage />,
    index: true,
  },
  { path: 'dashboard', element: <Home /> },
])
