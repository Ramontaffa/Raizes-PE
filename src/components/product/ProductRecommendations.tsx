'use client';

import { Box, Heading, SimpleGrid, Text } from '@chakra-ui/react';
import { Produto } from '@/types';
import { ProductCard } from './ProductCard';

interface RecommendationsProps {
  titulo?: string;
  produtos: Produto[];
  // Assuming a map or a function to get artesao name from ID is passed
  getArtesaoNome: (id: string) => string;
}

export function ProductRecommendations({ titulo = "Você também pode gostar", produtos, getArtesaoNome }: RecommendationsProps) {
  if (!produtos || produtos.length === 0) return null;

  return (
    <Box py={8}>
      <Heading as="h3" size="lg" mb={6} fontFamily="heading" color="brand.700">
        {titulo}
      </Heading>
      <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} spacing={8}>
        {produtos.map(produto => (
          <ProductCard 
            key={produto.id} 
            produto={produto} 
            artesaoNome={getArtesaoNome(produto.artesaoId)} 
          />
        ))}
      </SimpleGrid>
    </Box>
  );
}
