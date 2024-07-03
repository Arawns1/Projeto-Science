export class viewApresentacaoDTO {
  readonly id: string;
  readonly nome: string;
  readonly contato: string;
  readonly email: string;
  readonly userPhotoURL?: string | null;
  readonly sobre?: string | null;

  constructor(id: string, nome: string, contato: string, email: string, userPhotoURL?: string | null, sobre?: string | null) {
    this.id = id;
    this.nome = nome;
    this.contato = contato;
    this.email = email;
    this.sobre = sobre;
    this.userPhotoURL = userPhotoURL;
  }
}
