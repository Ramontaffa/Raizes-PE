import { Suspense } from "react";
import VisaoVitrine from "@/components/VisaoVitrine";

export default function Pagina() {
  return (
    <Suspense fallback={null}>
      <VisaoVitrine />
    </Suspense>
  );
}
