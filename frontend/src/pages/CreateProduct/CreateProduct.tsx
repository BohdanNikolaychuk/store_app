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
import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/redux.hooks';
import ROUTES from '../../router/_routes';
import { fetchAddSneaker } from '../../store/product/asyncActions';

export const CreateProduct: FC = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState('');
  const [file, setFile] = useState('');
  const [size, setSize] = useState<Array<{ size: string }>>([]);
  const [sizeField, setSizeField] = useState('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSizeField = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSizeField(e.target.value);
  };

  const onCreateSize = () => {
    setSize([{ size: sizeField }, ...size]);
    setSizeField('');
  };

  const onSetFile = (e: any) => {
    const file = e.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      setFile(reader.result as string);
    };
  };

  const OnCreateNewSneaker = () => {
    const newSneaker = {
      name,
      description,
      price: price + '',
      category,
      size,
      image_url: file
    };
    dispatch(fetchAddSneaker(newSneaker));
    navigate(ROUTES.MAIN);
  };

  return (
    <Box>
      <Flex justifyContent="space-between">
        <Box w="50%" p="10">
          <FormControl id="name">
            <FormLabel>Product Name</FormLabel>
            <Input
              variant="primary"
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Brand</FormLabel>
            <Select
              variant="primary"
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Brand">
              <option value="Nike">Nike</option>
              <option value="Adidas">Adidas</option>
              <option value="Air Jordan">Air Jordan</option>
            </Select>
          </FormControl>
          <FormControl id="description">
            <FormLabel>Description</FormLabel>
            <Textarea
              variant="primary"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Here is a sample description"
            />
          </FormControl>
        </Box>
        <Box w="50%" p="10">
          <FormControl>
            <FormLabel> Product Image</FormLabel>
            <Input variant="primary" type="file" onChange={(e) => onSetFile(e)} />
          </FormControl>
          <FormControl id="size">
            <FormLabel>Size</FormLabel>
            <Input
              variant="primary"
              onChange={(e) => onSizeField(e)}
              placeholder="Enter size"
              type="number"
            />
            <Button mb="5" variant="primary" onClick={() => onCreateSize()}>
              Create Size
            </Button>
            <Select variant="primary">
              {size.map((element: any, i) => (
                <option key={i}>{element.size}</option>
              ))}
            </Select>
          </FormControl>
          <FormControl id="description">
            <FormLabel>Price</FormLabel>
            <Input
              variant="primary"
              value={price}
              onChange={(e) => setPrice(+e.target.value)}
              placeholder="Enter price"
              type="number"
            />
          </FormControl>
        </Box>
      </Flex>
      <Box>
        <Button onClick={() => OnCreateNewSneaker()} type="submit" variant="primary">
          Create Product
        </Button>
      </Box>
    </Box>
  );
};
