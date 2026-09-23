"use client";

import { Box, Text, Badge, HStack, Link as ChakraLink, Button, Flex, useToast } from "@chakra-ui/react";
import NextLink from "next/link";
import { FiMapPin, FiShoppingCart } from "react-icons/fi";
import { estiloFundoProduto } from "@/lib/arteProduto";
import { useCarrinho } from "@/lib/contextoCarrinho";
import type { ProdutoComArtesao } from "@/lib/tipos";

export default function CartaoProduto({
  produto,
  altura = "260px",
}: {
  produto: ProdutoComArtesao;
  altura?: string;
}) {
  const { itens, adicionarItem } = useCarrinho();
  const toast = useToast();
  const quantidadeNoCarrinho = itens.find((item) => item.produtoId === produto.id)?.quantidade ?? 0;
  const semEstoque = produto.estoqueQtd <= 0;

  function handleAdicionar() {
    adicionarItem(produto);
    toast({
      title: "Adicionado ao carrinho!",
      description: `${produto.nome} foi colocado no seu cesto de compras.`,
      status: "success",
      duration: 2500,
      isClosable: true,
      position: "top",
    });
  }

  return (
    <Box as="article" mb={7} sx={{ breakInside: "avoid" }}>
      <ChakraLink as={NextLink} href={`/produto/${produto.id}`} _hover={{ textDecoration: "none" }} display="block">
        <Box
          h={altura}
          borderRadius="8px"
          mb={3}
          {...estiloFundoProduto(produto)}
        />
        <Badge
          bg="accent"
          color="accentFg"
          borderRadius="full"
          px={3}
          py={0.5}
          fontSize="0.7rem"
          fontWeight={600}
          mb={2}
          textTransform="none"
        >
          {produto.tecnica}
        </Badge>
        <Text fontFamily="heading" fontSize="1.05rem" fontWeight={500} mb={1} _hover={{ textDecoration: "underline" }}>
          {produto.nome}
        </Text>
      </ChakraLink>

      <ChakraLink
        as={NextLink}
        href={`/artesao/${produto.artesaoId}`}
        fontSize="0.86rem"
        color="mutedFg"
        display="block"
        mb={1}
        _hover={{ color: "primary" }}
      >
        por {produto.artesaoNome}
      </ChakraLink>

      <HStack fontSize="0.78rem" color="mutedFg" mb={2} spacing={1}>
        <FiMapPin size={12} />
        <Text>{produto.artesaoRegiao}</Text>
      </HStack>
      <Flex justify="space-between" align="center" gap={3}>
        <Box>
          <Text fontWeight={600}>R$ {produto.preco.toFixed(2).replace(".", ",")}</Text>
          {quantidadeNoCarrinho > 0 && (
            <Text fontSize="0.72rem" color="primary" fontWeight={600} mt={1}>
              {quantidadeNoCarrinho} {quantidadeNoCarrinho === 1 ? "unidade" : "unidades"} no carrinho
            </Text>
          )}
        </Box>
        <Button
          size="sm"
          variant={quantidadeNoCarrinho > 0 ? "solid" : "outline"}
          leftIcon={<FiShoppingCart size={14} />}
          onClick={handleAdicionar}
          isDisabled={semEstoque}
          aria-label={`Adicionar ${produto.nome} ao carrinho`}
        >
          {quantidadeNoCarrinho > 0 ? `Adicionar +1` : "Adicionar"}
        </Button>
      </Flex>
    </Box>
  );
}
