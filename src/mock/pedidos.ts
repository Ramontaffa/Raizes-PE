import { Pedido } from '../types';

export const pedidosMock: Pedido[] = [
  {
    id: 'ped-1001',
    itens: [
      { produtoId: 'prod-1', quantidade: 1, precoUnitario: 120.00 },
      { produtoId: 'prod-2', quantidade: 1, precoUnitario: 85.50 }
    ],
    status: 'novo',
    data: '2024-05-10T15:23:00Z',
    compradorNome: 'Ana Oliveira',
    artesaoId: 'art-1',
    total: 205.50
  },
  {
    id: 'ped-1002',
    itens: [
      { produtoId: 'prod-4', quantidade: 1, precoUnitario: 350.00 }
    ],
    status: 'enviado',
    data: '2024-05-08T09:40:00Z',
    compradorNome: 'Carlos Ferreira',
    artesaoId: 'art-2',
    total: 350.00
  },
  {
    id: 'ped-1003',
    itens: [
      { produtoId: 'prod-11', quantidade: 3, precoUnitario: 45.00 }
    ],
    status: 'entregue',
    data: '2024-04-25T11:15:00Z',
    compradorNome: 'Bruno Souza',
    artesaoId: 'art-5',
    total: 135.00
  }
];
