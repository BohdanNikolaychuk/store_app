import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import Home from '../pages/Home/Home';
import Info from '../pages/Info/Info';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
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
      }
    ]
  }
]);

export default router;
