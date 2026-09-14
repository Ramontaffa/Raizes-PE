"use client";

import { HStack, Button } from "@chakra-ui/react";

export default function FiltroTecnicas({
  opcoes,
  valor,
  aoMudar,
}: {
  opcoes: string[];
  valor: string;
  aoMudar: (v: string) => void;
}) {
  return (
    <HStack spacing={2} flexWrap="wrap">
      {opcoes.map((opcao) => {
        const ativo = opcao === valor;
        return (
          <Button
            key={opcao}
            size="sm"
            borderRadius="full"
            variant="outline"
            bg={ativo ? "fg" : "card"}
            color={ativo ? "bg" : "fg"}
            borderColor={ativo ? "fg" : "border"}
            _hover={{ opacity: 0.9 }}
            onClick={() => aoMudar(opcao)}
          >
            {opcao}
          </Button>
        );
      })}
    </HStack>
  );
}
