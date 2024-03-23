import React from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from '@/components/Header/Header'
import { NewClientButton } from '@/components/NewClientButton'
export default function FormLayout() {
  return (
    <>
      <Header.Root>
        <Header.RightMenu.Root>
          <NewClientButton />
          <Header.RightMenu.User />
        </Header.RightMenu.Root>
      </Header.Root>
      <Outlet />
    </>
  )
}
