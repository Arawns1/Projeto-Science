import { SignOut, User } from '@phosphor-icons/react'
import { Link } from 'react-router-dom'
export default function Drawer() {
  return (
    <aside className="flex flex-col w-[260px]">
      <nav>
        <ul className="w-full px-4 flex flex-col gap-2">
          <li className="bg-Light-primary-20% h-12 w-full flex items-center justify-start text-base font-semibold text-Light-primary rounded-lg px-6 hover:brightness-95 hover:bg-Dark-primary-30%  hover:cursor-pointer">
            <User size={28} weight="fill" />
            <span className="w-full flex items-center justify-center text-center">
              Meus Clientes
            </span>
          </li>
          <li className="bg-Light-background h-12 w-full flex items-center justify-start text-base font-semibold text-zinc-400 rounded-lg px-6 hover:brightness-95 hover:cursor-pointer ">
            <SignOut size={28} weight="bold" />
            <Link
              to={'/'}
              className="w-full flex items-center justify-center text-center"
            >
              Sair
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  )
}
