export interface saveProjetoDTO {
  conteudos: Conteudo[]
  dna: Dna
  funis: Funil[]
  genericFields: GenericField[]
  linkPlanilhaPalavras: string
  palavrasChave: PalavrasChave[]
  personas: Persona[]
  propositos: Proposito[]
  redesSociais: RedesSociai[]
  clientId: string
}

export interface Conteudo {
  title: string
  value: string
}

export interface Dna {
  comunicacao: string
  estilo: string
  personalidade: string
  valores: string
}

export interface Funil {
  faseTambem: FaseTambem[]
  formatos: Formato[]
  nome: Nome
  tipos: Tipo[]
}

export interface FaseTambem {
  value: string
}

export interface Formato {
  formato: string
  titulo: string
}

export interface Nome {
  title: string
  value: string
}

export interface Tipo {
  value: string
}

export interface GenericField {
  data: Data
  title: string
  type: string
}

interface ArrayObject {
  title?: string
  value: string
}
export interface Data {
  content: ArrayObject[]
}

export interface PalavrasChave {
  value: string
}

export interface Persona {
  id: string
  idade: number
  nome: string
  profissao: string
  sobre: string
  userPhoto: string
}

export interface Proposito {
  title: string
  value: string
}

export interface RedesSociai {
  estruturaLinguagem: string
  frequencia: string
  nome: string
  objetivo: string
}
