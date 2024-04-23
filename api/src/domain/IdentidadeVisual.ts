import { randomUUID } from 'crypto';
import { Replace } from 'src/helpers/replace';

export interface IdentidadeVisualProps {
  id: string;
  identidadeVisualPhotoPath: string;
  clientId: string;
  createdAt: Date;
  updatedAt: Date;
}

export class IdentidadeVisual {
  private props: IdentidadeVisualProps;
  private _id: string;

  constructor(
    props: Replace<
      IdentidadeVisualProps,
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

  public get identidadeVisualPhotoPath(): string {
    return this.props.identidadeVisualPhotoPath;
  }

  public set identidadeVisualPhotoPath(identidadeVisualPhotoPath: string) {
    this.props.identidadeVisualPhotoPath = identidadeVisualPhotoPath;
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
