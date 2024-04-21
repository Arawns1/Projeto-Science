import { randomUUID } from 'crypto';
import { Replace } from 'src/helpers/replace';

export interface FieldContentProps {
  id: string;
  title: string | null;
  value: string | null;
  fieldId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export class FieldContent {
  private props: FieldContentProps;
  private _id: string;

  constructor(
    props: Replace<
      FieldContentProps,
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

  public set title(title: string | null) {
    this.props.title = title;
  }
  public get title(): string | null | undefined {
    return this.props.title;
  }

  public set value(value: string | null) {
    this.props.value = value;
  }
  public get value(): string | null | undefined {
    return this.props.value;
  }

  public set fieldId(fieldId: string) {
    this.props.fieldId = fieldId;
  }
  public get fieldId(): string | undefined {
    return this.props.fieldId;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }

  public get updatedAt(): Date {
    return this.props.updatedAt;
  }
}
