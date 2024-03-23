import Logo from '@/assets/science-logo-2.svg'
import { Button } from '@/components/ui/button'
import { NewClientButton } from './NewClientButton'
export default function Header() {
  return (
    <header className="flex items-center justify-between w-full border-b-zinc-200 border-b-[1px] h-24 pl-16 pr-16 ">
      <img
        src={Logo}
        width={150}
        alt="Logo gradiente do azul para o verde da Science - marketing inteligente"
      />
      <nav className="flex items-center justify-between h-full w-72">
        <NewClientButton />
        <div className="gradient-button w-14 h-14 rounded-full flex items-center justify-center">
          <span className="font-semibold text-lg text-primaryScale-50">GD</span>
        </div>
      </nav>
    </header>
  )
}
