import { z } from 'zod'

export const CronogramaSchema = z.object({
  eventos: z.array(
    z.object({
      title: z.string(),
      value: z.string(),
      periodo: z.object({
        from: z.date(),
        to: z.date(),
      }),
      status: z.string(),
    })
  ),
})
export type CronogramaFormData = z.infer<typeof CronogramaSchema>
