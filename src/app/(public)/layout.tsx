import { Flex } from '@chakra-ui/react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <Flex direction="column" minH="100vh">
      <Header />
      <Flex flex="1" direction="column">
        {children}
      </Flex>
      <Footer />
    </Flex>
  );
}
