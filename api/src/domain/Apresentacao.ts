import { BaseEntity, BaseEntityProps } from './BaseEntity';

export interface ApresentacaoProps extends BaseEntityProps {
  nome: string;
  contato: string;
  email: string;
  userPhotoPath?: string | null;
  senha: string;
  sobre?: string | null;
  clientId: string;
}

export class Apresentacao extends BaseEntity {
  private props: ApresentacaoProps;

  constructor(props: ApresentacaoProps) {
    super({ createdAt: props.createdAt, updatedAt: props.updatedAt });
    this.props = props;
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
}
