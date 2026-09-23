"use client";

import { Alert, AlertIcon, Button, Flex, Text } from "@chakra-ui/react";

export default function MensagemErro({
  mensagem = "Não foi possível carregar os dados. Tente novamente.",
  aoTentarNovamente,
}: {
  mensagem?: string;
  aoTentarNovamente?: () => void;
}) {
  return (
    <Alert status="error" borderRadius="md" role="alert">
      <AlertIcon />
      <Flex align="center" justify="space-between" gap={4} flex={1} flexWrap="wrap">
        <Text>{mensagem}</Text>
        {aoTentarNovamente && (
          <Button size="sm" variant="outline" onClick={aoTentarNovamente}>
            Tentar novamente
          </Button>
        )}
      </Flex>
    </Alert>
  );
}
