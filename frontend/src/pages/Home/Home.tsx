import { useAppSelector } from '../../hooks/redux.hooks';
import { Admin } from '../Admin/Admin';

export const Home = () => {
  const user = useAppSelector((state) => state.auth.user);

  const renderRoleInterface = () => {
    if (user?.roles.includes('admin')) {
      return <Admin />;
    } else {
      return <>Shop now </>;
    }
  };

  return <>{renderRoleInterface()}</>;
};
