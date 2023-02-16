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
  Text
} from '@chakra-ui/react';

import { AiOutlineArrowLeft } from 'react-icons/ai';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux.hooks';
import { addToCart } from '../../store/cart/slice';
import { selecetSneakersByID } from '../../store/product/selectors';
const Info = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const sneakerByID = useAppSelector(selecetSneakersByID(id!));
  const dispatch = useAppDispatch();

  const GoBack = () => {
    navigate(-1);
  };

  const onAddToCart = () => {
    const AddSneakerToCart = {
      ...sneakerByID,
      size: 2
    };

    dispatch(addToCart(AddSneakerToCart));
  };

  return (
    <Container maxW={'1200px'}>
      <Button bg="inherit" onClick={GoBack}>
        <AiOutlineArrowLeft size={'25px'} />
      </Button>

      <Flex mt="20" justifyContent="space-between">
        <Image src={sneakerByID?.image_url} borderRadius="full" />

        <Box w={'50%'}>
          <Heading>{sneakerByID?.name}</Heading>

          <Stack divider={<StackDivider />} spacing="4">
            <Box>
              <Text pt="2" fontSize="2xl">
                Price : ${sneakerByID?.price}
              </Text>
              <Text pt="2" fontSize="xl">
                Size
              </Text>
              <Select placeholder="Select option">
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
              </Select>
            </Box>
          </Stack>
          <Button mt="10" onClick={() => onAddToCart()}>
            <Text textTransform="uppercase">add To Cart</Text>
          </Button>
        </Box>
      </Flex>
    </Container>
  );
};

export default Info;
