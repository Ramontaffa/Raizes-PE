import { Box, Text } from "@chakra-ui/react";

type Tom = "bom" | "atencao";

export default function CartaoEstatistica({
  rotulo,
  valor,
  variacao,
  tom = "bom",
}: {
  rotulo: string;
  valor: string;
  variacao: string;
  tom?: Tom;
}) {
  const corTom = tom === "atencao" ? "#c98a3e" : undefined;

  return (
    <Box
      bg="card"
      borderLeft="3px solid"
      borderColor={tom === "atencao" ? corTom : "accent"}
      borderRadius="6px"
      p={5}
    >
      <Text fontSize="0.85rem" color="mutedFg">
        {rotulo}
      </Text>
      <Text fontFamily="heading" fontSize="2.1rem" fontWeight={500} my={1}>
        {valor}
      </Text>
      <Text fontSize="0.82rem" color={tom === "atencao" ? corTom : "accent"}>
        {variacao}
      </Text>
    </Box>
  );
}
