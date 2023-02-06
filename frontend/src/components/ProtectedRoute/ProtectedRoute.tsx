import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux.hooks';
import ROUTES from '../../router/_routes';
import { selectAuthData } from '../../store/user/selectors';

export const ProtectedRoute = ({ children }: any) => {
  const { user } = useAppSelector(selectAuthData);

  if (user?.roles[0] !== 'admin') {
    return <Navigate to={ROUTES.MAIN} replace />;
  }
  return children;
};
