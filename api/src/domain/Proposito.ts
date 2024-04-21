import { randomUUID } from 'crypto';
import { Replace } from 'src/helpers/replace';

export interface PropositoProps {
  id: string;
  title: string;
  value: string;
  projetoId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export class Proposito {
  private props: PropositoProps;
  private _id: string;

  constructor(
    props: Replace<
      PropositoProps,
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

  public get createdAt(): Date {
    return this.props.createdAt;
  }

  public get updatedAt(): Date {
    return this.props.updatedAt;
  }
}
