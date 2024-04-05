import { z } from 'zod'

export const CronogramaSchema = z.object({
  eventos: z.array(
    z.object({
      title: z.string(),
      value: z.string(),
      periodo: z.string(),
      status: z.string(),
    })
  ),
  dob: z.date({
    required_error: 'A date of birth is required.',
  }),
  date: z.object({
    from: z.date(),
    to: z.date(),
  }),
})
export type CronogramaFormData = z.infer<typeof CronogramaSchema>
