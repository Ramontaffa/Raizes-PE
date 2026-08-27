'use client';

import {
  Box,
  Heading,
  Container,
  Text,
  Button,
  Stack,
  Icon,
  useColorModeValue,
  createIcon,
  SimpleGrid,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { produtosMock, artesaosMock } from '@/mock';
import { ProductRecommendations } from '@/components/product/ProductRecommendations';
import { ArtisanCard } from '@/components/ui/ArtisanCard';

export default function Home() {
  const getArtesaoNome = (id: string) => {
    return artesaosMock.find((a) => a.id === id)?.nome || 'Artesão Desconhecido';
  };

  const destaques = produtosMock.filter((p) => p.destaque).slice(0, 4);

  return (
    <Box>
      <Box bg="earth.50" py={20}>
        <Container maxW="7xl">
          <Stack
            as={Box}
            textAlign={'center'}
            spacing={{ base: 8, md: 14 }}
            py={{ base: 10, md: 20 }}
          >
            <Heading
              fontWeight={600}
              fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
              lineHeight={'110%'}
              fontFamily="heading"
              color="brand.800"
            >
              Compre direto de quem faz. <br />
              <Text as={'span'} color={'brand.500'}>
                Valorize a cultura pernambucana.
              </Text>
            </Heading>
            <Text color={'gray.600'} fontSize={{ base: 'md', lg: 'xl' }}>
              O Marketplace da Economia Criativa de PE conecta você a mestres artesãos e
              produtores locais, sem intermediários. Conheça a história, a técnica e o
              impacto social por trás de cada peça.
            </Text>
            <Stack
              direction={'column'}
              spacing={3}
              align={'center'}
              alignSelf={'center'}
              position={'relative'}
            >
              <NextLink href="/produtos" passHref legacyBehavior>
                <Button
                  as="a"
                  colorScheme={'brand'}
                  bg={'brand.500'}
                  rounded={'full'}
                  px={6}
                  _hover={{
                    bg: 'brand.600',
                  }}
                  size="lg"
                >
                  Explorar Catálogo
                </Button>
              </NextLink>
            </Stack>
          </Stack>
        </Container>
      </Box>

      <Container maxW="7xl" py={12}>
        <ProductRecommendations
          titulo="Produtos em Destaque"
          produtos={destaques}
          getArtesaoNome={getArtesaoNome}
        />
      </Container>

      <Box bg="white" py={16}>
        <Container maxW="7xl">
          <Heading
            as="h3"
            size="lg"
            mb={10}
            fontFamily="heading"
            color="brand.700"
            textAlign="center"
          >
            Artesãos em Destaque
          </Heading>
          <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} spacing={10}>
            {artesaosMock.slice(0, 3).map((artesao) => (
              <ArtisanCard key={artesao.id} artesao={artesao} />
            ))}
          </SimpleGrid>
        </Container>
      </Box>
    </Box>
  );
}
