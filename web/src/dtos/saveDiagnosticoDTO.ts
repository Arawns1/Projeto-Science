interface ArrayObject {
  value: string
}

export interface saveDiagnosticoDTO {
  diagnosticos: ArrayObject[]
  pontosFortes: ArrayObject[]
  pontosFracos: ArrayObject[]
  diferencial: string
  objetivos: ArrayObject[]
  concorrentes: [
    {
      nome: string
      redeSocial: string
      linkRedeSocial: string
      descricao: string
      pontosFortes: ArrayObject[]
      pontosFracos: ArrayObject[]
    },
  ]
  clientId: string
}
