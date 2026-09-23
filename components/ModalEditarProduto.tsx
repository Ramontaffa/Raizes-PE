"use client";

import { useEffect, useState } from "react";
import {
  Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton,
  ModalContent, ModalFooter, ModalHeader, ModalOverlay, NumberInput,
  NumberInputField, Textarea, VStack,
} from "@chakra-ui/react";
import type { ProdutoComArtesao } from "@/lib/tipos";

type DadosEditados = Pick<ProdutoComArtesao, "nome" | "descricao" | "preco" | "estoqueQtd">;

export default function ModalEditarProduto({
  produto, aberto, aoFechar, aoSalvar,
}: {
  produto: ProdutoComArtesao | null;
  aberto: boolean;
  aoFechar: () => void;
  aoSalvar: (id: string, dados: DadosEditados) => void;
}) {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState("");
  const [estoqueQtd, setEstoqueQtd] = useState("0");

  useEffect(() => {
    if (!produto) return;
    setNome(produto.nome);
    setDescricao(produto.descricao);
    setPreco(String(produto.preco));
    setEstoqueQtd(String(produto.estoqueQtd));
  }, [produto]);

  function submeter(evento: React.FormEvent) {
    evento.preventDefault();
    if (!produto || !nome.trim() || !descricao.trim()) return;
    const valor = Number(preco.replace(",", "."));
    const estoque = Number(estoqueQtd);
    if (!Number.isFinite(valor) || valor <= 0 || !Number.isInteger(estoque) || estoque < 0) return;
    aoSalvar(produto.id, { nome: nome.trim(), descricao: descricao.trim(), preco: valor, estoqueQtd: estoque });
    aoFechar();
  }

  return (
    <Modal isOpen={aberto} onClose={aoFechar} isCentered>
      <ModalOverlay />
      <ModalContent as="form" onSubmit={submeter} bg="bg" color="fg">
        <ModalHeader fontFamily="heading" fontWeight={600}>Editar produto</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4} align="stretch">
            <FormControl isRequired>
              <FormLabel>Nome do produto</FormLabel>
              <Input value={nome} onChange={(e) => setNome(e.target.value)} />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Descrição</FormLabel>
              <Textarea value={descricao} onChange={(e) => setDescricao(e.target.value)} rows={3} />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Valor (R$)</FormLabel>
              <Input value={preco} onChange={(e) => setPreco(e.target.value)} inputMode="decimal" />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Estoque</FormLabel>
              <NumberInput min={0} value={estoqueQtd} onChange={setEstoqueQtd}>
                <NumberInputField />
              </NumberInput>
            </FormControl>
          </VStack>
        </ModalBody>
        <ModalFooter gap={3}>
          <Button variant="ghost" onClick={aoFechar}>Cancelar</Button>
          <Button variant="solid" type="submit">Salvar alterações</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
