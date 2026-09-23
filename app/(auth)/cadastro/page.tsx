"use client";

import { FormEvent } from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/navigation";

export default function CadastroPage() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();

  function handleCadastroSimulacao(e: FormEvent) {
    e.preventDefault();
    onOpen();
  }

  function handleIrParaLogin() {
    onClose();
    router.push("/login");
  }

  return (
    <Container maxW="md" py={20}>
      <Box bg="card" p={8} rounded="lg" shadow="md" borderWidth="1px" borderColor="border">
        <Heading fontFamily="heading" color="fg" mb={2} textAlign="center">
          Criar nova conta
        </Heading>
        <Text textAlign="center" color="mutedFg" mb={6}>
          Junte-se à nossa rede de Economia Criativa
        </Text>

        <VStack spacing={4} as="form" onSubmit={handleCadastroSimulacao}>
          <FormControl isRequired>
            <FormLabel>Nome Completo</FormLabel>
            <Input type="text" placeholder="Seu nome" />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>E-mail</FormLabel>
            <Input type="email" placeholder="email@exemplo.com" />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Senha</FormLabel>
            <Input type="password" placeholder="********" />
          </FormControl>

          <Button type="submit" variant="solid" w="full" mt={4}>
            Cadastrar (Simulação)
          </Button>
        </VStack>

        <Text textAlign="center" mt={4} fontSize="sm" color="mutedFg">
          Já possui conta?{" "}
          <Text
            as={NextLink}
            href="/login"
            color="primary"
            fontWeight={500}
            _hover={{ textDecoration: "underline" }}
          >
            Faça Login
          </Text>
        </Text>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent mx={4} bg="card" color="fg">
          <ModalHeader textAlign="center" color="accent">
            🎉 Conta Criada!
          </ModalHeader>
          <ModalCloseButton />

          <ModalBody textAlign="center">
            <Text color="mutedFg" mb={3}>
              Sua conta de simulação foi gerada com sucesso para a rede de Economia Criativa.
            </Text>
            <Text color="mutedFg" fontSize="0.82rem">
              Este cadastro é só uma demonstração visual — os dados não ficam salvos. Para
              entrar de verdade, use um dos logins de demonstração mostrados na tela de login.
            </Text>
          </ModalBody>

          <ModalFooter justifyContent="center">
            <Button variant="solid" onClick={handleIrParaLogin}>
              Ir para o Login
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
}
