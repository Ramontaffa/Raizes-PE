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
  Button,
  Flex,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { produtosMock, artesaosMock } from '@/mock';

export default function ModeracaoProdutosPage() {
  const bg = useColorModeValue('white', 'gray.800');

  const getArtesaoNome = (id: string) => {
    return artesaosMock.find(a => a.id === id)?.nome || 'Desconhecido';
  };

  return (
    <Box>
      <Heading fontFamily="heading" color="brand.800" mb={6}>Moderação de Produtos</Heading>

      <Box bg={bg} rounded="lg" shadow="sm" borderWidth="1px" overflowX="auto">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Produto</Th>
              <Th>Artesão</Th>
              <Th>Categoria</Th>
              <Th>Status</Th>
              <Th>Ações</Th>
            </Tr>
          </Thead>
          <Tbody>
            {produtosMock.map((produto, index) => (
              <Tr key={produto.id}>
                <Td fontWeight="medium">{produto.nome}</Td>
                <Td>{getArtesaoNome(produto.artesaoId)}</Td>
                <Td>{produto.categoria}</Td>
                <Td>
                  <Badge colorScheme={index % 5 === 0 ? 'yellow' : 'green'}>
                    {index % 5 === 0 ? 'Em Revisão' : 'Aprovado'}
                  </Badge>
                </Td>
                <Td>
                  <Flex gap={2}>
                    {index % 5 === 0 && (
                      <Button size="sm" colorScheme="green">Aprovar</Button>
                    )}
                    <Button size="sm" colorScheme="red" variant="outline">Remover</Button>
                  </Flex>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
}
