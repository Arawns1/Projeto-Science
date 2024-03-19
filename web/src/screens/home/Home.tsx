import { Button } from '@/components/ui/button'
import Logo from '@/assets/science-logo-2.svg'
import { User, SignOut, MagnifyingGlass } from '@phosphor-icons/react'
import { Input } from '@/components/ui/input'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
export default function Home() {
  return (
    <div className="bg-Light-background min-h-screen flex flex-col">
      <header className="flex items-center justify-between w-full border-b-zinc-200 border-b-[1px] h-24 pl-16 pr-16 ">
        <img
          src={Logo}
          width={150}
          alt="Logo gradiente do azul para o verde da Science - marketing inteligente"
        />
        <nav className="flex items-center justify-between h-full w-72">
          <Button
            type="button"
            variant={'default'}
            className="font-medium text-base h-14 w-44 text-primaryScale-50"
          >
            Novo Cliente
          </Button>
          <div className="gradient-button w-14 h-14 rounded-full flex items-center justify-center">
            <span className="font-semibold text-lg text-primaryScale-50">
              GD
            </span>
          </div>
        </nav>
      </header>
      <div className=" flex flex-1 flex-row gap-8 py-3">
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
                <span className="w-full flex items-center justify-center text-center">
                  Sair
                </span>
              </li>
            </ul>
          </nav>
        </aside>
        <main className="flex flex-1 flex-col pr-16 gap-y-6">
          <div className="w-full flex justify-between items-center">
            <h1 className="text-3xl font-semibold">Meus Clientes</h1>
            <Input
              className="caret-accent w-72 h-12"
              type="search"
              placeholder="Buscar por Cliente"
              leftIcon={<MagnifyingGlass size={24} className="text-zinc-600" />}
            />
          </div>
          <div className="w-full grid grid-cols-3 gap-x-20 gap-y-16">
            <Card>
              <CardHeader className="gradient-button w-full px-0 py-0">
                <div className=" bg-card mt-24 ">
                  <div className="text-center flex flex-col items-center justify-center -translate-y-14 px-4 gap-2">
                    <div className="w-28 h-28 border-4 border-white bg-zinc-200 rounded-full "></div>
                    <CardTitle>John Doe</CardTitle>
                    <CardDescription>
                      Uma breve descrição de um projeto do cliente acima só que
                      ela está começand...
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>

              <CardFooter className="flex justify-between items-center ">
                <Button variant={'outline'} className="w-28">
                  Email
                </Button>
                <Button className="w-28">Editar</Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Card Title</CardTitle>
                <CardDescription>Card Description</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Card Content</p>
              </CardContent>
              <CardFooter>
                <p>Card Footer</p>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Card Title</CardTitle>
                <CardDescription>Card Description</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Card Content</p>
              </CardContent>
              <CardFooter>
                <p>Card Footer</p>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Card Title</CardTitle>
                <CardDescription>Card Description</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Card Content</p>
              </CardContent>
              <CardFooter>
                <p>Card Footer</p>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Card Title</CardTitle>
                <CardDescription>Card Description</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Card Content</p>
              </CardContent>
              <CardFooter>
                <p>Card Footer</p>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Card Title</CardTitle>
                <CardDescription>Card Description</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Card Content</p>
              </CardContent>
              <CardFooter>
                <p>Card Footer</p>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Card Title</CardTitle>
                <CardDescription>Card Description</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Card Content</p>
              </CardContent>
              <CardFooter>
                <p>Card Footer</p>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Card Title</CardTitle>
                <CardDescription>Card Description</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Card Content</p>
              </CardContent>
              <CardFooter>
                <p>Card Footer</p>
              </CardFooter>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
