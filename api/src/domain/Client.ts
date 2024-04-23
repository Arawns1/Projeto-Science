import { randomUUID } from 'crypto';
import { Replace } from 'src/helpers/replace';

export interface ClientProps {
  id: string;
  status?: 'ATIVO' | 'INATIVO' | 'RASCUNHO';
  createdAt: Date;
  updatedAt: Date;
}

export class Client {
  private props: ClientProps;
  private _id: string;

  constructor(
    props: Replace<
      ClientProps,
      { id?: string; createdAt?: Date; updatedAt?: Date }
    >,
  ) {
    this._id = randomUUID();
    this.props = {
      ...props,
      id: props.id ?? this._id,
      status: props.status ?? 'RASCUNHO',
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? new Date(),
    };
  }

  public get id() {
    return this._id;
  }

  public set status(status: 'ATIVO' | 'INATIVO' | 'RASCUNHO') {
    this.props.status = status;
  }

  public get status(): 'ATIVO' | 'INATIVO' | 'RASCUNHO' {
    return this.props.status ?? 'RASCUNHO';
  }

  public get createdAt() {
    return this.props.createdAt;
  }

  public get updatedAt() {
    return this.props.updatedAt;
  }
}
