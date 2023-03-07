import { ChakraProvider } from '@chakra-ui/react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import './index.css';
import { store } from './store/store';
import { theme } from './utils/theme';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ChakraProvider theme={theme} resetCSS>
    <Provider store={store}>
      <App />
    </Provider>
  </ChakraProvider>
);
