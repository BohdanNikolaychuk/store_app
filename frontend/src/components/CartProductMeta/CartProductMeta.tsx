import { Box, Image, Stack, Text } from '@chakra-ui/react';

export type CartProductMetaProps = {
  name: string;
  image: string;
  size: string;
};

export const CartProductMeta = (props: CartProductMetaProps) => {
  const { image, name, size } = props;
  return (
    <Stack direction="row" spacing="5" width="full">
      <Image
        rounded="lg"
        width="120px"
        height="120px"
        fit="cover"
        src={image}
        alt={name}
        draggable="false"
        loading="lazy"
      />
      <Box pt="4">
        <Stack spacing="0.5">
          <Text fontWeight="medium">{name}</Text>
          <Text>Size:{size}</Text>
        </Stack>
      </Box>
    </Stack>
  );
};
