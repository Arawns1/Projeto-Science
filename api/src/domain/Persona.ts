import { randomUUID } from 'crypto';
import { Replace } from 'src/helpers/replace';

export interface PersonaProps {
  id: string;
  nome: string;
  idade: number;
  profissao: string;
  sobre: string;
  personaPhotoPath?: string | null;
  projetoId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export class Persona {
  private props: PersonaProps;
  private _id: string;

  constructor(
    props: Replace<
      PersonaProps,
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
    return this._id;
  }

  public get nome(): string {
    return this.props.nome;
  }

  public set nome(nome: string) {
    this.props.nome = nome;
  }

  public get idade(): number {
    return this.props.idade;
  }

  public set idade(idade: number) {
    this.props.idade = idade;
  }

  public get profissao(): string {
    return this.props.profissao;
  }

  public set profissao(profissao: string) {
    this.props.profissao = profissao;
  }

  public get sobre(): string {
    return this.props.sobre;
  }

  public set sobre(sobre: string) {
    this.props.profissao = sobre;
  }

  public get personaPhotoPath(): string | null | undefined {
    return this.props.personaPhotoPath;
  }

  public set personaPhotoPath(personaPhotoPath: string | null | undefined) {
    this.props.personaPhotoPath = personaPhotoPath;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }

  public get updatedAt(): Date {
    return this.props.updatedAt;
  }
}
