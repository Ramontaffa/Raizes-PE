'use client';

import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Image,
  Badge,
} from '@chakra-ui/react';
import { Artesao } from '@/types';
import NextLink from 'next/link';

interface ArtisanCardProps {
  artesao: Artesao;
}

export function ArtisanCard({ artesao }: ArtisanCardProps) {
  return (
    <NextLink href={`/artesaos/${artesao.slug}`} passHref legacyBehavior>
      <Center as="a" w="full">
        <Box
          maxW={'320px'}
          w={'full'}
          bg={useColorModeValue('white', 'gray.800')}
          boxShadow={'sm'}
          rounded={'lg'}
          p={6}
          textAlign={'center'}
          transition={'transform 0.3s ease, box-shadow 0.3s ease'}
          _hover={{
            transform: 'translateY(-5px)',
            boxShadow: 'xl',
          }}
        >
          <Box display="flex" justifyContent="center" mb={4}>
            <Image
              src={artesao.foto}
              alt={artesao.nome}
              borderRadius="full"
              boxSize="120px"
              objectFit="cover"
              border="4px solid"
              borderColor="earth.200"
            />
          </Box>
          <Heading fontSize={'2xl'} fontFamily={'heading'} mb={2}>
            {artesao.nome}
          </Heading>
          <Text fontWeight={600} color={'gray.500'} mb={4}>
            {artesao.municipio} - {artesao.regiao}
          </Text>
          <Stack align={'center'} justify={'center'} direction={'row'} mt={4} wrap="wrap" gap={2}>
            {artesao.tecnicas.map((tecnica, idx) => (
              <Badge key={idx} variant="artesao">
                {tecnica}
              </Badge>
            ))}
          </Stack>
        </Box>
      </Center>
    </NextLink>
  );
}
