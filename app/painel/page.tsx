"use client";

import { useEffect, useState } from "react";
import { Flex, Box, Heading, Text, Button, SimpleGrid } from "@chakra-ui/react";
import BarraNavegacao from "@/components/BarraNavegacao";
import CartaoEstatistica from "@/components/CartaoEstatistica";
import LinhaProduto from "@/components/LinhaProduto";
import { getProdutosDoArtesao, getEstatisticasPainel } from "@/lib/apiFalsa";
import type { ProdutoComArtesao, EstatisticasPainel } from "@/lib/tipos";

// Usuário de demonstração — Cooperativa de Tacaratu.
// Quando houver autenticação de verdade, isso vem da sessão logada.
const ID_USUARIO_DEMO = "u2";

export default function Pagina() {
  const [produtos, setProdutos] = useState<ProdutoComArtesao[]>([]);
  const [estatisticas, setEstatisticas] = useState<EstatisticasPainel | null>(null);

  useEffect(() => {
    getProdutosDoArtesao(ID_USUARIO_DEMO).then(setProdutos);
    getEstatisticasPainel(ID_USUARIO_DEMO).then(setEstatisticas);
  }, []);

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
              <CartaoEstatistica
                rotulo="Vendas do Mês"
                valor={`R$ ${estatisticas.vendasDoMes.toFixed(2).replace(".", ",")}`}
                variacao={`+${estatisticas.vendasDeltaPct}% em relação ao mês passado`}
                tom="bom"
              />
              <CartaoEstatistica
                rotulo="Pedidos Pendentes"
                valor={String(estatisticas.pedidosPendentes)}
                variacao="Requer atenção"
                tom="atencao"
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
