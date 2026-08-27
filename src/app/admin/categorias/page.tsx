'use client';

import {
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Flex,
  useColorModeValue,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import { categoriasMock } from '@/mock';
import { FiPlus, FiEdit, FiTrash2 } from 'react-icons/fi';

export default function GestaoCategoriasPage() {
  const bg = useColorModeValue('white', 'gray.800');
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box>
      <Flex justify="space-between" align="center" mb={6} wrap="wrap" gap={4}>
        <Heading fontFamily="heading" color="brand.800">Categorias e Técnicas</Heading>
        <Button colorScheme="brand" leftIcon={<FiPlus />} onClick={onOpen}>
          Nova Categoria
        </Button>
      </Flex>

      <Box bg={bg} rounded="lg" shadow="sm" borderWidth="1px" overflowX="auto">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Nome</Th>
              <Th>Slug</Th>
              <Th>Ações</Th>
            </Tr>
          </Thead>
          <Tbody>
            {categoriasMock.map((cat) => (
              <Tr key={cat.id}>
                <Td fontWeight="medium">{cat.id}</Td>
                <Td>{cat.nome}</Td>
                <Td>{cat.slug}</Td>
                <Td>
                  <Flex gap={2}>
                    <Button size="sm" variant="ghost" colorScheme="blue"><FiEdit /></Button>
                    <Button size="sm" variant="ghost" colorScheme="red"><FiTrash2 /></Button>
                  </Flex>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Adicionar Categoria</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl isRequired>
              <FormLabel>Nome da Categoria</FormLabel>
              <Input placeholder="Ex: Renda" />
            </FormControl>
            <FormControl mt={4} isRequired>
              <FormLabel>Slug</FormLabel>
              <Input placeholder="renda" />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="brand" mr={3} onClick={onClose}>
              Salvar
            </Button>
            <Button onClick={onClose}>Cancelar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
