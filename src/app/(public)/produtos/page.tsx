'use client';

import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Button,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  VStack,
  Checkbox,
  Text,
} from '@chakra-ui/react';
import { FaSearch, FaFilter } from 'react-icons/fa';
import { produtosMock, artesaosMock, categoriasMock } from '@/mock';
import { ProductCard } from '@/components/product/ProductCard';
import { useState } from 'react';

export default function ProdutosPage() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [busca, setBusca] = useState('');

  const getArtesaoNome = (id: string) => {
    return artesaosMock.find((a) => a.id === id)?.nome || 'Desconhecido';
  };

  const produtosFiltrados = produtosMock.filter((p) =>
    p.nome.toLowerCase().includes(busca.toLowerCase()) ||
    p.tecnica.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <Container maxW="7xl" py={8}>
      <Flex justify="space-between" align="center" mb={8} wrap="wrap" gap={4}>
        <Heading fontFamily="heading" color="brand.800">Catálogo de Produtos</Heading>
        <Flex gap={4} w={{ base: 'full', md: 'auto' }}>
          <InputGroup maxW={{ base: 'full', md: '300px' }}>
            <InputLeftElement pointerEvents="none">
              <FaSearch color="gray.300" />
            </InputLeftElement>
            <Input
              placeholder="Buscar por peça ou técnica..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
          </InputGroup>
          <Button leftIcon={<FaFilter />} onClick={onOpen} variant="outline" colorScheme="brand">
            Filtros
          </Button>
        </Flex>
      </Flex>

      <SimpleGrid columns={{ base: 1, sm: 2, lg: 3, xl: 4 }} spacing={8}>
        {produtosFiltrados.map((produto) => (
          <ProductCard
            key={produto.id}
            produto={produto}
            artesaoNome={getArtesaoNome(produto.artesaoId)}
          />
        ))}
      </SimpleGrid>

      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">Filtrar Produtos</DrawerHeader>
          <DrawerBody>
            <VStack align="start" spacing={6} mt={4}>
              <Box w="full">
                <Text fontWeight="bold" mb={2}>Categorias</Text>
                <VStack align="start">
                  {categoriasMock.map((cat) => (
                    <Checkbox key={cat.id} colorScheme="brand">{cat.nome}</Checkbox>
                  ))}
                </VStack>
              </Box>
              <Box w="full">
                <Text fontWeight="bold" mb={2}>Região</Text>
                <VStack align="start">
                  <Checkbox colorScheme="brand">Sertão</Checkbox>
                  <Checkbox colorScheme="brand">Agreste</Checkbox>
                  <Checkbox colorScheme="brand">Zona da Mata</Checkbox>
                  <Checkbox colorScheme="brand">Metropolitana</Checkbox>
                </VStack>
              </Box>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Container>
  );
}
