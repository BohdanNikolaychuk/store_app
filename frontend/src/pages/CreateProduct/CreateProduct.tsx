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
import { FC, memo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/redux.hooks';
import ROUTES from '../../router/_routes';
import { fetchAddSneaker, NewSneaker } from '../../store/product/asyncActions';

const clearData: NewSneaker = {
  name: '',
  description: '',
  price: '',
  category: '',
  image_url: '',
  size: []
};

export const CreateProduct: FC = memo(() => {
  const [data, setData] = useState(clearData);

  //size
  const [sizeField, setSizeField] = useState('');

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSizeField = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSizeField(e.target.value);
  };

  const onCreateSize = () => {
    setData((prev) => ({
      ...prev,
      size: [...prev.size, { size: sizeField }]
    }));

    setSizeField('');
  };

  const onSetFile = (e: any) => {
    const file = e.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      setData((prev) => ({
        ...prev,
        image_url: reader.result as string
      }));
    };
  };

  const OnCreateNewSneaker = () => {
    dispatch(fetchAddSneaker(data));

    navigate(ROUTES.MAIN);
    // setData(clearData);
  };

  return (
    <Box>
      <Flex justifyContent="space-between">
        <Box w="50%" p="10">
          <FormControl id="name">
            <FormLabel>Product Name</FormLabel>
            <Input
              variant="primary"
              value={data.name}
              onChange={(e) =>
                setData((prev) => ({
                  ...prev,
                  name: e.target.value
                }))
              }
              type="text"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Brand</FormLabel>
            <Select
              variant="primary"
              onChange={(e) =>
                setData((prev) => ({
                  ...prev,
                  category: e.target.value
                }))
              }
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
              value={data.description}
              onChange={(e) =>
                setData((prev) => ({
                  ...prev,
                  description: e.target.value
                }))
              }
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
              {data.size.map((element: any, i) => (
                <option key={i}>{element.size}</option>
              ))}
            </Select>
          </FormControl>
          <FormControl id="description">
            <FormLabel>Price</FormLabel>
            <Input
              variant="primary"
              value={data.price}
              onChange={(e) =>
                setData((prev) => ({
                  ...prev,
                  price: e.target.value
                }))
              }
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
});
