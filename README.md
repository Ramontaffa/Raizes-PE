# Raízes PE - Marketplace da Economia Criativa

Este é o **Raízes PE** , desenvolvido para dar visibilidade a artesãos locais e conectá-los diretamente a potenciais compradores, promovendo a inclusão digital e a facilidade de vendas online.

## 🚀 Tecnologias Utilizadas

O projeto foi construído utilizando um ecossistema moderno focado em alta performance e escalabilidade:

- **Next.js (App Router)**: Framework React para renderização de páginas, roteamento avançado e SSR/SSG.
- **TypeScript**: Superset de JavaScript que adiciona tipagem estática, garantindo um código mais seguro.
- **Chakra UI (v2) & Emotion**: Biblioteca robusta de componentes para a criação de um *Design System* acessível, responsivo e consistente.
- **Framer Motion**: Utilizado (internamente pelo Chakra UI) para transições e micro-animações.
- **Recharts**: Biblioteca leve e poderosa para visualização de dados nos painéis (Dashboards).
- **React Icons**: Coleção de ícones (FontAwesome, Feather) para identificação visual clara e intuitiva.

## 💡 Principais Funcionalidades

- **Vitrine Pública (Compradores)**: 
  - Catálogo de artesãos e seus respectivos produtos.
  - Página de detalhes de produtos com fluxo de Carrinho e botão de "Compra via WhatsApp".
  - Checkout inteligente no formato *Wizard* passo-a-passo (pensado em UX de baixo letramento digital).
  - Pesquisa visual e filtros de produtos.
  
- **Painel Logado do Artesão**: 
  - Dashboard interativo com gráficos de vendas e visualizações.
  - Controle e alerta de baixo estoque de peças.
  - Gestão de pedidos e adição de novos produtos ao catálogo.

- **Painel Administrativo (Moderação)**:
  - Visão gerencial sobre todo o ecossistema (total de artesãos ativos, produtos cadastrados, faturamento simulado).
  - Gestão de fluxo de aprovação e bloqueio de artesãos.
  - Edição de Categorias e Técnicas de arte.

> **Aviso:** Como se trata de um MVP voltado para validação de frontend, *não há integração com banco de dados real nem serviços de autenticação externa neste estágio.* Toda a aplicação consome dados *Mockados* localizados em `src/mock/`.

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

## 📁 Estrutura de Pastas

```text
├── public/                 # Imagens estáticas e favicons
├── src/
│   ├── app/                # Roteamento baseado no Next.js App Router
│   │   ├── (public)/       # Agrupamento da vitrine principal
│   │   ├── admin/          # Rotas restritas do painel administrativo
│   │   └── painel-artesao/ # Rotas do portal do produtor
│   ├── components/         # Módulos reutilizáveis
│   │   ├── layout/         # Header, Footer, Sidebars
│   │   ├── product/        # Cards e sessões relacionadas a produto
│   │   └── ui/             # Botões customizados, badges e elementos menores
│   ├── mock/               # Dados estáticos para testes visuais (JSON-like)
│   ├── theme/              # Definições do Design System no Chakra UI
│   └── types/              # Interfaces TypeScript da aplicação
└── package.json            # Scripts e dependências
```

## ✒️ Autoria

- Bruno Sottomayor Martin
- Igor Kauã de Souza Siqueira
- Bruno José Cavalcanti Duarte Filho
- Caio Gilles Costa Medeiros de Souza