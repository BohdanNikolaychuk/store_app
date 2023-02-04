import { Container } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';

const Layout = () => {
  return (
    <Container maxW="1200px">
      <Header></Header>
      <Outlet />
    </Container>
  );
};

export default Layout;
