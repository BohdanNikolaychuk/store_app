import {
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Image,
  Select,
  Stack,
  StackDivider,
  Text,
  useDisclosure
} from '@chakra-ui/react';
import React, { useState } from 'react';

import { NavLink, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux.hooks';
import ROUTES from '../../router/_routes';
import { addToCart } from '../../store/cart/slice';
import { selecetSneakersByID } from '../../store/product/selectors';
const Info = () => {
  const { id } = useParams();
  const { isOpen: isVisible, onClose, onOpen } = useDisclosure({ defaultIsOpen: false });
  const sneakerByID = useAppSelector(selecetSneakersByID(id!));
  const dispatch = useAppDispatch();

  const [SelectSize, setSize] = useState('');
  const [error, setError] = useState('');
  const onSelectSize = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSize(e.target.value);
  };

  const onAddToCart = () => {
    const AddSneakerToCart = {
      ...sneakerByID,
      size: SelectSize
    };
    if (!SelectSize) {
      setError('Choose Size');
      setTimeout(() => {
        setError('');
        onClose();
      }, 2500);
    }
    const onAddTo = dispatch(addToCart(AddSneakerToCart));

    if (onAddTo.payload) {
      onOpen();
      setTimeout(() => onClose(), 2500);
    }
  };

  return (
    <>
      <Box bg="#f9f9f9" w="100%" p={4} color="white">
        <Text pt="2" pb="2" color="black" display="flex" justifyContent="center" fontSize="md">
          <NavLink to={ROUTES.SHOP}>
            <Text opacity={'0.5'} _hover={{ color: 'red' }}>
              Shop /{' '}
            </Text>
          </NavLink>
          <NavLink to={ROUTES.SHOP + `?name=${sneakerByID?.category}`}>
            <Text opacity={'0.5'} _hover={{ color: 'red' }}>
              {sneakerByID?.category}/
            </Text>
          </NavLink>
          <NavLink to={ROUTES.SHOP + `?name=${sneakerByID?.category}`}>
            <Text> {sneakerByID?.name}</Text>
          </NavLink>
        </Text>
      </Box>
      <Container maxW={'1200px'}>
        {isVisible && error === '' && (
          <Alert status="success">
            <AlertIcon />
            <Box display="flex" justifyContent="center">
              <AlertDescription>
                You added {sneakerByID?.name} to your
                <NavLink to={ROUTES.CART}>shopping cart.</NavLink>
              </AlertDescription>
            </Box>
          </Alert>
        )}

        {error && (
          <Alert status="error">
            <AlertIcon />

            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Flex
          mt="20"
          display={{ md: 'block', xl: 'flex' }}
          justifyContent={{ xl: 'space-between' }}
          margin={{ md: '0 auto' }}>
          <Image h="auto" maxW="100%" src={sneakerByID?.image_url} />

          <Box mt="4">
            <Heading color="#696969">{sneakerByID?.name}</Heading>

            <Stack divider={<StackDivider />} spacing="4">
              <Box>
                <Text pt="20px" fontSize="2xl">
                  Price : <strong> ${sneakerByID?.price}</strong>
                </Text>
                <Text pt="20px" fontSize="xl">
                  Size
                </Text>
                <Select onChange={onSelectSize} placeholder="Select option">
                  {sneakerByID?.size?.map((element: any) => (
                    <option key={element.size}>{element.size}</option>
                  ))}
                </Select>
              </Box>
            </Stack>
            <Button
              rounded="none"
              _hover={{ background: 'gray' }}
              bg="#333333"
              mt="10"
              p="6"
              onClick={() => onAddToCart()}>
              <Text color="white" textTransform="uppercase">
                add To Cart
              </Text>
            </Button>
          </Box>
        </Flex>
      </Container>
    </>
  );
};

export default Info;
