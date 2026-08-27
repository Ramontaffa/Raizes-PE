export interface Categoria {
  id: string;
  slug: string;
  nome: string;
  icone?: string; // Optional icon name
}

export interface Artesao {
  id: string;
  slug: string;
  nome: string;
  foto: string;
  regiao: string;
  municipio: string;
  bio: string;
  tecnicas: string[];
  produtosIds: string[];
}

export interface Produto {
  id: string;
  slug: string;
  nome: string;
  descricao: string;
  categoria: string;
  tecnica: string;
  preco: number;
  estoque: number;
  imagens: string[];
  artesaoId: string;
  avaliacaoMedia: number;
  quantidadeAvaliacoes: number;
  destaque: boolean;
}

export interface Avaliacao {
  id: string;
  produtoId: string;
  autor: string;
  nota: number; // 1 to 5
  comentario: string;
  data: string;
}

export interface ItemPedido {
  produtoId: string;
  quantidade: number;
  precoUnitario: number;
}

export interface Pedido {
  id: string;
  itens: ItemPedido[];
  status: 'novo' | 'em_preparo' | 'enviado' | 'entregue';
  data: string;
  compradorNome: string;
  artesaoId: string;
  total: number;
}
