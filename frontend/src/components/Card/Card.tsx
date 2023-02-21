import { Box, Center, Heading, Image, Stack, Text, useColorModeValue } from '@chakra-ui/react';

import { ISneakers } from '../../store/product/types';

const CardView = ({ _id, name, price, category, image_url }: ISneakers) => {
  return (
    <>
      <Center py={12}>
        <Box
          sx={{ maxWidth: '250px', height: '360px', position: 'relative' }}
          role={'group'}
          maxW={'330px'}
          w={'full'}
          bg={useColorModeValue('white', 'gray.800')}
          rounded={'lg'}
          pos={'relative'}
          zIndex={1}>
          <Image height={'auto'} width={'282px'} objectFit={'cover'} src={image_url} />

          <Stack pt={10} align={'center'}>
            <Heading fontSize={'md'} color={'#696969'} fontWeight={500}>
              {name}
            </Heading>
            <Stack direction={'row'} align={'center'}>
              <Text fontWeight={500}>${price}</Text>
            </Stack>
          </Stack>
        </Box>
      </Center>
    </>
  );
};

export default CardView;
