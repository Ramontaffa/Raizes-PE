'use client';

import {
  Box,
  Container,
  Stack,
  Text,
  useColorModeValue,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';

export function Footer() {
  return (
    <Box
      bg={useColorModeValue('earth.50', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}
      mt="auto"
    >
      <Container
        as={Stack}
        maxW={'6xl'}
        py={4}
        direction={{ base: 'column', md: 'row' }}
        spacing={4}
        justify={{ base: 'center', md: 'space-between' }}
        align={{ base: 'center', md: 'center' }}
      >
        <Text>© 2026 Raízes PE. Todos os direitos reservados.</Text>
        <Alert status="info" borderRadius="md" size="sm" maxW="400px">
          <AlertIcon />
          Projeto acadêmico: dados sintéticos e pagamento simulado.
        </Alert>
      </Container>
    </Box>
  );
}
