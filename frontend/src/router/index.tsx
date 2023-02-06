import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import { ProtectedRoute } from '../components/ProtectedRoute/ProtectedRoute';

import Cart from '../pages/Cart/Cart';
import { CreateProduct } from '../pages/CreateProduct/CreateProduct';
import Home from '../pages/Home/Home';
import Info from '../pages/Info/Info';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import Shop from '../pages/Shop/Shop';
import ROUTES from './_routes';

const router = createBrowserRouter([
  {
    path: ROUTES.MAIN,
    element: <Layout />,

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
        element: <Cart />,
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
        element: <Shop />,
        path: ROUTES.SHOP
      }
    ]
  }
]);

export default router;
