import { Button, Flex, Stack, Text } from '@chakra-ui/react';
import { useAppSelector } from '../../hooks/redux.hooks';
import { selectCartData } from '../../store/cart/selectors';

export const CartOrderSummary = () => {
  const { cart } = useAppSelector(selectCartData);
  const getTotal = () => {
    let totalQuantity = 0;
    let totalPrice = 0;
    cart.forEach((item) => {
      totalQuantity += item.quantity;
      totalPrice += +item.price * item.quantity;
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

      <Button rounded="none" _hover={{ background: 'gray' }} bg="#333333" mt="10" p="6">
        <Text color="white" textTransform="uppercase">
          Checkout
        </Text>
      </Button>
    </Stack>
  );
};
