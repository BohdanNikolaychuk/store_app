import { useEffect, useState } from 'react';
import { SimpleGrid, Text, Box, Button, HStack } from '@chakra-ui/react';
import CardView from '../../components/Card/Card';
import ROUTES from '../../router/_routes';
import Links from '../../common/Links';
import { NavLink } from 'react-router-dom';
const Home = () => {
  const [Store, setStore] = useState([]);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products?limit=4')
      .then((res) => res.json())
      .then((json) => setStore(json));
  }, []);

  return (
    <>
      <HStack as={'nav'} spacing={4} display={{ md: 'flex' }} justifyContent="center">
        {Links.map((link) => (
          <NavLink to={`${ROUTES.MAIN}?${link.name}`} key={link.name}>
            <Button sx={{ borderRadius: '10px' }}>
              {link.icon}
              {link.name}
            </Button>
          </NavLink>
        ))}
      </HStack>
      <Text>Popular Shoes</Text>
      <Box bg="tomato" w="100%" h={'300px'} p={4} color="white">
        Summer Sale
      </Box>
      <SimpleGrid columns={2} spacing="10">
        {Store.map((element: any) => (
          <NavLink key={element.title} to={`${ROUTES.PRODUCTBYID(element.id)}`}>
            <CardView {...element} />
          </NavLink>
        ))}
      </SimpleGrid>
    </>
  );
};

export default Home;
