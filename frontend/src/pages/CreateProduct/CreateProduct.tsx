import { Button, FormControl, FormLabel, Input, Select, Stack, Textarea } from '@chakra-ui/react';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/redux.hooks';
import ROUTES from '../../router/_routes';
import { fetchAddSneaker } from '../../store/product/asyncActions';
export const CreateProduct = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [file, setFile] = useState('');

  const dispatch = useAppDispatch();

  const addFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0].name);
    }
  };

  const OnCreateNewSneaker = () => {
    const newSneaker = {
      name,
      description,
      price: price,
      category,
      image_url:
        'https://rundownmarketplace.com/media/catalog/product/cache/338761ca9ab59f63a51ce082c1ed9412/i/m/img_2641.jpg'
    };
    dispatch(fetchAddSneaker(newSneaker));
  };
  console.log(file);

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

            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Here is a sample placeholder"
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
