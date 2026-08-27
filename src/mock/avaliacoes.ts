import { Avaliacao } from '../types';

export const avaliacoesMock: Avaliacao[] = [
  {
    id: 'av-1',
    produtoId: 'prod-1',
    autor: 'Mariana S.',
    nota: 5,
    comentario: 'Simplesmente perfeito! As peças têm um acabamento rústico maravilhoso, chegaram super bem embaladas.',
    data: '2023-10-15T10:30:00Z'
  },
  {
    id: 'av-2',
    produtoId: 'prod-1',
    autor: 'João P.',
    nota: 4,
    comentario: 'Muito bonito, apenas demorou um pouco na entrega, mas valeu a pena a espera.',
    data: '2023-11-02T14:20:00Z'
  },
  {
    id: 'av-3',
    produtoId: 'prod-4',
    autor: 'Clara M.',
    nota: 5,
    comentario: 'Trabalho primoroso da Dona Maria. Vai enfeitar minha mesa de Natal. Lindo demais.',
    data: '2023-12-05T09:15:00Z'
  }
];
