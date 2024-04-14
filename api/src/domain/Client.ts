import { BaseEntity, BaseEntityProps } from './BaseEntity';

export interface ClientProps extends BaseEntityProps {}

export class Client extends BaseEntity {
  constructor({ id, createdAt, updatedAt }: ClientProps) {
    super({ id: id, createdAt: createdAt, updatedAt: updatedAt });
  }
}
