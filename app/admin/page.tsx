"use client";

import { useMemo } from "react";
import { Box, Heading, SimpleGrid } from "@chakra-ui/react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import CartaoEstatistica from "@/components/CartaoEstatistica";
import { artesaos } from "@/lib/dadosFalsos";
import { usePedidos } from "@/lib/contextoPedidos";
import { useProdutos } from "@/lib/contextoProdutos";

export default function AdminDashboard() {
  const { todosOsPedidos } = usePedidos();
  const { produtosDoArtesao } = useProdutos();

  const pedidos = useMemo(() => todosOsPedidos(), [todosOsPedidos]);
  const produtos = useMemo(
    () => artesaos.flatMap((a) => produtosDoArtesao(a.usuarioId)),
    [produtosDoArtesao]
  );

  const totalVendas = pedidos.reduce((soma, p) => soma + p.valorTotal, 0);
  const pendentes = pedidos.filter((p) => p.status === "pendente").length;
  const semEstoque = produtos.filter((p) => p.estoqueQtd === 0).length;

  // Vendas agrupadas pela técnica do produto, somando todos os itens de todos os pedidos.
  const vendasPorTecnica = useMemo(() => {
    const soma: Record<string, number> = {};
    for (const pedido of pedidos) {
      for (const item of pedido.itens) {
        soma[item.produtoTecnica] = (soma[item.produtoTecnica] ?? 0) + item.precoUnitario * item.quantidade;
      }
    }
    return Object.entries(soma).map(([name, vendas]) => ({ name, vendas }));
  }, [pedidos]);

  return (
    <Box>
      <Heading fontSize="1.9rem" mb={6}>
        Visão Geral da Plataforma
      </Heading>

      <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} spacing={5} mb={10}>
        <CartaoEstatistica
          rotulo="Total de Vendas"
          valor={`R$ ${totalVendas.toFixed(2).replace(".", ",")}`}
          variacao={`${pedidos.length} ${pedidos.length === 1 ? "pedido" : "pedidos"} no total`}
        />
        <CartaoEstatistica
          rotulo="Artesãos Ativos"
          valor={String(artesaos.length)}
          variacao="cadastrados na plataforma"
        />
        <CartaoEstatistica
          rotulo="Produtos Cadastrados"
          valor={String(produtos.length)}
          variacao={semEstoque > 0 ? `${semEstoque} sem estoque` : "Todos com estoque"}
          tom={semEstoque > 0 ? "atencao" : "bom"}
        />
        <CartaoEstatistica
          rotulo="Pedidos Pendentes"
          valor={String(pendentes)}
          variacao={pendentes > 0 ? "Requer atenção" : "Nenhum pedido em aberto"}
          tom={pendentes > 0 ? "atencao" : "bom"}
        />
      </SimpleGrid>

      <Box bg="card" border="1px solid" borderColor="border" borderRadius="10px" p={6} h="400px">
        <Heading fontSize="1.05rem" fontWeight={500} mb={6}>
          Vendas por Técnica
        </Heading>
        <ResponsiveContainer width="100%" height="85%">
          <BarChart data={vendasPorTecnica}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip
              formatter={(valor) => `R$ ${Number(valor).toFixed(2).replace(".", ",")}`}
            />
            <Bar dataKey="vendas" name="Vendas" fill="#b75c40" />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
}
