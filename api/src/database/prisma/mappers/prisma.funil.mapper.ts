import { FunilProps } from '@domains/Funil';

export class PrismaFunilMapper {
  static toPrisma(funil: FunilProps) {
    return {
      id: funil.id,
      title: funil.title,
      value: funil.value,
      tipos: funil.tipos,
      faseTambem: funil.faseTambem,
    };
  }
}
