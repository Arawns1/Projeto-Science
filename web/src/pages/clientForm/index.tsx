import ApresentacaoPage from "./apresentacao/Index"
import UpdateApresentacaoPage from "./apresentacao/update"
import CronogramaPage from "./cronograma/Index"
import DiagnosticoPage from "./diagnostico/Index"
import IdentidadeVisualPage from "./identidadeVisual"
import ProjetoPage from "./projeto"

export const ClientForm = {
  Apresentacao: ApresentacaoPage,
  Diagnostico: DiagnosticoPage,
  Projeto: ProjetoPage,
  IdentidadeVisual: IdentidadeVisualPage,
  Cronograma: CronogramaPage,
}

export const ClientFormUpdate = {
  Apresentacao: UpdateApresentacaoPage,
}
