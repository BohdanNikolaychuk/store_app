import { Image, Stack, CardBody, Heading, Text, Button, Card } from '@chakra-ui/react';
import { GrFavorite } from 'react-icons/gr';

const CardView = ({ id, title, price, description, category, image }: any) => {
  return (
    <Card sx={{ maxWidth: '312px', height: '212px' }} maxW="sm">
      <CardBody>
        <Image
          src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=177&q=80"
          alt="Green double couch with wooden legs"
          borderRadius="lg"
        />
        <Stack mt="6" spacing="3">
          <Heading size="md">{title.split(' ')[0]}</Heading>
          <Button rounded={10} position="absolute" top={'1'} right="2" background={'white'}>
            <GrFavorite size="25px" />
          </Button>
        </Stack>
        <Text>$450</Text>
      </CardBody>
    </Card>
  );
};

export default CardView;
