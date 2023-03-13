import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Text } from '@chakra-ui/react';
import { FC, memo } from 'react';
import { NavLink } from 'react-router-dom';
import ROUTES from '../../router/_routes';

interface Props {
  brandName: string | undefined | null;
  productName: string | undefined;
}

export const BreadCrumb: FC<Props> = memo(({ brandName, productName }) => {
  const isCurrentPage = () => {
    if (brandName && !productName) {
      return (
        <Breadcrumb color="black" pt="2" pb="2" display="flex" justifyContent="center">
          <BreadcrumbItem>
            <BreadcrumbLink opacity={'0.5'} _hover={{ color: 'red' }} as={NavLink} to={ROUTES.SHOP}>
              Shop
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink to={ROUTES.SHOP + `?name=${brandName}`} as={NavLink}>
              {brandName}
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      );
    } else {
      return (
        <Breadcrumb color="black" pt="2" pb="2" display="flex" justifyContent="center">
          <BreadcrumbItem>
            <BreadcrumbLink opacity={'0.5'} _hover={{ color: 'red' }} as={NavLink} to={ROUTES.SHOP}>
              Shop
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink
              opacity={'0.5'}
              _hover={{ color: 'red' }}
              to={ROUTES.SHOP + `?name=${brandName}`}
              as={NavLink}>
              {brandName}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink>
              <Text overflow="hidden" textOverflow="ellipsis">
                {productName}
              </Text>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      );
    }
  };

  return (
    <>
      <Box display="flex" justifyContent="center" color="black">
        {isCurrentPage()}
      </Box>
    </>
  );
});
