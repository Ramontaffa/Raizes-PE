import { Flex, Box, Text, Button } from "@chakra-ui/react";
import type { ProdutoComArtesao } from "@/lib/tipos";

const MINIATURA_POR_TECNICA: Record<string, string> = {
  Cerâmica:
    "radial-gradient(circle at 70% 20%, rgba(255,255,255,.4), transparent 50%), linear-gradient(160deg, #e4c9a6, #b75c40 80%)",
  Têxtil:
    "repeating-linear-gradient(60deg, #e8dbce 0px, #e8dbce 8px, #cbb79f 8px, #cbb79f 16px)",
  Madeira:
    "repeating-linear-gradient(180deg, #7a4a30 0px, #7a4a30 4px, #6b3f28 4px, #6b3f28 8px)",
  Palha:
    "repeating-linear-gradient(90deg, #e3c98a 0px, #e3c98a 8px, #cdae6b 8px, #cdae6b 16px)",
  "Renda e Bordado": "radial-gradient(circle, rgba(74,59,50,.28) 1.6px, transparent 1.7px)",
};

export default function LinhaProduto({ produto }: { produto: ProdutoComArtesao }) {
  return (
    <Flex
      align="center"
      gap={4}
      px={5}
      py={4}
      borderBottom="1px solid"
      borderColor="border"
      _last={{ borderBottom: "none" }}
    >
      <Box
        w="56px"
        h="56px"
        borderRadius="8px"
        flexShrink={0}
        backgroundImage={MINIATURA_POR_TECNICA[produto.tecnica]}
        backgroundSize={produto.tecnica === "Renda e Bordado" ? "14px 14px" : "cover"}
      />
      <Box flex={1}>
        <Text fontWeight={500}>{produto.nome}</Text>
        <Text fontSize="0.82rem" color="mutedFg">
          {produto.tecnica}
        </Text>
      </Box>
      <Box textAlign="right" mr={2}>
        <Text fontSize="0.82rem" color="mutedFg">
          {produto.estoqueQtd} em estoque
        </Text>
        <Text fontWeight={500}>R$ {produto.preco.toFixed(2).replace(".", ",")}</Text>
      </Box>
      <Button variant="outline" size="sm" borderColor="border" color="primary">
        Editar
      </Button>
    </Flex>
  );
}
