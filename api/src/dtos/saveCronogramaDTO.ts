import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { CronogramaDTO } from './CronogramaDTO';

export class saveCronogramaDTO {
  @IsNotEmpty({ message: 'o campo [eventos] não pode ser nulo' })
  @IsArray()
  readonly eventos: CronogramaDTO[];

  @IsNotEmpty({ message: 'o campo [clientId] não pode ser nulo' })
  @IsString()
  readonly clientId: string;

  constructor(eventos: CronogramaDTO[], clientId: string) {
    this.eventos = eventos;
    this.clientId = clientId;
  }
}
