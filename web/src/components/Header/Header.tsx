import Logo from "@/assets/science-logo-2.svg"
import { HeaderRightMenu } from "./RightMenu"
import { ReactNode } from "react"
import { Link } from "react-router-dom"

interface HeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

export const Header = {
  Root: HeaderRoot,
  RightMenu: HeaderRightMenu,
}

function HeaderRoot({ children }: HeaderProps) {
  return (
    <header className="flex items-center justify-between w-full border-b-zinc-200 border-b-[1px] h-24 pl-16 pr-16 ">
      <Link to="/dashboard">
        <img
          src={Logo}
          width={150}
          alt="Logo gradiente do azul para o verde da Science - marketing inteligente"
          className="cursor-pointer"
        />
      </Link>
      {children}
    </header>
  )
}
