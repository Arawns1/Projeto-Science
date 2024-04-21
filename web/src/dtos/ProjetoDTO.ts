export interface ProjetoDTO {
  id: string
  conteudos: Conteudo[]
  dna: Dna
  funis: Funi[]
  linkPlanilhaPalavras: string
  palavrasChave: PalavrasChave[]
  personas: Persona[]
  propositos: Proposito[]
  redesSociais: RedesSociai[]
  genericFields: GenericField[]
}

export interface Conteudo {
  id: string
  title: string
  value: string
}

export interface Dna {
  comunicacao: string
  estilo: string
  personalidade: string
  valores: string
}

export interface Funi {
  id: string
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

export interface PalavrasChave {
  value: string
}

export interface Persona {
  id: string
  idade: number
  nome: string
  personaPhotoPath: string
  profissao: string
  sobre: string
}

export interface Proposito {
  id: string
  title: string
  value: string
}

export interface RedesSociai {
  id: string
  frequencia: string
  nome: string
  objetivo: string
  estruturaLinguagem: string
}

export interface GenericField {
  id: string
  data: Data
  title: string
  type: string
}

export interface Data {
  content: string
}
