import api from "@/lib/api"
import { queryClient } from "@/lib/queryClient"
import { useMutation } from "@tanstack/react-query"

async function saveIdentidadeVisualPhoto({
  clientId,
  formData,
}: {
  clientId: string
  formData: FormData
}) {
  const { data } = await api.post(
    `/images/identidadeVisual/upload?_clientId=${clientId}`,
    formData,
  )
  return data
}

export function useSaveIdentidadeVisualImage() {
  return useMutation({
    mutationFn: saveIdentidadeVisualPhoto,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["identidadeVisual"] })
    },
    onError: (error) => {
      console.error(error)
    },
  })
}
