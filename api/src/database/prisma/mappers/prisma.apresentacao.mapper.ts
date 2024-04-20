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
    Logger.log(apresentacao);
    const teste = new Apresentacao({
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
    Logger.error(JSON.stringify(teste));
    return teste;
  }
}
