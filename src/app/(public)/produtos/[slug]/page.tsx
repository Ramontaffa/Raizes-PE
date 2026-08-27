'use client';

import {
  Box,
  Container,
  Stack,
  Text,
  Image,
  Flex,
  VStack,
  Button,
  Heading,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
  List,
  ListItem,
  Badge,
  Icon,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react';
import { FaShoppingCart, FaStar, FaMapMarkerAlt, FaWhatsapp } from 'react-icons/fa';
import { useParams } from 'next/navigation';
import { produtosMock, artesaosMock } from '@/mock';
import NextLink from 'next/link';

export default function ProdutoDetail() {
  const params = useParams();
  const slug = params?.slug as string;

  const produto = produtosMock.find((p) => p.slug === slug);
  const artesao = artesaosMock.find((a) => a.id === produto?.artesaoId);

  if (!produto || !artesao) {
    return (
      <Container maxW="7xl" py={20}>
        <Heading>Produto não encontrado</Heading>
      </Container>
    );
  }

  return (
    <Container maxW={'7xl'} py={{ base: 8, md: 14 }}>
      <SimpleGrid
        columns={{ base: 1, lg: 2 }}
        spacing={{ base: 8, md: 10 }}
      >
        <Flex>
          <Image
            rounded={'md'}
            alt={produto.nome}
            src={produto.imagens[0]}
            fit={'cover'}
            align={'center'}
            w={'100%'}
            h={{ base: '100%', sm: '400px', lg: '500px' }}
          />
        </Flex>
        <Stack spacing={{ base: 6, md: 10 }}>
          <Box as={'header'}>
            <Heading
              lineHeight={1.1}
              fontWeight={600}
              fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}
              fontFamily="heading"
              color="brand.800"
            >
              {produto.nome}
            </Heading>
            <Text
              color={useColorModeValue('brand.600', 'brand.400')}
              fontWeight={600}
              fontSize={'2xl'}
              mt={2}
            >
              R$ {produto.preco.toFixed(2).replace('.', ',')}
            </Text>
            
            <Flex align="center" gap={1} mt={4}>
              <Icon as={FaStar} color="yellow.400" />
              <Text fontWeight="bold">{produto.avaliacaoMedia.toFixed(1)}</Text>
              <Text color="gray.500">({produto.quantidadeAvaliacoes} avaliações)</Text>
            </Flex>
          </Box>

          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={'column'}
            divider={
              <StackDivider borderColor={useColorModeValue('gray.200', 'gray.600')} />
            }
          >
            <VStack spacing={{ base: 4, sm: 6 }} align="start">
              <Text fontSize={'lg'} color={'gray.600'}>
                {produto.descricao}
              </Text>
            </VStack>
            <Box>
              <Text
                fontSize={{ base: '16px', lg: '18px' }}
                color={useColorModeValue('brand.600', 'brand.300')}
                fontWeight={'500'}
                textTransform={'uppercase'}
                mb={'4'}
              >
                Detalhes da Peça
              </Text>

              <List spacing={2}>
                <ListItem>
                  <Text as={'span'} fontWeight={'bold'}>
                    Categoria:
                  </Text>{' '}
                  {produto.categoria}
                </ListItem>
                <ListItem>
                  <Text as={'span'} fontWeight={'bold'}>
                    Técnica 100% Autoral:
                  </Text>{' '}
                  <Badge variant="tecnica" ml={2}>{produto.tecnica}</Badge>
                </ListItem>
                <ListItem>
                  <Text as={'span'} fontWeight={'bold'}>
                    Estoque disponível:
                  </Text>{' '}
                  {produto.estoque > 0 ? `${produto.estoque} unidades` : 'Esgotado'}
                </ListItem>
              </List>
            </Box>
            <Box bg="earth.50" p={4} borderRadius="md">
              <Text fontWeight="bold" fontSize="lg" mb={2}>Sobre quem faz</Text>
              <Flex gap={4} align="center">
                <Image src={artesao.foto} boxSize="60px" borderRadius="full" objectFit="cover" alt={artesao.nome} />
                <Box>
                  <Text fontWeight="bold">{artesao.nome}</Text>
                  <Flex align="center" gap={1} color="gray.600" fontSize="sm">
                    <FaMapMarkerAlt />
                    <Text>{artesao.municipio} - {artesao.regiao} / PE</Text>
                  </Flex>
                  <NextLink href={`/artesaos/${artesao.slug}`} passHref legacyBehavior>
                    <Text as="a" color="brand.600" fontSize="sm" fontWeight="bold" _hover={{ textDecoration: 'underline' }}>
                      Conhecer a história completa
                    </Text>
                  </NextLink>
                </Box>
              </Flex>
            </Box>
          </Stack>

          <Flex align="center" gap={4}>
             <Box maxW="100px">
              <NumberInput defaultValue={1} min={1} max={produto.estoque}>
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
             </Box>
            <VStack spacing={4} w="full">
              <NextLink href="/carrinho" passHref legacyBehavior>
                <Button
                  as="a"
                  rounded={'md'}
                  w={'full'}
                  size={'lg'}
                  py={'8'}
                  fontSize="xl"
                  bg={'brand.500'}
                  color={'white'}
                  _hover={{
                    transform: 'translateY(2px)',
                    boxShadow: 'lg',
                    bg: 'brand.600'
                  }}
                  leftIcon={<FaShoppingCart />}
                >
                  Adicionar ao Carrinho
                </Button>
              </NextLink>

              <Button
                as="a"
                href={`https://wa.me/5581999999999?text=Olá ${artesao.nome}, vi a peça ${produto.nome} no Marketplace das Raízes e tenho interesse!`}
                target="_blank"
                rounded={'md'}
                w={'full'}
                size={'lg'}
                py={'8'}
                fontSize="xl"
                colorScheme="green"
                bg="whatsapp.500"
                _hover={{
                  bg: 'whatsapp.600',
                  transform: 'translateY(2px)',
                  boxShadow: 'lg'
                }}
                leftIcon={<FaWhatsapp size={24} />}
              >
                Comprar direto pelo WhatsApp
              </Button>
            </VStack>
          </Flex>

        </Stack>
      </SimpleGrid>
    </Container>
  );
}
