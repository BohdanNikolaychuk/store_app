import { Button, FormControl, FormLabel, Input, Select, Stack, Textarea } from '@chakra-ui/react';
import { FC, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/redux.hooks';
import ROUTES from '../../router/_routes';
import { fetchAddSneaker } from '../../store/product/asyncActions';
export const CreateProduct: FC = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState('');
  const [file, setFile] = useState('');

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const OnCreateNewSneaker = () => {
    const newSneaker = {
      name,
      description,
      price: price + '',
      category,
      image_url: file
    };
    dispatch(fetchAddSneaker(newSneaker));
    navigate(ROUTES.MAIN);
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

            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Here is a sample placeholder"
            />
          </FormControl>
          <FormControl id="description">
            <FormLabel>Price</FormLabel>
            <Input value={price} onChange={(e) => setPrice(+e.target.value)} type="number" />
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
            <Input onChange={(e) => setFile(e.target.value)} />
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
