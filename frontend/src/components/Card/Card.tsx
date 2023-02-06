import { EditIcon } from '@chakra-ui/icons';
import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Image,
  CloseButton,
  IconButton
} from '@chakra-ui/react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux.hooks';
import { fetchDeleteSneaker } from '../../store/product/asyncActions';

import { ISneakers } from '../../store/product/types';
import { selectAuthData } from '../../store/user/selectors';

const CardView = ({ _id, name, price, description, category, image_url }: ISneakers) => {
  const { user } = useAppSelector(selectAuthData);
  const dispatch = useAppDispatch();

  const onDeleteCardByAdmin = (id: string) => {
    console.log(id);
    dispatch(fetchDeleteSneaker(id));
  };

  return (
    <Center py={12}>
      <Box
        role={'group'}
        p={6}
        maxW={'330px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.800')}
        boxShadow={'2xl'}
        rounded={'lg'}
        pos={'relative'}
        zIndex={1}>
        <Box
          rounded={'lg'}
          mt={-12}
          pos={'relative'}
          height={'230px'}
          _after={{
            transition: 'all .3s ease',
            content: '""',
            w: 'full',
            h: 'full',
            pos: 'absolute',
            top: 5,
            left: 0,
            backgroundImage: `url(${image_url})`,
            filter: 'blur(15px)',
            zIndex: -1
          }}
          _groupHover={{
            _after: {
              filter: 'blur(20px)'
            }
          }}>
          <Image rounded={'lg'} height={230} width={282} objectFit={'cover'} src={image_url} />
        </Box>

        <Stack pt={10} align={'center'}>
          <Text color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'}>
            {category}
          </Text>
          <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>
            {name}
          </Heading>
          <Stack direction={'row'} align={'center'}>
            <Text color={'gray.600'} fontWeight={500}>
              ${price}
            </Text>
          </Stack>
        </Stack>
        {user?.roles[0] === 'admin' && (
          <>
            <CloseButton onClick={() => onDeleteCardByAdmin(_id)} size="lg" />
          </>
        )}
      </Box>
    </Center>
  );
};

export default CardView;
