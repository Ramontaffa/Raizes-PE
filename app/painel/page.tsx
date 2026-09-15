"use client";

import { useEffect, useState } from "react";
import { Flex, Box, Heading, Text, Button, SimpleGrid, useToast } from "@chakra-ui/react";
import BarraNavegacao from "@/components/BarraNavegacao";
import CartaoEstatistica from "@/components/CartaoEstatistica";
import LinhaProduto from "@/components/LinhaProduto";
import LinhaPedido from "@/components/LinhaPedido";
import { getProdutosDoArtesao, getEstatisticasPainel } from "@/lib/apiFalsa";
import { usePedidos } from "@/lib/contextoPedidos";
import type { ProdutoComArtesao, EstatisticasPainel } from "@/lib/tipos";

// Usuário de demonstração — Cooperativa de Tacaratu.
// Quando houver autenticação de verdade, isso vem da sessão logada.
const ID_USUARIO_DEMO = "u2";

export default function Pagina() {
  const [produtos, setProdutos] = useState<ProdutoComArtesao[]>([]);
  const [estatisticas, setEstatisticas] = useState<EstatisticasPainel | null>(null);
  const { pedidosDoArtesao, pedidosPendentesDoArtesao, vendasDoArtesao, marcarComoEnviado } =
    usePedidos();
  const toast = useToast();

  const pedidos = pedidosDoArtesao(ID_USUARIO_DEMO);
  const pendentes = pedidosPendentesDoArtesao(ID_USUARIO_DEMO);
  const vendas = vendasDoArtesao(ID_USUARIO_DEMO);

  useEffect(() => {
    getProdutosDoArtesao(ID_USUARIO_DEMO).then(setProdutos);
    getEstatisticasPainel(ID_USUARIO_DEMO).then(setEstatisticas);
  }, []);

  function enviarPedido(pedidoId: string) {
    marcarComoEnviado(pedidoId);
    toast({
      title: "Pedido marcado como enviado",
      description: `O comprador foi avisado de que o pedido ${pedidoId} está a caminho.`,
      status: "success",
      duration: 5000,
      isClosable: true,
      position: "top",
    });
  }

  return (
    <>
      <BarraNavegacao />
      <Box maxW="1180px" mx="auto" px={{ base: 5, md: 10 }}>
        <Flex justify="space-between" align="flex-end" py={12} flexWrap="wrap" gap={4}>
          <Box>
            <Heading fontSize="1.9rem">Olá, Cooperativa de Tacaratu</Heading>
            <Text color="mutedFg" mt={2}>
              Aqui está o resumo da sua loja hoje.
            </Text>
          </Box>
          <Button variant="solid">Adicionar Produto</Button>
        </Flex>

        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={5} mb={10}>
          {estatisticas && (
            <>
              {/* Também do contexto: ficava parado quando um pedido novo entrava,
                  contradizendo o card de pendentes aqui do lado. */}
              <CartaoEstatistica
                rotulo="Vendas do Mês"
                valor={`R$ ${vendas.toFixed(2).replace(".", ",")}`}
                variacao={`+${estatisticas.vendasDeltaPct}% em relação ao mês passado`}
                tom="bom"
              />
              {/* Vem do contexto, não da apiFalsa: precisa cair na hora em que o
                  artesão marca um pedido como enviado, logo abaixo nesta mesma tela. */}
              <CartaoEstatistica
                rotulo="Pedidos Pendentes"
                valor={String(pendentes)}
                variacao={pendentes > 0 ? "Requer atenção" : "Nenhum pedido em aberto"}
                tom={pendentes > 0 ? "atencao" : "bom"}
              />
              <CartaoEstatistica
                rotulo="Visitas no Perfil"
                valor={String(estatisticas.visitasNoPerfil)}
                variacao={`+${estatisticas.visitasDeltaPct}% em relação ao mês passado`}
                tom="bom"
              />
            </>
          )}
        </SimpleGrid>

        <Box
          bg="card"
          border="1px solid"
          borderColor="border"
          borderRadius="10px"
          overflow="hidden"
          mb={10}
        >
          <Box px={5} py={4} borderBottom="1px solid" borderColor="border">
            <Heading fontSize="1.05rem" fontWeight={500}>
              Pedidos recebidos
            </Heading>
            <Text fontSize="0.82rem" color="mutedFg" mt={1}>
              Ao marcar um pedido como enviado, o comprador é avisado na área dele.
            </Text>
          </Box>

          {pedidos.length === 0 ? (
            <Text px={5} py={8} color="mutedFg" textAlign="center">
              Nenhum pedido recebido ainda.
            </Text>
          ) : (
            pedidos.map((pedido) => (
              <LinhaPedido
                key={pedido.id}
                pedido={pedido}
                mostrarComprador
                aoEnviar={enviarPedido}
              />
            ))
          )}
        </Box>

        <Box
          bg="card"
          border="1px solid"
          borderColor="border"
          borderRadius="10px"
          overflow="hidden"
          mb={16}
        >
          <Box px={5} py={4} borderBottom="1px solid" borderColor="border">
            <Heading fontSize="1.05rem" fontWeight={500}>
              Seus produtos (estoque)
            </Heading>
          </Box>
          {produtos.map((p) => (
            <LinhaProduto key={p.id} produto={p} />
          ))}
        </Box>
      </Box>
    </>
  );
}
