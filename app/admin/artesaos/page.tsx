"use client";

import { useState } from "react";
import { Badge, Box, Button, Flex, Heading, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import NextLink from "next/link";
import { artesaos, usuarios } from "@/lib/dadosFalsos";
import { useProdutos } from "@/lib/contextoProdutos";

export default function GestaoArtesaosPage() {
  const { produtosDoArtesao } = useProdutos();
  const [aprovado, setAprovado] = useState(false);

  return (
    <Box>
      <Heading fontSize="1.9rem" mb={6}>
        Gestão de Artesãos
      </Heading>

      <Box bg="card" border="1px solid" borderColor="border" borderRadius="10px" overflowX="auto">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Artesão</Th>
              <Th>Região</Th>
              <Th>Técnicas</Th>
              <Th>Status</Th>
              <Th>Ações</Th>
            </Tr>
          </Thead>
          <Tbody>
            {artesaos.map((artesao, indice) => {
              const nome = usuarios.find((u) => u.id === artesao.usuarioId)?.nome ?? "Desconhecido";
              // Técnicas que o artesão de fato trabalha = técnicas dos produtos dele.
              const tecnicas = Array.from(
                new Set(produtosDoArtesao(artesao.usuarioId).map((p) => p.tecnica))
              );
              // Ainda não existe status de aprovação no modelo: o primeiro aparece como
              // pendente só para demonstrar o fluxo (igual à versão da branch mvp).
              const pendente = indice === 0 && !aprovado;

              return (
                <Tr key={artesao.id}>
                  <Td fontWeight={500}>{nome}</Td>
                  <Td>{artesao.regiaoOrigem}</Td>
                  <Td>
                    <Flex wrap="wrap" gap={1}>
                      {tecnicas.map((tecnica) => (
                        <Badge key={tecnica} bg="muted" color="mutedFg" textTransform="none">
                          {tecnica}
                        </Badge>
                      ))}
                    </Flex>
                  </Td>
                  <Td>
                    <Badge
                      bg={pendente ? "secondary" : "accent"}
                      color={pendente ? "secondaryFg" : "accentFg"}
                      borderRadius="full"
                      px={3}
                      textTransform="none"
                    >
                      {pendente ? "Pendente" : "Aprovado"}
                    </Badge>
                  </Td>
                  <Td>
                    <Flex gap={2}>
                      <Button as={NextLink} href={`/artesao/${artesao.id}`} size="sm" variant="outline">
                        Ver Perfil
                      </Button>
                      {pendente && (
                        <Button size="sm" variant="solid" onClick={() => setAprovado(true)}>
                          Aprovar
                        </Button>
                      )}
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
