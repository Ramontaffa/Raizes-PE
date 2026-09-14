// Tipos espelhando 1 a 1 o Modelo Lógico definido na sprint de Banco de Dados
// (ver Modelo_Logico.md). Qualquer mudança lá deve ser refletida aqui.

export type TipoUsuario = "comprador" | "artesao" | "admin";

export interface Usuario {
  id: string;
  nome: string;
  email: string;
  tipo: TipoUsuario;
  dataCadastro: string; // ISO date
}

export interface Artesao {
  id: string;
  usuarioId: string;
  regiaoOrigem: string;
  biografia: string;
}

export type Tecnica =
  | "Cerâmica"
  | "Têxtil"
  | "Madeira"
  | "Renda e Bordado"
  | "Palha";

export interface Produto {
  id: string;
  artesaoId: string;
  nome: string;
  descricao: string;
  tecnica: Tecnica;
  categoria: string;
  preco: number;
  estoqueQtd: number;
  dataCadastro: string;
}

export type StatusPedido = "pendente" | "pago" | "enviado" | "entregue";

export interface Pedido {
  id: string;
  compradorId: string;
  dataPedido: string;
  status: StatusPedido;
  valorTotal: number;
}

export interface ItemPedido {
  id: string;
  pedidoId: string;
  produtoId: string;
  quantidade: number;
  precoUnitario: number;
}

export interface Avaliacao {
  id: string;
  produtoId: string;
  compradorId: string;
  nota: number; // 1 a 5
  dataAvaliacao: string;
}

export interface Carrinho {
  id: string;
  compradorId: string;
  dataCriacao: string;
}

export interface ItemCarrinho {
  id: string;
  carrinhoId: string;
  produtoId: string;
  quantidade: number;
}

// Tipos de apresentação (join entre entidades), usados pela UI

export interface ProdutoComArtesao extends Produto {
  artesaoNome: string;
  artesaoRegiao: string;
}

export interface ResumoAvaliacoes {
  media: number;
  quantidade: number;
}

export interface PerfilArtesao {
  id: string;
  nome: string;
  regiaoOrigem: string;
  biografia: string;
  produtos: ProdutoComArtesao[];
}

export interface EstatisticasPainel {
  vendasDoMes: number;
  vendasDeltaPct: number;
  pedidosPendentes: number;
  visitasNoPerfil: number;
  visitasDeltaPct: number;
}
