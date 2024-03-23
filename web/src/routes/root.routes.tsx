import Login from '@/pages/auth/Login'
import Apresentacao from '@/pages/clientForm/Apresentacao'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Routes,
} from 'react-router-dom'
import ProtectedRoutes from './ProtectedRoutes'
import ErrorPage from '@/pages/ErrorPage'
import Home from '@/pages/home/Home'

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route element={<Login />} path="login" />
      <Route element={<ProtectedRoutes />}>
        <Route element={<Home />} path="dashboard" />
        <Route element={<Apresentacao />} path="novo-cliente" />
      </Route>
    </Route>
  )

  //https://www.youtube.com/watch?v=pyfwQUc5Ssk
)
