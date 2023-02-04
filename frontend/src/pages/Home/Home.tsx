import { useEffect, useState } from 'react';
import { SimpleGrid, Text } from '@chakra-ui/react';
import Card from '../../components/Card/Card';
import { Link } from 'react-router-dom';

const Home = () => {
  const [Store, setStore] = useState([]);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((res) => res.json())
      .then((json) => setStore(json));
  }, []);

  return (
    <>
      <Text>Popular Nike Shoes</Text>
      <SimpleGrid columns={1}>
        {Store.map((element: any) => (
          <Link key={element.id} to={`/product/${element.id}`}>
            <Card {...element} />
          </Link>
        ))}
      </SimpleGrid>
    </>
  );
};

export default Home;
