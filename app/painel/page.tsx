"use client";

import { useEffect, useState } from "react";
import { Flex, Box, Heading, Text, Button, SimpleGrid, useDisclosure, useToast } from "@chakra-ui/react";
import BarraNavegacao from "@/components/BarraNavegacao";
import CartaoEstatistica from "@/components/CartaoEstatistica";
import GraficoVendas from "@/components/GraficoVendas";
import LinhaProduto from "@/components/LinhaProduto";
import LinhaPedido from "@/components/LinhaPedido";
import ModalAdicionarProduto, { DadosProdutoSubmetido } from "@/components/ModalAdicionarProduto";
import ModalEditarProduto from "@/components/ModalEditarProduto";
import MensagemErro from "@/components/MensagemErro";
import type { ProdutoComArtesao } from "@/lib/tipos";
import { getEstatisticasPainel } from "@/lib/apiFalsa";
import { usePedidos } from "@/lib/contextoPedidos";
import { useProdutos } from "@/lib/contextoProdutos";
import type { EstatisticasPainel } from "@/lib/tipos";

// Usuário de demonstração — Cooperativa de Tacaratu.
// Quando houver autenticação de verdade, isso vem da sessão logada.
const ID_USUARIO_DEMO = "u2";

export default function Pagina() {
  const [estatisticas, setEstatisticas] = useState<EstatisticasPainel | null>(null);
  const [produtoEmEdicao, setProdutoEmEdicao] = useState<ProdutoComArtesao | null>(null);
  const [erroEstatisticas, setErroEstatisticas] = useState(false);
  const [tentativaEstatisticas, setTentativaEstatisticas] = useState(0);
  const { pedidosDoArtesao, pedidosPendentesDoArtesao, vendasDoArtesao, marcarComoEnviado } =
    usePedidos();
  const { produtosDoArtesao, criarProduto, editarProduto } = useProdutos();
  const { isOpen: modalAberto, onOpen: abrirModal, onClose: fecharModal } = useDisclosure();
  const toast = useToast();

  const pedidos = pedidosDoArtesao(ID_USUARIO_DEMO);
  const pendentes = pedidosPendentesDoArtesao(ID_USUARIO_DEMO);
  const vendas = vendasDoArtesao(ID_USUARIO_DEMO);
  // Produtos do mock + os cadastrados pelo próprio artesão nesta sessão.
  const produtos = produtosDoArtesao(ID_USUARIO_DEMO);

  useEffect(() => {
    setErroEstatisticas(false);
    getEstatisticasPainel(ID_USUARIO_DEMO)
      .then(setEstatisticas)
      .catch(() => setErroEstatisticas(true));
  }, [tentativaEstatisticas]);

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

  function salvarNovoProduto(dados: DadosProdutoSubmetido) {
    const criado = criarProduto(ID_USUARIO_DEMO, dados);
    if (!criado) return;
    toast({
      title: "Produto adicionado",
      description: `"${criado.nome}" já está disponível na sua loja.`,
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
          <Button variant="solid" onClick={abrirModal}>
            Adicionar Produto
          </Button>
        </Flex>

        {erroEstatisticas ? (
          <Box mb={10}>
            <MensagemErro
              mensagem="Não foi possível carregar as estatísticas da loja."
              aoTentarNovamente={() => setTentativaEstatisticas((atual) => atual + 1)}
            />
          </Box>
        ) : (
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
        )}

        {estatisticas && (
          <GraficoVendas
            historicoMensal={estatisticas.historicoMensal}
            vendasPorTecnica={estatisticas.vendasPorTecnica}
          />
        )}

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
          {produtos.length === 0 ? (
            <Text px={5} py={8} color="mutedFg" textAlign="center">
              Nenhum produto cadastrado ainda.
            </Text>
          ) : (
            produtos.map((p) => <LinhaProduto key={p.id} produto={p} aoEditar={setProdutoEmEdicao} />)
          )}
        </Box>
      </Box>

      <ModalAdicionarProduto aberto={modalAberto} aoFechar={fecharModal} aoSalvar={salvarNovoProduto} />
      <ModalEditarProduto
        produto={produtoEmEdicao}
        aberto={!!produtoEmEdicao}
        aoFechar={() => setProdutoEmEdicao(null)}
        aoSalvar={editarProduto}
      />
    </>
  );
}
