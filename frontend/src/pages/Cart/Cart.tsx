import {
  Box,
  Flex,
  Heading,
  HStack,
  Link,
  Stack,
  useColorModeValue as mode
} from '@chakra-ui/react';
import { CartItem } from '../../components/CartItem/CartItem';
import { CartOrderSummary } from '../../components/CartOrderSummary/CartOrderSummary';

import { useAppSelector } from '../../hooks/redux.hooks';
import { selectCartData } from '../../store/cart/selectors';
import { ISneakers } from '../../store/product/types';
const Cart = () => {
  const { cart } = useAppSelector(selectCartData);

  return (
    <>
      <Box
        maxW={{ base: '3xl', lg: '7xl' }}
        mx="auto"
        px={{ base: '4', md: '8', lg: '12' }}
        py={{ base: '6', md: '8', lg: '12' }}>
        <Stack
          direction={{ base: 'column', lg: 'row' }}
          align={{ lg: 'flex-start' }}
          spacing={{ base: '8', md: '16' }}>
          <Stack spacing={{ base: '8', md: '10' }} flex="2">
            <Heading fontSize="2xl" fontWeight="extrabold">
              ITEM
            </Heading>
            <hr />
            <Stack spacing="6">
              {cart.length === 0 && <>You have no items in your shopping cart.</>}
              {cart.map((item: ISneakers) => (
                <CartItem key={item._id} {...item} />
              ))}
            </Stack>
          </Stack>
          <Flex></Flex>
          <Flex direction="column" align="center" flex="1">
            <CartOrderSummary />
            <HStack mt="6" fontWeight="semibold">
              <p>or</p>
              <Link color={mode('blue.500', 'blue.200')}>Continue shopping</Link>
            </HStack>
          </Flex>
        </Stack>
      </Box>
    </>
  );
};

export default Cart;
