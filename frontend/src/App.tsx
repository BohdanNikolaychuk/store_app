import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from './hooks/redux.hooks';

import router from './router';
import { fetchAllSneakers } from './store/product/asyncActions';
import { getCurrentUser } from './store/user/asyncActions';

function App() {
  const dispatch = useAppDispatch();

  const sneakers = useAppSelector((state) => state.sneakers.sneakers);
  useEffect(() => {
    if (localStorage.getItem('userToken')) {
      dispatch(getCurrentUser());
    }
  }, [dispatch, localStorage.getItem('userToken')]);

  useEffect(() => {
    if (sneakers.length === 0) {
      dispatch(fetchAllSneakers());
    }
  }, [sneakers]);

  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
