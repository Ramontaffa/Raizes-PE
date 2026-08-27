'use client';

import { SidebarLayout } from '@/components/layout/Sidebar';
import { FiHome, FiUsers, FiBox, FiList, FiTag } from 'react-icons/fi';

const adminLinks = [
  { name: 'Dashboard', icon: FiHome, href: '/admin' },
  { name: 'Gestão de Artesãos', icon: FiUsers, href: '/admin/artesaos' },
  { name: 'Produtos e Moderação', icon: FiBox, href: '/admin/produtos' },
  { name: 'Visão de Pedidos', icon: FiList, href: '/admin/pedidos' },
  { name: 'Categorias e Técnicas', icon: FiTag, href: '/admin/categorias' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarLayout links={adminLinks} title="Painel Admin">
      {children}
    </SidebarLayout>
  );
}
