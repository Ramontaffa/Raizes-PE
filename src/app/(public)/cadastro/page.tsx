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
} from '@chakra-ui/react';
import NextLink from 'next/link';

export default function CadastroPage() {
  return (
    <Container maxW="md" py={20}>
      <Box bg="white" p={8} rounded="lg" shadow="md" borderWidth="1px">
        <Heading fontFamily="heading" color="brand.800" mb={2} textAlign="center">
          Criar nova conta
        </Heading>
        <Text textAlign="center" color="gray.500" mb={6}>
          Junte-se à nossa rede de Economia Criativa
        </Text>

        <VStack spacing={4} as="form">
          <FormControl>
            <FormLabel>Nome Completo</FormLabel>
            <Input type="text" placeholder="Seu nome" />
          </FormControl>
          <FormControl>
            <FormLabel>E-mail</FormLabel>
            <Input type="email" placeholder="email@exemplo.com" />
          </FormControl>
          <FormControl>
            <FormLabel>Senha</FormLabel>
            <Input type="password" placeholder="********" />
          </FormControl>
          <NextLink href="/login" passHref legacyBehavior>
            <Button as="a" colorScheme="brand" w="full" mt={4}>
              Cadastrar (Simulação)
            </Button>
          </NextLink>
        </VStack>
        
        <Text textAlign="center" mt={4} fontSize="sm">
          Já possui conta?{' '}
          <NextLink href="/login" passHref>
            <Text as="span" color="brand.600" cursor="pointer">Faça Login</Text>
          </NextLink>
        </Text>
      </Box>
    </Container>
  );
}
