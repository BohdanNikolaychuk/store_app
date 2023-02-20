import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text
} from '@chakra-ui/react';
import { FC, memo } from 'react';

import { BiShoppingBag } from 'react-icons/bi';
import { CgProfile } from 'react-icons/cg';
import { NavLink } from 'react-router-dom';
import Links from '../../common/Links';
import { useAppDispatch, useAppSelector } from '../../hooks/redux.hooks';
import ROUTES from '../../router/_routes';
import { selectCartData } from '../../store/cart/selectors';
import { selectAuthData } from '../../store/user/selectors';
import { logout } from '../../store/user/slice';

const Header: FC = memo(() => {
  const { user, isAuth } = useAppSelector(selectAuthData);
  const { cart } = useAppSelector(selectCartData);
  const dispatch = useAppDispatch();
  const LogOut = () => {
    dispatch(logout());
  };

  return (
    <Box px={4}>
      <Flex h={16} alignItems={'center'} justifyContent="space-between">
        <HStack spacing={8} alignItems={'center'}>
          <Text as={NavLink} to={ROUTES.MAIN}>
            Sneaker
          </Text>
        </HStack>
        {user?.roles[0] === 'admin' && (
          <>
            <ButtonGroup variant="link" spacing="8">
              {[{ name: 'Create new product', to: ROUTES.FORM_CREATE }].map((item) => (
                <Button as={NavLink} to={item.to} key={item.name}>
                  {item.name}
                </Button>
              ))}
            </ButtonGroup>
          </>
        )}

        <Flex alignItems={'center'}>
          {user?.roles[0] !== 'admin' && (
            <ButtonGroup spacing="6">
              <Button as={NavLink} to={ROUTES.CART} rounded={'30%'} background={'white'}>
                {cart.length}
                <BiShoppingBag size="25px" />
              </Button>
            </ButtonGroup>
          )}
          <Menu>
            <MenuButton
              as={Button}
              size={'sm'}
              rounded={'full'}
              variant={'link'}
              cursor={'pointer'}
              _hover={{ textDecoration: 'none' }}>
              <Button rounded={'30%'} as={NavLink} to={ROUTES.LOGIN} background={'white'}>
                <CgProfile color="black" size="25px" />
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
      {user?.roles[0] !== 'admin' && (
        <HStack as={'nav'} spacing={10} display={{ md: 'flex' }} justifyContent="center">
          {Links.map((link) => (
            <NavLink to={`${ROUTES.SHOP}?name=${link!.name}`} key={link!.name}>
              <Button opacity="0.5" _hover={{ opacity: '1' }} background={'inherit'}>
                {link!.icon === '' ? link!.name : link?.icon}
              </Button>
            </NavLink>
          ))}
        </HStack>
      )}
    </Box>
  );
});

export default Header;
