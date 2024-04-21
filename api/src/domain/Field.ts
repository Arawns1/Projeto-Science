import { randomUUID } from 'crypto';
import { Replace } from 'src/helpers/replace';
import { FieldContentProps } from './FieldContentProps';

export interface FieldProps {
  id: string;
  type?: string | null;
  title?: string | null;
  data_file_path?: string | null;
  FieldContent?: FieldContentProps[];
  projetoId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export class Field {
  private props: FieldProps;
  private _id: string;

  constructor(
    props: Replace<
      FieldProps,
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

  public set type(type: string | null | undefined) {
    this.props.type = type;
  }
  public get type(): string | null | undefined {
    return this.props.type;
  }

  public set title(title: string | null) {
    this.props.title = title;
  }
  public get title(): string | null | undefined {
    return this.props.title;
  }

  public set data_file_path(data_file_path: string | null) {
    this.props.data_file_path = data_file_path;
  }
  public get data_file_path(): string | null | undefined {
    return this.props.data_file_path;
  }

  public set projetoId(projetoId: string) {
    this.props.projetoId = projetoId;
  }
  public get projetoId(): string | undefined {
    return this.props.projetoId;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }

  public get updatedAt(): Date {
    return this.props.updatedAt;
  }
}
