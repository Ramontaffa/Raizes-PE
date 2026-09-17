# Raízes PE - Marketplace da Economia Criativa

Este é o **Raízes PE** , desenvolvido para dar visibilidade a artesãos locais e conectá-los diretamente a potenciais compradores, promovendo a inclusão digital e a facilidade de vendas online.

## 🚀 Tecnologias Utilizadas

O projeto foi construído utilizando um ecossistema moderno focado em alta performance e escalabilidade:

- **Next.js (App Router)**: Framework React para renderização de páginas, roteamento avançado e SSR/SSG.
- **TypeScript**: Superset de JavaScript que adiciona tipagem estática, garantindo um código mais seguro.
- **Chakra UI (v2) & Emotion**: Biblioteca robusta de componentes para a criação de um *Design System* acessível, responsivo e consistente.
- **Framer Motion**: Utilizado (internamente pelo Chakra UI) para transições e micro-animações.
- **React Icons**: Coleção de ícones (FontAwesome, Feather) para identificação visual clara e intuitiva.
- **ESLint**: Padronização do código (`npm run lint`), configurado em `eslint.config.mjs`.

> O `Recharts` já está instalado, mas ainda não é usado: os gráficos do painel estão previstos
> em *Próximos Passos*.

## 💡 Principais Funcionalidades

- **Vitrine Pública (Compradores)**: 
  - Catálogo de artesãos e seus respectivos produtos.
  - Página de detalhes de produtos com fluxo de Carrinho e botão de "Compra via WhatsApp".
  - Checkout inteligente no formato *Wizard* passo-a-passo (pensado em UX de baixo letramento digital).
  - Busca por termo e filtros de técnica, região e categoria.

- **Área do Comprador (`/meus-pedidos`)**:
  - Acompanhamento dos pedidos feitos, com etiqueta de status (pendente, pago, enviado, entregue).
  - Aviso de envio que permanece na tela até ser fechado, em vez de sumir sozinho como um toast — quem entra depois do envio continua vendo o recado.

- **Painel do Artesão (`/painel`)**:
  - Resumo da loja em cartões: vendas, pedidos pendentes e visualizações.
  - Listagem do catálogo com a quantidade em estoque de cada peça.
  - Gestão dos pedidos recebidos, com a ação "marcar como enviado" que notifica o comprador.

> **Aviso:** Como se trata de um MVP voltado para validação de frontend, *não há integração com banco de dados real nem serviços de autenticação externa neste estágio.* Toda a aplicação consome dados *Mockados* de `lib/dadosFalsos.ts`, servidos por `lib/apiFalsa.ts`.
>
> Como ainda não existe login, as áreas logadas usam usuários fixos de demonstração:
> o artesão `u2` (Cooperativa de Tacaratu) no `/painel` e a compradora `u7` (Ana Beatriz) no
> `/meus-pedidos` e no checkout. Os pedidos criados durante o uso e as mudanças de status
> ficam salvos no `localStorage` do navegador (chave `raizes-pe:pedidos`), então sobrevivem a
> um *refresh*, mas não saem da máquina.

### 🔜 Próximos Passos

- Gráficos de vendas no painel do artesão (Recharts).
- Alerta de baixo estoque.
- Cadastro e edição de produtos pelo próprio artesão.
- Painel administrativo de moderação: aprovação e bloqueio de artesãos, edição de categorias e técnicas.
- Autenticação real, substituindo os usuários de demonstração.

## 🎨 Foco em Inclusão Digital (UX)

- **Legendas em Ícones**: Evitamos metáforas visuais isoladas. Botões importantes possuem descrições literais (ex: "Meu Carrinho").
- **Fluxo Via WhatsApp**: Para mitigar a resistência de compras digitais, implementamos botões com links "wa.me" parametrizados para os artesãos.
- **Checkout Wizard**: Telas de formulário curtas, contendo apenas uma instrução clara de cada vez para o preenchimento da compra.
- **Micro-interações e Contraste**: Botões e áreas de clique (*tap targets*) foram aumentados visando usabilidade em telas mobile pequenas.

---

## 💻 Como Rodar o Projeto Localmente

**Pré-requisitos:**
- [Node.js](https://nodejs.org/en/) (Versão 18 ou superior).
- Gerenciador de pacotes padrão: `npm`.

**Passo 1:** Clone o repositório para sua máquina local.
```bash
git clone https://github.com/brunosm26/Raizes-pe.git
```

**Passo 2:** Acesse o diretório do projeto.
```bash
cd Raizes-pe
```

**Passo 3:** Instale todas as dependências do projeto.
```bash
npm install
```

**Passo 4:** Inicie o servidor de desenvolvimento.
```bash
npm run dev
```

O aplicativo estará disponível em seu navegador acessando: [http://localhost:3000](http://localhost:3000)

**Antes de abrir um Pull Request**, rode o lint para manter o padrão do código:
```bash
npm run lint
```

## 📁 Estrutura de Pastas

```text
├── app/                      # Roteamento do Next.js App Router
│   ├── page.tsx              # Vitrine pública
│   ├── produto/[id]/         # Detalhe do produto
│   ├── artesao/[id]/         # Perfil público do artesão
│   ├── checkout/             # Wizard de finalização de compra
│   ├── painel/               # Painel do artesão
│   ├── meus-pedidos/         # Área do comprador (acompanhamento de pedidos)
│   ├── provedores.tsx        # Providers (Chakra UI, carrinho e pedidos)
│   └── layout.tsx            # Layout raiz
├── components/               # Componentes reutilizáveis
├── lib/
│   ├── tipos.ts              # Interfaces TypeScript (espelham o Modelo Lógico)
│   ├── dadosFalsos.ts        # Dados mockados
│   ├── apiFalsa.ts           # Funções que simulam chamadas de API
│   ├── contextoCarrinho.tsx  # Estado do carrinho (Context API)
│   ├── contextoPedidos.tsx   # Estado dos pedidos e avisos de envio (Context API)
│   ├── tema.ts               # Design System no Chakra UI
│   └── arteProduto.ts        # Padrões visuais no lugar das fotos
├── eslint.config.mjs         # Regras de lint
└── package.json              # Scripts e dependências
```

> Não existe pasta `src/`: o código fica na raiz, e o alias `@/` aponta para ela
> (`@/lib/tipos`, `@/components/CartaoProduto`).

## ✒️ Autoria

- Bruno José Cavalcanti Duarte Filho
- Bruno Sottomayor Martin
- Caio Gilles Costa Medeiros de Souza
- Gustavo Rafael Renaux Veloso
- Igor Kauã de Souza Siqueira
- Matheus Conolly
- Leonardo Felipe Demétrio
- Hilton Resende Montes Neto
