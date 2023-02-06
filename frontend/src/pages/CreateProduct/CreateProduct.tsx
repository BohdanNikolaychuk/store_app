import React, { useState } from 'react';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  useColorModeValue
} from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import ROUTES from '../../router/_routes';
export const CreateProduct = () => {
  const [File, setFile] = useState(null);

  const addFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files);
  };

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
            <Input onChange={addFile} type="file" />
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
