import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux.hooks';
import ROUTES from '../../router/_routes';

export const PublicRoute = ({ children }: any) => {
  const location = useLocation();

  const isAuth = useAppSelector((state) => state.auth.isAuth);
  if (!isAuth) {
    return <Navigate to={ROUTES.LOGIN} replace state={{ prev: location.pathname }} />;
  }
  return children;
};
