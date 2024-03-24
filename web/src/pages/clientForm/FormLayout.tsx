import { Header } from '@/components/Header/Header'
import { useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

export default function FormLayout() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  useEffect(() => {
    if (pathname === '/novo-cliente') {
      navigate('/novo-cliente/apresentacao')
    }
  }, [])
  return (
    <>
      <Header.Root>
        <Header.RightMenu.Root>
          <Header.RightMenu.User />
        </Header.RightMenu.Root>
      </Header.Root>
      <div className="w-full min-h-screen my-8">
        <div className="w-full flex flex-col gap-2 items-center justify-center py-8 ">
          <h1 className="text-3xl font-medium text-primaryScale-950">
            Cadastro de Novo Cliente
          </h1>
          <p className="text-base text-zinc-400">
            Preencha os campos para cadastrar um novo cliente
          </p>
        </div>
        <div className="w-5/6 mx-auto border-2 border-zinc-200 p-10 rounded-lg ">
          <Outlet />
        </div>
      </div>
    </>
  )
}
