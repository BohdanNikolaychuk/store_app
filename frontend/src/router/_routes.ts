const ROUTES = {
  MAIN: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  PRODUCTBYID: (id?: string) => (id ? `/product/${id}` : '/product/:id'),
  SHOP: '/shop',
  NOT_MATCHING: '*',
  CART: '/cart',
  FORM_CREATE: '/admin/form',
  ALLPRODUCT: '/admin/all'
};
export default ROUTES;
