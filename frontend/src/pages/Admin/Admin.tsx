import { Button, Input } from '@chakra-ui/react';
import { useMemo, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { TableProduct } from '../../components/Table/Table';
import { useAppSelector } from '../../hooks/redux.hooks';
import ROUTES from '../../router/_routes';
import { ISneakers } from '../../store/product/types';

export const Admin = () => {
  const sneakers = useAppSelector((state) => state.sneakers.sneakers);
  const [filter, setFilter] = useState('');
  const filterSne = useMemo(
    () =>
      sneakers.filter((element) => {
        if (!filter) {
          return sneakers;
        }
        return (
          element._id.toLowerCase().trim().includes(filter.toLowerCase().trim()) ||
          element.name.trim().toLowerCase().includes(filter.toLowerCase().trim())
        );
      }),
    [sneakers, filter]
  );
  return (
    <>
      <Button variant="primary" as={NavLink} to={ROUTES.FORM_CREATE}>
        Create new product
      </Button>

      <Input placeholder="Filter by id or name" onChange={(e) => setFilter(e.target.value)} />

      {filterSne.map((element: ISneakers) => (
        <TableProduct key={element._id} {...element} />
      ))}
    </>
  );
};
