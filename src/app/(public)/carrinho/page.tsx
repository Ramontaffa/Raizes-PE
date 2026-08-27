'use client';

import {
  Box,
  Container,
  Heading,
  Flex,
  Text,
  Button,
  Image,
  Divider,
  VStack,
  IconButton,
} from '@chakra-ui/react';
import { FaTrash } from 'react-icons/fa';
import { produtosMock } from '@/mock';
import NextLink from 'next/link';
import { useState } from 'react';

export default function CarrinhoPage() {
  const [itens, setItens] = useState([
    { produto: produtosMock[0], quantidade: 1 },
    { produto: produtosMock[2], quantidade: 2 },
  ]);

  const subtotal = itens.reduce((acc, item) => acc + item.produto.preco * item.quantidade, 0);

  const removerItem = (id: string) => {
    setItens(itens.filter(i => i.produto.id !== id));
  };

  return (
    <Container maxW="7xl" py={12}>
      <Heading fontFamily="heading" color="brand.800" mb={8}>Meu Carrinho</Heading>
      
      {itens.length === 0 ? (
        <Box textAlign="center" py={10}>
          <Text fontSize="xl" color="gray.500" mb={6}>Seu carrinho está vazio.</Text>
          <NextLink href="/produtos" passHref legacyBehavior>
            <Button as="a" colorScheme="brand">Explorar Produtos</Button>
          </NextLink>
        </Box>
      ) : (
        <Flex direction={{ base: 'column', lg: 'row' }} gap={10}>
          <VStack flex="2" align="stretch" spacing={6} divider={<Divider />}>
            {itens.map((item) => (
              <Flex key={item.produto.id} gap={4} align="center">
                <Image src={item.produto.imagens[0]} boxSize="100px" objectFit="cover" rounded="md" alt={item.produto.nome} />
                <Box flex="1">
                  <Text fontWeight="bold" fontSize="lg">{item.produto.nome}</Text>
                  <Text color="gray.500">Qtd: {item.quantidade}</Text>
                  <Text fontWeight="bold" color="brand.600">R$ {(item.produto.preco * item.quantidade).toFixed(2).replace('.', ',')}</Text>
                </Box>
                <IconButton aria-label="Remover" icon={<FaTrash />} colorScheme="red" variant="ghost" onClick={() => removerItem(item.produto.id)} />
              </Flex>
            ))}
          </VStack>

          <Box flex="1" bg="gray.50" p={6} rounded="lg" h="fit-content" borderWidth="1px">
            <Heading size="md" mb={6}>Resumo do Pedido</Heading>
            <Flex justify="space-between" mb={2}>
              <Text>Subtotal</Text>
              <Text fontWeight="bold">R$ {subtotal.toFixed(2).replace('.', ',')}</Text>
            </Flex>
            <Flex justify="space-between" mb={4}>
              <Text>Frete</Text>
              <Text>A calcular no checkout</Text>
            </Flex>
            <Divider mb={4} />
            <Flex justify="space-between" mb={8}>
              <Text fontWeight="bold" fontSize="lg">Total Estimado</Text>
              <Text fontWeight="bold" fontSize="lg" color="brand.600">R$ {subtotal.toFixed(2).replace('.', ',')}</Text>
            </Flex>
            
            <NextLink href="/checkout" passHref legacyBehavior>
              <Button as="a" w="full" colorScheme="brand" size="lg">Finalizar Compra</Button>
            </NextLink>
          </Box>
        </Flex>
      )}
    </Container>
  );
}
