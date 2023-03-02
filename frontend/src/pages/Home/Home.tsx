import { Input } from '@chakra-ui/react';
import { useMemo, useState } from 'react';
import TableProduct from '../../components/Table/Table';

import { useAppSelector } from '../../hooks/redux.hooks';
import { selectSneakersData } from '../../store/product/selectors';
import { ISneakers } from '../../store/product/types';
import { selectAuthData } from '../../store/user/selectors';

const Home = () => {
  const { user } = useAppSelector(selectAuthData);

  const { sneakers } = useAppSelector(selectSneakersData);
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
      {user?.roles[0] === 'admin' && (
        <Input placeholder="Filter by id or name" onChange={(e) => setFilter(e.target.value)} />
      )}

      {user?.roles[0] === 'admin' &&
        filterSne.map((element: ISneakers) => <TableProduct key={element._id} {...element} />)}
    </>
  );
};

export default Home;
