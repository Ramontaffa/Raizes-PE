'use client';

import {
  Container,
  Heading,
  SimpleGrid,
  Text,
  Box,
} from '@chakra-ui/react';
import { artesaosMock } from '@/mock';
import { ArtisanCard } from '@/components/ui/ArtisanCard';

export default function ArtesaosPage() {
  return (
    <Box bg="earth.50" minH="100vh">
      <Container maxW="7xl" py={12}>
        <Heading fontFamily="heading" color="brand.800" textAlign="center" mb={4}>
          Mestres e Artesãos de Pernambuco
        </Heading>
        <Text textAlign="center" color="gray.600" mb={12} maxW="3xl" mx="auto">
          Conheça os guardiões da nossa cultura. Pessoas que, com as próprias mãos, transformam matéria-prima em arte, história e sustento.
        </Text>

        <SimpleGrid columns={{ base: 1, sm: 2, lg: 3, xl: 4 }} spacing={8}>
          {artesaosMock.map((artesao) => (
            <ArtisanCard key={artesao.id} artesao={artesao} />
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
}
