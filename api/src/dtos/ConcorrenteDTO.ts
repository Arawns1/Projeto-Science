import { IsArray, IsNotEmpty, IsString } from 'class-validator';

interface ArrayObject {
  value: string;
}
export class ConcorrenteDTO {
  @IsNotEmpty({ message: 'o campo [nome] não pode ser nulo' })
  @IsString()
  readonly nome: string;

  @IsNotEmpty({ message: 'o campo [redeSocial] não pode ser nulo' })
  @IsString()
  readonly redeSocial: string;

  @IsNotEmpty({ message: 'o campo [linkRedeSocial] não pode ser nulo' })
  @IsString()
  readonly linkRedeSocial: string;

  @IsNotEmpty({ message: 'o campo [descricao] não pode ser nulo' })
  @IsString()
  readonly descricao: string;

  @IsNotEmpty({ message: 'o campo [pontosFortes] não pode ser nulo' })
  @IsArray()
  readonly pontosFortes: ArrayObject[];

  @IsNotEmpty({ message: 'o campo [pontosFracos] não pode ser nulo' })
  @IsArray()
  readonly pontosFracos: ArrayObject[];

  @IsNotEmpty({ message: 'o campo [clientId] não pode ser nulo' })
  @IsString()
  readonly clientId: string;

  constructor(
    nome: string,
    redeSocial: string,
    linkRedeSocial: string,
    descricao: string,
    pontosFortes: ArrayObject[],
    pontosFracos: ArrayObject[],
    clientId: string,
  ) {
    this.nome = nome;
    this.pontosFortes = pontosFortes;
    this.pontosFracos = pontosFracos;
    this.redeSocial = redeSocial;
    this.linkRedeSocial = linkRedeSocial;
    this.descricao = descricao;
    this.clientId = clientId;
  }
}
