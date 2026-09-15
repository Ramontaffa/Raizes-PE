"use client";

import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import tema from "@/lib/tema";
import Rodape from "@/components/Rodape";
import GavetaCarrinho from "@/components/GavetaCarrinho";
import { ProvedorCarrinho } from "@/lib/contextoCarrinho";
import { ProvedorPedidos } from "@/lib/contextoPedidos";

export default function Provedores({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider theme={tema}>
      <ColorModeScript initialColorMode={tema.config.initialColorMode} />
      {/* O carrinho envolve tudo porque a barra de navegação abre a gaveta de qualquer página.
          Os pedidos também: o painel do artesão e a área do comprador leem o mesmo estado. */}
      <ProvedorPedidos>
        <ProvedorCarrinho>
          {children}
          <Rodape />
          <GavetaCarrinho />
        </ProvedorCarrinho>
      </ProvedorPedidos>
    </ChakraProvider>
  );
}
