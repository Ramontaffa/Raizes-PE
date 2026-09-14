"use client";

import { Box, Select, Text } from "@chakra-ui/react";

export default function SeletorFiltro({
  rotulo,
  opcoes,
  valor,
  aoMudar,
}: {
  rotulo: string;
  opcoes: string[];
  valor: string;
  aoMudar: (v: string) => void;
}) {
  return (
    <Box>
      <Text fontSize="0.72rem" color="mutedFg" mb={1}>
        {rotulo}
      </Text>
      <Select
        size="sm"
        borderRadius="md"
        borderColor="border"
        bg="card"
        w="auto"
        minW="160px"
        value={valor}
        onChange={(e) => aoMudar(e.target.value)}
      >
        {opcoes.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </Select>
    </Box>
  );
}
