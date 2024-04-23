import { IdentidadeVisualProps } from '@domains/IdentidadeVisual';

export class PrismaIdentidadeVisualMapper {
  static toPrisma(identidadeVisual: IdentidadeVisualProps) {
    return {
      id: identidadeVisual.id,
      identidadeVisualPhotoPath: identidadeVisual.identidadeVisualPhotoPath,
      clientId: identidadeVisual.clientId,
    };
  }
}
