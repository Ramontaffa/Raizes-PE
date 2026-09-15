// Padrões visuais usados no lugar das fotos enquanto o MVP não tem upload de imagem.
// Ficavam duplicados em CartaoProduto e na página de produto; centralizados aqui porque
// a gaveta do carrinho precisa da mesma miniatura.

export const ARTE_POR_TECNICA: Record<string, string> = {
  Cerâmica:
    "radial-gradient(circle at 70% 20%, rgba(255,255,255,.4), transparent 50%), linear-gradient(160deg, #e4c9a6, #b75c40 80%)",
  Têxtil:
    "repeating-linear-gradient(115deg, #e8dbce 0px, #e8dbce 10px, #d8c3ae 10px, #d8c3ae 20px)",
  Madeira:
    "repeating-linear-gradient(180deg, #7a4a30 0px, #7a4a30 4px, #6b3f28 4px, #6b3f28 8px)",
  Palha:
    "repeating-linear-gradient(90deg, #e3c98a 0px, #e3c98a 8px, #cdae6b 8px, #cdae6b 16px)",
};

export const PADRAO_RENDA = "radial-gradient(circle, rgba(74,59,50,.28) 1.6px, transparent 1.7px)";
