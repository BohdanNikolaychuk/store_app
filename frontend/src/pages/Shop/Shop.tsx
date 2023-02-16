import { SimpleGrid, Box } from '@chakra-ui/react';

import CardView from '../../components/Card/Card';
import ROUTES from '../../router/_routes';

import { useAppSelector } from '../../hooks/redux.hooks';
import { selectSneakersData } from '../../store/product/selectors';
import { ISneakers } from '../../store/product/types';
import { selectAuthData } from '../../store/user/selectors';
import { NavLink, useSearchParams } from 'react-router-dom';
const Shop = () => {
  const { sneakers, loading } = useAppSelector(selectSneakersData);
  const { user } = useAppSelector(selectAuthData);
  const [searchParams] = useSearchParams();

  if (loading) {
    return <>Loading</>;
  }
  const filterArray = sneakers.filter((element) => element.category === searchParams.get('name'));

  return (
    <>
      <Box bg="gray" w="100%" p={4} color="white">
        {searchParams.get('name')}
      </Box>
      <SimpleGrid columns={3}>
        {filterArray.length === 0 && <>Array length 0</>}

        {filterArray.map((element: ISneakers) => (
          <NavLink
            key={element._id}
            to={user?.roles[0] === 'admin' ? '' : `${ROUTES.PRODUCTBYID(element._id)}`}>
            <CardView {...element} />
          </NavLink>
        ))}
      </SimpleGrid>
    </>
  );
};

export default Shop;
