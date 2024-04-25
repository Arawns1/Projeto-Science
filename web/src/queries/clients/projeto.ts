import { ProjetoDTO } from "@/dtos/ProjetoDTO"
import { saveProjetoDTO } from "@/dtos/saveProjetoDTO"
import api from "@/lib/api"
import { queryClient } from "@/lib/queryClient"
import {
  QueryFunctionContext,
  useMutation,
  useQuery,
} from "@tanstack/react-query"

async function saveProjeto(projeto: saveProjetoDTO) {
  const { data } = await api.post("/projeto", projeto)
  return data
}

async function findProjetoByClientId(ctx: QueryFunctionContext) {
  const [, clientId] = ctx.queryKey
  const { data } = await api.get<ProjetoDTO>(`/projeto/client/${clientId}`)
  return data
}

export function useSaveProjeto() {
  return useMutation({
    mutationFn: saveProjeto,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projeto"] })
    },
    onError: (error) => {
      console.error(error)
    },
  })
}

export function useFindProjetoByClientId(clientId: string) {
  return useQuery({
    queryKey: ["projeto", clientId],
    queryFn: findProjetoByClientId,
  })
}
