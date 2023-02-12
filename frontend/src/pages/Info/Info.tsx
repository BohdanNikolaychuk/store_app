import {
  Button,
  Container,
  Image,
  Box,
  Card,
  CardHeader,
  Heading,
  CardBody,
  Stack,
  StackDivider,
  Text
} from '@chakra-ui/react';

import { Link, useParams } from 'react-router-dom';
import { BiShoppingBag } from 'react-icons/bi';
import ROUTES from '../../router/_routes';
import { useAppDispatch, useAppSelector } from '../../hooks/redux.hooks';
import { selecetSneakersByID } from '../../store/product/selectors';
import { addToCart } from '../../store/cart/slice';
import { AiOutlineArrowLeft } from 'react-icons/ai';
const Info = () => {
  const { id } = useParams();
  const sneakerByID = useAppSelector(selecetSneakersByID(id!));
  const dispatch = useAppDispatch();

  const onAddToCart = () => {
    dispatch(addToCart(sneakerByID));
  };

  return (
    <Container>
      <Button bg="inherit" as={Link} to={ROUTES.MAIN}>
        <AiOutlineArrowLeft size={'25px'} />
      </Button>
      <Image
        src={sneakerByID?.image_url}
        alt="Green double couch with wooden legs"
        borderRadius="lg"
      />
      <Card pos={'relative'}>
        <CardHeader pos="absolute" left="50%">
          <Heading>${sneakerByID?.price}</Heading>
        </CardHeader>

        <CardBody>
          <Stack divider={<StackDivider />} spacing="4">
            <Box>
              <Heading size="xs" textTransform="uppercase">
                {sneakerByID?.category}
              </Heading>
              <Text pt="2" fontSize="sm">
                {sneakerByID?.name}
              </Text>
              <Text pt="2" fontSize="sm">
                {sneakerByID?.description}
              </Text>
            </Box>

            <Button onClick={() => onAddToCart()}>
              <BiShoppingBag size="25px" />
              <Text>Add to Cart</Text>
            </Button>
          </Stack>
        </CardBody>
      </Card>
    </Container>
  );
};

export default Info;
