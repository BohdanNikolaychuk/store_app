import { Box, Container, SimpleGrid, Text } from '@chakra-ui/react';

import { CardView } from '../../components/Card/Card';
import ROUTES from '../../router/_routes';

import { NavLink, useSearchParams } from 'react-router-dom';
import { BreadCrumb } from '../../components/BreadCrumb/BreadCrumb';
import { useAppSelector } from '../../hooks/redux.hooks';
import { filterSneakers } from '../../store/product/selectors';
import { ISneakers } from '../../store/product/types';

export const Shop = () => {
  const status = useAppSelector((state) => state.sneakers.status);
  const user = useAppSelector((state) => state.auth.user);
  const [searchParams] = useSearchParams();

  const visibleSneakers = useAppSelector(filterSneakers(searchParams.get('name')));

  if (status === 'init' || status === 'loading') {
    return <>Loading</>;
  }

  const renderBreads = () => {
    if (!searchParams.get('name')) {
      return (
        <Text
          variant={'h1'}
          pt="2"
          pb="2"
          color="black"
          display="flex"
          justifyContent="center"
          fontSize="4xl">
          Shop All
        </Text>
      );
    } else {
      return (
        <>
          <Text pt="2" pb="2" color="black" display="flex" justifyContent="center" fontSize="4xl">
            {searchParams.get('name')}
          </Text>
          <BreadCrumb brandName={searchParams.get('name')} productName="" />
        </>
      );
    }
  };

  return (
    <>
      <Box bg="#f9f9f9" w="100%" p={4} color="white">
        {renderBreads()}
      </Box>

      <Container maxW="1200px">
        <Box display="flex">
          <SimpleGrid w="100%" columns={[1, 2, 3]}>
            {visibleSneakers.map((element: ISneakers) => (
              <NavLink
                key={element._id}
                to={user?.roles[0] === 'admin' ? '' : `${ROUTES.PRODUCTBYID(element._id)}`}>
                <CardView {...element} />
              </NavLink>
            ))}
          </SimpleGrid>
        </Box>
      </Container>
    </>
  );
};
