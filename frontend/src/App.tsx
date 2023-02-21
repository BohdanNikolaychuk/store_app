import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';

import { useAppDispatch } from './hooks/redux.hooks';

import router from './router';
import { fetchAllSneakers } from './store/product/asyncActions';
import { getCurrentUser } from './store/user/asyncActions';

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (localStorage.getItem('userToken')) {
      dispatch(getCurrentUser());
    }
  }, [dispatch, localStorage.getItem('userToken')]);

  useEffect(() => {
    dispatch(fetchAllSneakers());
  }, []);

  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
