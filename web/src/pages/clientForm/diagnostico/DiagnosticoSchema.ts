import { z } from 'zod'

export const diagnosticoSchema = z.object({
  diagnosticos: z.array(
    z.object({
      value: z.string(),
    })
  ),
  pontosFortes: z.array(
    z.object({
      value: z.string(),
    })
  ),
  pontosFracos: z.array(
    z.object({
      value: z.string(),
    })
  ),
  diferencial: z.string(),
  objetivos: z.array(
    z.object({
      value: z.string(),
    })
  ),
  concorrentes: z.array(
    z.object({
      nome: z.string(),
      redeSocial: z.string(),
      linkRedeSocial: z.string().optional(),
      descricao: z.string(),
      pontosFortes: z
        .array(
          z.object({
            value: z.string(),
          })
        )
        .optional(),
      pontosFracos: z
        .array(
          z.object({
            value: z.string(),
          })
        )
        .optional(),
    })
  ),
})

export type diagnosticoFormData = z.infer<typeof diagnosticoSchema>
