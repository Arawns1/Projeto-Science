import { z } from 'zod'

export const loginSchema = z.object({
  username: z.string().email('Insira um usuário válido'),
  password: z.string().min(1, 'Insira uma senha válida'),
  rememberMe: z.boolean().default(false).optional(),
})

export type LoginSchemaType = z.infer<typeof loginSchema>
