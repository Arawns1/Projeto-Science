import { Cronograma } from '@domains/Cronograma';
import { Evento } from '@domains/Evento';
import { saveCronogramaDTO } from '@dtos/saveCronogramaDTO';
import { Injectable } from '@nestjs/common';
import { CronogramaRepository } from '@repositories/cronograma.repository';
import { parse } from 'date-fns';

interface CronogramaListResponse {
  cronogramas: Cronograma[];
}

@Injectable()
export class CronogramaService {
  constructor(private cronogramaRepository: CronogramaRepository) {}

  async list(): Promise<CronogramaListResponse> {
    const cronogramas = await this.cronogramaRepository.list();

    return {
      cronogramas,
    };
  }

  async save(cronogramaDTO: saveCronogramaDTO) {
    const mappedCronograma: Cronograma =
      this.cronogramaFromProjetoDTO(cronogramaDTO);
    await this.cronogramaRepository.save(mappedCronograma);
  }

  cronogramaFromProjetoDTO(cronogramaDTO: saveCronogramaDTO): Cronograma {
    return new Cronograma({
      eventos: cronogramaDTO.eventos.map((evento) => {
        return new Evento({
          status: evento.status,
          from: parse(evento.periodo.from, 'dd/MM/yyyy', new Date()),
          to: parse(evento.periodo.to, 'dd/MM/yyyy', new Date()),
          title: evento.title,
          value: evento.value,
        });
      }),
      clientId: cronogramaDTO.clientId,
    });
  }
}
