import { IsNotEmpty, IsObject, IsString } from 'class-validator';

interface Periodo {
  from: string;
  to: string;
}

export interface CronogramaDTOProps {
  periodo: Periodo;
  status: string;
  title: string;
  value: string;
}

export class CronogramaDTO {
  @IsNotEmpty({ message: 'o campo [status] não pode ser nulo' })
  @IsString()
  readonly status: string;

  @IsNotEmpty({ message: 'o campo [title] não pode ser nulo' })
  @IsString()
  readonly title: string;

  @IsNotEmpty({ message: 'o campo [value] não pode ser nulo' })
  @IsString()
  readonly value: string;

  @IsNotEmpty({ message: 'o campo [periodo] não pode ser nulo' })
  @IsObject()
  readonly periodo: Periodo;

  constructor(status: string, title: string, value: string, periodo: Periodo) {
    this.status = status;
    this.title = title;
    this.value = value;
    this.periodo = periodo;
  }
}
