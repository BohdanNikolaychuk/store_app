import { Box, Center, Heading, Image, Stack, Text } from '@chakra-ui/react';
import { memo } from 'react';

import { ISneakers } from '../../store/product/types';

export const CardView = memo(({ name, price, image_url }: ISneakers) => {
  return (
    <Center>
      <Box
        sx={{ maxWidth: '250px', height: '360px', position: 'relative' }}
        maxW={'330px'}
        w={'full'}>
        <Image height={'auto'} width={'282px'} src={image_url} />

        <Stack>
          <Heading fontSize={17} color={'#696969'} fontWeight={500}>
            {name}
          </Heading>
          <Stack>
            <Text fontSize={20} fontWeight={600}>
              ${price}
            </Text>
          </Stack>
        </Stack>
      </Box>
    </Center>
  );
});
