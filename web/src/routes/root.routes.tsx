import { createBrowserRouter, createRoutesFromElements, Navigate, Route } from "react-router-dom"
import ProtectedRoutes from "./ProtectedRoutes"
import Home from "@/pages/home/Home"
import FormLayout from "@/pages/clientForm/FormLayout"
import { ClientForm, ClientFormUpdate } from "@/pages/clientForm"
import Login from "@/pages/auth/Login"
import ClientPage from "@/pages/client/ClientPage"

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route path="/" element={<Login />} />
      <Route element={<ProtectedRoutes />}>
        <Route element={<Home />} path="dashboard" />
        <Route element={<ClientPage />} path="client" />
        <Route element={<FormLayout />} path="novo-cliente">
          <Route element={<ClientForm.Apresentacao />} path="apresentacao" />
          <Route element={<ClientForm.Diagnostico />} path="diagnostico" />
          <Route element={<ClientForm.Projeto />} path="projeto" />
          <Route element={<ClientForm.IdentidadeVisual />} path="identidade-visual" />
          <Route element={<ClientForm.Cronograma />} path="cronograma" />
        </Route>
        <Route element={<FormLayout isEdicao />} path="cliente/:clienteId">
          <Route element={<ClientFormUpdate.Apresentacao />} path="apresentacao" />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Route>,
  ),
)
