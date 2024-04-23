import { DiagnosticoDTO } from "@/dtos/DiagnosticoDTO"
import { saveDiagnosticoDTO } from "@/dtos/saveDiagnosticoDTO"
import api from "@/lib/api"
import { queryClient } from "@/lib/queryClient"
import {
  QueryFunctionContext,
  useMutation,
  useQuery,
} from "@tanstack/react-query"

async function saveDiagnostico(apresentacao: saveDiagnosticoDTO) {
  const { data } = await api.post("/diagnostico", apresentacao)
  return data
}

async function findDiagnosticoByClientId(ctx: QueryFunctionContext) {
  const [, clientId] = ctx.queryKey
  const { data } = await api.get<DiagnosticoDTO>(
    `/diagnostico/client/${clientId}`,
  )
  return data
}

export function useSaveDiagnostico() {
  return useMutation({
    mutationFn: saveDiagnostico,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["diagnostico"] })
    },
    onError: (error) => {
      console.error(error)
    },
  })
}

export function useFindDiagnosticoByClientId(clientId: string) {
  return useQuery({
    queryKey: ["diagnostico", clientId],
    queryFn: findDiagnosticoByClientId,
  })
}
