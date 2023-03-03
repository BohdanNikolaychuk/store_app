import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux.hooks';
import ROUTES from '../../router/_routes';

export const ProtectedRoute = ({ children }: any) => {
  const user = useAppSelector((state) => state.auth.user);

  if (!user?.roles.includes('admin')) {
    return <Navigate to={ROUTES.MAIN} replace />;
  }

  return children;
};
