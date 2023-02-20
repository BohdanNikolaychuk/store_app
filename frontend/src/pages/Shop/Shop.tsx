import { Box, Container, SimpleGrid, Text } from '@chakra-ui/react';

import CardView from '../../components/Card/Card';
import ROUTES from '../../router/_routes';

import { NavLink, useSearchParams } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux.hooks';
import { selectSneakersData } from '../../store/product/selectors';
import { ISneakers } from '../../store/product/types';
import { selectAuthData } from '../../store/user/selectors';
const Shop = () => {
  const { sneakers, loading } = useAppSelector(selectSneakersData);
  const { user } = useAppSelector(selectAuthData);
  const [searchParams] = useSearchParams();

  if (loading) {
    return <>Loading</>;
  }

  const filterSnaker = sneakers.filter((element) => {
    if (searchParams.get('name') === 'Shop All') {
      return sneakers;
    }
    return element.category === searchParams.get('name');
  });

  return (
    <>
      <Box bg="#f9f9f9" w="100%" p={4} color="white">
        <Text pt="2" pb="2" color="black" display="flex" justifyContent="center" fontSize="4xl">
          {searchParams.get('name')}
        </Text>

        <Text pt="2" pb="2" color="black" display="flex" justifyContent="center" fontSize="md">
          <NavLink to={ROUTES.MAIN}>Shop/</NavLink>
          {searchParams.get('name')}
        </Text>
      </Box>
      <Container maxW="1200px">
        <SimpleGrid columns={3}>
          {filterSnaker.map((element: ISneakers) => (
            <NavLink
              key={element._id}
              to={user?.roles[0] === 'admin' ? '' : `${ROUTES.PRODUCTBYID(element._id)}`}>
              <CardView {...element} />
            </NavLink>
          ))}
        </SimpleGrid>
      </Container>
    </>
  );
};

export default Shop;
