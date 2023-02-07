import React, { useState } from 'react';
import { FormControl, FormLabel, Input, Stack, Button } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import ROUTES from '../../router/_routes';
const EditCard = () => {
  return (
    <>
      <Button as={NavLink} to={ROUTES.MAIN}>
        To Main
      </Button>

      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack spacing={4}>
          <FormControl id="name">
            <FormLabel>Name</FormLabel>
            <Input type="text" />
          </FormControl>
          <FormControl id="description">
            <FormLabel>Description</FormLabel>
            <Input type="text" />
          </FormControl>
          <FormControl id="description">
            <FormLabel>Price</FormLabel>
            <Input type="text" />
          </FormControl>
          <FormControl id="description">
            <FormLabel>Category</FormLabel>
            <Input type="text" />
          </FormControl>
          <FormControl id="description">
            <FormLabel>Image</FormLabel>
            <Input type="file" />
          </FormControl>

          <Stack spacing={10}>
            <Button
              bg={'blue.400'}
              color={'white'}
              _hover={{
                bg: 'blue.500'
              }}>
              Create
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};

export default EditCard;
