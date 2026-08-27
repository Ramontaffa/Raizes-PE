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
import { artesaosMock } from '@/mock';

export default function GestaoArtesaosPage() {
  const bg = useColorModeValue('white', 'gray.800');

  return (
    <Box>
      <Heading fontFamily="heading" color="brand.800" mb={6}>Gestão de Artesãos</Heading>

      <Box bg={bg} rounded="lg" shadow="sm" borderWidth="1px" overflowX="auto">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Artesão</Th>
              <Th>Região</Th>
              <Th>Técnicas</Th>
              <Th>Status</Th>
              <Th>Ações</Th>
            </Tr>
          </Thead>
          <Tbody>
            {artesaosMock.map((artesao, index) => (
              <Tr key={artesao.id}>
                <Td fontWeight="medium">{artesao.nome}</Td>
                <Td>{artesao.municipio} - {artesao.regiao}</Td>
                <Td>
                  <Flex wrap="wrap" gap={1}>
                    {artesao.tecnicas.map((tec, i) => (
                      <Badge key={i} size="sm">{tec}</Badge>
                    ))}
                  </Flex>
                </Td>
                <Td>
                  <Badge colorScheme={index === 0 ? 'yellow' : 'green'}>
                    {index === 0 ? 'Pendente' : 'Aprovado'}
                  </Badge>
                </Td>
                <Td>
                  <Flex gap={2}>
                    <Button size="sm" colorScheme="blue" variant="outline">Ver Perfil</Button>
                    {index === 0 && (
                      <Button size="sm" colorScheme="green">Aprovar</Button>
                    )}
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
