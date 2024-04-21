import { Concorrente } from '@prisma/client';
import { randomUUID } from 'crypto';
import { Replace } from 'src/helpers/replace';

export interface DiagnosticoProps {
  id: string;
  diagnosticos: string[];
  pontosFortes: string[];
  pontosFracos: string[];
  diferencial: string;
  objetivos: string[];
  concorrentes?: Concorrente[] | null;
  clientId: string;
  createdAt: Date;
  updatedAt: Date;
}

export class Diagnostico {
  private props: DiagnosticoProps;
  private _id: string;

  constructor(
    props: Replace<
      DiagnosticoProps,
      { id?: string; createdAt?: Date; updatedAt?: Date }
    >,
  ) {
    this._id = randomUUID();
    this.props = {
      ...props,
      id: props.id ?? this._id,
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? new Date(),
    };
  }

  public get id() {
    return this.id;
  }

  public set diagnosticos(diagnosticos: string[]) {
    this.props.diagnosticos = diagnosticos;
  }
  public get diagnosticos(): string[] {
    return this.props.diagnosticos;
  }

  public set pontosFortes(pontosFortes: string[]) {
    this.props.pontosFortes = pontosFortes;
  }
  public get pontosFortes(): string[] {
    return this.props.pontosFortes;
  }

  public set pontosFracos(pontosFracos: string[]) {
    this.props.pontosFracos = pontosFracos;
  }
  public get pontosFracos(): string[] {
    return this.props.pontosFracos;
  }

  public set diferencial(diferencial: string) {
    this.props.diferencial = diferencial;
  }
  public get diferencial(): string {
    return this.props.diferencial;
  }

  public set concorrentes(concorrentes: Concorrente[]) {
    this.props.concorrentes = concorrentes;
  }
  public get concorrentes(): Concorrente[] | null | undefined {
    return this.props.concorrentes;
  }

  public set objetivos(objetivos: string[]) {
    this.props.objetivos = objetivos;
  }
  public get objetivos(): string[] {
    return this.props.objetivos;
  }

  public set clientId(clientId: string) {
    this.props.clientId = clientId;
  }
  public get clientId(): string {
    return this.props.clientId;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }

  public get updatedAt(): Date {
    return this.props.updatedAt;
  }
}
