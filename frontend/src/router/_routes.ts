const ROUTES = {
  MAIN: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  PRODUCTBYID: (id?: string) => (id ? `/product/${id}` : '/product/:id'),
  NOT_MATCHING: '*'
};
export default ROUTES;
