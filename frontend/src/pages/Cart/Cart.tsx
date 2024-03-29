import { Box, Flex, Heading, Stack } from '@chakra-ui/react';

import { CartItem } from '../../components/CartItem/CartItem';
import { CartOrderSummary } from '../../components/CartOrderSummary/CartOrderSummary';
import { useAppSelector } from '../../hooks/redux.hooks';
import { ISneakers } from '../../store/product/types';
export const Cart = () => {
  const cart = useAppSelector((state) => state.cart.cart);

  const renderCartProduct = () => {
    if (cart.length === 0) {
      return <>You have no items in your shopping cart.</>;
    } else {
      return cart.map((item: ISneakers) => <CartItem key={item._id} {...item} />);
    }
  };

  return (
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
          <Stack spacing="6">{renderCartProduct()}</Stack>
        </Stack>

        <Flex direction="column" align="center" flex="1">
          <CartOrderSummary />
        </Flex>
      </Stack>
    </Box>
  );
};
