import { Concorrente } from '@domains/Concorrente';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class saveDiagnosticoDTO {
  @IsNotEmpty({ message: 'o campo [value] não pode ser nulo' })
  @IsString()
  readonly value: string;

  @IsNotEmpty({ message: 'o campo [pontosFortes] não pode ser nulo' })
  @IsArray()
  readonly pontosFortes: string[];

  @IsNotEmpty({ message: 'o campo [pontosFracos] não pode ser nulo' })
  @IsArray()
  readonly pontosFracos: string[];

  @IsNotEmpty({ message: 'o campo [diferencial] não pode ser nulo' })
  @IsString()
  readonly diferencial: string;

  @IsNotEmpty({ message: 'o campo [objetivos] não pode ser nulo' })
  @IsArray()
  readonly objetivos: string[];

  @IsNotEmpty({ message: 'o campo [concorrentes] não pode ser nulo' })
  @IsArray()
  readonly concorrentes: Concorrente[];

  @IsNotEmpty({ message: 'o campo [clientId] não pode ser nulo' })
  @IsString()
  readonly clientId: string;

  constructor(
    value: string,
    pontosFortes: string[],
    pontosFracos: string[],
    diferencial: string,
    objetivos: string[],
    concorrentes: Concorrente[],
    clientId: string,
  ) {
    this.value = value;
    this.pontosFortes = pontosFortes;
    this.pontosFracos = pontosFracos;
    this.diferencial = diferencial;
    this.objetivos = objetivos;
    this.concorrentes = concorrentes;
    this.clientId = clientId;
  }
}
