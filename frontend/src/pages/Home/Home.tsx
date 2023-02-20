import TableProduct from '../../components/Table/Table';
import { useAppSelector } from '../../hooks/redux.hooks';
import { selectSneakersData } from '../../store/product/selectors';
import { ISneakers } from '../../store/product/types';
import { selectAuthData } from '../../store/user/selectors';

const Home = () => {
  const { user } = useAppSelector(selectAuthData);
  const { sneakers } = useAppSelector(selectSneakersData);
  return (
    <>
      {user?.roles[0] === 'admin' &&
        sneakers.map((element: ISneakers) => <TableProduct key={element._id} {...element} />)}
    </>
  );
};

export default Home;
