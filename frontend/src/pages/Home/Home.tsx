import { useAppSelector } from '../../hooks/redux.hooks';
import { Admin } from '../Admin/Admin';

export const Home = () => {
  const user = useAppSelector((state) => state.auth.user);

  return <>{user?.roles.includes('admin') ? <Admin /> : <>userContent</>}</>;
};
