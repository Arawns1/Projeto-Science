import { randomUUID } from 'crypto';
import { Replace } from 'src/helpers/replace';
import { FunilFormatoProps } from './FunilFormato';

export interface FunilProps {
  id: string;
  title: string;
  value: string;
  formatos: FunilFormatoProps[];
  tipos: string[];
  faseTambem: string[];
  projetoId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export class Funil {
  private props: FunilProps;
  private _id: string;

  constructor(
    props: Replace<
      FunilProps,
      {
        id?: string;
        createdAt?: Date;
        updatedAt?: Date;
        formatos?: FunilFormatoProps[];
      }
    >,
  ) {
    this._id = props.id ?? randomUUID();
    this.props = {
      ...props,
      id: this._id,
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? new Date(),
      formatos: props.formatos ?? [],
    };
  }

  public get id(): string {
    return this.props.id;
  }

  public get title(): string {
    return this.props.title;
  }

  public set title(value: string) {
    this.props.title = value;
  }

  public get value(): string {
    return this.props.value;
  }

  public set value(value: string) {
    this.props.value = value;
  }

  public get formatos(): FunilFormatoProps[] {
    return this.props.formatos;
  }

  public set formatos(formatos: FunilFormatoProps[]) {
    this.props.formatos = formatos;
  }

  public get tipos(): string[] {
    return this.props.tipos;
  }

  public set tipos(tipos: string[]) {
    this.props.tipos = tipos;
  }

  public get faseTambem(): string[] {
    return this.props.faseTambem;
  }

  public set faseTambem(faseTambem: string[]) {
    this.props.faseTambem = faseTambem;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }

  public get updatedAt(): Date {
    return this.props.updatedAt;
  }
}
