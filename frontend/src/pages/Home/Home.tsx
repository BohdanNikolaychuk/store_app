import { useEffect, useState } from 'react';
import { SimpleGrid, Text, Box } from '@chakra-ui/react';
import CardView from '../../components/Card/Card';

const Home = () => {
  const [Store, setStore] = useState([]);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products?limit=4')
      .then((res) => res.json())
      .then((json) => setStore(json));
  }, []);

  return (
    <>
      <Text>Popular Shoes</Text>
      <Box bg="tomato" w="100%" h={'300px'} p={4} color="white">
        Summer Sale
      </Box>
      <SimpleGrid columns={2} spacing="10">
        {Store.map((element: any) => (
          <CardView key={element.title} {...element} />
        ))}
      </SimpleGrid>
    </>
  );
};

export default Home;
