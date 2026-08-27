'use client';

import { SidebarLayout } from '@/components/layout/Sidebar';
import { FiHome, FiBox, FiList, FiPlusSquare, FiPackage } from 'react-icons/fi';

const artesaoLinks = [
  { name: 'Dashboard', icon: FiHome, href: '/painel-artesao' },
  { name: 'Meus Produtos', icon: FiBox, href: '/painel-artesao/catalogo' },
  { name: 'Novo Produto', icon: FiPlusSquare, href: '/painel-artesao/catalogo/novo' },
  { name: 'Pedidos Recebidos', icon: FiList, href: '/painel-artesao/pedidos' },
  { name: 'Controle de Estoque', icon: FiPackage, href: '/painel-artesao/estoque' },
];

export default function ArtesaoLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarLayout links={artesaoLinks} title="Portal do Artesão">
      {children}
    </SidebarLayout>
  );
}
