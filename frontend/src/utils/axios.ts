import axios from 'axios';

const instans = axios.create({
  baseURL: 'https://store-app-81jf.onrender.com/'
});

instans.interceptors.request.use(async (config) => {
  config.headers = config.headers ?? {};

  config.headers.Authorization = `Bearer ${window.localStorage.getItem('userToken')}`;

  return config;
});

export default instans;
