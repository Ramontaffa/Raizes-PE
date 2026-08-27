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
  Alert,
  AlertIcon,
  Input,
  Button,
  useColorModeValue,
  Flex,
  Text,
  Badge,
} from '@chakra-ui/react';
import { produtosMock } from '@/mock';

export default function EstoquePage() {
  const bg = useColorModeValue('white', 'gray.800');
  const meusProdutos = produtosMock.filter((p) => p.artesaoId === 'art-1');
  const produtosBaixoEstoque = meusProdutos.filter((p) => p.estoque > 0 && p.estoque <= 3);

  return (
    <Box>
      <Heading fontFamily="heading" color="brand.800" mb={6}>Controle de Estoque</Heading>

      {produtosBaixoEstoque.length > 0 && (
        <Alert status="warning" mb={6} rounded="md">
          <AlertIcon />
          Atenção! Você tem {produtosBaixoEstoque.length} produto(s) com baixo estoque (3 ou menos).
        </Alert>
      )}

      <Box bg={bg} rounded="lg" shadow="sm" borderWidth="1px" overflowX="auto">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Produto</Th>
              <Th>Status</Th>
              <Th>Qtd. Atual</Th>
              <Th>Nova Quantidade</Th>
              <Th>Ação</Th>
            </Tr>
          </Thead>
          <Tbody>
            {meusProdutos.map((produto) => (
              <Tr key={produto.id}>
                <Td fontWeight="medium">{produto.nome}</Td>
                <Td>
                  {produto.estoque === 0 ? (
                    <Badge colorScheme="red">Esgotado</Badge>
                  ) : produto.estoque <= 3 ? (
                    <Badge colorScheme="orange">Baixo Estoque</Badge>
                  ) : (
                    <Badge colorScheme="green">Adequado</Badge>
                  )}
                </Td>
                <Td>
                  <Text fontSize="lg" fontWeight="bold">{produto.estoque}</Text>
                </Td>
                <Td>
                  <Input type="number" w="100px" defaultValue={produto.estoque} size="sm" />
                </Td>
                <Td>
                  <Button size="sm" colorScheme="brand" variant="outline">Atualizar</Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
}
