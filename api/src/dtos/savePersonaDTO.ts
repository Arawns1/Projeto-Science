import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export interface Persona {
  nome: string;
  idade: number;
  profissao: string;
  sobre: string;
}

export class savePersonaDTO {
  @IsNotEmpty({ message: 'o campo [nome] não pode ser nulo' })
  @IsString()
  readonly nome: string;

  @IsNotEmpty({ message: 'o campo [idade] não pode ser nulo' })
  @IsNumber()
  readonly idade: number;

  @IsNotEmpty({ message: 'o campo [profissao] não pode ser nulo' })
  @IsString()
  readonly profissao: string;

  @IsNotEmpty({ message: 'o campo [sobre] não pode ser nulo' })
  @IsString()
  readonly sobre: string;

  constructor(nome: string, idade: number, profissao: string, sobre: string) {
    this.nome = nome;
    this.idade = idade;
    this.profissao = profissao;
    this.sobre = sobre;
  }
}
