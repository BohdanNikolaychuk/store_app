import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea
} from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux.hooks';
import ROUTES from '../../router/_routes';
import { fetchEditSneakerByID } from '../../store/product/asyncActions';
import { selectedSneakersByID } from '../../store/product/selectors';

export const EditCard = () => {
  const { id } = useParams();

  const sneakerByID = useAppSelector(selectedSneakersByID(id!));
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [name, setName] = useState(() => id && sneakerByID?.name);
  const [description, setDescription] = useState(() => id && sneakerByID?.description);
  const [price, setPrice] = useState(() => id && sneakerByID?.price);
  const [category, setCategory] = useState(() => id && sneakerByID?.category);
  const [file, setFile] = useState(() => id && sneakerByID?.image_url);

  const EditSneakerById = async () => {
    const newEditSneaker = {
      id,
      name,
      description,
      price,
      image_url: file,
      category
    };
    await dispatch(fetchEditSneakerByID(newEditSneaker))
      .unwrap()
      .then((res) => {
        navigate(ROUTES.ADMIN);
      });
  };

  const onSetFile = (e: any) => {
    const file = e.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      setFile(reader.result as string);
    };
  };

  return (
    <Box>
      <Flex justifyContent="space-between">
        <Box w="50%" p="10">
          <FormControl>
            <FormLabel>Product Name</FormLabel>
            <Input
              variant="primary"
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Description</FormLabel>

            <Textarea
              bg="#f7f7f7"
              rounded="none"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Here is a sample placeholder"
            />
          </FormControl>
        </Box>
        <Box w="50%" p="10">
          <FormControl>
            <FormLabel>Size</FormLabel>
            <Select border="none" rounded="none" bg="#f7f7f7" placeholder="Select option">
              {sneakerByID?.size?.map((element: any) => (
                <option key={element.size}>{element.size}</option>
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>Price</FormLabel>
            <Input
              bg="#f7f7f7"
              rounded="none"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              type="number"
            />
          </FormControl>

          <FormControl>
            <FormLabel>Category</FormLabel>
            <Select
              bg="#f7f7f7"
              rounded="none"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              variant="unstyled"
              placeholder="Category">
              <option value="Nike">Nike</option>
              <option value="Adidas">Adidas</option>
              <option value="Air Jordan">Air Jordan</option>
            </Select>
          </FormControl>

          <FormControl id="image">
            <FormLabel>Image</FormLabel>
            <Input type="file" onChange={(e) => onSetFile(e)} />
          </FormControl>
        </Box>
      </Flex>
      <Button
        variant="primary"
        onClick={() => EditSneakerById()}
        color={'white'}
        _hover={{
          bg: 'blue.500'
        }}>
        Edit Product
      </Button>
    </Box>
  );
};
