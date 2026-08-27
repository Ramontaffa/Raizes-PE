'use client';

import {
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  Flex,
  Button,
  Image,
  Text,
  useBreakpointValue,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';
import { FiEdit, FiTrash2, FiPlus } from 'react-icons/fi';
import NextLink from 'next/link';
import { produtosMock } from '@/mock';

export default function CatalogoPage() {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const bg = useColorModeValue('white', 'gray.800');
  
  // Simulando que o artesão logado seja o 'art-1'
  const meusProdutos = produtosMock.filter(p => p.artesaoId === 'art-1');

  return (
    <Box>
      <Flex justify="space-between" align="center" mb={6} wrap="wrap" gap={4}>
        <Heading fontFamily="heading" color="brand.800">Meu Catálogo</Heading>
        <NextLink href="/painel-artesao/catalogo/novo" passHref legacyBehavior>
          <Button as="a" colorScheme="brand" leftIcon={<FiPlus />}>
            Novo Produto
          </Button>
        </NextLink>
      </Flex>

      {isMobile ? (
        <Stack spacing={4}>
          {meusProdutos.map(produto => (
            <Box key={produto.id} p={4} bg={bg} rounded="lg" shadow="sm" borderWidth="1px">
              <Flex gap={4}>
                <Image src={produto.imagens[0]} alt={produto.nome} boxSize="80px" objectFit="cover" rounded="md" />
                <Box flex="1">
                  <Text fontWeight="bold">{produto.nome}</Text>
                  <Text color="gray.500" fontSize="sm">Estoque: {produto.estoque}</Text>
                  <Text fontWeight="bold" color="brand.600">R$ {produto.preco.toFixed(2)}</Text>
                </Box>
              </Flex>
              <Flex gap={2} mt={4} justify="flex-end">
                <Button size="sm" variant="outline" leftIcon={<FiEdit />}>Editar</Button>
                <Button size="sm" colorScheme="red" variant="ghost" leftIcon={<FiTrash2 />}>Excluir</Button>
              </Flex>
            </Box>
          ))}
        </Stack>
      ) : (
        <Box bg={bg} rounded="lg" shadow="sm" borderWidth="1px" overflowX="auto">
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Produto</Th>
                <Th>Categoria</Th>
                <Th isNumeric>Preço</Th>
                <Th isNumeric>Estoque</Th>
                <Th>Status</Th>
                <Th>Ações</Th>
              </Tr>
            </Thead>
            <Tbody>
              {meusProdutos.map(produto => (
                <Tr key={produto.id}>
                  <Td>
                    <Flex align="center" gap={3}>
                      <Image src={produto.imagens[0]} boxSize="40px" objectFit="cover" rounded="sm" />
                      <Text fontWeight="medium">{produto.nome}</Text>
                    </Flex>
                  </Td>
                  <Td>{produto.categoria}</Td>
                  <Td isNumeric>R$ {produto.preco.toFixed(2)}</Td>
                  <Td isNumeric>{produto.estoque}</Td>
                  <Td>
                    <Badge colorScheme={produto.estoque > 0 ? 'green' : 'red'}>
                      {produto.estoque > 0 ? 'Ativo' : 'Esgotado'}
                    </Badge>
                  </Td>
                  <Td>
                    <Flex gap={2}>
                      <Button size="sm" variant="ghost" colorScheme="blue"><FiEdit /></Button>
                      <Button size="sm" variant="ghost" colorScheme="red"><FiTrash2 /></Button>
                    </Flex>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      )}
    </Box>
  );
}
