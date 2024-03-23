import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

export default function ProtectedRoutes() {
  const user = true
  return user ? <Outlet /> : <Navigate to="/login" />
}
