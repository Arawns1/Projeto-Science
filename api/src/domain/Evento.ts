import { randomUUID } from 'crypto';
import { Replace } from 'src/helpers/replace';

export interface EventoProps {
  id: string;
  title: string;
  value: string;
  from: Date;
  to: Date;
  status: string;
  cronogramaId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export class Evento {
  private props: EventoProps;
  private _id: string;

  constructor(
    props: Replace<
      EventoProps,
      {
        id?: string;
        createdAt?: Date;
        updatedAt?: Date;
      }
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

  public get title(): string {
    return this.props.title;
  }

  public set title(title: string) {
    this.props.title = title;
  }

  public get value(): string {
    return this.props.value;
  }

  public set value(value: string) {
    this.props.value = value;
  }

  public get from(): Date {
    return this.props.from;
  }

  public set from(from: Date) {
    this.props.from = from;
  }

  public get to(): Date {
    return this.props.to;
  }

  public set to(to: Date) {
    this.props.to = to;
  }

  public get status(): string {
    return this.props.status;
  }

  public set status(status: string) {
    this.props.status = status;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }

  public get updatedAt(): Date {
    return this.props.updatedAt;
  }
}
