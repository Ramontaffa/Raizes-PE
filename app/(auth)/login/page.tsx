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
// Os e-mails são os mesmos usuários mock já usados como "usuário demo" em outras telas
// (u2 no /painel, u7 no carrinho/pedidos), pra o que aparece depois do login bater com
// quem "logou". O admin (u9) existe só pra isso — não tem outra tela que dependa dele.
const CREDENCIAL_COMPRADOR = { email: "ana.beatriz@raizespe.dev", senha: "demo123" };
const CREDENCIAL_ARTESAO = { email: "tacaratu@raizespe.dev", senha: "demo123" };
const CREDENCIAL_ADMIN = { email: "admin@raizespe.dev", senha: "demo123" };

interface CredencialLogin {
  email: string;
  senha: string;
}

function conferir(informado: CredencialLogin, esperado: CredencialLogin): boolean {
  return (
    informado.email.trim().toLowerCase() === esperado.email && informado.senha === esperado.senha
  );
}

// Um form de login por perfil (Comprador/Artesão/Admin): mesmos campos e mesmo
// comportamento de erro, só muda a credencial esperada, o texto do botão e pra onde vai.
function FormularioLogin({
  rotuloEmail,
  textoBotao,
  credencialEsperada,
  destino,
}: {
  rotuloEmail: string;
  textoBotao: string;
  credencialEsperada: CredencialLogin;
  destino: string;
}) {
  const router = useRouter();
  const toast = useToast();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!conferir({ email, senha }, credencialEsperada)) {
      setErro(true);
      return;
    }
    setErro(false);
    toast({ title: "Login realizado", status: "success", duration: 2000, isClosable: true, position: "top" });
    router.push(destino);
  }

  return (
    <form onSubmit={handleSubmit}>
      <VStack spacing={4}>
        {erro && (
          <Alert status="error" borderRadius="8px" fontSize="0.86rem">
            <AlertIcon />
            E-mail ou senha incorretos.
          </Alert>
        )}
        <FormControl>
          <FormLabel>{rotuloEmail}</FormLabel>
          <Input
            type="email"
            placeholder="email@exemplo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Senha</FormLabel>
          <Input
            type="password"
            placeholder="********"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
        </FormControl>
        <Button type="submit" variant="solid" w="full">
          {textoBotao}
        </Button>
      </VStack>
    </form>
  );
}

export default function LoginPage() {
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
          <Text color="mutedFg">
            Admin: <Code fontSize="0.8em">{CREDENCIAL_ADMIN.email}</Code> /{" "}
            <Code fontSize="0.8em">{CREDENCIAL_ADMIN.senha}</Code>
          </Text>
        </Box>

        <Tabs isFitted variant="enclosed" colorScheme="terracota">
          <TabList mb="1em">
            <Tab>Comprador</Tab>
            <Tab>Artesão</Tab>
            <Tab>Admin</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <FormularioLogin
                rotuloEmail="E-mail"
                textoBotao="Entrar"
                credencialEsperada={CREDENCIAL_COMPRADOR}
                destino="/"
              />
            </TabPanel>
            <TabPanel>
              <FormularioLogin
                rotuloEmail="E-mail (Artesão)"
                textoBotao="Entrar no Painel do Artesão"
                credencialEsperada={CREDENCIAL_ARTESAO}
                // Painel do artesão já existe em /painel — não em /painel-artesao.
                destino="/painel"
              />
            </TabPanel>
            <TabPanel>
              <FormularioLogin
                rotuloEmail="E-mail (Admin)"
                textoBotao="Entrar na Administração"
                credencialEsperada={CREDENCIAL_ADMIN}
                destino="/admin"
              />
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
