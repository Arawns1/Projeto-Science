import { z } from 'zod'

const proposito = z.object({
  title: z.string(),
  value: z.string(),
})

export const personaSchema = z.object({
  userPhoto: z.instanceof(Blob).optional(),
  nome: z.string().min(1, 'Adicione um nome válido'),
  idade: z.coerce
    .number()
    .min(1, 'Adicione uma idade entre 1 e 100')
    .max(100, 'Adicione uma idade entre 1 e 100'),
  profissao: z.string().min(1, 'Adicione uma profisão válida'),
  sobre: z.string(),
})

const setupDeConteudo = z.object({
  title: z.string(),
  value: z.string(),
})

const objetivoRede = z.object({
  nome: z.string(),
  objetivo: z.string(),
  frequencia: z.string(),
  estruturaLinguagem: z.string(),
})

const funilFormato = z.object({
  formato: z.string(),
  titulo: z.string(),
})

const funil = z.object({
  nome: z.object({
    title: z.string(),
    value: z.string(),
  }),
  formatos: z.array(funilFormato),
  tipos: z.array(
    z.object({
      value: z.string(),
    }),
  ),
  faseTambem: z.array(
    z.object({
      value: z.string(),
    }),
  ),
})

const field = z.object({
  type: z.string().optional(),
  title: z.string().optional(),
  data: z
    .object({
      content: z
        .array(
          z.object({
            title: z.string().optional(),
            value: z.string().optional(),
          }),
        )
        .optional(),
    })
    .optional(),
})

export const projetoSchema = z.object({
  dna: z.object({
    estilo: z.string(),
    valores: z.string(),
    personalidade: z.string(),
    comunicacao: z.string(),
  }),
  propositos: z.array(proposito),
  personas: z.array(personaSchema),
  conteudos: z.array(setupDeConteudo),
  palavrasChave: z.array(z.object({ value: z.string() })),
  linkPlanilhaPalavras: z.string(),
  redesSociais: z.array(objetivoRede),
  funis: z.array(funil),
  genericFields: z.array(field).optional(),
})

export type projetoFormData = z.infer<typeof projetoSchema>
export type personaFormData = z.infer<typeof personaSchema>
export type fieldFormData = z.infer<typeof field>
