import React, { useState } from 'react';
import { FormControl, FormLabel, Input, Stack, Button, Select } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import ROUTES from '../../router/_routes';
import { useAppDispatch } from '../../hooks/redux.hooks';
import { fetchAddSneaker } from '../../store/product/asyncActions';
export const CreateProduct = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [File, setFile] = useState(null);

  const dispatch = useAppDispatch();

  const addFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files);
  };

  const OnCreateNewSneaker = () => {
    const newSneaker = {
      name,
      description,
      price: +price,
      category,
      image_url:
        'https://image.goat.com/375/attachments/product_template_pictures/images/020/627/570/original/491891_00.png.png'
    };
    dispatch(fetchAddSneaker(newSneaker));
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
            <Input value={name} onChange={(e) => setName(e.target.value)} type="text" />
          </FormControl>
          <FormControl id="description">
            <FormLabel>Description</FormLabel>
            <Input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              type="text"
            />
          </FormControl>
          <FormControl id="description">
            <FormLabel>Price</FormLabel>
            <Input value={price} onChange={(e) => setPrice(e.target.value)} type="number" />
          </FormControl>
          <FormControl id="description">
            <Select
              onChange={(e) => setCategory(e.target.value)}
              variant="unstyled"
              placeholder="Category">
              <option value="Nike">Nike</option>
              <option value="Adidas">Adidas</option>
              <option value="Rebok">Rebok</option>
              <option value="Air Jordan">Air Jordan</option>
            </Select>
          </FormControl>
          <FormControl id="description">
            <FormLabel>Image</FormLabel>
            <Input onChange={addFile} type="file" />
          </FormControl>

          <Stack spacing={10}>
            <Button
              onClick={() => OnCreateNewSneaker()}
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
