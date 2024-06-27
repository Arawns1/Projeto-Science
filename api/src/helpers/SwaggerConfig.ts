import { DocumentBuilder } from '@nestjs/swagger';
export const SwaggerConfig = new DocumentBuilder()
  .setTitle('Projeto Science API')
  .setDescription('Api desenvolvida para o projeto Science')
  .setContact('Gabriel Damico', 'https://github.com/Arawns1', 'gabrieldamico22@gmail.com')
  .setVersion('1.0')
  .addTag('apresentacao')
  .addTag('cliente')
  .addTag('cronograma')
  .addTag('diagnostico')
  .addTag('imagens')
  .addTag('persona')
  .addTag('projeto')
  .build();
