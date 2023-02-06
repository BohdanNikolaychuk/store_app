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
  const [Store, setStore] = useState<any>({});
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:3000/store/products/${id}`)
      .then((res) => res.json())
      .then((json) => setStore(json));
  }, []);

  return (
    <Container>
      <Button as={Link} to={ROUTES.MAIN}>
        Go to Main
      </Button>
      <Image src={Store?.image_url} alt="Green double couch with wooden legs" borderRadius="lg" />
      <Card pos={'relative'}>
        <CardHeader pos="absolute" left="50%">
          <Box background={'#B9F636'}>
            <Heading>${Store?.price}</Heading>
          </Box>
        </CardHeader>

        <CardBody>
          <Stack divider={<StackDivider />} spacing="4">
            <Box>
              <Heading size="xs" textTransform="uppercase">
                {Store?.category}
              </Heading>
              <Text pt="2" fontSize="sm">
                {Store?.name}
              </Text>
              <Text pt="2" fontSize="sm">
                {Store.description}
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
