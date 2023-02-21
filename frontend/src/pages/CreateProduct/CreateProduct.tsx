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

    // on reader load somthing...
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
    <>
      <Button as={NavLink} to={ROUTES.MAIN}>
        To Main
      </Button>

      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack spacing={4}>
          <FormControl id="name">
            <FormLabel>Name</FormLabel>
            <Input
              placeholder="Here is a sample Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
            />
          </FormControl>
          <FormControl id="description">
            <FormLabel>Description</FormLabel>

            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Here is a sample description"
            />
          </FormControl>
          <FormControl id="description">
            <FormLabel>Price</FormLabel>
            <Input
              value={price}
              onChange={(e) => setPrice(+e.target.value)}
              placeholder="Enter price"
              type="number"
            />
          </FormControl>
          <FormControl id="size">
            <FormLabel>Size</FormLabel>
            <Input onChange={(e) => onSizeField(e)} placeholder="Enter size" type="number" />
            <Button onClick={() => onCreateSize()}>Create Size</Button>
          </FormControl>
          <Select>
            {size.map((element: any, i) => (
              <option key={i}>{element.size}</option>
            ))}
          </Select>
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
          <FormControl id="image">
            <FormLabel>Image</FormLabel>
            <Input type="file" onChange={(e) => onSetFile(e)} />
          </FormControl>

          <Stack spacing={10}>
            <Button
              onClick={() => OnCreateNewSneaker()}
              rounded="none"
              _hover={{ background: 'gray' }}
              bg="#333333"
              mt="10"
              p="6"
              color="white">
              Create
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};
