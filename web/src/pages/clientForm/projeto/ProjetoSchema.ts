import { z } from 'zod'

const proposito = z.object({
  title: z.string(),
  value: z.string(),
})

const persona = z.object({
  image: z.instanceof(FileList),
  nome: z.string(),
  idade: z.number(),
  profissao: z.string(),
  sobre: z.string(),
})

const setupDeConteudo = z.object({
  title: z.string(),
  value: z.string(),
})

const objetivoRede = z.object({
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
  personas: z.array(persona),
  conteudos: z.array(setupDeConteudo),
  palavrasChave: z.array(z.object({ value: z.string() })),
  linkPlanilhaPalavras: z.string(),
  objetivosRedesSociais: z.array(objetivoRede),
})

export type projetoFormData = z.infer<typeof projetoSchema>
