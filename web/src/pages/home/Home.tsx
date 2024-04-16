import ClientCard from '@/components/ClientCard'
import Drawer from '@/components/Drawer'
import { Header } from '@/components/Header/Header'
import { NewClientButton } from '@/components/NewClientButton'
import { SearchInput } from '@/components/SearchInput'
import { Client } from '@/dtos/ClientDTO'
import { useFetchClients } from '@/queries/clients'
import { set } from 'date-fns'
import { Loader2 } from 'lucide-react'
import { ChangeEvent, useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
export default function Home() {
  const [search, setSearch] = useState<string>('')
  const { data, fetchNextPage, isLoading, isError, isFetchingNextPage } =
    useFetchClients(search)
  const { ref, inView } = useInView()
  const { ref: headerRef, inView: isHeaderVisible } = useInView()

  useEffect(() => {
    if (inView && search === '') {
      fetchNextPage()
    }
  }, [fetchNextPage, inView, search])

  const handleInputSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

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
          <Drawer
            isHeaderVisible={isHeaderVisible}
            searchOnChange={handleInputSearchChange}
            searchValue={search}
          />
        </aside>
        <main className="flex flex-1 flex-col pr-16 gap-y-6 ">
          <div
            className="w-full flex justify-between items-center border-b border-gray-200 "
            ref={headerRef}
          >
            <h1 className="text-3xl font-semibold pb-2 w-full">
              Meus Clientes
            </h1>
            <SearchInput
              iconPosition="right"
              className="  border-none text-right text-lg font-medium focus-visible:outline-none focus-visible:ring-0 caret-black placeholder:text-zinc-400 px-12"
              value={search}
              onChange={handleInputSearchChange}
            />
          </div>
          {isLoading || isError ? (
            <div className="grid grid-cols-3 gap-y-16 gap-24">
              <ClientCard isLoading />
              <ClientCard isLoading />
              <ClientCard isLoading />
            </div>
          ) : (
            data?.pages.map((page, index) => {
              return (
                <div
                  className="grid grid-cols-3 xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-y-16 gap-16"
                  key={index}
                >
                  {page.data
                    ? page.data?.apresentacao.map((client: Client) => {
                        return <ClientCard key={client.id} client={client} />
                      })
                    : page.apresentacao.map((client: Client) => {
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
