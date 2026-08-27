'use client';

import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  Button,
  VStack,
  Flex,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';

export default function NovoProdutoPage() {
  const bg = useColorModeValue('white', 'gray.800');
  const toast = useToast();
  const router = useRouter();

  const handleSalvar = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: 'Produto Cadastrado',
      description: 'O produto foi adicionado ao seu catálogo com sucesso.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
    router.push('/painel-artesao/catalogo');
  };

  return (
    <Box>
      <Heading fontFamily="heading" color="brand.800" mb={6}>Cadastrar Novo Produto</Heading>
      
      <Box bg={bg} p={8} rounded="lg" shadow="sm" borderWidth="1px" as="form" onSubmit={handleSalvar}>
        <VStack spacing={6} align="stretch">
          <FormControl isRequired>
            <FormLabel>Nome do Produto</FormLabel>
            <Input placeholder="Ex: Vaso de Cerâmica" />
          </FormControl>
          
          <FormControl isRequired>
            <FormLabel>Descrição</FormLabel>
            <Textarea placeholder="Conte a história dessa peça..." rows={4} />
          </FormControl>
          
          <Flex gap={4} wrap={{ base: 'wrap', md: 'nowrap' }}>
            <FormControl isRequired>
              <FormLabel>Categoria</FormLabel>
              <Select placeholder="Selecione a categoria">
                <option value="ceramica">Cerâmica e Barro</option>
                <option value="madeira">Escultura em Madeira</option>
                <option value="tecido">Tecido e Renda</option>
              </Select>
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Técnica</FormLabel>
              <Input placeholder="Ex: Modelagem em Barro" />
            </FormControl>
          </Flex>

          <Flex gap={4} wrap={{ base: 'wrap', md: 'nowrap' }}>
            <FormControl isRequired>
              <FormLabel>Preço (R$)</FormLabel>
              <Input type="number" step="0.01" placeholder="0.00" />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Estoque Inicial</FormLabel>
              <Input type="number" placeholder="10" />
            </FormControl>
          </Flex>

          <FormControl>
            <FormLabel>URL da Imagem</FormLabel>
            <Input placeholder="https://..." />
          </FormControl>

          <Flex justify="flex-end" gap={4} mt={4}>
            <Button variant="ghost" onClick={() => router.back()}>Cancelar</Button>
            <Button type="submit" colorScheme="brand">Salvar Produto</Button>
          </Flex>
        </VStack>
      </Box>
    </Box>
  );
}
