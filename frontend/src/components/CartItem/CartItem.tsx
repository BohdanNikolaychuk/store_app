import { Button, CloseButton, Flex, Link } from '@chakra-ui/react';
import { useAppDispatch } from '../../hooks/redux.hooks';
import { decrementQuantity, incrementQuantity, removeItem } from '../../store/cart/slice';
import { ISneakers } from '../../store/product/types';
import { CartProductMeta } from '../CartProductMeta/CartProductMeta';
import { PriceTag } from '../PriceTag/PriceTag';

export const CartItem = ({ _id, name, quantity, image_url, price, size }: ISneakers) => {
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
      <CartProductMeta name={name!} size={size!} image={image_url!} />

      <Flex width="full" justify="space-between" display={{ base: 'none', md: 'flex' }}>
        <PriceTag price={price!} />

        <Flex alignItems={'center'}>
          <Button rounded="none" p="4" bg="#f7f7f7" onClick={() => onDecrement(_id!)}>
            -
          </Button>
          <Button _hover={{ background: '#f7f7f7' }} rounded="none" bg="#f7f7f7" p="4">
            {quantity}
          </Button>
          <Button rounded="none" bg="#f7f7f7" onClick={() => onIncrement(_id!)}>
            +
          </Button>
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
