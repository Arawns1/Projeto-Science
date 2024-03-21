import { Client } from '@/dtos/ClientDTO'
import api from '@/lib/api'
import { queryClient } from '@/lib/queryClient'
import {
  useQuery,
  useMutation,
  QueryFunctionContext,
} from '@tanstack/react-query'

async function getAllClients() {
  const { data } = await api.get<Client[]>('/clients')
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

export function useFetchClients() {
  return useQuery({ queryKey: ['clients'], queryFn: getAllClients })
}

export function useFetchClientById(clientId: string) {
  return useQuery({ queryKey: ['clients', clientId], queryFn: getClientById })
}

export function useDeleteClientById() {
  return useMutation({
    mutationFn: deleteClientById,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] })
    },
  })
}
