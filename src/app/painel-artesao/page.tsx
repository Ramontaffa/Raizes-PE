'use client';

import {
  Box,
  Heading,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
  useColorModeValue,
} from '@chakra-ui/react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', vendas: 400 },
  { name: 'Fev', vendas: 300 },
  { name: 'Mar', vendas: 550 },
  { name: 'Abr', vendas: 700 },
  { name: 'Mai', vendas: 650 },
  { name: 'Jun', vendas: 900 },
];

export default function ArtesaoDashboard() {
  const bg = useColorModeValue('white', 'gray.800');

  return (
    <Box>
      <Heading mb={6} fontFamily="heading" color="brand.800">Visão Geral</Heading>
      
      <StatGroup mb={10}>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} w="full">
          <Box p={6} bg={bg} rounded="lg" shadow="sm" borderWidth="1px">
            <Stat>
              <StatLabel fontSize="lg">Vendas no Mês</StatLabel>
              <StatNumber fontSize="3xl" color="brand.600">R$ 4.250,00</StatNumber>
              <StatHelpText>
                <StatArrow type="increase" />
                15% em relação ao mês anterior
              </StatHelpText>
            </Stat>
          </Box>
          <Box p={6} bg={bg} rounded="lg" shadow="sm" borderWidth="1px">
            <Stat>
              <StatLabel fontSize="lg">Pedidos Pendentes</StatLabel>
              <StatNumber fontSize="3xl">8</StatNumber>
              <StatHelpText>
                <StatArrow type="decrease" />
                2 atrasados
              </StatHelpText>
            </Stat>
          </Box>
          <Box p={6} bg={bg} rounded="lg" shadow="sm" borderWidth="1px">
            <Stat>
              <StatLabel fontSize="lg">Visualizações no Perfil</StatLabel>
              <StatNumber fontSize="3xl">1.840</StatNumber>
              <StatHelpText>
                <StatArrow type="increase" />
                +240 nesta semana
              </StatHelpText>
            </Stat>
          </Box>
        </SimpleGrid>
      </StatGroup>

      <Box p={6} bg={bg} rounded="lg" shadow="sm" borderWidth="1px" h="400px">
        <Heading size="md" mb={6}>Histórico de Vendas (Últimos 6 meses)</Heading>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="vendas" stroke="#e68c14" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
}
