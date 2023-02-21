import axios, { AxiosRequestConfig } from 'axios';

const instans = axios.create({
  baseURL: 'https://storeapp-production-8870.up.railway.app/'
});

instans.interceptors.request.use(async (config) => {
  config.headers = config.headers ?? {};

  config.headers.Authorization = `Bearer ${window.localStorage.getItem('userToken')}`;

  return config;
});

export default instans;
