import { SignOut, User } from '@phosphor-icons/react'
import { Link } from 'react-router-dom'
import Logo from '@/assets/science-logo-2.svg'
import { SearchInput } from './SearchInput'
import { NewClientButton } from './NewClientButton'
import { ChangeEvent } from 'react'
interface DrawerProps {
  isHeaderVisible?: boolean
  searchValue?: string
  // eslint-disable-next-line no-unused-vars
  searchOnChange: (e: ChangeEvent<HTMLInputElement>) => void
}
export default function Drawer({
  isHeaderVisible,
  searchValue,
  searchOnChange,
}: DrawerProps) {
  return (
    <nav className={`sticky top-8`}>
      <ul
        className={`w-full px-4 flex flex-col gap-2 transition-all duration-500 `}
      >
        {!isHeaderVisible && (
          <div className="flex flex-col space-y-8 pb-8 ">
            <div className="w-full flex items-center justify-center">
              <img
                src={Logo}
                width={150}
                alt="Logo gradiente do azul para o verde da Science - marketing inteligente"
              />
            </div>
            <div className="w-full flex flex-row justify-start items-center gap-2">
              <SearchInput
                placeholder="Buscar"
                className="h-12"
                value={searchValue}
                onChange={searchOnChange}
              />
              <NewClientButton
                variant={'collapsed'}
                className="h-12 rounded-lg"
              />
            </div>
          </div>
        )}
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
  )
}
