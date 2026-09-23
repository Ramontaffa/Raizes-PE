"use client";

import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { FiEdit, FiPlus, FiTrash2 } from "react-icons/fi";
import { categorias } from "@/lib/apiFalsa";

// "Renda e Bordado" -> "renda-e-bordado"
function gerarSlug(nome: string): string {
  return nome
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export default function GestaoCategoriasPage() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box>
      <Flex justify="space-between" align="center" mb={6} wrap="wrap" gap={4}>
        <Heading fontSize="1.9rem">Categorias e Técnicas</Heading>
        <Button variant="solid" leftIcon={<FiPlus />} onClick={onOpen}>
          Nova Categoria
        </Button>
      </Flex>

      <Box bg="card" border="1px solid" borderColor="border" borderRadius="10px" overflowX="auto">
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
            {/* As categorias vêm dos produtos cadastrados (apiFalsa); o id é só a posição. */}
            {categorias.map((nome, indice) => (
              <Tr key={nome}>
                <Td fontWeight={500}>{indice + 1}</Td>
                <Td>{nome}</Td>
                <Td>{gerarSlug(nome)}</Td>
                <Td>
                  <Flex gap={2}>
                    <Button size="sm" variant="ghost" aria-label={`Editar ${nome}`}>
                      <FiEdit />
                    </Button>
                    <Button size="sm" variant="ghost" color="red.600" aria-label={`Excluir ${nome}`}>
                      <FiTrash2 />
                    </Button>
                  </Flex>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg="card">
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
            <Button variant="solid" mr={3} onClick={onClose}>
              Salvar
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancelar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
