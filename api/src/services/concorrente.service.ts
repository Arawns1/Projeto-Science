import { Injectable } from '@nestjs/common';
import { ConcorrenteRepository } from '../repositories/concorrente.repository';
import { Concorrente } from '../domain/Concorrente';

interface ConcorrenteListResponse {
  concorrente: Concorrente[];
}

@Injectable()
export class ConcorrenteService {
  constructor(private concorrenteRepository: ConcorrenteRepository) {}

  async save(newConcorrente: Concorrente) {
    await this.concorrenteRepository.save(newConcorrente);
  }

  async list(): Promise<ConcorrenteListResponse> {
    const concorrente = await this.concorrenteRepository.list();

    return {
      concorrente,
    };
  }
  async findByDiagnosticoId(
    diagnosticoId: string,
  ): Promise<ConcorrenteListResponse> {
    const concorrente =
      await this.concorrenteRepository.findByDiagnosticoId(diagnosticoId);

    return {
      concorrente,
    };
  }
}
