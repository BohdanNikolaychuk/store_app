import { CloseButton, Flex, Link, Select, SelectProps, useColorModeValue } from '@chakra-ui/react';
import { PriceTag } from '../PriceTag/PriceTag';
import { CartProductMeta } from '../CartProductMeta/CartProductMeta';
import { ISneakers } from '../../store/product/types';
import { useAppDispatch } from '../../hooks/redux.hooks';
import { removeItem } from '../../store/cart/slice';

export const CartItem = (props: ISneakers) => {
  const { _id, name, description, quantity, image_url, price } = props;
  const dispatch = useAppDispatch();
  const deleteFromCart = () => {
    dispatch(removeItem(_id));
  };
  return (
    <Flex direction={{ base: 'column', md: 'row' }} justify="space-between" align="center">
      <CartProductMeta name={name!} description={description!} image={image_url!} />
      {/* Desktop */}
      <Flex width="full" justify="space-between" display={{ base: 'none', md: 'flex' }}>
        <PriceTag price={price!} />
        <CloseButton aria-label={`Delete ${name} from cart`} onClick={() => deleteFromCart()} />
      </Flex>

      {/* Mobile */}
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
