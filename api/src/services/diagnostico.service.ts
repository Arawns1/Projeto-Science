import { Injectable } from '@nestjs/common';
import { DiagnosticoRepository } from '../repositories/diagnostico.repository';
import { Diagnostico } from '../domain/Diagnostico';
import { saveDiagnosticoDTO } from '@dtos/saveDiagnostico.dto';
import { Concorrente } from '@domains/Concorrente';
import { ConcorrenteRepository } from '@repositories/concorrente.repository';

interface DiagnosticoListResponse {
  diagnostico: Diagnostico[];
}
interface DiagnosticoResponse {
  diagnostico: Diagnostico;
}

@Injectable()
export class DiagnosticoService {
  constructor(
    private diagnosticoRepository: DiagnosticoRepository,
    private concorrenteRepository: ConcorrenteRepository,
  ) {}

  async save(diagnosticoDTO: saveDiagnosticoDTO): Promise<DiagnosticoResponse> {
    const mappedDiagnostico: Diagnostico =
      this.fromSaveDiagnosticoDTOtoDiagnostico(diagnosticoDTO);
    const diagnostico =
      await this.diagnosticoRepository.save(mappedDiagnostico);

    const mappedConcorrentes: Concorrente[] = diagnosticoDTO.concorrentes.map(
      (concorrente) => {
        return new Concorrente({
          nome: concorrente.nome,
          redeSocial: concorrente.redeSocial,
          linkRedeSocial: concorrente.linkRedeSocial || null,
          descricao: concorrente.descricao,
          pontosFortes: concorrente.pontosFortes.map(
            (pontoForte) => pontoForte.value,
          ),
          pontosFracos: concorrente.pontosFracos.map(
            (pontoForte) => pontoForte.value,
          ),
          diagnosticoId: diagnostico.id,
        });
      },
    );

    await this.concorrenteRepository.saveAll(mappedConcorrentes);

    return { diagnostico };
  }

  async list(): Promise<DiagnosticoListResponse> {
    const diagnostico = await this.diagnosticoRepository.list();

    return {
      diagnostico,
    };
  }

  async findDiagnosticoByClientId(clientId: string) {
    const diagnostico =
      await this.diagnosticoRepository.findDiagnosticoByClientId(clientId);

    return { diagnostico };
  }

  private fromSaveDiagnosticoDTOtoDiagnostico(
    dianosticoDTO: saveDiagnosticoDTO,
  ): Diagnostico {
    return new Diagnostico({
      diagnosticos: dianosticoDTO.diagnosticos.map(
        (diagnostico) => diagnostico.value,
      ),
      pontosFortes: dianosticoDTO.pontosFortes.map(
        (pontoForte) => pontoForte.value,
      ),
      pontosFracos: dianosticoDTO.pontosFracos.map(
        (pontoForte) => pontoForte.value,
      ),
      diferencial: dianosticoDTO.diferencial,
      objetivos: dianosticoDTO.objetivos.map((objetivo) => objetivo.value),
      clientId: dianosticoDTO.clientId,
    });
  }
}
