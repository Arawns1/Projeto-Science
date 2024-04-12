import { z } from "zod"

const concorrenteSchema = z.object({
  nome: z.string().min(1, "O nome não pode estar vazio"),
  redeSocial: z.string().min(1, "A rede social não pode estar vazia"),
  linkRedeSocial: z.string().optional(),
  descricao: z.string().min(1, "A descrição não pode estar vazia"),
  pontosFortes: z
    .array(
      z.object({
        value: z.string().optional(),
      }),
    )
    .optional(),
  pontosFracos: z
    .array(
      z.object({
        value: z.string().optional(),
      }),
    )
    .optional(),
})

export const diagnosticoSchema = z.object({
  diagnosticos: z.array(
    z.object({
      value: z.string().min(1, "O diagnóstico não pode estar vazio"),
    }),
  ),
  pontosFortes: z
    .array(
      z.object({
        value: z.string().min(1, "Adicione pelo menos um ponto forte"),
      }),
    )
    .refine((data) => data[0].value.trim().length > 0, {
      message: "Adicione pelo menos um ponto forte",
    }),
  pontosFracos: z
    .array(
      z.object({
        value: z.string().min(1, "Adicione pelo menos um ponto fraco"),
      }),
    )
    .refine((data) => data[0].value.trim().length > 0, {
      message: "Adicione pelo menos um ponto fraco",
    }),
  diferencial: z.string().min(1, "O diferencial não pode estar vazio"),
  objetivos: z.array(
    z.object({
      value: z.string().min(1, "O objetivo não pode estar vazio"),
    }),
  ),
  concorrentes: z.array(concorrenteSchema),
})

export type diagnosticoFormData = z.infer<typeof diagnosticoSchema>
