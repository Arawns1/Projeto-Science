import { z } from "zod"

const proposito = z.object({
  title: z.string().min(1),
  value: z.string().min(1, "O propósito não pode estar vazio"),
})

export const personaSchema = z.object({
  userPhoto: z.instanceof(Blob).optional(),
  nome: z.string().min(1, "Adicione um nome válido"),
  idade: z.coerce
    .number()
    .min(1, "Adicione uma idade entre 1 e 100")
    .max(100, "Adicione uma idade entre 1 e 100"),
  profissao: z.string().min(1, "Adicione uma profisão válida"),
  sobre: z.string(),
})

const setupDeConteudo = z.object({
  title: z.string().min(1),
  value: z.string().min(1, "O setup de conteúdo não pode estar vazio"),
})

const objetivoRede = z.object({
  nome: z.string().min(1, "Adicione o nome da rede social"),
  objetivo: z.string().min(1, "Adicione o objetivo da rede social"),
  frequencia: z.string().min(1, "Adicione a frequência da rede social"),
  estruturaLinguagem: z
    .string()
    .min(1, "Adicione a estrutura de linguagem da rede social"),
})

const funilFormato = z.object({
  formato: z.string().min(1, "Selecione um formato"),
  titulo: z.string().min(1, "Adicione o título do formato"),
})

const funil = z.object({
  nome: z.object({
    title: z.string().min(1),
    value: z.string().min(1, "Adicione o nome e a descrição do funil"),
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
      file: z.instanceof(File).optional(),
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
    estilo: z.string().min(1, "Adicione o estilo do cliente"),
    valores: z.string().min(1, "Adicione os valores do cliente"),
    personalidade: z.string().min(1, "Adicione a personalidade do cliente"),
    comunicação: z.string().min(1, "Adicione a comunicação do cliente"),
  }),
  propositos: z.array(proposito),
  personas: z.array(personaSchema),
  conteudos: z.array(setupDeConteudo),
  palavrasChave: z
    .array(z.object({ value: z.string() }))
    .min(1, "Adicione pelo menos uma palavra chave"),
  linkPlanilhaPalavras: z.string().optional(),
  redesSociais: z.array(objetivoRede),
  funis: z.array(funil),
  genericFields: z.array(field).optional(),
})

export type projetoFormData = z.infer<typeof projetoSchema>
export type personaFormData = z.infer<typeof personaSchema>
export type fieldFormData = z.infer<typeof field>
