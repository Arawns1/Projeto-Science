import { randomUUID } from 'crypto';
import { Replace } from 'src/helpers/replace';
import { Evento } from './Evento';

export interface CronogramaProps {
  id: string;
  eventos: Evento[];
  clientId: string;
  createdAt: Date;
  updatedAt: Date;
}

export class Cronograma {
  private props: CronogramaProps;
  private _id: string;

  constructor(
    props: Replace<
      CronogramaProps,
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
  public get eventos(): Evento[] {
    return this.props.eventos;
  }

  public set eventos(eventos: Evento[]) {
    this.props.eventos = eventos;
  }

  public get clientId(): string {
    return this.props.clientId;
  }

  public set clientId(clientId: string) {
    this.props.clientId = clientId;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }

  public get updatedAt(): Date {
    return this.props.updatedAt;
  }
}
