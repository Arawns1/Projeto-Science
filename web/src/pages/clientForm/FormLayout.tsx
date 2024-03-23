import React from 'react'
import { Outlet } from 'react-router-dom'

export default function FormLayout() {
  return (
    <>
      <header>Olá mundo</header>
      <Outlet />
    </>
  )
}
