import { randomUUID } from 'crypto';
import { Replace } from 'src/helpers/replace';

export interface RedeSocialProps {
  id: string;
  nome: string;
  objetivo: string;
  frequencia: string;
  estruturaLinguagem: string;
  projetoId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export class RedeSocial {
  private props: RedeSocialProps;
  private _id: string;

  constructor(
    props: Replace<
      RedeSocialProps,
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

  public get nome(): string {
    return this.props.nome;
  }

  public set nome(nome: string) {
    this.props.nome = nome;
  }

  public get objetivo(): string {
    return this.props.objetivo;
  }

  public set objetivo(objetivo: string) {
    this.props.objetivo = objetivo;
  }

  public get frequencia(): string {
    return this.props.frequencia;
  }

  public set frequencia(frequencia: string) {
    this.props.frequencia = frequencia;
  }

  public get estruturaLinguagem(): string {
    return this.props.estruturaLinguagem;
  }

  public set estruturaLinguagem(estruturaLinguagem: string) {
    this.props.estruturaLinguagem = estruturaLinguagem;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }

  public get updatedAt(): Date {
    return this.props.updatedAt;
  }
}
