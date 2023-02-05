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
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { BiShoppingBag } from 'react-icons/bi';
import ROUTES from '../../router/_routes';

const Info = () => {
  const [Store, setStore] = useState({});
  const { id } = useParams();

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((json) => setStore(json));
  }, []);

  return (
    <Container>
      <Button as={Link} to={ROUTES.MAIN}>
        Go to Main
      </Button>
      <Image
        src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop"
        alt="Green double couch with wooden legs"
        borderRadius="lg"
      />
      <Card pos={'relative'}>
        <CardHeader pos="absolute" left="50%">
          <Box background={'#B9F636'}>
            <Heading>$189</Heading>
          </Box>
        </CardHeader>

        <CardBody>
          <Stack divider={<StackDivider />} spacing="4">
            <Box>
              <Heading size="xs" textTransform="uppercase">
                Nike
              </Heading>
              <Text pt="2" fontSize="sm">
                Air Max pegasus 37
              </Text>
              <Text pt="2" fontSize="sm">
                An athletic shoe is a name for a shoe designed for sporting and physical activities,
                and is different in style.
              </Text>
            </Box>

            <Button>
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
