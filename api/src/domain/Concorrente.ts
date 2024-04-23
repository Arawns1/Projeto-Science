import { randomUUID } from 'crypto';
import { Replace } from 'src/helpers/replace';

export interface ConcorrenteProps {
  id: string;
  nome: string;
  redeSocial: string;
  linkRedeSocial?: string | null;
  descricao: string;
  pontosFortes: string[];
  pontosFracos: string[];
  diagnosticoId: string;
  createdAt: Date;
  updatedAt: Date;
}

export class Concorrente {
  private props: ConcorrenteProps;
  private _id: string;

  constructor(
    props: Replace<
      ConcorrenteProps,
      { id?: string; createdAt?: Date; updatedAt?: Date }
    >,
  ) {
    this._id = randomUUID();
    this.props = {
      ...props,
      id: props.id ?? this._id,
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? new Date(),
    };
  }

  public get id() {
    return this._id;
  }

  public set nome(nome: string) {
    this.props.nome = nome;
  }
  public get nome(): string {
    return this.props.nome;
  }

  public set redeSocial(redeSocial: string) {
    this.props.redeSocial = redeSocial;
  }
  public get redeSocial(): string {
    return this.props.redeSocial;
  }

  public set linkRedeSocial(linkRedeSocial: string) {
    this.props.linkRedeSocial = linkRedeSocial;
  }
  public get linkRedeSocial(): string | null | undefined {
    return this.props.linkRedeSocial;
  }

  public set descricao(descricao: string) {
    this.props.descricao = descricao;
  }
  public get descricao(): string {
    return this.props.descricao;
  }

  public set pontosFortes(pontosFortes: string[]) {
    this.props.pontosFortes = pontosFortes;
  }
  public get pontosFortes(): string[] {
    return this.props.pontosFortes;
  }

  public set pontosFracos(pontosFracos: string[]) {
    this.props.pontosFracos = pontosFracos;
  }
  public get pontosFracos(): string[] {
    return this.props.pontosFracos;
  }

  public set diagnosticoId(diagnosticoId: string) {
    this.props.diagnosticoId = diagnosticoId;
  }
  public get diagnosticoId(): string {
    return this.props.diagnosticoId;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }

  public get updatedAt(): Date {
    return this.props.updatedAt;
  }
}
