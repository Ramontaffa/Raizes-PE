"use client";

import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import tema from "@/lib/tema";
import Rodape from "@/components/Rodape";
import GavetaCarrinho from "@/components/GavetaCarrinho";
import { ProvedorCarrinho } from "@/lib/contextoCarrinho";

export default function Provedores({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider theme={tema}>
      <ColorModeScript initialColorMode={tema.config.initialColorMode} />
      {/* O carrinho envolve tudo porque a barra de navegação abre a gaveta de qualquer página */}
      <ProvedorCarrinho>
        {children}
        <Rodape />
        <GavetaCarrinho />
      </ProvedorCarrinho>
    </ChakraProvider>
  );
}
