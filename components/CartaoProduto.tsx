import { Box, Text, Badge, HStack, Link as ChakraLink } from "@chakra-ui/react";
import NextLink from "next/link";
import { FiMapPin } from "react-icons/fi";
import type { ProdutoComArtesao } from "@/lib/tipos";

const ARTE_POR_TECNICA: Record<string, string> = {
  Cerâmica:
    "radial-gradient(circle at 70% 20%, rgba(255,255,255,.4), transparent 50%), linear-gradient(160deg, #e4c9a6, #b75c40 80%)",
  Têxtil:
    "repeating-linear-gradient(115deg, #e8dbce 0px, #e8dbce 10px, #d8c3ae 10px, #d8c3ae 20px)",
  Madeira:
    "repeating-linear-gradient(180deg, #7a4a30 0px, #7a4a30 4px, #6b3f28 4px, #6b3f28 8px)",
  Palha:
    "repeating-linear-gradient(90deg, #e3c98a 0px, #e3c98a 8px, #cdae6b 8px, #cdae6b 16px)",
};

const PADRAO_RENDA = "radial-gradient(circle, rgba(74,59,50,.28) 1.6px, transparent 1.7px)";

export default function CartaoProduto({
  produto,
  altura = "260px",
}: {
  produto: ProdutoComArtesao;
  altura?: string;
}) {
  const ehRenda = produto.tecnica === "Renda e Bordado";

  return (
    <Box as="article" mb={7} sx={{ breakInside: "avoid" }}>
      <ChakraLink as={NextLink} href={`/produto/${produto.id}`} _hover={{ textDecoration: "none" }} display="block">
        <Box
          h={altura}
          borderRadius="8px"
          mb={3}
          bg={ehRenda ? "secondary" : undefined}
          backgroundImage={ehRenda ? PADRAO_RENDA : ARTE_POR_TECNICA[produto.tecnica]}
          backgroundSize={ehRenda ? "14px 14px" : "cover"}
        />
        <Badge
          bg="accent"
          color="accentFg"
          borderRadius="full"
          px={3}
          py={0.5}
          fontSize="0.7rem"
          fontWeight={600}
          mb={2}
          textTransform="none"
        >
          {produto.tecnica}
        </Badge>
        <Text fontFamily="heading" fontSize="1.05rem" fontWeight={500} mb={1} _hover={{ textDecoration: "underline" }}>
          {produto.nome}
        </Text>
      </ChakraLink>

      <ChakraLink
        as={NextLink}
        href={`/artesao/${produto.artesaoId}`}
        fontSize="0.86rem"
        color="mutedFg"
        display="block"
        mb={1}
        _hover={{ color: "primary" }}
      >
        por {produto.artesaoNome}
      </ChakraLink>

      <HStack fontSize="0.78rem" color="mutedFg" mb={2} spacing={1}>
        <FiMapPin size={12} />
        <Text>{produto.artesaoRegiao}</Text>
      </HStack>
      <Text fontWeight={600}>R$ {produto.preco.toFixed(2).replace(".", ",")}</Text>
    </Box>
  );
}
