const ROUTES = {
  MAIN: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  PRODUCTBYID: (id?: string) => (id ? `/product/${id}` : '/product/:id'),
  SHOP: '/shop',
  NOT_MATCHING: '*',
  CART: '/cart',
  FORM_CREATE: '/admin/form',
  EDITBYID: (id?: string) => (id ? `/admin/edit/${id}` : '/admin/edit/:id')
};
export default ROUTES;
