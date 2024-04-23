import { randomUUID } from 'crypto';
import { Replace } from 'src/helpers/replace';

export interface ApresentacaoProps {
  id: string;
  nome: string;
  contato: string;
  email: string;
  userPhotoPath?: string | null;
  senha: string;
  sobre?: string | null;
  clientId: string;
  createdAt: Date;
  updatedAt: Date;
}

export class Apresentacao {
  private props: ApresentacaoProps;
  private _id: string;

  constructor(
    props: Replace<
      ApresentacaoProps,
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

  public set contato(contato: string) {
    this.props.contato = contato;
  }
  public get contato(): string {
    return this.props.contato;
  }

  public set email(email: string) {
    this.props.email = email;
  }
  public get email(): string {
    return this.props.email;
  }
  public set userPhotoPath(userPhotoPath: string | null | undefined) {
    this.props.userPhotoPath = userPhotoPath;
  }
  public get userPhotoPath(): string | null | undefined {
    return this.props.userPhotoPath;
  }
  public set senha(senha: string) {
    this.props.senha = senha;
  }
  public get senha(): string {
    return this.props.senha;
  }
  public set sobre(sobre: string | null | undefined) {
    this.props.sobre = sobre;
  }
  public get sobre(): string | null | undefined {
    return this.props.sobre;
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
