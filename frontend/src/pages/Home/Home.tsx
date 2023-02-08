import { SimpleGrid, Text, Box, Button, HStack } from '@chakra-ui/react';
import CardView from '../../components/Card/Card';
import ROUTES from '../../router/_routes';

import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux.hooks';
import { selectSneakersData } from '../../store/product/selectors';
import { ISneakers } from '../../store/product/types';
import { selectAuthData } from '../../store/user/selectors';

const Home = () => {
  const { sneakers, loading } = useAppSelector(selectSneakersData);
  const { user } = useAppSelector(selectAuthData);

  if (loading) {
    return <>Loading</>;
  }

  return (
    <>
      <SimpleGrid columns={2} spacing="10">
        {sneakers.map((element: ISneakers) => (
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

export default Home;
