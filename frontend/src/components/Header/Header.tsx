import {
  Box,
  Button,
  Flex,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text
} from '@chakra-ui/react';
import { FC, memo, useMemo } from 'react';

import { BiShoppingBag } from 'react-icons/bi';
import { CgProfile } from 'react-icons/cg';
import { NavLink } from 'react-router-dom';
import Links from '../../common/Links';
import { useAppDispatch, useAppSelector } from '../../hooks/redux.hooks';
import ROUTES from '../../router/_routes';

import { AuthActions } from '../../store/user/slice';

export const Header: FC = memo(() => {
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  const user = useAppSelector((state) => state.auth.user);
  const cart = useAppSelector((state) => state.cart.cart);
  const MemoLink = useMemo(() => Links, []);

  const dispatch = useAppDispatch();
  const LogOut = () => {
    dispatch(AuthActions.logout());
  };

  const renderMenuListButton = () => {
    if (isAuth) {
      return (
        <>
          <MenuItem>Hello,{user?.username}</MenuItem>
          <Button onClick={LogOut}>Logout</Button>
        </>
      );
    } else {
      return (
        <>
          <MenuItem as={NavLink} to="login">
            Login
          </MenuItem>
          <MenuItem as={NavLink} to="register">
            Register
          </MenuItem>
        </>
      );
    }
  };

  const renderBrandList = () => {
    if (user?.roles[0] !== 'admin') {
      return (
        <>
          <HStack as={'nav'} spacing={10} display="flex" justifyContent="center">
            {MemoLink.map((link) => (
              <NavLink
                to={
                  link.name === 'Shop All' ? `${ROUTES.SHOP}` : `${ROUTES.SHOP}?name=${link!.name}`
                }
                key={link!.name}>
                <Button opacity="0.5" _hover={{ opacity: '1' }} background={'inherit'}>
                  {link!.icon}
                </Button>
              </NavLink>
            ))}
          </HStack>
        </>
      );
    }
  };

  return (
    <Box px={4} pos="relative" top="0" left="0" zIndex="100">
      <Flex h={16} alignItems={'center'} justifyContent="space-between">
        <HStack spacing={8} alignItems={'center'}>
          <Text as={NavLink} to={ROUTES.MAIN}>
            Sneaker
          </Text>
        </HStack>
        <Flex alignItems={'center'}>
          <Button
            rounded="none"
            cursor={'pointer'}
            _hover={{ textDecoration: 'none', opacity: '1' }}
            opacity={cart.length !== 0 ? '1' : '0.5'}
            as={NavLink}
            to={ROUTES.CART}
            background="inherit">
            <Text as="b">{cart.length}</Text>
            <BiShoppingBag size="25px" />
          </Button>
          <Menu>
            <MenuButton
              as={Button}
              size={'sm'}
              rounded={'full'}
              variant={'link'}
              cursor={'pointer'}
              _active={{ opacity: '1' }}
              opacity={isAuth ? '1' : '0.5'}
              _hover={{ textDecoration: 'none', opacity: '1' }}>
              <Button background={'inherit'} as={NavLink} to={ROUTES.LOGIN}>
                <CgProfile color="black" size="25px" />
              </Button>
            </MenuButton>
            <MenuList fontSize={17} zIndex={5555}>
              {renderMenuListButton()}
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
      {renderBrandList()}
    </Box>
  );
});
