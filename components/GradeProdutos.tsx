import { Box, Text } from "@chakra-ui/react";
import CartaoProduto from "./CartaoProduto";
import type { ProdutoComArtesao } from "@/lib/tipos";

// Alturas cicladas para dar variedade de recorte tipo mosaico, sem depender do id do produto.
const ALTURAS = ["320px", "240px", "190px", "260px"];

export default function GradeProdutos({
  produtos,
  carregando = false,
  mensagemVazia = "Nenhum produto encontrado.",
  colunas = 3,
}: {
  produtos: ProdutoComArtesao[];
  carregando?: boolean;
  mensagemVazia?: string;
  colunas?: number;
}) {
  if (!carregando && produtos.length === 0) {
    return (
      <Text color="mutedFg" py={16} textAlign="center">
        {mensagemVazia}
      </Text>
    );
  }

  return (
    <Box
      sx={{ columnCount: { base: 1, md: colunas }, columnGap: "28px" }}
      opacity={carregando ? 0.5 : 1}
      transition="opacity .15s"
    >
      {produtos.map((p, i) => (
        <CartaoProduto key={p.id} produto={p} altura={ALTURAS[i % ALTURAS.length]} />
      ))}
    </Box>
  );
}
