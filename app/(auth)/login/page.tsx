"use client";

import { FormEvent, useState } from "react";
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
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Alert,
  AlertIcon,
  Code,
  useToast,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/navigation";

// Logins fixos de demonstração — pedidos pra que o professor consiga testar o fluxo
// sem precisar de um cadastro persistido de verdade (o projeto ainda não tem backend).
// O e-mail do artesão é o mesmo usuário (u2, Cooperativa de Tacaratu) que o /painel já usa
// como ID_USUARIO_DEMO, então o login bate com os dados que aparecem lá dentro.
const CREDENCIAL_ARTESAO = { email: "tacaratu@raizespe.dev", senha: "demo123" };
// Mesma lógica pro comprador: é o u7 (Ana Beatriz), já usado como ID_COMPRADOR_DEMO
// no carrinho e em "Meus Pedidos".
const CREDENCIAL_COMPRADOR = { email: "ana.beatriz@raizespe.dev", senha: "demo123" };

export default function LoginPage() {
  const router = useRouter();
  const toast = useToast();

  const [emailComprador, setEmailComprador] = useState("");
  const [senhaComprador, setSenhaComprador] = useState("");
  const [emailArtesao, setEmailArtesao] = useState("");
  const [senhaArtesao, setSenhaArtesao] = useState("");
  const [erroComprador, setErroComprador] = useState(false);
  const [erroArtesao, setErroArtesao] = useState(false);

  function handleLoginComprador(e: FormEvent) {
    e.preventDefault();
    const ok =
      emailComprador.trim().toLowerCase() === CREDENCIAL_COMPRADOR.email &&
      senhaComprador === CREDENCIAL_COMPRADOR.senha;

    if (!ok) {
      setErroComprador(true);
      return;
    }
    setErroComprador(false);
    toast({ title: "Login realizado", status: "success", duration: 2000, isClosable: true, position: "top" });
    router.push("/");
  }

  function handleLoginArtesao(e: FormEvent) {
    e.preventDefault();
    const ok =
      emailArtesao.trim().toLowerCase() === CREDENCIAL_ARTESAO.email &&
      senhaArtesao === CREDENCIAL_ARTESAO.senha;

    if (!ok) {
      setErroArtesao(true);
      return;
    }
    setErroArtesao(false);
    toast({ title: "Login realizado", status: "success", duration: 2000, isClosable: true, position: "top" });
    // Painel do artesão já existe em /painel — não em /painel-artesao.
    router.push("/painel");
  }

  return (
    <Container maxW="md" py={20}>
      <Box bg="card" p={8} rounded="lg" shadow="md" borderWidth="1px" borderColor="border">
        <Heading fontFamily="heading" color="fg" mb={2} textAlign="center">
          Acesse sua conta
        </Heading>
        <Text textAlign="center" color="mutedFg" mb={6}>
          Simulação de Login
        </Text>

        <Box bg="muted" border="1px solid" borderColor="border" borderRadius="8px" p={3} mb={6} fontSize="0.82rem">
          <Text fontWeight={600} mb={1}>
            Login de demonstração
          </Text>
          <Text color="mutedFg">
            Comprador: <Code fontSize="0.8em">{CREDENCIAL_COMPRADOR.email}</Code> /{" "}
            <Code fontSize="0.8em">{CREDENCIAL_COMPRADOR.senha}</Code>
          </Text>
          <Text color="mutedFg">
            Artesão: <Code fontSize="0.8em">{CREDENCIAL_ARTESAO.email}</Code> /{" "}
            <Code fontSize="0.8em">{CREDENCIAL_ARTESAO.senha}</Code>
          </Text>
        </Box>

        <Tabs isFitted variant="enclosed" colorScheme="terracota">
          <TabList mb="1em">
            <Tab>Comprador</Tab>
            <Tab>Artesão</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <form onSubmit={handleLoginComprador}>
                <VStack spacing={4}>
                  {erroComprador && (
                    <Alert status="error" borderRadius="8px" fontSize="0.86rem">
                      <AlertIcon />
                      E-mail ou senha incorretos.
                    </Alert>
                  )}
                  <FormControl>
                    <FormLabel>E-mail</FormLabel>
                    <Input
                      type="email"
                      placeholder="email@exemplo.com"
                      value={emailComprador}
                      onChange={(e) => setEmailComprador(e.target.value)}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Senha</FormLabel>
                    <Input
                      type="password"
                      placeholder="********"
                      value={senhaComprador}
                      onChange={(e) => setSenhaComprador(e.target.value)}
                    />
                  </FormControl>
                  <Button type="submit" variant="solid" w="full">
                    Entrar
                  </Button>
                </VStack>
              </form>
            </TabPanel>
            <TabPanel>
              <form onSubmit={handleLoginArtesao}>
                <VStack spacing={4}>
                  {erroArtesao && (
                    <Alert status="error" borderRadius="8px" fontSize="0.86rem">
                      <AlertIcon />
                      E-mail ou senha incorretos.
                    </Alert>
                  )}
                  <FormControl>
                    <FormLabel>E-mail (Artesão)</FormLabel>
                    <Input
                      type="email"
                      placeholder="artesao@exemplo.com"
                      value={emailArtesao}
                      onChange={(e) => setEmailArtesao(e.target.value)}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Senha</FormLabel>
                    <Input
                      type="password"
                      placeholder="********"
                      value={senhaArtesao}
                      onChange={(e) => setSenhaArtesao(e.target.value)}
                    />
                  </FormControl>
                  <Button type="submit" variant="solid" w="full">
                    Entrar no Painel do Artesão
                  </Button>
                </VStack>
              </form>
            </TabPanel>
          </TabPanels>
        </Tabs>

        <Text textAlign="center" mt={4} fontSize="sm" color="mutedFg">
          Ainda não tem conta?{" "}
          <Text
            as={NextLink}
            href="/cadastro"
            color="primary"
            fontWeight={500}
            _hover={{ textDecoration: "underline" }}
          >
            Cadastre-se
          </Text>
        </Text>
      </Box>
    </Container>
  );
}
