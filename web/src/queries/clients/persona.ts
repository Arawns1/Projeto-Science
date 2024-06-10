import { savePersonaDTO } from "@/dtos/savePersonaDTO"
import api from "@/lib/api"
import { queryClient } from "@/lib/queryClient"
import { useMutation } from "@tanstack/react-query"

async function savePersona(persona: savePersonaDTO) {
  const { data } = await api.post("/persona", persona)
  return data
}
async function deletePersona(personaId: string) {
  const { data } = await api.delete(`/persona/${personaId}`)
  return data
}

async function savePersonaPhoto({
  personaId,
  formData,
}: {
  personaId: string
  formData: FormData
}) {
  const { data } = await api.post(
    `/images/persona/upload?_personaId=${personaId}`,
    formData,
  )
  return data
}

export function useSavePersona() {
  return useMutation({
    mutationFn: savePersona,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["persona"] })
    },
    onError: (error) => {
      console.error(error)
    },
  })
}

export function useSavePersonaImage() {
  return useMutation({
    mutationFn: savePersonaPhoto,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["persona"] })
    },
    onError: (error) => {
      console.error(error)
    },
  })
}

export function useDeletePersona() {
  return useMutation({
    mutationFn: deletePersona,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["persona"] })
    },
    onError: (error) => {
      console.error(error)
    },
  })
}
