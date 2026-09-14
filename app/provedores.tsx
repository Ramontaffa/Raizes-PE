"use client";

import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import tema from "@/lib/tema";
import Rodape from "@/components/Rodape";

export default function Provedores({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider theme={tema}>
      <ColorModeScript initialColorMode={tema.config.initialColorMode} />
      {children}
      <Rodape />
    </ChakraProvider>
  );
}
