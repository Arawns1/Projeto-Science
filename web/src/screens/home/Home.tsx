import ClientCard from '@/components/ClientCard'
import Drawer from '@/components/Drawer'
import Header from '@/components/Header'
import { Input } from '@/components/ui/input'
import { useFetchClients } from '@/queries/clients'

import { MagnifyingGlass } from '@phosphor-icons/react'

export default function Home() {
  const { data } = useFetchClients()
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
            {data?.map((client) => {
              return <ClientCard key={client.id} client={client} />
            })}
          </div>
        </main>
      </div>
    </div>
  )
}
