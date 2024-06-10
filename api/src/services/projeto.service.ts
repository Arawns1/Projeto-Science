import { Field } from '@domains/Field';
import { Funil } from '@domains/Funil';
import { FunilFormato } from '@domains/FunilFormato';
import { Persona } from '@domains/Persona';
import { Proposito } from '@domains/Proposito';
import { RedeSocial } from '@domains/RedeSocial';
import { SetupDeConteudo } from '@domains/SetupDeConteudo';
import {
  ArrayObject,
  FunilType,
  GenericFields as GenericFieldsProps,
  Persona as PersonaProps,
  RedeSocial as RedeSocialProps,
  saveProjetoDTO,
} from '@dtos/saveProjeto.dto';
import { Injectable } from '@nestjs/common';
import { Projeto } from '../domain/Projeto';
import { ProjetoRepository } from '../repositories/projeto.repository';
import { FieldContent } from '@domains/FieldContentProps';

interface ProjetoListResponse {
  projeto: Projeto[];
}
interface ProjetoResponse {
  projeto: Projeto;
}

@Injectable()
export class ProjetoService {
  constructor(private projetoRepository: ProjetoRepository) {}

  async save(projetoDTO: saveProjetoDTO): Promise<ProjetoResponse> {
    const mappedProjeto: Projeto = this.fromSaveProjetoDTOtoProjeto(projetoDTO);
    const projeto = await this.projetoRepository.save(mappedProjeto);
    return { projeto };
  }

  async list(): Promise<ProjetoListResponse> {
    const projeto = await this.projetoRepository.list();

    return {
      projeto,
    };
  }

  async findProjetoByClientId(clientId: string) {
    const projeto = await this.projetoRepository.findByClientId(clientId);
    return { projeto };
  }

  private fromSaveProjetoDTOtoProjeto(projetoDTO: saveProjetoDTO): Projeto {
    return new Projeto({
      dna_comunicacao: projetoDTO.dna.comunicacao,
      dna_estilo: projetoDTO.dna.estilo,
      dna_personalidade: projetoDTO.dna.personalidade,
      dna_valores: projetoDTO.dna.valores,
      linkPlanilhaPalavras: projetoDTO.linkPlanilhaPalavras,
      clientId: projetoDTO.clientId,
      palavrasChave: projetoDTO.palavrasChave.map(
        (palavraChave) => palavraChave.value,
      ),
      propositos: projetoDTO.propositos.map((proposito) =>
        this.propositoFromProjetoDTO(proposito),
      ),
      conteudos: projetoDTO.conteudos.map((conteudo) =>
        this.conteudosFromProjetoDTO(conteudo),
      ),
      redesSociais: projetoDTO.redesSociais.map((redeSocial) =>
        this.redesSociaisFromProjetoDTO(redeSocial),
      ),
      personas: projetoDTO.personas.map((persona) =>
        this.personaFromProjetoDTO(persona),
      ),
      funis: projetoDTO.funis.map((funil) => this.funisFromProjetoDTO(funil)),
      genericFields: projetoDTO.genericFields.map((genericField) =>
        this.genericFieldFromProjetoDTO(genericField),
      ),
    });
  }

  private propositoFromProjetoDTO(propositoDTO: ArrayObject) {
    return new Proposito({
      title: propositoDTO.title || '',
      value: propositoDTO.value,
    });
  }

  private personaFromProjetoDTO(personaDTO: PersonaProps) {
    return new Persona({
      id: personaDTO.id,
      nome: personaDTO.nome,
      idade: personaDTO.idade,
      profissao: personaDTO.profissao,
      sobre: personaDTO.sobre,
      personaPhotoPath: 'personaPhotoPath',
    });
  }

  private conteudosFromProjetoDTO(conteudoDTO: ArrayObject) {
    return new SetupDeConteudo({
      title: conteudoDTO.title || '',
      value: conteudoDTO.value,
    });
  }
  private redesSociaisFromProjetoDTO(redeSocialDTO: RedeSocialProps) {
    return new RedeSocial({
      nome: redeSocialDTO.nome,
      objetivo: redeSocialDTO.objetivo,
      frequencia: redeSocialDTO.frequencia,
      estruturaLinguagem: redeSocialDTO.estruturaLinguagem,
    });
  }
  private funisFromProjetoDTO(funilDTO: FunilType) {
    const formatosMapped = funilDTO.formatos.map((formato) => {
      return new FunilFormato({
        formato: formato.formato,
        titulo: formato.titulo,
      });
    });

    return new Funil({
      title: funilDTO.nome.title || '',
      value: funilDTO.nome.value,
      formatos: formatosMapped,
      tipos: funilDTO.tipos.map((tipo) => tipo.value),
      faseTambem: funilDTO.faseTambem.map((fase) => fase.value),
    });
  }

  private genericFieldFromProjetoDTO(genericFieldDTO: GenericFieldsProps) {
    const fieldContentMapped = genericFieldDTO.data.content.map((content) => {
      return new FieldContent({
        title: content.title || null,
        value: content.value,
      });
    });

    return new Field({
      type: genericFieldDTO.type,
      title: genericFieldDTO.title,
      fieldContent: fieldContentMapped,
      data_file_path: 'data_file_path',
    });
  }
}
