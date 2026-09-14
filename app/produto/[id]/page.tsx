"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import NextLink from "next/link";
import {
  Box,
  Grid,
  Heading,
  Text,
  Badge,
  Button,
  HStack,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { FiArrowLeft, FiMapPin } from "react-icons/fi";
import BarraNavegacao from "@/components/BarraNavegacao";
import GradeProdutos from "@/components/GradeProdutos";
import ResumoAvaliacao from "@/components/ResumoAvaliacao";
import {
  getProdutoPorId,
  getProdutosRelacionados,
  getResumoAvaliacoes,
} from "@/lib/apiFalsa";
import type { ProdutoComArtesao, ResumoAvaliacoes } from "@/lib/tipos";

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

export default function Pagina() {
  const parametros = useParams<{ id: string }>();
  const [produto, setProduto] = useState<ProdutoComArtesao | null | undefined>(undefined);
  const [relacionados, setRelacionados] = useState<ProdutoComArtesao[]>([]);
  const [resumoAvaliacoes, setResumoAvaliacoes] = useState<ResumoAvaliacoes | null>(null);

  useEffect(() => {
    let ativo = true;
    getProdutoPorId(parametros.id).then((p) => {
      if (!ativo) return;
      setProduto(p ?? null);
    });
    return () => {
      ativo = false;
    };
  }, [parametros.id]);

  useEffect(() => {
    if (!produto) return;
    getProdutosRelacionados(produto.id).then(setRelacionados);
    getResumoAvaliacoes(produto.id).then(setResumoAvaliacoes);
  }, [produto]);

  if (produto === undefined) {
    return (
      <>
        <BarraNavegacao />
        <Box maxW="1180px" mx="auto" px={{ base: 5, md: 10 }} py={20} textAlign="center">
          <Text color="mutedFg">Carregando produto...</Text>
        </Box>
      </>
    );
  }

  if (produto === null) {
    return (
      <>
        <BarraNavegacao />
        <Box maxW="1180px" mx="auto" px={{ base: 5, md: 10 }} py={20} textAlign="center">
          <Heading fontSize="1.5rem" mb={3}>
            Produto não encontrado
          </Heading>
          <Text color="mutedFg" mb={6}>
            Esse produto pode ter sido removido ou o endereço está incorreto.
          </Text>
          <Button as={NextLink} href="/" variant="solid">
            Voltar à vitrine
          </Button>
        </Box>
      </>
    );
  }

  const ehRenda = produto.tecnica === "Renda e Bordado";

  return (
    <>
      <BarraNavegacao />
      <Box maxW="1180px" mx="auto" px={{ base: 5, md: 10 }} py={10}>
        <ChakraLink
          as={NextLink}
          href="/"
          display="inline-flex"
          alignItems="center"
          gap={2}
          fontSize="0.88rem"
          color="mutedFg"
          mb={8}
          _hover={{ color: "primary" }}
        >
          <FiArrowLeft /> Voltar à vitrine
        </ChakraLink>

        <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={12} mb={20}>
          <Box
            h={{ base: "320px", md: "480px" }}
            borderRadius="12px"
            bg={ehRenda ? "secondary" : undefined}
            backgroundImage={ehRenda ? PADRAO_RENDA : ARTE_POR_TECNICA[produto.tecnica]}
            backgroundSize={ehRenda ? "18px 18px" : "cover"}
          />

          <Box>
            <Badge
              bg="accent"
              color="accentFg"
              borderRadius="full"
              px={3}
              py={0.5}
              fontSize="0.72rem"
              fontWeight={600}
              mb={3}
              textTransform="none"
            >
              {produto.tecnica}
            </Badge>

            <Heading fontSize="2rem" mb={3}>
              {produto.nome}
            </Heading>

            {resumoAvaliacoes && (
              <Box mb={4}>
                <ResumoAvaliacao resumo={resumoAvaliacoes} />
              </Box>
            )}

            <Text fontSize="1.6rem" fontWeight={600} mb={5}>
              R$ {produto.preco.toFixed(2).replace(".", ",")}
            </Text>

            <Text color="mutedFg" lineHeight={1.7} mb={7}>
              {produto.descricao}
            </Text>

            <Button variant="solid" size="lg" mb={8}>
              Adicionar ao carrinho
            </Button>

            <Box bg="card" border="1px solid" borderColor="border" borderRadius="10px" p={5}>
              <Text fontSize="0.8rem" color="mutedFg" mb={1}>
                Feito por
              </Text>
              <ChakraLink
                as={NextLink}
                href={`/artesao/${produto.artesaoId}`}
                fontFamily="heading"
                fontSize="1.1rem"
                fontWeight={500}
                _hover={{ color: "primary" }}
              >
                {produto.artesaoNome}
              </ChakraLink>
              <HStack fontSize="0.82rem" color="mutedFg" mt={1} spacing={1}>
                <FiMapPin size={12} />
                <Text>{produto.artesaoRegiao}</Text>
              </HStack>
            </Box>
          </Box>
        </Grid>

        {relacionados.length > 0 && (
          <Box pb={10}>
            <Heading fontSize="1.3rem" mb={6}>
              Você também pode gostar
            </Heading>
            <GradeProdutos produtos={relacionados} colunas={3} />
          </Box>
        )}
      </Box>
    </>
  );
}
