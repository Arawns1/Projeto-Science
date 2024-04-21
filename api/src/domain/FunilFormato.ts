import { randomUUID } from 'crypto';
import { Replace } from 'src/helpers/replace';

export interface FunilFormatoProps {
  id: string;
  formato: string;
  titulo: string;
  funilId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export class FunilFormato {
  private props: FunilFormatoProps;
  private _id: string;

  constructor(
    props: Replace<
      FunilFormatoProps,
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

  public get formato(): string {
    return this.props.formato;
  }

  public set formato(formato: string) {
    this.props.formato = formato;
  }

  public get titulo(): string {
    return this.props.titulo;
  }

  public set titulo(titulo: string) {
    this.props.titulo = titulo;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }

  public get updatedAt(): Date {
    return this.props.updatedAt;
  }
}
