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
  const searchParam = queryKey[1]
  if (searchParam) {
    const { data } = await api.get(`/clients?fullName_like${searchParam}`)
    return data
  }
  const { data } = await api.get(`/clients?_page=${pageParam}&_per_page=6`)
  return data
}

async function getClientById(ctx: QueryFunctionContext) {
  const [, clientId] = ctx.queryKey
  const { data } = await api.get<Client[]>(`/clients/${clientId}`)
  return data
}

async function deleteClientById(clientId: string) {
  const { data } = await api.delete(`/clients/${clientId}`)
  return data
}

export function useFetchClients(search: string = "") {
  return useInfiniteQuery({
    queryKey: ["clients", search],
    queryFn: getAllClients,
    staleTime: 5000,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.next,
    getPreviousPageParam: (firstPage) => firstPage.prev,
  })
}

export function useFetchClientById(clientId: string) {
  return useQuery({ queryKey: ["clients", clientId], queryFn: getClientById })
}

export function useDeleteClientById() {
  return useMutation({
    mutationFn: deleteClientById,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clients"] })
    },
  })
}
