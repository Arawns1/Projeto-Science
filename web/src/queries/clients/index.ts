import { Client } from "@/dtos/ClientDTO"
import api from "@/lib/api"
import { queryClient } from "@/lib/queryClient"
import {
  QueryFunctionContext,
  useInfiniteQuery,
  useMutation,
  useQuery,
} from "@tanstack/react-query"

async function getAllClients({ queryKey, pageParam = 0 }) {
  const search = queryKey[1]
  if (search) {
    const { data } = await api.get(`/apresentacao?_name_like=${search}`)

    return data
  }
  const data = await api.get(`/apresentacao?_page=${pageParam}&_per_page=6`)
  return { ...data, page: pageParam }
}

async function getClientById(ctx: QueryFunctionContext) {
  const [, clientId] = ctx.queryKey
  const { data } = await api.get<Client[]>(`/clients/${clientId}`)
  return data
}

async function deleteByApresentacaoId(apresentacaoId: string) {
  const { data } = await api.delete(`/clients/${apresentacaoId}`)
  return data
}

export function useFetchClients(search: string = "") {
  return useInfiniteQuery({
    queryKey: ["clients", search],
    queryFn: getAllClients,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.page + 1,
  })
}

export function useFetchClientById(clientId: string) {
  return useQuery({ queryKey: ["clients", clientId], queryFn: getClientById })
}

export function useDeleteClientById() {
  return useMutation({
    mutationFn: deleteByApresentacaoId,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clients"] })
    },
  })
}
