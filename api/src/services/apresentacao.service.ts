import { Injectable, Body } from '@nestjs/common';
import { ApresentacaoRepository } from '../repositories/apresentacao.repository';
import { Apresentacao } from '../domain/Apresentacao';
import { saveApresentacaoDTO } from '@dtos/saveApresentacao.dto';
import { Client } from '@domains/Client';
import { ClientRepository } from '@repositories/client.repository';
import { genBCryptPassword } from 'src/helpers/genBCryptPassword';
import { PaginatedResponseApresentacaoDTO } from '@dtos/paginatedResponseApresentacao.dto';
import { viewApresentacaoDTO } from '@dtos/viewApresentacao.dto';
import { updateApresentacaoDTO } from '@dtos/updateApresentacao.dto';

//TODO: Implementar a lógica de salvar caminho da imagem

interface ApresentacaoResponse {
  apresentacao: Apresentacao;
}

interface ApresentacaoListResponse {
  apresentacao: Apresentacao[];
}
interface ApresentacaoPaginatedRequest {
  page: string;
  perPage: string;
}
interface ApresentacaoPaginatedResponse {
  apresentacao: PaginatedResponseApresentacaoDTO[];
  clientsCount?: number;
}

@Injectable()
export class ApresentacaoService {
  constructor(
    private apresentacaoRepository: ApresentacaoRepository,
    private clientRepository: ClientRepository,
  ) {}

  async save(apresentacaoDTO: saveApresentacaoDTO): Promise<ApresentacaoResponse> {
    const client = new Client({});

    await this.clientRepository.save(client);

    const apresentacao = new Apresentacao({
      nome: apresentacaoDTO.nome,
      contato: apresentacaoDTO.contato,
      email: apresentacaoDTO.email,
      userPhotoPath: apresentacaoDTO.userPhotoBinary || null,
      senha: genBCryptPassword(apresentacaoDTO.senha),
      sobre: apresentacaoDTO.sobre,
      clientId: client.id,
    });

    //Persistir no banco de dados
    await this.apresentacaoRepository.save(apresentacao);

    return {
      apresentacao,
    };
  }

  async list(): Promise<ApresentacaoListResponse> {
    const apresentacao = await this.apresentacaoRepository.list();

    return {
      apresentacao,
    };
  }

  async paginatedList({ page, perPage }: ApresentacaoPaginatedRequest): Promise<ApresentacaoPaginatedResponse> {
    const raw_apresentacao = await this.apresentacaoRepository.paginatedList(parseInt(page), parseInt(perPage));
    const apresentacao = raw_apresentacao.map(apresentacao => new PaginatedResponseApresentacaoDTO(apresentacao));

    const clientsCount = await this.clientRepository.count();
    return { apresentacao, clientsCount };
  }

  async searchByName(name: string): Promise<ApresentacaoPaginatedResponse> {
    const raw_apresentacao = await this.apresentacaoRepository.searchByName(name);

    const apresentacao = raw_apresentacao.map(apresentacao => new PaginatedResponseApresentacaoDTO(apresentacao));

    return {
      apresentacao,
    };
  }

  async findByClientId(clientId: string): Promise<viewApresentacaoDTO> {
    const { id, nome, contato, email, userPhotoPath, sobre } = await this.apresentacaoRepository.findByClientId(clientId);

    return new viewApresentacaoDTO(id, nome, contato, email, userPhotoPath, sobre);
  }

  async update(id: string, body: updateApresentacaoDTO): Promise<viewApresentacaoDTO> {
    const apresentacao = await this.apresentacaoRepository.findById(id);
    const toUpdate = Object.assign(apresentacao, body);
    this.apresentacaoRepository.update(toUpdate);

    return this.toViewApresentacaoDTO(toUpdate);
  }

  toViewApresentacaoDTO(apresentacao: Apresentacao): viewApresentacaoDTO {
    return new viewApresentacaoDTO(apresentacao.id, apresentacao.nome, apresentacao.contato, apresentacao.email, apresentacao.userPhotoPath, apresentacao.sobre);
  }
}

// private buildUserRO(user: UserEntity) {
//     const userRO = {
//       id: user.id,
//       username: user.username,
//       email: user.email,
//       bio: user.bio,
//       token: this.generateJWT(user),
//       image: user.image
//     };

//     return {user: userRO};
//   }
// async findById(id: number): Promise<UserRO>{
//   const user = await this.userRepository.findOne(id);

//   if (!user) {
//     const errors = {User: ' not found'};
//     throw new HttpException({errors}, 401);
//   }

//   return this.buildUserRO(user);
// }
