import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Container,
  SimpleGrid,
  Text
} from '@chakra-ui/react';
import { useState } from 'react';

import { CardView } from '../../components/Card/Card';
import ROUTES from '../../router/_routes';

import { NavLink, useSearchParams } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux.hooks';
import { ISneakers } from '../../store/product/types';

export const Shop = () => {
  const sneakers = useAppSelector((state) => state.sneakers.sneakers);
  const status = useAppSelector((state) => state.sneakers.status);
  const user = useAppSelector((state) => state.auth.user);
  const [searchParams] = useSearchParams();
  const [selectSort, setSelectSort] = useState('Sort By Name');

  if (status === 'init' || status === 'loading') {
    return <>Loading</>;
  }

  const filterSneakers = sneakers.filter((element) => {
    if (!searchParams.get('name')) {
      return sneakers;
    }
    return element.category === searchParams.get('name');
  });

  return (
    <>
      <Box bg="#f9f9f9" w="100%" p={4} color="white">
        {!searchParams.get('name') ? (
          <Text
            variant={'h1'}
            pt="2"
            pb="2"
            color="black"
            display="flex"
            justifyContent="center"
            fontSize="4xl">
            Shop All
          </Text>
        ) : (
          <>
            <Text pt="2" pb="2" color="black" display="flex" justifyContent="center" fontSize="4xl">
              {searchParams.get('name')}
            </Text>
            <Box display="flex" justifyContent="center" color="black">
              <Breadcrumb>
                <BreadcrumbItem>
                  <BreadcrumbLink
                    opacity={'0.5'}
                    _hover={{ color: 'red' }}
                    as={NavLink}
                    to={ROUTES.SHOP}>
                    Shop
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbItem isCurrentPage>
                  <BreadcrumbLink>{searchParams.get('name')!}</BreadcrumbLink>
                </BreadcrumbItem>
              </Breadcrumb>
            </Box>
          </>
        )}
      </Box>

      <Container maxW="1200px">
        {/* <Box display="flex" justifyContent="end" w="20%">
          <Select onChange={(e) => setSelectSort(e.target.value)} variant="primary">
            <option>Sort By Name</option>
            <option>Sort By Price</option>
          </Select>
        </Box> */}
        <Box display="flex">
          <SimpleGrid w="100%" columns={[1, 2, 3]}>
            {filterSneakers.map((element: ISneakers) => (
              <NavLink
                key={element._id}
                to={user?.roles[0] === 'admin' ? '' : `${ROUTES.PRODUCTBYID(element._id)}`}>
                <CardView {...element} />
              </NavLink>
            ))}
          </SimpleGrid>
        </Box>
      </Container>
    </>
  );
};
