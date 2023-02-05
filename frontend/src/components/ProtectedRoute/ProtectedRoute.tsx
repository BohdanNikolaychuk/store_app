import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux.hooks';
import ROUTES from '../../router/_routes';

export const ProtectedRoute = ({ children }: any) => {
  const role = useAppSelector((state) => state.auth.role);

  if (role !== 'admin') {
    return <Navigate to={ROUTES.MAIN} replace />;
  }
  return children;
};
