import type { Metadata } from 'next';
import { ReactQueryClientProvider } from '@/components/providers/react-query-client-provider';

export const metadata: Metadata = {
  title: 'Sistema Acadêmica da Faculdade Meta',
  description: 'Dashboard do sistema acadêmico da faculdade Meta'
};

export default async function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <ReactQueryClientProvider>
      {children}
    </ReactQueryClientProvider>
  );
}
