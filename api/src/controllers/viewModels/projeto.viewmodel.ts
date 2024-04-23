import { Projeto } from '@domains/Projeto';

export class ProjetoViewModel {
  static toHTTP(projeto: Projeto) {
    return {
      projetoid: projeto.id,
      // conteudos: projeto.conteudos.map((conteudo) => ({
      //   id: conteudo.id,
      //   title: conteudo.title,
      //   value: conteudo.value,
      // })),
      // dna: {
      //   comunicacao: projeto.dna_comunicacao,
      //   estilo: projeto.dna_estilo,
      //   personalidade: projeto.dna_personalidade,
      //   valores: projeto.dna_valores,
      // },
      // funis: projeto.funis.map((funil) => ({
      //   id: funil.id,
      //   faseTambem: funil.faseTambem.map((fase) => ({
      //     value: fase,
      //   })),
      //   formatos: funil.formatos?.map((formato) => ({
      //     formato: formato.formato,
      //     titulo: formato.titulo,
      //   })),
      //   nome: {
      //     title: funil.title,
      //     value: funil.value,
      //   },
      //   tipos: funil.tipos.map((tipo) => ({
      //     value: tipo,
      //   })),
      // })),
      // linkPlanilhaPalavras: projeto.linkPlanilhaPalavras,
      // palavrasChave: projeto.palavrasChave.map((palavraChave) => ({
      //   value: palavraChave,
      // })),
      // personas: projeto.personas.map((persona) => ({
      //   id: persona.id,
      //   idade: persona.idade,
      //   nome: persona.nome,
      //   personaPhotoPath: persona.personaPhotoPath,
      //   profissao: persona.profissao,
      //   sobre: persona.sobre,
      // })),
      // propositos: projeto.propositos.map((proposito) => ({
      //   id: proposito.id,
      //   title: proposito.title,
      //   value: proposito.value,
      // })),
      // redesSociais: projeto.redesSociais.map((redeSocial) => ({
      //   id: redeSocial.id,
      //   frequencia: redeSocial.frequencia,
      //   nome: redeSocial.nome,
      //   objetivo: redeSocial.objetivo,
      //   estruturaLinguagem: redeSocial.estruturaLinguagem,
      // })),
      // genericFields: projeto.genericFields.map((field) => ({
      //   id: field.id,
      //   data: {
      //     content: field.data_file_path,
      //   },
      //   title: field.title,
      //   type: field.type,
      // })),
    };
  }
}
