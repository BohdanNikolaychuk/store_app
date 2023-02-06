import { Button, HStack } from '@chakra-ui/react';

import { NavLink } from 'react-router-dom';
import Links from '../../common/Links';
import ROUTES from '../../router/_routes';
const Shop = () => {
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
    </>
  );
};

export default Shop;
