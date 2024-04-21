export interface saveDiagnosticoDTO {
  value: string
  pontosFortes: string[]
  pontosFracos: string[]
  diferencial: string
  objetivos: string
  concorrentes: [
    {
      nome: string
      redeSocial: string
      linkRedeSocial: string
      descricao: string
      pontosFortes: string[]
      pontosFracos: string[]
    },
  ]
  clientId: string
}
