import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux.hooks';
import ROUTES from '../../router/_routes';
import { selectAuthData } from '../../store/user/selectors';

const PublicRoute = ({ children }: any) => {
  const { isAuth } = useAppSelector(selectAuthData);
  if (!isAuth) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }
  return children;
};

export default PublicRoute;
