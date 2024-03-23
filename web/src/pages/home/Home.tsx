import ClientCard from '@/components/ClientCard'
import Drawer from '@/components/Drawer'
import { Header } from '@/components/Header/Header'
import { NewClientButton } from '@/components/NewClientButton'
import { SearchInput } from '@/components/SearchInput'
import { Client } from '@/dtos/ClientDTO'
import { useFetchClients } from '@/queries/clients'
import { Loader2 } from 'lucide-react'
import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
export default function Home() {
  const { data, fetchNextPage, isLoading, isFetchingNextPage } =
    useFetchClients()
  const { ref, inView } = useInView()
  const { ref: headerRef, inView: isHeaderVisible } = useInView()

  useEffect(() => {
    if (inView) {
      fetchNextPage()
    }
  }, [fetchNextPage, inView])

  return (
    <div className="bg-Light-background min-h-screen flex flex-col ">
      <Header.Root>
        <Header.RightMenu.Root>
          <NewClientButton />
          <Header.RightMenu.User />
        </Header.RightMenu.Root>
      </Header.Root>
      <div className=" flex flex-1 flex-row gap-8 py-12">
        <aside className="flex flex-col w-[260px]">
          <Drawer isHeaderVisible={isHeaderVisible} />
        </aside>
        <main className="flex flex-1 flex-col pr-16 gap-y-6 ">
          <div
            className="w-full flex justify-between items-center"
            ref={headerRef}
          >
            <h1 className="text-3xl font-semibold">Meus Clientes</h1>
            <SearchInput className="w-[400px]" />
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
