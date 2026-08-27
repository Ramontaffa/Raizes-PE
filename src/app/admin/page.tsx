'use client';

import {
  Box,
  Heading,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatGroup,
  useColorModeValue,
} from '@chakra-ui/react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Cerâmica', vendas: 4000 },
  { name: 'Madeira', vendas: 3000 },
  { name: 'Tecido', vendas: 2000 },
  { name: 'Fibras', vendas: 2780 },
  { name: 'Couro', vendas: 1890 },
];

export default function AdminDashboard() {
  const bg = useColorModeValue('white', 'gray.800');

  return (
    <Box>
      <Heading mb={6} fontFamily="heading" color="brand.800">Visão Geral da Plataforma</Heading>
      
      <StatGroup mb={10}>
        <SimpleGrid columns={{ base: 1, md: 4 }} spacing={6} w="full">
          <Box p={6} bg={bg} rounded="lg" shadow="sm" borderWidth="1px">
            <Stat>
              <StatLabel fontSize="lg">Total de Vendas (Mês)</StatLabel>
              <StatNumber fontSize="3xl" color="brand.600">R$ 145.250</StatNumber>
              <StatHelpText>R$ 12.000 repassados para a plataforma</StatHelpText>
            </Stat>
          </Box>
          <Box p={6} bg={bg} rounded="lg" shadow="sm" borderWidth="1px">
            <Stat>
              <StatLabel fontSize="lg">Artesãos Ativos</StatLabel>
              <StatNumber fontSize="3xl">124</StatNumber>
              <StatHelpText>+12 este mês</StatHelpText>
            </Stat>
          </Box>
          <Box p={6} bg={bg} rounded="lg" shadow="sm" borderWidth="1px">
            <Stat>
              <StatLabel fontSize="lg">Produtos Cadastrados</StatLabel>
              <StatNumber fontSize="3xl">1.840</StatNumber>
              <StatHelpText>45 em moderação</StatHelpText>
            </Stat>
          </Box>
          <Box p={6} bg={bg} rounded="lg" shadow="sm" borderWidth="1px">
            <Stat>
              <StatLabel fontSize="lg">Pedidos (Mês)</StatLabel>
              <StatNumber fontSize="3xl">890</StatNumber>
              <StatHelpText>95% entregues no prazo</StatHelpText>
            </Stat>
          </Box>
        </SimpleGrid>
      </StatGroup>

      <Box p={6} bg={bg} rounded="lg" shadow="sm" borderWidth="1px" h="400px">
        <Heading size="md" mb={6}>Vendas por Categoria</Heading>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="vendas" fill="#0c67b3" />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
}
