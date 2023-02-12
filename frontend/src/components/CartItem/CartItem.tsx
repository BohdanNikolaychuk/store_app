import { Button, CloseButton, Flex, Link, Box } from '@chakra-ui/react';
import { PriceTag } from '../PriceTag/PriceTag';
import { CartProductMeta } from '../CartProductMeta/CartProductMeta';
import { ISneakers } from '../../store/product/types';
import { useAppDispatch } from '../../hooks/redux.hooks';
import { decrementQuantity, incrementQuantity, removeItem } from '../../store/cart/slice';

export const CartItem = ({ _id, name, description, quantity, image_url, price }: ISneakers) => {
  const dispatch = useAppDispatch();
  const deleteFromCart = () => {
    dispatch(removeItem(_id));
  };
  const onIncrement = (id: string) => {
    dispatch(incrementQuantity(id));
  };

  const onDecrement = (id: string) => {
    dispatch(decrementQuantity(id));
  };

  return (
    <Flex direction={{ base: 'column', md: 'row' }} justify="space-between" align="center">
      <CartProductMeta name={name!} description={description!} image={image_url!} />

      <Flex width="full" justify="space-between" display={{ base: 'none', md: 'flex' }}>
        <PriceTag price={price!} />

        <Flex alignItems={'center'}>
          <Button onClick={() => onDecrement(_id!)}>-</Button>
          <Box bg={'gray.600'}>{quantity}</Box>
          <Button onClick={() => onIncrement(_id!)}>+</Button>
        </Flex>

        <CloseButton aria-label={`Delete ${name} from cart`} onClick={() => deleteFromCart()} />
      </Flex>

      <Flex
        mt="4"
        align="center"
        width="full"
        justify="space-between"
        display={{ base: 'flex', md: 'none' }}>
        <Link fontSize="sm" textDecor="underline">
          Delete
        </Link>
      </Flex>
    </Flex>
  );
};
