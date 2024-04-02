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

export const projetoSchema = z.object({
  dna: z.object({
    estilo: z.string(),
    valores: z.string(),
    personalidade: z.string(),
    comunicação: z.string(),
  }),
  propositos: z.array(proposito),
  personas: z.array(personaSchema),
  conteudos: z.array(setupDeConteudo),
  palavrasChave: z.array(z.object({ value: z.string() })),
  linkPlanilhaPalavras: z.string(),
  redesSociais: z.array(objetivoRede),
})

export type projetoFormData = z.infer<typeof projetoSchema>
export type personaFormData = z.infer<typeof personaSchema>
