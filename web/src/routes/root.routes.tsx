import Login from '@/pages/auth/Login'
import Apresentacao from '@/pages/clientForm/Apresentacao'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom'
import ProtectedRoutes from './ProtectedRoutes'
import ErrorPage from '@/pages/ErrorPage'
import Home from '@/pages/home/Home'
import FormLayout from '@/pages/clientForm/FormLayout'

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route path="/" element={<Login />} />
      <Route element={<ProtectedRoutes />}>
        <Route element={<Home />} path="dashboard" />
        <Route element={<FormLayout />}>
          <Route element={<Apresentacao />} path="novo-cliente" />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Route>
  )

  //https://www.youtube.com/watch?v=pyfwQUc5Ssk
)
