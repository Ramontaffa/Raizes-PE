"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { artesaos, produtos as produtosIniciais, usuarios } from "./dadosFalsos";
import type { Produto, ProdutoComArtesao, Tecnica } from "./tipos";

const CHAVE_ARMAZENAMENTO = "raizes-pe:produtos-locais";

const TECNICAS_VALIDAS: Tecnica[] = ["Cerâmica", "Têxtil", "Madeira", "Renda e Bordado", "Palha"];

function ehTecnicaValida(valor: unknown): valor is Tecnica {
  return typeof valor === "string" && TECNICAS_VALIDAS.includes(valor as Tecnica);
}

interface DadosNovoProduto {
  nome: string;
  descricao: string;
  tecnica: Tecnica;
  categoria: string;
  preco: number;
  estoqueQtd: number;
  imagemUrl?: string;
}

interface ValorContextoProdutos {
  // Produtos criados pelo artesão nesta sessão (persistidos no navegador), sem os do mock.
  produtosLocais: Produto[];
  produtosDoArtesao: (usuarioId: string) => ProdutoComArtesao[];
  criarProduto: (usuarioId: string, dados: DadosNovoProduto) => ProdutoComArtesao | null;
}

const ContextoProdutos = createContext<ValorContextoProdutos | null>(null);

function novoId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `prod-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

// Mesma defesa usada nos outros contextos: o localStorage é editável pelo usuário e
// sobrevive a mudanças de formato, então qualquer coisa fora do esperado é descartada
// em vez de quebrar o app inteiro.
function ehProdutoLocalValido(valor: unknown): valor is Produto {
  if (typeof valor !== "object" || valor === null) return false;
  const p = valor as Record<string, unknown>;
  return (
    typeof p.id === "string" &&
    typeof p.artesaoId === "string" &&
    typeof p.nome === "string" &&
    typeof p.descricao === "string" &&
    ehTecnicaValida(p.tecnica) &&
    typeof p.categoria === "string" &&
    typeof p.preco === "number" &&
    Number.isFinite(p.preco) &&
    typeof p.estoqueQtd === "number" &&
    Number.isFinite(p.estoqueQtd) &&
    typeof p.dataCadastro === "string" &&
    (p.imagemUrl === undefined || typeof p.imagemUrl === "string")
  );
}

function lerProdutosSalvos(): Produto[] {
  try {
    const salvo = window.localStorage.getItem(CHAVE_ARMAZENAMENTO);
    if (!salvo) return [];
    const valor: unknown = JSON.parse(salvo);
    if (!Array.isArray(valor)) return [];
    return valor.filter(ehProdutoLocalValido);
  } catch {
    return [];
  }
}

function nomeDoArtesao(artesaoId: string): string {
  const artesao = artesaos.find((a) => a.id === artesaoId);
  const usuario = artesao ? usuarios.find((u) => u.id === artesao.usuarioId) : undefined;
  return usuario?.nome ?? "Artesão desconhecido";
}

function regiaoDoArtesao(artesaoId: string): string {
  return artesaos.find((a) => a.id === artesaoId)?.regiaoOrigem ?? "";
}

function paraProdutoComArtesao(p: Produto): ProdutoComArtesao {
  return {
    ...p,
    artesaoNome: nomeDoArtesao(p.artesaoId),
    artesaoRegiao: regiaoDoArtesao(p.artesaoId),
  };
}

export function ProvedorProdutos({ children }: { children: React.ReactNode }) {
  const [produtosLocais, setProdutosLocais] = useState<Produto[]>([]);
  const [hidratado, setHidratado] = useState(false);

  // Só lemos depois da montagem, senão o HTML do servidor divergiria do cliente
  // (mesmo cuidado do carrinho e dos pedidos).
  useEffect(() => {
    setProdutosLocais(lerProdutosSalvos());
    setHidratado(true);
  }, []);

  useEffect(() => {
    if (!hidratado) return;
    try {
      window.localStorage.setItem(CHAVE_ARMAZENAMENTO, JSON.stringify(produtosLocais));
    } catch {
      // Sem persistência: os produtos cadastrados valem só nesta sessão.
    }
  }, [produtosLocais, hidratado]);

  // Chamado ao salvar o formulário do popup "Adicionar Produto" no painel do artesão.
  const criarProduto = useCallback(
    (usuarioId: string, dados: DadosNovoProduto): ProdutoComArtesao | null => {
      const artesao = artesaos.find((a) => a.usuarioId === usuarioId);
      if (!artesao) return null;

      const novo: Produto = {
        id: novoId(),
        artesaoId: artesao.id,
        nome: dados.nome,
        descricao: dados.descricao,
        tecnica: dados.tecnica,
        categoria: dados.categoria,
        preco: dados.preco,
        estoqueQtd: dados.estoqueQtd,
        dataCadastro: new Date().toISOString().slice(0, 10),
        imagemUrl: dados.imagemUrl,
      };

      setProdutosLocais((atuais) => [novo, ...atuais]);
      return paraProdutoComArtesao(novo);
    },
    []
  );

  // Produtos do mock + os criados no app, na ordem certa pro painel (mais novo primeiro).
  const produtosDoArtesao = useCallback(
    (usuarioId: string): ProdutoComArtesao[] => {
      const artesao = artesaos.find((a) => a.usuarioId === usuarioId);
      if (!artesao) return [];

      const doMock = produtosIniciais.filter((p) => p.artesaoId === artesao.id);
      const doApp = produtosLocais.filter((p) => p.artesaoId === artesao.id);

      return [...doApp, ...doMock].map(paraProdutoComArtesao);
    },
    [produtosLocais]
  );

  const valor = useMemo<ValorContextoProdutos>(
    () => ({ produtosLocais, produtosDoArtesao, criarProduto }),
    [produtosLocais, produtosDoArtesao, criarProduto]
  );

  return <ContextoProdutos.Provider value={valor}>{children}</ContextoProdutos.Provider>;
}

export function useProdutos(): ValorContextoProdutos {
  const contexto = useContext(ContextoProdutos);
  if (!contexto) {
    throw new Error("useProdutos precisa ser usado dentro de <ProvedorProdutos>.");
  }
  return contexto;
}
