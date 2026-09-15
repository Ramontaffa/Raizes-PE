"use client";

import { useState } from "react";
import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  HStack,
  Link as ChakraLink,
  IconButton,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FiSearch, FiSun, FiMoon, FiShoppingBag } from "react-icons/fi";
import { useCarrinho } from "@/lib/contextoCarrinho";

interface PropsBarraNavegacao {
  valorBusca?: string;
  aoMudarBusca?: (valor: string) => void;
}

export default function BarraNavegacao({ valorBusca, aoMudarBusca }: PropsBarraNavegacao) {
  const caminho = usePathname();
  const roteador = useRouter();
  const { colorMode, toggleColorMode } = useColorMode();
  const { quantidadeTotal, abrirGaveta } = useCarrinho();

  const naVitrine = caminho === "/";
  const noPainel = caminho === "/painel";
  const controlado = valorBusca !== undefined && aoMudarBusca !== undefined;

  const [termoLocal, setTermoLocal] = useState("");
  const termo = controlado ? valorBusca! : termoLocal;

  function aoDigitar(e: React.ChangeEvent<HTMLInputElement>) {
    if (controlado) aoMudarBusca!(e.target.value);
    else setTermoLocal(e.target.value);
  }

  function aoEnviar(e: React.FormEvent) {
    e.preventDefault();
    if (!controlado) {
      roteador.push(`/?q=${encodeURIComponent(termo)}`);
    }
  }

  const campoDeBusca = (
    <Box as="form" onSubmit={aoEnviar} flex={1} maxW={{ base: "100%", md: "480px" }}>
      <InputGroup bg="muted" borderRadius="md">
        <InputLeftElement pointerEvents="none" color="mutedFg">
          <FiSearch />
        </InputLeftElement>
        <Input
          variant="unstyled"
          pl={10}
          h="40px"
          placeholder="Buscar artesanato, mestre ou técnica..."
          color="fg"
          _placeholder={{ color: "mutedFg" }}
          value={termo}
          onChange={aoDigitar}
        />
      </InputGroup>
    </Box>
  );

  const linksDeNavegacao = (
    <HStack spacing={6} fontSize="sm" flexShrink={0}>
      <ChakraLink
        as={NextLink}
        href="/"
        color={naVitrine ? "fg" : "mutedFg"}
        borderBottom="2px solid"
        borderColor={naVitrine ? "primary" : "transparent"}
        pb={1}
        fontWeight={naVitrine ? 500 : 400}
        _hover={{ textDecoration: "none" }}
      >
        Vitrine
      </ChakraLink>
      <ChakraLink
        as={NextLink}
        href="/painel"
        color={noPainel ? "fg" : "mutedFg"}
        borderBottom="2px solid"
        borderColor={noPainel ? "primary" : "transparent"}
        pb={1}
        fontWeight={noPainel ? 500 : 400}
        _hover={{ textDecoration: "none" }}
      >
        Painel do Artesão
      </ChakraLink>
    </HStack>
  );

  return (
    <Box as="nav" borderBottom="1px solid" borderColor="border" px={{ base: 4, md: 10 }} py={4}>
      {/* Linha principal: sempre visível */}
      <HStack spacing={5} align="center">
        <Text
          as={NextLink}
          href="/"
          fontFamily="heading"
          fontSize="xl"
          fontWeight={600}
          color="primary"
          whiteSpace="nowrap"
        >
          Raízes PE
        </Text>

        {/* Busca some daqui no mobile e volta como linha própria abaixo */}
        <Box display={{ base: "none", md: "block" }} flex={1}>
          {campoDeBusca}
        </Box>

        <Box display={{ base: "none", md: "block" }} ml="auto">
          {linksDeNavegacao}
        </Box>

        <HStack spacing={1} ml={{ base: "auto", md: 0 }}>
          <IconButton
            aria-label="Alternar tema"
            icon={colorMode === "dark" ? <FiSun /> : <FiMoon />}
            variant="ghost"
            onClick={toggleColorMode}
          />
          <Box position="relative">
            <IconButton
              aria-label={
                quantidadeTotal > 0
                  ? `Meu carrinho, ${quantidadeTotal} ${quantidadeTotal === 1 ? "peça" : "peças"}`
                  : "Meu carrinho, vazio"
              }
              icon={<FiShoppingBag />}
              variant="ghost"
              onClick={abrirGaveta}
            />
            {quantidadeTotal > 0 && (
              <Box
                position="absolute"
                top="-2px"
                right="-2px"
                bg="primary"
                color="primaryFg"
                fontSize="0.6rem"
                px="5px"
                borderRadius="full"
                fontWeight={600}
                pointerEvents="none"
              >
                {quantidadeTotal}
              </Box>
            )}
          </Box>
        </HStack>
      </HStack>

      {/* Linha extra só no mobile: busca em largura total + links de navegação */}
      <Box display={{ base: "block", md: "none" }} mt={3}>
        {campoDeBusca}
        <Box mt={3}>{linksDeNavegacao}</Box>
      </Box>
    </Box>
  );
}
