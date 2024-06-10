import { IsNotEmpty, IsString, Length } from 'class-validator';

export class saveApresentacaoDTO {
  @IsNotEmpty({ message: 'o campo [name] não pode ser nulo' })
  @IsString()
  readonly nome: string;

  @IsNotEmpty({ message: 'o campo [contato] não pode ser nulo' })
  @IsString()
  readonly contato: string;

  @IsNotEmpty({ message: 'o campo [email] não pode ser nulo' })
  @IsString()
  readonly email: string;

  readonly userPhotoBinary?: string | null;

  @IsNotEmpty({ message: 'o campo [senha] não pode ser nulo' })
  @IsString()
  @Length(8, 240, { message: 'A senha deve ter entre 8 e 240 caracteres' })
  readonly senha: string;

  @IsString()
  readonly sobre?: string | null;

  constructor(
    nome: string,
    contato: string,
    email: string,
    senha: string,
    userPhotoBinary?: string | null,
    sobre?: string | null,
  ) {
    this.nome = nome;
    this.contato = contato;
    this.email = email;
    this.senha = senha;
    this.userPhotoBinary = userPhotoBinary;
    this.sobre = sobre;
  }
}
