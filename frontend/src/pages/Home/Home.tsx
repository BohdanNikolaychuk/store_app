import { Box, Button } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux.hooks';
import ROUTES from '../../router/_routes';
import { Admin } from '../Admin/Admin';

export const Home = () => {
  const user = useAppSelector((state) => state.auth.user);

  const renderRoleInterface = () => {
    if (user?.roles.includes('admin')) {
      return <Admin />;
    } else {
      return (
        <>
          <Box display="flex" justifyContent="center" mt="8">
            <Button variant="primary" as={NavLink} to={ROUTES.SHOP}>
              Shop Now
            </Button>
          </Box>
        </>
      );
    }
  };

  return <>{renderRoleInterface()}</>;
};
