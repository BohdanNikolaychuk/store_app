import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Container,
  Flex,
  Heading,
  Image,
  Select,
  Stack,
  StackDivider,
  Text,
  useToast
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { useActionCreators, useAppSelector } from '../../hooks/redux.hooks';
import ROUTES from '../../router/_routes';
import { CartActions } from '../../store/cart/slice';
import { selectedSneakersByID } from '../../store/product/selectors';

export const Info = () => {
  const { id } = useParams();
  const toast = useToast({
    position: 'top'
  });
  const sneakerByID = useAppSelector(selectedSneakersByID(id!));
  const actions = useActionCreators(CartActions);
  const [SelectSize, setSize] = useState('');

  const onSelectSize = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSize(e.target.value);
  };

  const onAddToCart = () => {
    const AddSneakerToCart = {
      ...sneakerByID,
      SelectSize
    };
    if (!SelectSize) {
      toast({
        title: 'Choose your size',
        description: 'Size is a required field',
        status: 'error',
        duration: 2500,
        isClosable: true
      });
    } else {
      toast({
        description: `You added ${sneakerByID?.name} to your shopping cart`,
        status: 'success',
        duration: 2500,
        isClosable: true
      });
      actions.addToCart(AddSneakerToCart);
    }
  };

  return (
    <>
      <Box bg="#f9f9f9" w="100%" p={4} color="white">
        <Breadcrumb color="black" pt="2" pb="2" display="flex" justifyContent="center">
          <BreadcrumbItem>
            <BreadcrumbLink opacity={'0.5'} _hover={{ color: 'red' }} as={NavLink} to={ROUTES.SHOP}>
              Shop
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink
              opacity={'0.5'}
              _hover={{ color: 'red' }}
              to={ROUTES.SHOP + `?name=${sneakerByID?.category}`}
              as={NavLink}>
              {sneakerByID?.category}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink>
              <Text overflow="hidden" textOverflow="ellipsis">
                {sneakerByID?.name}{' '}
              </Text>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </Box>
      <Container maxW={'1200px'}>
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
                <Select
                  border="none"
                  rounded="none"
                  bg="#f7f7f7"
                  onChange={onSelectSize}
                  placeholder="Select option">
                  {sneakerByID?.size?.map((element: any) => (
                    <option key={element.size}>{element.size}</option>
                  ))}
                </Select>
              </Box>
            </Stack>
            <Button variant="primary" mt="10" p="6" onClick={() => onAddToCart()}>
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
