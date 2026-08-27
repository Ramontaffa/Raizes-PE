'use client';

import {
  Box,
  Container,
  Heading,
  Flex,
  Text,
  Button,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Alert,
  AlertIcon,
  Radio,
  RadioGroup,
  Stack,
  useToast,
  Icon,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FaCheckCircle, FaArrowRight, FaArrowLeft } from 'react-icons/fa';

export default function CheckoutWizardPage() {
  const router = useRouter();
  const toast = useToast();
  const [step, setStep] = useState(1);
  const [nome, setNome] = useState('');

  const nextStep = () => setStep((s) => s + 1);
  const prevStep = () => setStep((s) => s - 1);

  const handleFinalizar = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(4); // Passo final de Sucesso
    setTimeout(() => {
      router.push('/');
    }, 4000);
  };

  return (
    <Container maxW="3xl" py={12}>
      {step < 4 && (
        <Alert status="info" mb={8} borderRadius="md" size="lg" p={4}>
          <AlertIcon boxSize={6} />
          Passo {step} de 3 - Estamos quase lá!
        </Alert>
      )}

      <Box bg="white" p={{ base: 6, md: 10 }} rounded="xl" shadow="lg" borderWidth="1px" as="form" onSubmit={handleFinalizar}>
        
        {step === 1 && (
          <VStack spacing={8} align="stretch">
            <Heading size="lg" color="brand.800">1. Como você se chama?</Heading>
            <Text fontSize="lg" color="gray.600">Precisamos do seu nome para identificar a sua entrega.</Text>
            
            <FormControl isRequired>
              <FormLabel fontSize="xl">Seu Nome Completo</FormLabel>
              <Input 
                size="lg" 
                placeholder="Ex: Maria da Silva" 
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                autoFocus
              />
            </FormControl>
            
            <Button 
              colorScheme="brand" 
              size="lg" 
              py={8} 
              fontSize="xl"
              rightIcon={<FaArrowRight />} 
              onClick={nextStep}
              isDisabled={nome.length < 3}
            >
              Próximo Passo
            </Button>
          </VStack>
        )}

        {step === 2 && (
          <VStack spacing={8} align="stretch">
            <Heading size="lg" color="brand.800">2. Onde devemos entregar?</Heading>
            <Text fontSize="lg" color="gray.600">Para onde enviaremos o seu pedido?</Text>
            
            <FormControl isRequired>
              <FormLabel fontSize="xl">CEP</FormLabel>
              <Input size="lg" placeholder="Apenas números. Ex: 50000000" type="number" />
            </FormControl>

            <FormControl isRequired>
              <FormLabel fontSize="xl">Endereço Completo</FormLabel>
              <Input size="lg" placeholder="Rua, número, complemento e cidade" />
            </FormControl>
            
            <Flex gap={4}>
              <Button size="lg" py={8} fontSize="xl" variant="outline" leftIcon={<FaArrowLeft />} onClick={prevStep}>Voltar</Button>
              <Button flex={1} colorScheme="brand" size="lg" py={8} fontSize="xl" rightIcon={<FaArrowRight />} onClick={nextStep}>Próximo Passo</Button>
            </Flex>
          </VStack>
        )}

        {step === 3 && (
          <VStack spacing={8} align="stretch">
            <Heading size="lg" color="brand.800">3. Como quer pagar?</Heading>
            <Alert status="warning" borderRadius="md">
              <AlertIcon />
              Atenção: Pagamento simulado (Projeto Acadêmico).
            </Alert>
            
            <FormControl as="fieldset" isRequired>
              <FormLabel as="legend" fontSize="xl" mb={4}>Escolha a Forma de Pagamento</FormLabel>
              <RadioGroup defaultValue="pix">
                <Stack spacing={6}>
                  <Radio value="pix" colorScheme="brand" size="lg"><Text fontSize="xl">PIX (Aprovação na hora)</Text></Radio>
                  <Radio value="cartao" colorScheme="brand" size="lg"><Text fontSize="xl">Cartão de Crédito</Text></Radio>
                  <Radio value="boleto" colorScheme="brand" size="lg"><Text fontSize="xl">Boleto Bancário</Text></Radio>
                </Stack>
              </RadioGroup>
            </FormControl>

            <Flex gap={4}>
              <Button size="lg" py={8} fontSize="xl" variant="outline" leftIcon={<FaArrowLeft />} onClick={prevStep}>Voltar</Button>
              <Button type="submit" flex={1} colorScheme="green" size="lg" py={8} fontSize="xl">Confirmar Pedido</Button>
            </Flex>
          </VStack>
        )}

        {step === 4 && (
          <VStack spacing={8} align="center" py={10} textAlign="center">
            <Icon as={FaCheckCircle} color="green.500" boxSize={24} />
            <Heading size="2xl" color="brand.800">Pedido Confirmado!</Heading>
            <Text fontSize="xl" color="gray.600">
              Muito obrigado, {nome}! Sua compra fortalece a Economia Criativa de Pernambuco.
            </Text>
            <Text color="gray.400">Você será redirecionado para a página inicial...</Text>
          </VStack>
        )}
      </Box>
    </Container>
  );
}
