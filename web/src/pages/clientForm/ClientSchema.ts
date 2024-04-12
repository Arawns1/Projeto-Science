import { z } from "zod"
import { apresentacaoSchema } from "./apresentacao/ApresentacaoSchema"
import { diagnosticoSchema } from "./diagnostico/DiagnosticoSchema"
import { projetoSchema } from "./projeto/ProjetoSchema"
import { IdentidadeVisualSchema } from "./identidadeVisual/IdentidadeVisualSchema"
import { CronogramaSchema } from "./cronograma/CronogramaSchema"

export const ClientSchema = z.object({
  apresentacao: apresentacaoSchema,
  diagnostico: diagnosticoSchema,
  projeto: projetoSchema,
  identidadeVisual: IdentidadeVisualSchema,
  cronograma: CronogramaSchema,
})

export type clientFormData = z.infer<typeof ClientSchema>
