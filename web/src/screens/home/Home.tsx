import ClientCard from '@/components/ClientCard'
import Drawer from '@/components/Drawer'
import Header from '@/components/Header'
import { Input } from '@/components/ui/input'
import { MagnifyingGlass } from '@phosphor-icons/react'

export interface Client {
  id: number
  fullName: string
  photoURL: string
  description: string
}

const clientsList: Client[] = [
  {
    id: 1,
    fullName: 'João da Silva',
    photoURL: 'https://source.unsplash.com/random/300x300/?dog',
    description:
      'lorem ipsum dolor sit amet, consectetur adipiscing elit. Seddo eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamcolaboris nisi ut aliquip ex ea commodo consequat.',
  },
  {
    id: 2,
    fullName: 'Henrique da Silva',
    photoURL: 'https://source.unsplash.com/random/300x300/?dog',
    description:
      'O henrique possui um projeto extremamente legal e complicado de ser realizado em um curto período de tempo',
  },
  {
    id: 3,
    fullName: 'Paulo Tobias',
    photoURL: 'https://source.unsplash.com/random/300x300/?dog',
    description: 'Projeto do Paulão!',
  },
  {
    id: 4,
    fullName: 'Paulo Tobias',
    photoURL: '',
    description: 'Projeto do Paulão!',
  },
  {
    id: 5,
    fullName: 'Paulo Tobias',
    photoURL: 'https://source.unsplash.com/random/300x300/?dog',
    description: '',
  },
]

export default function Home() {
  return (
    <div className="bg-Light-background min-h-screen flex flex-col ">
      <Header />
      <div className=" flex flex-1 flex-row gap-8 py-12">
        <Drawer />
        <main className="flex flex-1 flex-col pr-16 gap-y-6 ">
          <div className="w-full flex justify-between items-center">
            <h1 className="text-3xl font-semibold">Meus Clientes</h1>
            <Input
              className="caret-accent w-72 h-12"
              type="search"
              placeholder="Buscar por Cliente"
              leftIcon={<MagnifyingGlass size={24} className="text-zinc-600" />}
            />
          </div>
          <div className="grid grid-cols-3 gap-y-16 gap-24">
            {clientsList.map((client) => {
              return <ClientCard key={client.id} client={client} />
            })}
          </div>
        </main>
      </div>
    </div>
  )
}
