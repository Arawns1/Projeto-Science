import { IsArray, IsNotEmpty, IsObject, IsString } from 'class-validator';

export interface ArrayObject {
  value: string;
  title?: string;
}

export interface DnaObject {
  comunicacao: string;
  estilo: string;
  personalidade: string;
  valores: string;
}

export interface FunilType {
  faseTambem: ArrayObject[];
  formatos: FormatoType[];
  nome: ArrayObject;
  tipos: ArrayObject[];
}

export interface FormatoType {
  formato: string;
  titulo: string;
}

export interface GenericFields {
  type: string;
  title: string;
  data: {
    content: ArrayObject[];
  };
}

export interface Persona {
  userPhoto: string;
  nome: string;
  idade: number;
  profissao: string;
  sobre: string;
}

export interface RedeSocial {
  estruturaLinguagem: string;
  frequencia: string;
  nome: string;
  objetivo: string;
}

export class saveProjetoDTO {
  @IsNotEmpty({ message: 'o campo [conteudos] não pode ser nulo' })
  @IsArray()
  readonly conteudos: ArrayObject[];

  @IsNotEmpty({ message: 'o campo [dna] não pode ser nulo' })
  @IsObject()
  readonly dna: DnaObject;

  @IsNotEmpty({ message: 'o campo [funis] não pode ser nulo' })
  @IsArray()
  readonly funis: FunilType[];

  @IsNotEmpty({ message: 'o campo [genericFields] não pode ser nulo' })
  @IsArray()
  readonly genericFields: GenericFields[];

  @IsString()
  readonly linkPlanilhaPalavras: string | null;

  @IsNotEmpty({ message: 'o campo [palavrasChave] não pode ser nulo' })
  @IsArray()
  readonly palavrasChave: ArrayObject[];

  @IsNotEmpty({ message: 'o campo [personas] não pode ser nulo' })
  @IsArray()
  readonly personas: Persona[];

  @IsNotEmpty({ message: 'o campo [propositos] não pode ser nulo' })
  @IsArray()
  readonly propositos: ArrayObject[];

  @IsNotEmpty({ message: 'o campo [redesSociais] não pode ser nulo' })
  @IsArray()
  readonly redesSociais: RedeSocial[];

  @IsNotEmpty({ message: 'o campo [clientId] não pode ser nulo' })
  @IsString()
  readonly clientId: string;

  constructor(
    conteudos: ArrayObject[],
    dna: DnaObject,
    funis: FunilType[],
    genericFields: GenericFields[],
    linkPlanilhaPalavras: string | null,
    palavrasChave: ArrayObject[],
    personas: Persona[],
    propositos: ArrayObject[],
    redesSociais: RedeSocial[],
    clientId: string,
  ) {
    this.conteudos = conteudos;
    this.dna = dna;
    this.funis = funis;
    this.genericFields = genericFields;
    this.linkPlanilhaPalavras = linkPlanilhaPalavras;
    this.palavrasChave = palavrasChave;
    this.personas = personas;
    this.propositos = propositos;
    this.redesSociais = redesSociais;
    this.clientId = clientId;
  }
}
