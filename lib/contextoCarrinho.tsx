"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ItemCarrinhoComProduto, ProdutoComArtesao } from "./tipos";

const CHAVE_ARMAZENAMENTO = "raizes-pe:carrinho";

// Sem backend e sem login, o carrinho do visitante vive só no navegador. Este id ocupa
// o lugar do carrinhoId que viria da tabela Carrinho do Modelo Lógico.
const CARRINHO_LOCAL_ID = "carrinho-local";

interface ValorContextoCarrinho {
  itens: ItemCarrinhoComProduto[];
  quantidadeTotal: number;
  valorTotal: number;
  gavetaAberta: boolean;
  adicionarItem: (produto: ProdutoComArtesao, quantidade?: number) => void;
  removerItem: (produtoId: string) => void;
  atualizarQuantidade: (produtoId: string, quantidade: number) => void;
  limparCarrinho: () => void;
  abrirGaveta: () => void;
  fecharGaveta: () => void;
}

const ContextoCarrinho = createContext<ValorContextoCarrinho | null>(null);

function novoId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `item-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

// Nunca deixa a quantidade passar do estoque cadastrado nem cair abaixo de 1.
// Estoque zerado devolve 0: quem chama trata isso removendo (ou não criando) o item.
function limitarAoEstoque(quantidade: number, estoqueQtd: number): number {
  if (estoqueQtd <= 0) return 0;
  return Math.max(1, Math.min(quantidade, estoqueQtd));
}

// O conteúdo do localStorage é editável pelo usuário e sobrevive a mudanças de formato.
// Sem esta checagem, um valor fora do formato faria o provider quebrar em todas as páginas
// — e o erro voltaria a cada recarga, porque o valor ruim continua salvo.
function ehItemValido(valor: unknown): valor is ItemCarrinhoComProduto {
  if (typeof valor !== "object" || valor === null) return false;

  const item = valor as Record<string, unknown>;
  const produto = item.produto as Record<string, unknown> | undefined;

  return (
    typeof item.id === "string" &&
    typeof item.produtoId === "string" &&
    typeof item.quantidade === "number" &&
    Number.isFinite(item.quantidade) &&
    item.quantidade > 0 &&
    typeof produto === "object" &&
    produto !== null &&
    typeof produto.nome === "string" &&
    typeof produto.preco === "number" &&
    typeof produto.estoqueQtd === "number"
  );
}

function lerCarrinhoSalvo(): ItemCarrinhoComProduto[] {
  try {
    const salvo = window.localStorage.getItem(CHAVE_ARMAZENAMENTO);
    if (!salvo) return [];

    const valor: unknown = JSON.parse(salvo);
    if (!Array.isArray(valor)) return [];

    return valor.filter(ehItemValido);
  } catch {
    // JSON inválido, modo privado ou storage bloqueado: começa com o carrinho vazio.
    return [];
  }
}

export function ProvedorCarrinho({ children }: { children: React.ReactNode }) {
  const [itens, setItens] = useState<ItemCarrinhoComProduto[]>([]);
  const [gavetaAberta, setGavetaAberta] = useState(false);
  const [hidratado, setHidratado] = useState(false);

  // Só lemos o carrinho salvo depois da montagem: localStorage não existe no servidor, e
  // ler durante o render faria o HTML do servidor divergir do cliente na hidratação.
  useEffect(() => {
    setItens(lerCarrinhoSalvo());
    setHidratado(true);
  }, []);

  useEffect(() => {
    if (!hidratado) return;
    try {
      window.localStorage.setItem(CHAVE_ARMAZENAMENTO, JSON.stringify(itens));
    } catch {
      // Sem persistência: o carrinho continua funcionando só nesta sessão.
    }
  }, [itens, hidratado]);

  const adicionarItem = useCallback((produto: ProdutoComArtesao, quantidade = 1) => {
    setItens((atuais) => {
      // Peça esgotada não entra no carrinho. A página de produto já desabilita o botão,
      // mas a regra precisa valer aqui para qualquer tela que chame esta função.
      if (produto.estoqueQtd <= 0) return atuais;

      const existente = atuais.find((item) => item.produtoId === produto.id);

      if (existente) {
        return atuais.map((item) =>
          item.produtoId === produto.id
            ? {
                ...item,
                quantidade: limitarAoEstoque(item.quantidade + quantidade, produto.estoqueQtd),
              }
            : item
        );
      }

      const novo: ItemCarrinhoComProduto = {
        id: novoId(),
        carrinhoId: CARRINHO_LOCAL_ID,
        produtoId: produto.id,
        quantidade: limitarAoEstoque(quantidade, produto.estoqueQtd),
        produto,
      };
      return [...atuais, novo];
    });
  }, []);

  const removerItem = useCallback((produtoId: string) => {
    setItens((atuais) => atuais.filter((item) => item.produtoId !== produtoId));
  }, []);

  const atualizarQuantidade = useCallback((produtoId: string, quantidade: number) => {
    setItens((atuais) => {
      const alvo = atuais.find((item) => item.produtoId === produtoId);
      if (!alvo) return atuais;

      // Zero (ou estoque que zerou) significa tirar a peça do carrinho.
      const nova = quantidade <= 0 ? 0 : limitarAoEstoque(quantidade, alvo.produto.estoqueQtd);
      if (nova === 0) {
        return atuais.filter((item) => item.produtoId !== produtoId);
      }

      return atuais.map((item) =>
        item.produtoId === produtoId ? { ...item, quantidade: nova } : item
      );
    });
  }, []);

  const limparCarrinho = useCallback(() => setItens([]), []);
  const abrirGaveta = useCallback(() => setGavetaAberta(true), []);
  const fecharGaveta = useCallback(() => setGavetaAberta(false), []);

  const quantidadeTotal = useMemo(
    () => itens.reduce((soma, item) => soma + item.quantidade, 0),
    [itens]
  );

  const valorTotal = useMemo(
    () => itens.reduce((soma, item) => soma + item.produto.preco * item.quantidade, 0),
    [itens]
  );

  const valor = useMemo<ValorContextoCarrinho>(
    () => ({
      itens,
      quantidadeTotal,
      valorTotal,
      gavetaAberta,
      adicionarItem,
      removerItem,
      atualizarQuantidade,
      limparCarrinho,
      abrirGaveta,
      fecharGaveta,
    }),
    [
      itens,
      quantidadeTotal,
      valorTotal,
      gavetaAberta,
      adicionarItem,
      removerItem,
      atualizarQuantidade,
      limparCarrinho,
      abrirGaveta,
      fecharGaveta,
    ]
  );

  return <ContextoCarrinho.Provider value={valor}>{children}</ContextoCarrinho.Provider>;
}

export function useCarrinho(): ValorContextoCarrinho {
  const contexto = useContext(ContextoCarrinho);
  if (!contexto) {
    throw new Error("useCarrinho precisa ser usado dentro de <ProvedorCarrinho>.");
  }
  return contexto;
}
