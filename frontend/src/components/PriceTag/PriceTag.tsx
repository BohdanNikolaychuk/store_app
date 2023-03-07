import { HStack, Text, TextProps } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface PriceTagProps {
  price: string;
}

export type FormatPriceOptions = { locale?: string; currency?: string };

export function formatPrice(value: number, opts: { locale?: string; currency?: string } = {}) {
  const { locale = 'en-US', currency = 'USD' } = opts;
  const formatter = new Intl.NumberFormat(locale, {
    currency,
    style: 'currency',
    maximumFractionDigits: 2
  });
  return formatter.format(value);
}

export const PriceTag = (props: PriceTagProps) => {
  const { price } = props;
  return (
    <HStack spacing="1">
      <Price>{price} $</Price>
    </HStack>
  );
};

interface PriceProps {
  children?: ReactNode;
  isOnSale?: boolean;
  textProps?: TextProps;
}

const Price = (props: PriceProps) => {
  const { isOnSale, children, textProps } = props;

  return (
    <Text as="span" fontWeight="medium" {...textProps}>
      {children}
    </Text>
  );
};
