import { Button, Flex, Stack, Text, useColorModeValue as mode } from '@chakra-ui/react';
import { FaArrowRight } from 'react-icons/fa';
import { useAppSelector } from '../../hooks/redux.hooks';
import { selectCartData } from '../../store/cart/selectors';

export const CartOrderSummary = () => {
  const { cart } = useAppSelector(selectCartData);
  const getTotal = () => {
    let totalQuantity = 0;
    let totalPrice = 0;
    cart.forEach((item) => {
      totalQuantity += item.quantity;
      totalPrice += item.price * item.quantity;
    });
    return { totalPrice, totalQuantity };
  };

  return (
    <Stack spacing="8" borderWidth="1px" rounded="lg" padding="8" width="full">
      <Stack spacing="6">
        <Flex justify="space-between">
          <Text fontSize="lg" fontWeight="semibold">
            Total
          </Text>
          <Text fontSize="xl" fontWeight="extrabold">
            {getTotal().totalPrice} $
          </Text>
        </Flex>
      </Stack>
      <Button colorScheme="blue" size="lg" fontSize="md" rightIcon={<FaArrowRight />}>
        Checkout
      </Button>
    </Stack>
  );
};
