import { Button, FormControl, FormLabel, Input, Select, Stack, Textarea } from '@chakra-ui/react';
import { useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux.hooks';
import ROUTES from '../../router/_routes';
import { fetchEditSneakerByID } from '../../store/product/asyncActions';
import { selecetSneakersByID } from '../../store/product/selectors';
const EditCard = () => {
  const { id } = useParams();

  const sneakerByID = useAppSelector(selecetSneakersByID(id!));
  console.log(sneakerByID);

  const dispatch = useAppDispatch();
  const [name, setName] = useState(() => id && sneakerByID?.name);
  const [description, setDescription] = useState(() => id && sneakerByID?.description);
  const [price, setPrice] = useState(() => id && sneakerByID?.price);
  const [category, setCategory] = useState(() => id && sneakerByID?.category);

  const [size, setSize] = useState(() => id && sneakerByID?.size);
  const [image, setImage] = useState(() => id && sneakerByID?.image_url);

  const EditSneakerById = () => {
    const newEditSneaker = {
      id,
      name,
      description,
      price,
      category,
      image
    };

    dispatch(fetchEditSneakerByID(newEditSneaker));
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
            <FormLabel>Size</FormLabel>
            <Select variant="unstyled">
              {/* {size?.map((element: any) => (
                <option key={element.size}>{element.size}</option>
              ))} */}
            </Select>
          </FormControl>
          <FormControl id="description">
            <FormLabel>Price</FormLabel>
            <Input value={price} onChange={(e) => setPrice(e.target.value)} type="number" />
          </FormControl>
          <FormControl id="description">
            <FormLabel>Category</FormLabel>
            <Select
              value={category}
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
            <Input type="text" value={image} onChange={(e) => setImage(e.target.value)} />
          </FormControl>

          <Stack spacing={10}>
            <Button
              onClick={() => EditSneakerById()}
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
