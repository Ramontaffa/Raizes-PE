'use client';

import {
  Box,
  Container,
  Heading,
  Text,
  Image,
  Flex,
  Badge,
} from '@chakra-ui/react';
import { useParams } from 'next/navigation';
import { artesaosMock, produtosMock } from '@/mock';
import { ProductRecommendations } from '@/components/product/ProductRecommendations';
import { FaMapMarkerAlt } from 'react-icons/fa';

export default function ArtesaoProfile() {
  const params = useParams();
  const slug = params?.slug as string;

  const artesao = artesaosMock.find((a) => a.slug === slug);
  const produtosDoArtesao = produtosMock.filter((p) => p.artesaoId === artesao?.id);

  if (!artesao) {
    return (
      <Container maxW="7xl" py={20}>
        <Heading>Artesão não encontrado</Heading>
      </Container>
    );
  }

  return (
    <Box>
      <Box bg="earth.100" py={12}>
        <Container maxW="7xl">
          <Flex direction={{ base: 'column', md: 'row' }} align="center" gap={8}>
            <Image
              src={artesao.foto}
              alt={artesao.nome}
              boxSize="200px"
              borderRadius="full"
              objectFit="cover"
              border="6px solid white"
              boxShadow="lg"
            />
            <Box textAlign={{ base: 'center', md: 'left' }}>
              <Heading fontFamily="heading" color="brand.800" mb={2}>
                {artesao.nome}
              </Heading>
              <Flex align="center" justify={{ base: 'center', md: 'flex-start' }} gap={2} color="gray.600" mb={4} fontSize="lg">
                <FaMapMarkerAlt />
                <Text>{artesao.municipio} - {artesao.regiao} / PE</Text>
              </Flex>
              <Flex gap={2} wrap="wrap" justify={{ base: 'center', md: 'flex-start' }} mb={4}>
                {artesao.tecnicas.map((tecnica, idx) => (
                  <Badge key={idx} variant="artesao">{tecnica}</Badge>
                ))}
              </Flex>
              <Text fontSize="lg" color="gray.700" maxW="3xl">
                {artesao.bio}
              </Text>
            </Box>
          </Flex>
        </Container>
      </Box>

      <Container maxW="7xl" py={12}>
        <ProductRecommendations
          titulo={`Obras de ${artesao.nome}`}
          produtos={produtosDoArtesao}
          getArtesaoNome={() => artesao.nome}
        />
      </Container>
    </Box>
  );
}
