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
  Flex,
  Icon,
} from '@chakra-ui/react';
import { FaStar } from 'react-icons/fa';
import { Produto } from '@/types';
import NextLink from 'next/link';

interface ProductCardProps {
  produto: Produto;
  artesaoNome: string;
}

export function ProductCard({ produto, artesaoNome }: ProductCardProps) {
  const bg = useColorModeValue('white', 'gray.800');

  return (
    <NextLink href={`/produtos/${produto.slug}`} passHref legacyBehavior>
      <Center as="a" w="full">
        <Box
          role={'group'}
          p={6}
          maxW={'330px'}
          w={'full'}
          bg={bg}
          boxShadow={'sm'}
          rounded={'lg'}
          pos={'relative'}
          zIndex={1}
          transition={'all 0.3s ease'}
          _hover={{
            boxShadow: 'xl',
            transform: 'translateY(-4px)',
          }}
        >
          <Box
            rounded={'lg'}
            mt={-12}
            pos={'relative'}
            height={'230px'}
            _after={{
              transition: 'all .3s ease',
              content: '""',
              w: 'full',
              h: 'full',
              pos: 'absolute',
              top: 5,
              left: 0,
              backgroundImage: `url(${produto.imagens[0]})`,
              filter: 'blur(15px)',
              zIndex: -1,
            }}
            _groupHover={{
              _after: {
                filter: 'blur(20px)',
              },
            }}
          >
            <Image
              rounded={'lg'}
              height={230}
              width={282}
              objectFit={'cover'}
              src={produto.imagens[0]}
              alt={produto.nome}
            />
          </Box>
          <Stack pt={10} align={'center'}>
            <Flex gap={2} mb={2}>
              <Badge variant="tecnica">{produto.tecnica}</Badge>
            </Flex>
            <Heading fontSize={'xl'} fontFamily={'heading'} fontWeight={500} textAlign="center">
              {produto.nome}
            </Heading>
            <Text color={'gray.500'} fontSize={'sm'}>
              Por {artesaoNome}
            </Text>
            
            <Flex align="center" gap={1}>
              <Icon as={FaStar} color="yellow.400" />
              <Text fontWeight={600} fontSize="sm">
                {produto.avaliacaoMedia.toFixed(1)}
              </Text>
              <Text color="gray.500" fontSize="sm">
                ({produto.quantidadeAvaliacoes})
              </Text>
            </Flex>

            <Stack direction={'row'} align={'center'}>
              <Text fontWeight={800} fontSize={'xl'} color="brand.600">
                R$ {produto.preco.toFixed(2).replace('.', ',')}
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Center>
    </NextLink>
  );
}
