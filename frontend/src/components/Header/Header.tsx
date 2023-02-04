import { useState } from 'react';

import {
  Box,
  Flex,
  HStack,
  InputGroup,
  InputLeftElement,
  Input,
  Container,
  Button,
  Text,
  ButtonGroup
} from '@chakra-ui/react';
import { Search2Icon } from '@chakra-ui/icons';

import Links from '../../common/Links';
import { NavLink } from 'react-router-dom';
import { GrFavorite } from 'react-icons/gr';
import { BiShoppingBag } from 'react-icons/bi';
import ROUTES from '../../router/_routes';

const Header = () => {
  return (
    <>
      <Box px={4}>
        <Flex h={16} alignItems={'center'} justifyContent="space-between">
          <HStack spacing={8} alignItems={'center'}>
            <Text>Sneaker</Text>

            <InputGroup>
              <InputLeftElement pointerEvents="none" children={<Search2Icon color="gray.300" />} />
              <Input type="tel" placeholder="What do you looking for?" />
            </InputGroup>
          </HStack>
          <Flex alignItems={'center'}>
            <ButtonGroup variant="outline" spacing="6">
              <Button>
                <GrFavorite size="25px" />
              </Button>
              <Button>
                <BiShoppingBag size="25px" />
              </Button>
            </ButtonGroup>
          </Flex>
        </Flex>
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
      </Box>
    </>
  );
};

export default Header;
