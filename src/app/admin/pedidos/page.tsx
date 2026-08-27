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
  useColorModeValue,
} from '@chakra-ui/react';
import { pedidosMock, artesaosMock } from '@/mock';

const statusColorMap: Record<string, string> = {
  novo: 'blue',
  em_preparo: 'yellow',
  enviado: 'orange',
  entregue: 'green',
};

export default function PedidosGeraisPage() {
  const bg = useColorModeValue('white', 'gray.800');

  const getArtesaoNome = (id: string) => {
    return artesaosMock.find(a => a.id === id)?.nome || 'Desconhecido';
  };

  return (
    <Box>
      <Heading fontFamily="heading" color="brand.800" mb={6}>Visão Geral de Pedidos</Heading>

      <Box bg={bg} rounded="lg" shadow="sm" borderWidth="1px" overflowX="auto">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Data</Th>
              <Th>Artesão</Th>
              <Th>Comprador</Th>
              <Th isNumeric>Total</Th>
              <Th>Status</Th>
            </Tr>
          </Thead>
          <Tbody>
            {pedidosMock.map((pedido) => (
              <Tr key={pedido.id}>
                <Td fontWeight="bold">#{pedido.id}</Td>
                <Td>{new Date(pedido.data).toLocaleDateString()}</Td>
                <Td>{getArtesaoNome(pedido.artesaoId)}</Td>
                <Td>{pedido.compradorNome}</Td>
                <Td isNumeric>R$ {pedido.total.toFixed(2)}</Td>
                <Td>
                  <Badge colorScheme={statusColorMap[pedido.status]}>
                    {pedido.status.replace('_', ' ').toUpperCase()}
                  </Badge>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
}
