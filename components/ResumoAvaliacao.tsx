import { HStack, Text } from "@chakra-ui/react";
import { FaStar, FaRegStar } from "react-icons/fa";
import type { ResumoAvaliacoes } from "@/lib/tipos";

export default function ResumoAvaliacao({ resumo }: { resumo: ResumoAvaliacoes }) {
  if (resumo.quantidade === 0) {
    return (
      <Text fontSize="0.85rem" color="mutedFg">
        Ainda sem avaliações
      </Text>
    );
  }

  const notaArredondada = Math.round(resumo.media);

  return (
    <HStack spacing={2}>
      <HStack spacing={0.5} color="accent">
        {Array.from({ length: 5 }).map((_, i) =>
          i < notaArredondada ? <FaStar key={i} size={14} /> : <FaRegStar key={i} size={14} />
        )}
      </HStack>
      <Text fontSize="0.85rem" color="mutedFg">
        {resumo.media.toFixed(1)} ({resumo.quantidade}{" "}
        {resumo.quantidade === 1 ? "avaliação" : "avaliações"})
      </Text>
    </HStack>
  );
}
