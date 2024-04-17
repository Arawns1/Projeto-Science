import { Logger } from '@nestjs/common';
import { Apresentacao } from 'src/domain/Apresentacao';
export class PrismaApresentacaoMapper {
  static toPrisma(apresentacao: Apresentacao) {
    return {
      id: apresentacao.id,
      nome: apresentacao.nome,
      contato: apresentacao.contato,
      email: apresentacao.email,
      senha: apresentacao.senha,
      sobre: apresentacao.sobre,
      userPhotoPath: apresentacao.userPhotoPath,
      clientId: apresentacao.clientId,
    };
  }
  static fromPrisma(apresentacao: any): Apresentacao {
    return new Apresentacao({
      id: apresentacao.id,
      nome: apresentacao.nome,
      contato: apresentacao.contato,
      email: apresentacao.email,
      senha: apresentacao.senha,
      sobre: apresentacao.sobre,
      userPhotoPath: apresentacao.userPhotoPath,
      clientId: apresentacao.clientId,
      updatedAt: apresentacao.updatedAt,
    });
  }
}
