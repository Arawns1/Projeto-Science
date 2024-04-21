import { randomUUID } from 'crypto';
import { Replace } from 'src/helpers/replace';
import { PropositoProps } from './Proposito';
import { PersonaProps } from './Persona';
import { SetupDeConteudoProps } from './SetupDeConteudo';
import { RedeSocialProps } from './RedeSocial';
import { FunilProps } from './Funil';
import { FieldProps } from './Field';

export interface ProjetoProps {
  id: string;
  dna_estilo: string;
  dna_valores: string;
  dna_personalidade: string;
  dna_comunicacao: string;
  palavrasChave: string[];
  linkPlanilhaPalavras?: string | null;
  propositos: PropositoProps[];
  personas: PersonaProps[];
  conteudos: SetupDeConteudoProps[];
  redesSociais: RedeSocialProps[];
  funis: FunilProps[];
  genericFields: FieldProps[];
  clientId: string;
  createdAt: Date;
  updatedAt: Date;
}

export class Projeto {
  private props: ProjetoProps;
  private _id: string;

  constructor(
    props: Replace<
      ProjetoProps,
      { id?: string; createdAt?: Date; updatedAt?: Date }
    >,
  ) {
    this._id = props.id ?? randomUUID();
    this.props = {
      ...props,
      id: this._id,
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? new Date(),
    };
  }

  public get id(): string {
    return this.props.id;
  }

  public get dna_estilo(): string {
    return this.props.dna_estilo;
  }

  public get dna_valores(): string {
    return this.props.dna_valores;
  }

  public get dna_personalidade(): string {
    return this.props.dna_personalidade;
  }

  public get dna_comunicacao(): string {
    return this.props.dna_comunicacao;
  }

  public get palavrasChave(): string[] {
    return this.props.palavrasChave;
  }

  public get linkPlanilhaPalavras(): string | null | undefined {
    return this.props.linkPlanilhaPalavras;
  }

  public get propositos(): PropositoProps[] {
    return this.props.propositos;
  }

  public get personas(): PersonaProps[] {
    return this.props.personas;
  }

  public get conteudos(): SetupDeConteudoProps[] {
    return this.props.conteudos;
  }

  public get redesSociais(): RedeSocialProps[] {
    return this.props.redesSociais;
  }

  public get funis(): FunilProps[] {
    return this.props.funis;
  }

  public get genericFields(): FieldProps[] {
    return this.props.genericFields;
  }

  public set clientId(clientId: string) {
    this.props.clientId = clientId;
  }
  public get clientId(): string {
    return this.props.clientId;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }

  public get updatedAt(): Date {
    return this.props.updatedAt;
  }
}
