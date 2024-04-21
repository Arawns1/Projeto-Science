import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { ConcorrenteDTO } from './ConcorrenteDTO';

interface ArrayObject {
  value: string;
}

export class saveDiagnosticoDTO {
  @IsNotEmpty({ message: 'o campo [diagnosticos] não pode ser nulo' })
  @IsArray()
  readonly diagnosticos: ArrayObject[];

  @IsNotEmpty({ message: 'o campo [pontosFortes] não pode ser nulo' })
  @IsArray()
  readonly pontosFortes: ArrayObject[];

  @IsNotEmpty({ message: 'o campo [pontosFracos] não pode ser nulo' })
  @IsArray()
  readonly pontosFracos: ArrayObject[];

  @IsNotEmpty({ message: 'o campo [diferencial] não pode ser nulo' })
  @IsString()
  readonly diferencial: string;

  @IsNotEmpty({ message: 'o campo [objetivos] não pode ser nulo' })
  @IsArray()
  readonly objetivos: ArrayObject[];

  @IsNotEmpty({ message: 'o campo [concorrentes] não pode ser nulo' })
  @IsArray()
  readonly concorrentes: ConcorrenteDTO[];

  @IsNotEmpty({ message: 'o campo [clientId] não pode ser nulo' })
  @IsString()
  readonly clientId: string;

  constructor(
    diagnosticos: ArrayObject[],
    pontosFortes: ArrayObject[],
    pontosFracos: ArrayObject[],
    diferencial: string,
    objetivos: ArrayObject[],
    concorrentes: ConcorrenteDTO[],
    clientId: string,
  ) {
    this.diagnosticos = diagnosticos;
    this.pontosFortes = pontosFortes;
    this.pontosFracos = pontosFracos;
    this.diferencial = diferencial;
    this.objetivos = objetivos;
    this.concorrentes = concorrentes;
    this.clientId = clientId;
  }
}
