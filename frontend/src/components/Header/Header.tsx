import {
  Box,
  Flex,
  HStack,
  Button,
  Text,
  ButtonGroup,
  MenuButton,
  Menu,
  MenuList,
  MenuItem
} from '@chakra-ui/react';

import { NavLink } from 'react-router-dom';
import { CgProfile } from 'react-icons/cg';
import { BiShoppingBag } from 'react-icons/bi';
import ROUTES from '../../router/_routes';
import { useAppDispatch, useAppSelector } from '../../hooks/redux.hooks';
import { selectAuthData } from '../../store/user/selectors';
import { logout } from '../../store/user/slice';

const Header = () => {
  const { user, isAuth } = useAppSelector(selectAuthData);

  const dispatch = useAppDispatch();
  const LogOut = () => {
    dispatch(logout());
  };

  return (
    <Box px={4}>
      <Flex h={16} alignItems={'center'} justifyContent="space-between">
        <HStack spacing={8} alignItems={'center'}>
          <Text>Sneaker</Text>
        </HStack>

        {user?.roles[0] === 'admin' ? (
          <>
            <ButtonGroup variant="link" spacing="8">
              {[
                { name: 'All Product', to: ROUTES.MAIN },
                { name: 'Create new product', to: ROUTES.FORM_CREATE }
              ].map((item) => (
                <Button as={NavLink} to={item.to} key={item.name}>
                  {item.name}
                </Button>
              ))}
            </ButtonGroup>
          </>
        ) : (
          <>
            <ButtonGroup variant="link" spacing="8">
              {[
                { name: 'Home', to: ROUTES.MAIN },
                { name: 'Shop', to: ROUTES.SHOP }
              ].map((item) => (
                <Button as={NavLink} to={item.to} key={item.name}>
                  {item.name}
                </Button>
              ))}
            </ButtonGroup>
          </>
        )}
        <Flex alignItems={'center'}>
          <ButtonGroup spacing="6">
            <Button as={NavLink} to={ROUTES.CART} rounded={'30%'} background={'white'}>
              <BiShoppingBag size="25px" />
            </Button>
          </ButtonGroup>
          <Menu>
            <MenuButton
              as={Button}
              size={'sm'}
              rounded={'full'}
              variant={'link'}
              cursor={'pointer'}
              _hover={{ textDecoration: 'none' }}>
              <Button rounded={'30%'} as={NavLink} to={ROUTES.LOGIN} background={'white'}>
                <CgProfile size="25px" />
              </Button>
            </MenuButton>
            <MenuList fontSize={17} zIndex={5555}>
              {isAuth === !null ? (
                <>
                  <MenuItem>Hello,{user?.username}</MenuItem>
                  <Button onClick={LogOut}>Logout</Button>
                </>
              ) : (
                <>
                  <MenuItem as={NavLink} to="login">
                    Login
                  </MenuItem>
                  <MenuItem as={NavLink} to="register">
                    Register
                  </MenuItem>
                </>
              )}
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Header;
