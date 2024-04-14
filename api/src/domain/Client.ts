import { BaseEntity, BaseEntityProps } from './BaseEntity';

export interface ClientProps extends BaseEntityProps {
  status?: 'ATIVO' | 'INATIVO' | 'RASCUNHO';
}

export class Client extends BaseEntity {
  private _status: 'ATIVO' | 'INATIVO' | 'RASCUNHO';

  constructor({ id, createdAt, updatedAt, status }: ClientProps) {
    super({ id, createdAt, updatedAt });
    this._status = status ?? 'RASCUNHO';
  }

  public set status(status: 'ATIVO' | 'INATIVO' | 'RASCUNHO') {
    this._status = status;
  }

  public get status(): 'ATIVO' | 'INATIVO' | 'RASCUNHO' {
    return this._status;
  }
}
