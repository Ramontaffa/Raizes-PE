"use client";

import NextLink from "next/link";
import { useRouter } from "next/navigation";
import {
  Box,
  Button,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  HStack,
  IconButton,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FiMinus, FiPlus, FiShoppingBag, FiTrash2 } from "react-icons/fi";
import { useCarrinho } from "@/lib/contextoCarrinho";
import { estiloFundoProduto } from "@/lib/arteProduto";
import type { ItemCarrinhoComProduto } from "@/lib/tipos";

function LinhaDoCarrinho({ item }: { item: ItemCarrinhoComProduto }) {
  const { atualizarQuantidade, removerItem } = useCarrinho();
  const { produto } = item;
  const noLimiteDoEstoque = item.quantidade >= produto.estoqueQtd;

  return (
    <Box py={4}>
      <HStack align="flex-start" spacing={3}>
        <Box
          flexShrink={0}
          w="64px"
          h="64px"
          borderRadius="8px"
          {...estiloFundoProduto(produto)}
        />

        <Box flex={1} minW={0}>
          <Text fontFamily="heading" fontSize="0.98rem" fontWeight={500} noOfLines={2}>
            {produto.nome}
          </Text>
          <Text fontSize="0.8rem" color="mutedFg" mb={2}>
            por {produto.artesaoNome}
          </Text>

          <Flex align="center" justify="space-between" gap={3} wrap="wrap">
            <HStack spacing={0} border="1px solid" borderColor="border" borderRadius="7px">
              <IconButton
                aria-label={`Diminuir quantidade de ${produto.nome}`}
                icon={<FiMinus />}
                size="sm"
                variant="ghost"
                onClick={() => atualizarQuantidade(produto.id, item.quantidade - 1)}
              />
              <Text minW="32px" textAlign="center" fontSize="0.9rem" fontWeight={600}>
                {item.quantidade}
              </Text>
              <IconButton
                aria-label={`Aumentar quantidade de ${produto.nome}`}
                icon={<FiPlus />}
                size="sm"
                variant="ghost"
                isDisabled={noLimiteDoEstoque}
                onClick={() => atualizarQuantidade(produto.id, item.quantidade + 1)}
              />
            </HStack>

            <Text fontWeight={600}>
              R$ {(produto.preco * item.quantidade).toFixed(2).replace(".", ",")}
            </Text>
          </Flex>

          {noLimiteDoEstoque && (
            <Text fontSize="0.74rem" color="mutedFg" mt={1}>
              Últimas {produto.estoqueQtd} peças disponíveis
            </Text>
          )}

          {/* Rótulo escrito junto do ícone: a lixeira sozinha não é óbvia para todo comprador */}
          <Button
            leftIcon={<FiTrash2 />}
            variant="ghost"
            size="xs"
            color="mutedFg"
            px={2}
            mt={2}
            onClick={() => removerItem(produto.id)}
          >
            Remover
          </Button>
        </Box>
      </HStack>
    </Box>
  );
}

export default function GavetaCarrinho() {
  const { itens, valorTotal, quantidadeTotal, gavetaAberta, fecharGaveta } = useCarrinho();
  const roteador = useRouter();

  function irParaCheckout() {
    fecharGaveta();
    roteador.push("/checkout");
  }

  return (
    <Drawer isOpen={gavetaAberta} placement="right" onClose={fecharGaveta} size="sm">
      <DrawerOverlay />
      <DrawerContent bg="bg" color="fg">
        <DrawerCloseButton />
        <DrawerHeader fontFamily="heading" fontWeight={600} borderBottom="1px solid" borderColor="border">
          Meu Carrinho
          {quantidadeTotal > 0 && (
            <Text as="span" fontSize="0.85rem" fontWeight={400} color="mutedFg" ml={2}>
              ({quantidadeTotal} {quantidadeTotal === 1 ? "peça" : "peças"})
            </Text>
          )}
        </DrawerHeader>

        <DrawerBody px={5}>
          {itens.length === 0 ? (
            <VStack spacing={4} py={16} textAlign="center" color="mutedFg">
              <FiShoppingBag size={34} />
              <Text>Seu carrinho ainda está vazio.</Text>
              <Button as={NextLink} href="/" variant="outline" onClick={fecharGaveta}>
                Ver artesanatos
              </Button>
            </VStack>
          ) : (
            itens.map((item, indice) => (
              <Box key={item.id}>
                {indice > 0 && <Divider borderColor="border" />}
                <LinhaDoCarrinho item={item} />
              </Box>
            ))
          )}
        </DrawerBody>

        {itens.length > 0 && (
          <DrawerFooter
            flexDirection="column"
            alignItems="stretch"
            gap={3}
            borderTop="1px solid"
            borderColor="border"
          >
            <Flex justify="space-between" align="baseline">
              <Text color="mutedFg">Total</Text>
              <Text fontSize="1.35rem" fontWeight={600}>
                R$ {valorTotal.toFixed(2).replace(".", ",")}
              </Text>
            </Flex>
            <Button variant="solid" size="lg" onClick={irParaCheckout}>
              Finalizar compra
            </Button>
          </DrawerFooter>
        )}
      </DrawerContent>
    </Drawer>
  );
}
