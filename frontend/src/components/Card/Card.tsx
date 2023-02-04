import {
  Image,
  Stack,
  CardBody,
  Heading,
  Text,
  Divider,
  CardFooter,
  ButtonGroup,
  Button
} from '@chakra-ui/react';

const Card = ({ id, title, price, description, category, image }: any) => {
  return (
    <Card maxW="sm">
      <CardBody>
        <Image borderRadius="lg" />
        <Stack mt="6" spacing="3">
          <Heading size="md">Living room Sofa</Heading>
          <Text>{title}</Text>
          <Text color="blue.600" fontSize="2xl">
            $450
          </Text>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        <ButtonGroup spacing="2">
          <Button variant="solid" colorScheme="blue">
            Buy now
          </Button>
          <Button variant="ghost" colorScheme="blue">
            Add to cart
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};

export default Card;
