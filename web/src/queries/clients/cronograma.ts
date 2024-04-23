import { saveCronogramaDTO } from '@/dtos/saveCronogramaDTO'
import api from '@/lib/api'
import { queryClient } from '@/lib/queryClient'
import { useMutation } from '@tanstack/react-query'

async function saveCronograma(cronograma: saveCronogramaDTO) {
  const { data } = await api.post('/cronograma', cronograma)
  return data
}

export function useSaveCronograma() {
  return useMutation({
    mutationFn: saveCronograma,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cronograma'] })
    },
    onError: (error) => {
      console.error(error)
    },
  })
}
