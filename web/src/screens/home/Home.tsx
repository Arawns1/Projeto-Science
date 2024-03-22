import ClientCard from '@/components/ClientCard'
import Drawer from '@/components/Drawer'
import Header from '@/components/Header'
import { Input } from '@/components/ui/input'
import { useFetchClients } from '@/queries/clients'
import { MagnifyingGlass } from '@phosphor-icons/react'
import { Client } from '@/dtos/ClientDTO'
import { useInView } from 'react-intersection-observer'
import { useEffect, useRef, useState } from 'react'
import { Loader2 } from 'lucide-react'
export default function Home() {
  const [search, setSearch] = useState('')

  const { data, fetchNextPage, isLoading, isFetchingNextPage } =
    useFetchClients(search)
  const { ref, inView } = useInView()
  const { ref: headerRef, inView: isHeaderVisible } = useInView()

  useEffect(() => {
    if (inView) {
      fetchNextPage()
    }
  }, [fetchNextPage, inView])

  console.log(data?.pages)

  return (
    <div className="bg-Light-background min-h-screen flex flex-col ">
      <Header />
      <div className=" flex flex-1 flex-row gap-8 py-12">
        <Drawer />
        <main className="flex flex-1 flex-col pr-16 gap-y-6 ">
          <div
            className="w-full flex justify-between items-center"
            ref={headerRef}
          >
            <h1 className="text-3xl font-semibold">Meus Clientes</h1>
            <Input
              className="caret-accent w-[315px] h-12"
              type="search"
              placeholder="Buscar por Cliente"
              leftIcon={<MagnifyingGlass size={24} className="text-zinc-600" />}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          {isLoading ? (
            <div className="grid grid-cols-3 gap-y-16 gap-24">
              <ClientCard isLoading />
              <ClientCard isLoading />
              <ClientCard isLoading />
            </div>
          ) : (
            data?.pages.map((page, index) => {
              return (
                <div className="grid grid-cols-3 gap-y-16 gap-24" key={index}>
                  {page.data?.map((client: Client) => {
                    return <ClientCard key={client.id} client={client} />
                  })}
                </div>
              )
            })
          )}

          <div ref={ref} className="flex items-center justify-center">
            {isFetchingNextPage && (
              <div className="w-min flex flex-row gap-4 items-center justify-center text-primary font-semibold px-8 py-4 border-2 border-gray-200 rounded-full bg-white shadow-sm">
                <Loader2 className=" h-8 w-8 animate-spin" />
                <span>Carregando...</span>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
