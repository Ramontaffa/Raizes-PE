"use client";

import { useEffect, useMemo, useState } from "react";
import { Badge, Box, Button, Flex, Heading, Table, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import { artesaos } from "@/lib/dadosFalsos";
import { useProdutos } from "@/lib/contextoProdutos";

const CHAVE_MODERACAO = "raizes-pe:moderacao-produtos";
const EM_REVISAO_INICIAL = new Set(["p1", "p5"]);
type AcaoModeracao = "aprovado" | "removido";

export default function ModeracaoProdutosPage() {
  const { produtosDoArtesao } = useProdutos();
  const [moderacao, setModeracao] = useState<Record<string, AcaoModeracao> | null>(null);

  useEffect(() => {
    try {
      const salvo: unknown = JSON.parse(localStorage.getItem(CHAVE_MODERACAO) ?? "{}");
      setModeracao(typeof salvo === "object" && salvo !== null && !Array.isArray(salvo)
        ? Object.fromEntries(Object.entries(salvo).filter(([, acao]) => acao === "aprovado" || acao === "removido"))
        : {});
    } catch {
      setModeracao({});
    }
  }, []);

  useEffect(() => {
    if (moderacao === null) return;
    try {
      localStorage.setItem(CHAVE_MODERACAO, JSON.stringify(moderacao));
    } catch {
      // A moderação continua válida nesta sessão.
    }
  }, [moderacao]);

  function mudarStatus(id: string, acao: AcaoModeracao) {
    setModeracao((atual) => ({ ...atual, [id]: acao }));
  }

  // Todos os produtos da plataforma: cada artesão contribui com os seus (mock + criados no app).
  const produtos = useMemo(
    () => artesaos.flatMap((a) => produtosDoArtesao(a.usuarioId)),
    [produtosDoArtesao]
  );

  return (
    <Box>
      <Heading fontSize="1.9rem" mb={6}>
        Moderação de Produtos
      </Heading>
      <Text color="mutedFg" fontSize="sm" mb={4}>Moderação de demonstração: as alterações desta tabela ficam salvas neste navegador.</Text>

      <Box bg="card" border="1px solid" borderColor="border" borderRadius="10px" overflowX="auto">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Produto</Th>
              <Th>Artesão</Th>
              <Th>Categoria</Th>
              <Th>Status</Th>
              <Th>Ações</Th>
            </Tr>
          </Thead>
          <Tbody>
            {moderacao === null && <Tr><Td colSpan={5}>Carregando produtos...</Td></Tr>}
            {moderacao !== null && produtos.filter((produto) => moderacao[produto.id] !== "removido").map((produto) => {
              const emRevisao = EM_REVISAO_INICIAL.has(produto.id) && moderacao[produto.id] !== "aprovado";

              return (
                <Tr key={produto.id}>
                  <Td fontWeight={500}>{produto.nome}</Td>
                  <Td>{produto.artesaoNome}</Td>
                  <Td>{produto.categoria}</Td>
                  <Td>
                    <Badge
                      bg={emRevisao ? "secondary" : "accent"}
                      color={emRevisao ? "secondaryFg" : "accentFg"}
                      borderRadius="full"
                      px={3}
                      textTransform="none"
                    >
                      {emRevisao ? "Em Revisão" : "Aprovado"}
                    </Badge>
                  </Td>
                  <Td>
                    <Flex gap={2}>
                      {emRevisao && (
                        <Button size="sm" variant="solid" onClick={() => mudarStatus(produto.id, "aprovado")}>
                          Aprovar
                        </Button>
                      )}
                      <Button size="sm" variant="outline" color="red.600" borderColor="red.200" onClick={() => {
                        if (window.confirm(`Remover "${produto.nome}" desta tabela?`)) mudarStatus(produto.id, "removido");
                      }}>
                        Remover
                      </Button>
                    </Flex>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
}
