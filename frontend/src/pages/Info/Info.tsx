import {
  Alert,
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
  Text
} from '@chakra-ui/react';
import { useState } from 'react';

import { NavLink, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux.hooks';
import ROUTES from '../../router/_routes';
import { addToCart } from '../../store/cart/slice';
import { selecetSneakersByID } from '../../store/product/selectors';
const Info = () => {
  const { id } = useParams();

  const sneakerByID = useAppSelector(selecetSneakersByID(id!));
  const dispatch = useAppDispatch();
  console.log();

  const [SelectSize, setSize] = useState('');

  const onAddToCart = () => {
    const AddSneakerToCart = {
      ...sneakerByID,
      size: SelectSize
    };

    dispatch(addToCart(AddSneakerToCart));
    return (
      <>
        <Alert status="success">
          <AlertIcon />
          Data uploaded to the server. Fire on!
        </Alert>
      </>
    );
  };

  return (
    <>
      <Box bg="#f9f9f9" w="100%" p={4} color="white">
        <Text pt="2" pb="2" color="black" display="flex" justifyContent="center" fontSize="md">
          <NavLink to={ROUTES.SHOP}>
            <Text opacity={'0.5'}>Shop / </Text>
          </NavLink>
          <NavLink to={ROUTES.SHOP + `?name=${sneakerByID?.category}`}>
            <Text opacity={'0.5'}> {sneakerByID?.category} /</Text>
          </NavLink>
          <NavLink to={ROUTES.SHOP + `?name=${sneakerByID?.category}`}>
            <Text> {sneakerByID?.name}</Text>
          </NavLink>
        </Text>
      </Box>
      <Container maxW={'1200px'}>
        <Flex mt="20" justifyContent="space-between">
          <Image src={sneakerByID?.image_url} borderRadius="full" />

          <Box w={'50%'}>
            <Heading color="#696969">{sneakerByID?.name}</Heading>

            <Stack divider={<StackDivider />} spacing="4">
              <Box>
                <Text pt="20px" fontSize="2xl">
                  Price : <strong> ${sneakerByID?.price}</strong>
                </Text>
                <Text pt="20px" fontSize="xl">
                  Size
                </Text>
                <Select onChange={(e) => setSize(e.target.value)} placeholder="Select option">
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
