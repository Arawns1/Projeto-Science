import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
} from 'react-router-dom'
import ProtectedRoutes from './ProtectedRoutes'
import Home from '@/pages/home/Home'
import FormLayout from '@/pages/clientForm/FormLayout'
import { ClientForm } from '@/pages/clientForm'
import Login from '@/pages/auth/Login'

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route path="/" element={<Login />} />
      <Route element={<ProtectedRoutes />}>
        <Route element={<Home />} path="dashboard" />
        <Route element={<FormLayout />} path="/novo-cliente">
          <Route
            element={<ClientForm.Apresentacao />}
            path="/novo-cliente/apresentacao"
          />
          <Route
            element={<ClientForm.Diagnostico />}
            path="/novo-cliente/diagnostico"
          />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Route>
  )
)
