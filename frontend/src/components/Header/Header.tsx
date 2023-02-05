import { Box, Flex, HStack, Button, Text, ButtonGroup } from '@chakra-ui/react';

import { NavLink } from 'react-router-dom';
import { CgProfile } from 'react-icons/cg';
import { BiShoppingBag } from 'react-icons/bi';
import ROUTES from '../../router/_routes';

const Header = () => {
  return (
    <Box px={4}>
      <Flex h={16} alignItems={'center'} justifyContent="space-between">
        <HStack spacing={8} alignItems={'center'}>
          <Text>Sneaker</Text>
        </HStack>
        <Flex alignItems={'center'}>
          <ButtonGroup spacing="6">
            <Button rounded={'30%'} as={NavLink} to={ROUTES.LOGIN} background={'white'}>
              <CgProfile size="25px" />
            </Button>
            <Button as={NavLink} to={ROUTES.CART} rounded={'100%'} background={'white'}>
              <BiShoppingBag size="25px" />
            </Button>
          </ButtonGroup>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Header;
