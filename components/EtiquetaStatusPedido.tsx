import { Badge } from "@chakra-ui/react";
import type { StatusPedido } from "@/lib/tipos";

// Rótulo escrito por extenso em vez de só cor: quem não enxerga bem a diferença de tom
// ainda entende em que pé está o pedido.
const APARENCIA: Record<StatusPedido, { rotulo: string; bg: string; cor: string }> = {
  pendente: { rotulo: "Pendente", bg: "muted", cor: "mutedFg" },
  pago: { rotulo: "Pago", bg: "secondary", cor: "secondaryFg" },
  enviado: { rotulo: "Enviado", bg: "primary", cor: "primaryFg" },
  entregue: { rotulo: "Entregue", bg: "accent", cor: "accentFg" },
};

export default function EtiquetaStatusPedido({ status }: { status: StatusPedido }) {
  const { rotulo, bg, cor } = APARENCIA[status];

  return (
    <Badge
      bg={bg}
      color={cor}
      borderRadius="full"
      px={3}
      py={0.5}
      fontSize="0.72rem"
      fontWeight={600}
      textTransform="none"
    >
      {rotulo}
    </Badge>
  );
}
