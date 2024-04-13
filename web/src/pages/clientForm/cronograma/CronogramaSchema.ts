import { z } from "zod"

export const CronogramaSchema = z.object({
  eventos: z.array(
    z.object({
      title: z.string().min(1),
      value: z.string().min(1, "Adicione o nome e a descrição do evento"),
      periodo: z.object({
        from: z.date(),
        to: z.date(),
      }),
      status: z.string().min(1, "Selecione um status"),
    }),
  ),
})
export type CronogramaFormData = z.infer<typeof CronogramaSchema>
