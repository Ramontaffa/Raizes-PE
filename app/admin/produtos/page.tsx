"use client";

import { useMemo } from "react";
import { Badge, Box, Button, Flex, Heading, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { artesaos } from "@/lib/dadosFalsos";
import { useProdutos } from "@/lib/contextoProdutos";

export default function ModeracaoProdutosPage() {
  const { produtosDoArtesao } = useProdutos();

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
            {produtos.map((produto, indice) => {
              // Ainda não existe status de moderação no modelo: um a cada cinco aparece em
              // revisão só para demonstrar o fluxo (igual à versão da branch mvp).
              const emRevisao = indice % 5 === 0;

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
                        <Button size="sm" variant="solid">
                          Aprovar
                        </Button>
                      )}
                      <Button size="sm" variant="outline" color="red.600" borderColor="red.200">
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
