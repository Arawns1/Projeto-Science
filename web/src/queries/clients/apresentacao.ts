import { ApresentacaoDTO } from '@/dtos/ApresentacaoDTO'
import { saveApresentacaoDTO } from '@/dtos/saveApresentacao'
import api from '@/lib/api'
import { queryClient } from '@/lib/queryClient'
import {
  QueryFunctionContext,
  useMutation,
  useQuery,
} from '@tanstack/react-query'

async function saveApresentacao(apresentacao: saveApresentacaoDTO) {
  const { data } = await api.post('/apresentacao', apresentacao)
  return data
}
async function saveUserPhoto({
  clientId,
  formData,
}: {
  clientId: string
  formData: FormData
}) {
  const { data } = await api.post(
    `/apresentacao/upload?_clientId=${clientId}`,
    formData,
  )
  return data
}

async function findApresentacaoByClientId(ctx: QueryFunctionContext) {
  const [, clientId] = ctx.queryKey
  const { data } = await api.get<ApresentacaoDTO>(
    `/apresentacao/client/${clientId}`,
  )
  return data
}

export function useSaveApresentacao() {
  return useMutation({
    mutationFn: saveApresentacao,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['apresentacao'] })
    },
    onError: (error) => {
      console.error(error)
    },
  })
}

export function useSaveUserPhoto() {
  return useMutation({
    mutationFn: saveUserPhoto,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['apresentacao'] })
    },
    onError: (error) => {
      console.error(error)
    },
  })
}

export function useFindApresentacaoByClientId(clientId: string) {
  return useQuery({
    queryKey: ['apresentacao', clientId],
    queryFn: findApresentacaoByClientId,
  })
}
