"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import {
  pedidos as pedidosIniciais,
  itensPedido,
  produtos,
  usuarios,
  artesaos,
} from "./dadosFalsos";
import type {
  ItemCarrinhoComProduto,
  NotificacaoEnvio,
  Pedido,
  PedidoComItens,
  ItemPedidoComProduto,
  StatusPedido,
} from "./tipos";

const CHAVE_ARMAZENAMENTO = "raizes-pe:pedidos";

// Comprador de demonstração — Ana Beatriz. Enquanto não há autenticação, o checkout e a
// área "Meus Pedidos" precisam concordar sobre quem é o usuário, então o id mora aqui.
export const ID_COMPRADOR_DEMO = "u7";

// Guardamos só o que o usuário mudou — status dos pedidos mockados e os pedidos criados
// no app —, nunca a lista inteira do mock. Salvar a lista congelaria os dados: um colega
// que adicionasse pedidos em dadosFalsos.ts não os veria aparecer.
interface EstadoSalvo {
  statusPorPedido: Record<string, StatusPedido>;
  pedidosLocais: PedidoComItens[];
  notificacoes: NotificacaoEnvio[];
}

interface ValorContextoPedidos {
  pedidos: Pedido[];
  notificacoes: NotificacaoEnvio[];
  pedidosDoComprador: (compradorId: string) => PedidoComItens[];
  pedidosDoArtesao: (usuarioId: string) => PedidoComItens[];
  pedidosPendentesDoArtesao: (usuarioId: string) => number;
  vendasDoArtesao: (usuarioId: string) => number;
  notificacoesDoComprador: (compradorId: string) => NotificacaoEnvio[];
  criarPedido: (compradorId: string, itens: ItemCarrinhoComProduto[]) => PedidoComItens;
  marcarComoEnviado: (pedidoId: string) => void;
  marcarNotificacoesComoLidas: (compradorId: string) => void;
}

const ContextoPedidos = createContext<ValorContextoPedidos | null>(null);

function novoId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `notif-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

const STATUS_VALIDOS: StatusPedido[] = ["pendente", "pago", "enviado", "entregue"];

// Mesma defesa do carrinho: o localStorage é editável e sobrevive a mudanças de formato.
// Qualquer coisa fora do esperado é descartada, para o provider não quebrar o app inteiro.
function ehStatusValido(valor: unknown): valor is StatusPedido {
  return typeof valor === "string" && STATUS_VALIDOS.includes(valor as StatusPedido);
}

// Pedidos criados no app não existem no mock, então são salvos por inteiro — com os itens
// junto, já que itensPedido de dadosFalsos.ts não os conhece.
function ehPedidoLocalValido(valor: unknown): valor is PedidoComItens {
  if (typeof valor !== "object" || valor === null) return false;
  const p = valor as Record<string, unknown>;
  return (
    typeof p.id === "string" &&
    typeof p.compradorId === "string" &&
    typeof p.compradorNome === "string" &&
    typeof p.dataPedido === "string" &&
    ehStatusValido(p.status) &&
    typeof p.valorTotal === "number" &&
    Number.isFinite(p.valorTotal) &&
    Array.isArray(p.itens)
  );
}

function aplicarStatusSalvos(
  base: Pedido[],
  statusPorPedido: Record<string, StatusPedido>
): Pedido[] {
  return base.map((pedido) => {
    const salvo = statusPorPedido[pedido.id];
    return salvo ? { ...pedido, status: salvo } : pedido;
  });
}

function ehNotificacaoValida(valor: unknown): valor is NotificacaoEnvio {
  if (typeof valor !== "object" || valor === null) return false;
  const n = valor as Record<string, unknown>;
  return (
    typeof n.id === "string" &&
    typeof n.pedidoId === "string" &&
    typeof n.compradorId === "string" &&
    typeof n.mensagem === "string" &&
    typeof n.data === "string" &&
    typeof n.lida === "boolean"
  );
}

function lerEstadoSalvo(): EstadoSalvo | null {
  try {
    const salvo = window.localStorage.getItem(CHAVE_ARMAZENAMENTO);
    if (!salvo) return null;

    const valor: unknown = JSON.parse(salvo);
    if (typeof valor !== "object" || valor === null) return null;

    const bruto = valor as Record<string, unknown>;

    const statusPorPedido: Record<string, StatusPedido> = {};
    if (typeof bruto.statusPorPedido === "object" && bruto.statusPorPedido !== null) {
      for (const [id, status] of Object.entries(bruto.statusPorPedido)) {
        if (ehStatusValido(status)) statusPorPedido[id] = status;
      }
    }

    return {
      statusPorPedido,
      pedidosLocais: Array.isArray(bruto.pedidosLocais)
        ? bruto.pedidosLocais.filter(ehPedidoLocalValido)
        : [],
      notificacoes: Array.isArray(bruto.notificacoes)
        ? bruto.notificacoes.filter(ehNotificacaoValida)
        : [],
    };
  } catch {
    return null;
  }
}

function nomeDoComprador(compradorId: string): string {
  return usuarios.find((u) => u.id === compradorId)?.nome ?? "Comprador";
}

function itensDoPedido(pedidoId: string): ItemPedidoComProduto[] {
  return itensPedido
    .filter((item) => item.pedidoId === pedidoId)
    .map((item) => {
      const produto = produtos.find((p) => p.id === item.produtoId);
      return {
        ...item,
        produtoNome: produto?.nome ?? "Produto removido",
        produtoTecnica: produto?.tecnica ?? "Cerâmica",
      };
    });
}

function comItens(pedido: Pedido): PedidoComItens {
  return {
    ...pedido,
    compradorNome: nomeDoComprador(pedido.compradorId),
    itens: itensDoPedido(pedido.id),
  };
}

// Mais recentes primeiro — é a ordem que faz sentido nas duas telas.
function porDataDecrescente(a: Pedido, b: Pedido): number {
  return b.dataPedido.localeCompare(a.dataPedido);
}

export function ProvedorPedidos({ children }: { children: React.ReactNode }) {
  const [pedidos, setPedidos] = useState<Pedido[]>(pedidosIniciais);
  const [pedidosLocais, setPedidosLocais] = useState<PedidoComItens[]>([]);
  const [notificacoes, setNotificacoes] = useState<NotificacaoEnvio[]>([]);
  const [hidratado, setHidratado] = useState(false);

  // Igual ao carrinho: só lemos depois da montagem, senão o HTML do servidor divergiria
  // do cliente. O estado inicial é o mock, que é o mesmo nos dois lados.
  useEffect(() => {
    const salvo = lerEstadoSalvo();
    if (salvo) {
      setPedidos(aplicarStatusSalvos(pedidosIniciais, salvo.statusPorPedido));
      setPedidosLocais(salvo.pedidosLocais);
      setNotificacoes(salvo.notificacoes);
    }
    setHidratado(true);
  }, []);

  useEffect(() => {
    if (!hidratado) return;

    // Só os status que divergem do mock — o resto é sempre relido de dadosFalsos.ts.
    const statusPorPedido: Record<string, StatusPedido> = {};
    for (const pedido of pedidos) {
      const original = pedidosIniciais.find((p) => p.id === pedido.id);
      if (original && original.status !== pedido.status) {
        statusPorPedido[pedido.id] = pedido.status;
      }
    }

    try {
      window.localStorage.setItem(
        CHAVE_ARMAZENAMENTO,
        JSON.stringify({ statusPorPedido, pedidosLocais, notificacoes })
      );
    } catch {
      // Sem persistência: as mudanças valem só nesta sessão.
    }
  }, [pedidos, pedidosLocais, notificacoes, hidratado]);

  // Chamado ao confirmar o checkout: o pedido do comprador passa a existir de verdade no
  // histórico, em vez de o checkout inventar um número que não leva a lugar nenhum.
  const criarPedido = useCallback(
    (compradorId: string, itens: ItemCarrinhoComProduto[]): PedidoComItens => {
      const id = `PED-${Date.now().toString().slice(-6)}`;

      const itensDoNovoPedido: ItemPedidoComProduto[] = itens.map((item, indice) => ({
        id: `${id}-${indice + 1}`,
        pedidoId: id,
        produtoId: item.produtoId,
        quantidade: item.quantidade,
        precoUnitario: item.produto.preco,
        produtoNome: item.produto.nome,
        produtoTecnica: item.produto.tecnica,
      }));

      const novo: PedidoComItens = {
        id,
        compradorId,
        compradorNome: nomeDoComprador(compradorId),
        dataPedido: new Date().toISOString().slice(0, 10),
        status: "pendente",
        valorTotal: itensDoNovoPedido.reduce(
          (soma, item) => soma + item.precoUnitario * item.quantidade,
          0
        ),
        itens: itensDoNovoPedido,
      };

      setPedidosLocais((atuais) => [novo, ...atuais]);
      return novo;
    },
    []
  );

  const marcarComoEnviado = useCallback(
    (pedidoId: string) => {
      const ehLocal = pedidosLocais.some((p) => p.id === pedidoId);
      const alvo = ehLocal
        ? pedidosLocais.find((p) => p.id === pedidoId)
        : pedidos.find((p) => p.id === pedidoId);
      if (!alvo) return;

      // Só faz sentido enviar o que ainda não saiu; reenviar geraria aviso duplicado.
      if (alvo.status !== "pendente" && alvo.status !== "pago") return;

      const ENVIADO = "enviado" as StatusPedido;

      if (ehLocal) {
        setPedidosLocais((atuais) =>
          atuais.map((p) => (p.id === pedidoId ? { ...p, status: ENVIADO } : p))
        );
      } else {
        setPedidos((atuais) =>
          atuais.map((p) => (p.id === pedidoId ? { ...p, status: ENVIADO } : p))
        );
      }

      setNotificacoes((anteriores) => [
        {
          id: novoId(),
          pedidoId,
          compradorId: alvo.compradorId,
          mensagem: `Seu pedido ${pedidoId} foi enviado pelo artesão e está a caminho.`,
          data: new Date().toISOString(),
          lida: false,
        },
        ...anteriores,
      ]);
    },
    [pedidos, pedidosLocais]
  );

  const marcarNotificacoesComoLidas = useCallback((compradorId: string) => {
    setNotificacoes((atuais) =>
      atuais.map((n) => (n.compradorId === compradorId ? { ...n, lida: true } : n))
    );
  }, []);

  // Os pedidos do mock precisam da junção; os criados no app já vêm com itens.
  const todosComItens = useCallback(
    (): PedidoComItens[] => [...pedidosLocais, ...pedidos.map(comItens)],
    [pedidos, pedidosLocais]
  );

  const pedidosDoComprador = useCallback(
    (compradorId: string) =>
      todosComItens()
        .filter((p) => p.compradorId === compradorId)
        .sort(porDataDecrescente),
    [todosComItens]
  );

  // Um pedido pertence ao artesão quando contém ao menos um produto dele.
  const pedidosDoArtesao = useCallback(
    (usuarioId: string) => {
      const artesao = artesaos.find((a) => a.usuarioId === usuarioId);
      if (!artesao) return [];

      const idsDosProdutos = new Set(
        produtos.filter((p) => p.artesaoId === artesao.id).map((p) => p.id)
      );

      return todosComItens()
        .filter((pedido) => pedido.itens.some((i) => idsDosProdutos.has(i.produtoId)))
        .sort(porDataDecrescente);
    },
    [todosComItens]
  );

  const pedidosPendentesDoArtesao = useCallback(
    (usuarioId: string) =>
      pedidosDoArtesao(usuarioId).filter((p) => p.status === "pendente").length,
    [pedidosDoArtesao]
  );

  // Soma só os itens que são do próprio artesão: um pedido pode misturar peças de
  // vários artesãos, e o valorTotal do pedido não serviria para o painel de nenhum deles.
  // Conta pedidos em qualquer status, que é a regra que a apiFalsa já usava.
  const vendasDoArtesao = useCallback(
    (usuarioId: string) => {
      const artesao = artesaos.find((a) => a.usuarioId === usuarioId);
      if (!artesao) return 0;

      const idsDosProdutos = new Set(
        produtos.filter((p) => p.artesaoId === artesao.id).map((p) => p.id)
      );

      return pedidosDoArtesao(usuarioId).reduce(
        (total, pedido) =>
          total +
          pedido.itens
            .filter((item) => idsDosProdutos.has(item.produtoId))
            .reduce((soma, item) => soma + item.precoUnitario * item.quantidade, 0),
        0
      );
    },
    [pedidosDoArtesao]
  );

  const notificacoesDoComprador = useCallback(
    (compradorId: string) => notificacoes.filter((n) => n.compradorId === compradorId),
    [notificacoes]
  );

  const valor = useMemo<ValorContextoPedidos>(
    () => ({
      pedidos,
      notificacoes,
      pedidosDoComprador,
      pedidosDoArtesao,
      pedidosPendentesDoArtesao,
      vendasDoArtesao,
      notificacoesDoComprador,
      criarPedido,
      marcarComoEnviado,
      marcarNotificacoesComoLidas,
    }),
    [
      pedidos,
      notificacoes,
      pedidosDoComprador,
      pedidosDoArtesao,
      pedidosPendentesDoArtesao,
      vendasDoArtesao,
      notificacoesDoComprador,
      criarPedido,
      marcarComoEnviado,
      marcarNotificacoesComoLidas,
    ]
  );

  return <ContextoPedidos.Provider value={valor}>{children}</ContextoPedidos.Provider>;
}

export function usePedidos(): ValorContextoPedidos {
  const contexto = useContext(ContextoPedidos);
  if (!contexto) {
    throw new Error("usePedidos precisa ser usado dentro de <ProvedorPedidos>.");
  }
  return contexto;
}
