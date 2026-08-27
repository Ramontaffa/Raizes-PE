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
  Select,
  Text,
  useColorModeValue,
  Stack,
  useBreakpointValue,
  Flex,
} from '@chakra-ui/react';
import { pedidosMock } from '@/mock';

const statusColorMap: Record<string, string> = {
  novo: 'blue',
  em_preparo: 'yellow',
  enviado: 'orange',
  entregue: 'green',
};

export default function PedidosPage() {
  const bg = useColorModeValue('white', 'gray.800');
  const isMobile = useBreakpointValue({ base: true, md: false });
  
  const meusPedidos = pedidosMock.filter(p => p.artesaoId === 'art-1');

  return (
    <Box>
      <Heading fontFamily="heading" color="brand.800" mb={6}>Pedidos Recebidos</Heading>

      {isMobile ? (
        <Stack spacing={4}>
          {meusPedidos.map((pedido) => (
            <Box key={pedido.id} p={4} bg={bg} rounded="lg" shadow="sm" borderWidth="1px">
              <Flex justify="space-between" mb={2}>
                <Text fontWeight="bold">#{pedido.id}</Text>
                <Badge colorScheme={statusColorMap[pedido.status]}>{pedido.status.replace('_', ' ').toUpperCase()}</Badge>
              </Flex>
              <Text>Comprador: {pedido.compradorNome}</Text>
              <Text>Data: {new Date(pedido.data).toLocaleDateString()}</Text>
              <Text fontWeight="bold" mt={2}>Total: R$ {pedido.total.toFixed(2)}</Text>
              <Select defaultValue={pedido.status} size="sm" mt={4}>
                <option value="novo">Novo</option>
                <option value="em_preparo">Em Preparo</option>
                <option value="enviado">Enviado</option>
                <option value="entregue">Entregue</option>
              </Select>
            </Box>
          ))}
        </Stack>
      ) : (
        <Box bg={bg} rounded="lg" shadow="sm" borderWidth="1px" overflowX="auto">
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Pedido</Th>
                <Th>Data</Th>
                <Th>Comprador</Th>
                <Th isNumeric>Total</Th>
                <Th>Status</Th>
                <Th>Ação</Th>
              </Tr>
            </Thead>
            <Tbody>
              {meusPedidos.map((pedido) => (
                <Tr key={pedido.id}>
                  <Td fontWeight="bold">#{pedido.id}</Td>
                  <Td>{new Date(pedido.data).toLocaleDateString()}</Td>
                  <Td>{pedido.compradorNome}</Td>
                  <Td isNumeric>R$ {pedido.total.toFixed(2)}</Td>
                  <Td>
                    <Badge colorScheme={statusColorMap[pedido.status]}>
                      {pedido.status.replace('_', ' ').toUpperCase()}
                    </Badge>
                  </Td>
                  <Td>
                    <Select defaultValue={pedido.status} size="sm" w="140px">
                      <option value="novo">Novo</option>
                      <option value="em_preparo">Em Preparo</option>
                      <option value="enviado">Enviado</option>
                      <option value="entregue">Entregue</option>
                    </Select>
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
