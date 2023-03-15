import { createBrowserRouter } from 'react-router-dom';
import { Layout } from '../components/Layout/Layout';
import { ProtectedRoute } from '../components/ProtectedRoute/ProtectedRoute';
import { PublicRoute } from '../components/PublicRoute/PublicRoute';

import { Admin, Cart, CreateProduct, EditCard, Home, Info, Login, Register, Shop } from '../pages';

import ROUTES from './_routes';

const router = createBrowserRouter([
  {
    path: ROUTES.MAIN,
    element: <Layout />,
    errorElement: <> HTTP Error</>,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        element: <Login />,
        path: ROUTES.LOGIN
      },
      {
        element: <Register />,
        path: ROUTES.REGISTER
      },
      {
        element: <Info />,
        path: ROUTES.PRODUCTBYID()
      },
      {
        element: (
          <PublicRoute>
            <Cart />
          </PublicRoute>
        ),
        path: ROUTES.CART
      },
      {
        element: (
          <ProtectedRoute>
            <CreateProduct />
          </ProtectedRoute>
        ),
        path: ROUTES.FORM_CREATE
      },
      {
        element: (
          <ProtectedRoute>
            <EditCard />
          </ProtectedRoute>
        ),
        path: ROUTES.EDITBYID()
      },
      {
        element: (
          <ProtectedRoute>
            <Admin />
          </ProtectedRoute>
        ),
        path: ROUTES.ADMIN
      },
      {
        element: <Shop />,
        path: ROUTES.SHOP
      }
    ]
  }
]);

export default router;
