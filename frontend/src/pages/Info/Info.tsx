import {
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
  useToast
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { BreadCrumb } from '../../components/BreadCrumb/BreadCrumb';
import { useActionCreators, useAppSelector } from '../../hooks/redux.hooks';
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
        <BreadCrumb brandName={sneakerByID?.category} productName={sneakerByID?.name} />
      </Box>
      <Container maxW={'1200px'}>
        <Flex
          mt="20"
          display={{ md: 'block', xl: 'flex' }}
          justifyContent={{ xl: 'space-between' }}>
          <Image h="auto" maxW="100%" margin={{ md: '0 auto' }} src={sneakerByID?.image_url} />

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
