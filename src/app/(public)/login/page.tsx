'use client';

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
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = (e: React.FormEvent, isArtesao: boolean) => {
    e.preventDefault();
    if (isArtesao) {
      router.push('/painel-artesao');
    } else {
      router.push('/admin'); // Admin just for testing purposes
    }
  };

  return (
    <Container maxW="md" py={20}>
      <Box bg="white" p={8} rounded="lg" shadow="md" borderWidth="1px">
        <Heading fontFamily="heading" color="brand.800" mb={2} textAlign="center">
          Acesse sua conta
        </Heading>
        <Text textAlign="center" color="gray.500" mb={6}>
          Simulação de Login
        </Text>

        <Tabs isFitted variant="enclosed" colorScheme="brand">
          <TabList mb="1em">
            <Tab>Comprador / Admin</Tab>
            <Tab>Artesão</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <form onSubmit={(e) => handleLogin(e, false)}>
                <VStack spacing={4}>
                  <FormControl>
                    <FormLabel>E-mail</FormLabel>
                    <Input type="email" placeholder="email@exemplo.com" />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Senha</FormLabel>
                    <Input type="password" placeholder="********" />
                  </FormControl>
                  <Button type="submit" colorScheme="brand" w="full">
                    Entrar como Admin
                  </Button>
                </VStack>
              </form>
            </TabPanel>
            <TabPanel>
              <form onSubmit={(e) => handleLogin(e, true)}>
                <VStack spacing={4}>
                  <FormControl>
                    <FormLabel>E-mail (Artesão)</FormLabel>
                    <Input type="email" placeholder="artesao@exemplo.com" />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Senha</FormLabel>
                    <Input type="password" placeholder="********" />
                  </FormControl>
                  <Button type="submit" colorScheme="brand" w="full">
                    Entrar no Painel do Artesão
                  </Button>
                </VStack>
              </form>
            </TabPanel>
          </TabPanels>
        </Tabs>
        
        <Text textAlign="center" mt={4} fontSize="sm">
          Ainda não tem conta?{' '}
          <NextLink href="/cadastro" passHref>
            <Text as="span" color="brand.600" cursor="pointer">Cadastre-se</Text>
          </NextLink>
        </Text>
      </Box>
    </Container>
  );
}
