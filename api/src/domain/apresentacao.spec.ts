import { Apresentacao } from './Apresentacao';

describe('apresentacao', () => {
  it('deve criar uma apresentacao', () => {
    const apresentacao = new Apresentacao({
      nome: 'Nome',
      contato: 'contato',
      email: 'email',
      userPhotoPath: '/path/to/photo',
      senha: 'senha',
      sobre: 'sobre',
      clientId: 'clientId',
    });

    expect(apresentacao).toBeTruthy();
  });
});
