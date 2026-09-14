import {
  usuarios,
  artesaos,
  produtos,
  pedidos,
  itensPedido,
  avaliacoes,
} from "./dadosFalsos";
import {
  ProdutoComArtesao,
  EstatisticasPainel,
  Tecnica,
  ResumoAvaliacoes,
  PerfilArtesao,
} from "./tipos";

// Simula latência de rede, como uma API real teria.
function atraso<T>(valor: T, ms = 250): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(valor), ms));
}

// Remove acentos para permitir busca sem diferenciar "ceramica" de "cerâmica".
function normalizar(texto: string): string {
  return texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function nomeDoArtesao(artesaoId: string): string {
  const artesao = artesaos.find((a) => a.id === artesaoId);
  const usuario = artesao ? usuarios.find((u) => u.id === artesao.usuarioId) : undefined;
  return usuario?.nome ?? "Artesão desconhecido";
}

function regiaoDoArtesao(artesaoId: string): string {
  const artesao = artesaos.find((a) => a.id === artesaoId);
  return artesao?.regiaoOrigem ?? "";
}

function paraProdutoComArtesao(p: (typeof produtos)[number]): ProdutoComArtesao {
  return {
    ...p,
    artesaoNome: nomeDoArtesao(p.artesaoId),
    artesaoRegiao: regiaoDoArtesao(p.artesaoId),
  };
}

// GET /produtos?tecnica=...&regiao=...&categoria=...&q=...
export async function getProdutos(
  tecnica?: Tecnica,
  busca?: string,
  regiao?: string,
  categoria?: string
): Promise<ProdutoComArtesao[]> {
  let filtrados = tecnica ? produtos.filter((p) => p.tecnica === tecnica) : produtos;

  if (categoria) {
    filtrados = filtrados.filter((p) => p.categoria === categoria);
  }

  if (regiao) {
    filtrados = filtrados.filter((p) => regiaoDoArtesao(p.artesaoId) === regiao);
  }

  const termo = busca?.trim();
  if (termo) {
    const q = normalizar(termo);
    filtrados = filtrados.filter((p) => {
      const artesaoNome = nomeDoArtesao(p.artesaoId);
      const regiaoDoProduto = regiaoDoArtesao(p.artesaoId);
      return (
        normalizar(p.nome).includes(q) ||
        normalizar(p.tecnica).includes(q) ||
        normalizar(p.categoria).includes(q) ||
        normalizar(artesaoNome).includes(q) ||
        normalizar(regiaoDoProduto).includes(q)
      );
    });
  }

  return atraso(filtrados.map(paraProdutoComArtesao));
}

// GET /produtos/:id
export async function getProdutoPorId(id: string): Promise<ProdutoComArtesao | undefined> {
  const produto = produtos.find((p) => p.id === id);
  return atraso(produto ? paraProdutoComArtesao(produto) : undefined);
}

// GET /produtos/:id/relacionados — mesma técnica, excluindo o próprio produto
export async function getProdutosRelacionados(produtoId: string, limite = 3): Promise<ProdutoComArtesao[]> {
  const produto = produtos.find((p) => p.id === produtoId);
  if (!produto) return atraso([]);
  const relacionados = produtos
    .filter((p) => p.id !== produtoId && p.tecnica === produto.tecnica)
    .slice(0, limite)
    .map(paraProdutoComArtesao);
  return atraso(relacionados);
}

// GET /produtos/:id/avaliacoes/resumo
export async function getResumoAvaliacoes(produtoId: string): Promise<ResumoAvaliacoes> {
  const doProduto = avaliacoes.filter((a) => a.produtoId === produtoId);
  if (doProduto.length === 0) return atraso({ media: 0, quantidade: 0 });
  const soma = doProduto.reduce((acc, a) => acc + a.nota, 0);
  return atraso({ media: soma / doProduto.length, quantidade: doProduto.length });
}

// GET /artesaos/:id — perfil público
export async function getPerfilArtesao(artesaoId: string): Promise<PerfilArtesao | undefined> {
  const artesao = artesaos.find((a) => a.id === artesaoId);
  if (!artesao) return atraso(undefined);
  const usuario = usuarios.find((u) => u.id === artesao.usuarioId);
  const produtosDoArtesao = produtos.filter((p) => p.artesaoId === artesaoId).map(paraProdutoComArtesao);

  return atraso({
    id: artesao.id,
    nome: usuario?.nome ?? "Artesão desconhecido",
    regiaoOrigem: artesao.regiaoOrigem,
    biografia: artesao.biografia,
    produtos: produtosDoArtesao,
  });
}

// GET /artesaos/:usuarioId/produtos — usado pelo painel do próprio artesão logado
export async function getProdutosDoArtesao(usuarioId: string): Promise<ProdutoComArtesao[]> {
  const artesao = artesaos.find((a) => a.usuarioId === usuarioId);
  if (!artesao) return atraso([]);
  const doArtesao = produtos.filter((p) => p.artesaoId === artesao.id);
  return atraso(doArtesao.map(paraProdutoComArtesao));
}

// GET /artesaos/:usuarioId/estatisticas
export async function getEstatisticasPainel(usuarioId: string): Promise<EstatisticasPainel> {
  const artesao = artesaos.find((a) => a.usuarioId === usuarioId);
  const produtosDoArtesao = artesao ? produtos.filter((p) => p.artesaoId === artesao.id) : [];
  const idsProdutos = new Set(produtosDoArtesao.map((p) => p.id));

  const itensDoArtesao = itensPedido.filter((i) => idsProdutos.has(i.produtoId));
  const pedidosDoArtesao = pedidos.filter((ped) =>
    itensDoArtesao.some((i) => i.pedidoId === ped.id)
  );

  const vendasDoMes = itensDoArtesao.reduce((soma, i) => soma + i.quantidade * i.precoUnitario, 0);
  const pedidosPendentes = pedidosDoArtesao.filter((p) => p.status === "pendente").length;

  return atraso({
    vendasDoMes,
    vendasDeltaPct: 12,
    pedidosPendentes,
    visitasNoPerfil: 128,
    visitasDeltaPct: 5,
  });
}

export const tecnicas: Tecnica[] = ["Cerâmica", "Têxtil", "Madeira", "Renda e Bordado", "Palha"];

export const regioes: string[] = Array.from(new Set(artesaos.map((a) => a.regiaoOrigem))).sort();

export const categorias: string[] = Array.from(new Set(produtos.map((p) => p.categoria))).sort();
