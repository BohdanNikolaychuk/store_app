import { Container } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';

const Layout = () => {
  return (
    <>
      <Header></Header>
      <Container maxW="2xl">
        <Outlet />
      </Container>
    </>
  );
};

export default Layout;
