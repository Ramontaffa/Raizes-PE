"use client";

import {
  Box,
  Heading,
  Text,
  SimpleGrid,
  Flex,
  Badge,
} from "@chakra-ui/react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import type { PontoSerieVendas, DistribuicaoTecnica } from "@/lib/tipos";

type ValorTooltip = number | string | Array<number | string>;

interface GraficoVendasProps {
  historicoMensal: PontoSerieVendas[];
  vendasPorTecnica: DistribuicaoTecnica[];
}

const CORES_TECNICAS = ["#b75c40", "#d9b48f", "#5c735d", "#c48b59", "#8a4530"];

export default function GraficoVendas({
  historicoMensal,
  vendasPorTecnica,
}: GraficoVendasProps) {
  return (
    <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6} mb={10}>
      {/* 1. Gráfico de Evolução de Faturamento */}
      <Box
        bg="card"
        border="1px solid"
        borderColor="border"
        borderRadius="12px"
        p={5}
        boxShadow="sm"
      >
        <Flex justify="space-between" align="center" mb={4}>
          <Box>
            <Heading fontSize="1.05rem" fontWeight={600}>
              Evolução de Faturamento (R$)
            </Heading>
            <Text fontSize="0.8rem" color="mutedFg">
              Desempenho de vendas nos últimos 6 meses
            </Text>
          </Box>
          <Badge bg="rgba(183, 92, 64, 0.12)" color="primary" borderRadius="full" px={2.5} py={0.5} fontSize="0.72rem">
            +12% este mês
          </Badge>
        </Flex>

        <Box h="260px" w="100%">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={historicoMensal} margin={{ top: 10, right: 15, left: -15, bottom: 0 }}>
              <defs>
                <linearGradient id="gradienteFaturamento" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#b75c40" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#b75c40" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
              <XAxis dataKey="mes" tick={{ fontSize: 12, fill: "#737373" }} />
              <YAxis
                tick={{ fontSize: 12, fill: "#737373" }}
                tickFormatter={(val) => `R$${val >= 1000 ? `${(val / 1000).toFixed(1)}k` : val}`}
              />
              <RechartsTooltip
                formatter={(valor: ValorTooltip) => [
                  `R$ ${Number(Array.isArray(valor) ? valor[0] : valor ?? 0).toFixed(2).replace(".", ",")}`,
                  "Faturamento",
                ]}
                contentStyle={{
                  backgroundColor: "#fff",
                  borderRadius: "8px",
                  border: "1px solid #e5e5e5",
                  fontSize: "12px",
                }}
              />
              <Area
                type="monotone"
                dataKey="faturamento"
                stroke="#b75c40"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#gradienteFaturamento)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </Box>
      </Box>

      {/* 2. Gráfico de Vendas por Técnica */}
      <Box
        bg="card"
        border="1px solid"
        borderColor="border"
        borderRadius="12px"
        p={5}
        boxShadow="sm"
      >
        <Flex justify="space-between" align="center" mb={4}>
          <Box>
            <Heading fontSize="1.05rem" fontWeight={600}>
              Vendas por Técnica Artesanal
            </Heading>
            <Text fontSize="0.8rem" color="mutedFg">
              Distribuição percentual da receita acumulada
            </Text>
          </Box>
        </Flex>

        <Box h="260px" w="100%">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={vendasPorTecnica}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={85}
                paddingAngle={4}
                dataKey="porcentagem"
                nameKey="tecnica"
              >
                {vendasPorTecnica.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={CORES_TECNICAS[index % CORES_TECNICAS.length]} />
                ))}
              </Pie>
              <RechartsTooltip
                formatter={(valor: ValorTooltip) => [
                  `${Array.isArray(valor) ? valor[0] : valor}%`,
                  "Participação",
                ]}
                contentStyle={{
                  backgroundColor: "#fff",
                  borderRadius: "8px",
                  border: "1px solid #e5e5e5",
                  fontSize: "12px",
                }}
              />
              <Legend
                verticalAlign="bottom"
                height={36}
                formatter={(value: string) => (
                  <span style={{ fontSize: "12px", color: "#525252" }}>{value}</span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </Box>
      </Box>
    </SimpleGrid>
  );
}
