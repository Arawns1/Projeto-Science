import { FieldProps } from '@domains/Field';

export class PrismaFieldMapper {
  static toPrisma(field: FieldProps) {
    return {
      id: field.id,
      type: field.type,
      title: field.title,
      data_file_path: field.data_file_path,
    };
  }
}
