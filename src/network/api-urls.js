const baseUrl = 'https://blooming-eyrie-20553.herokuapp.com/api';
// 'https://blooming-eyrie-20553.herokuapp.com/api';
//  'http://localhost:3000/api';
const auth = {
  login: '/auth/login',
  signup: '/auth/register',
};
const product = {
  allProducts: '/products',
};
const orders = {
  createorder: '/orders',
  getUserOrders: '/orders/find',
  getOrder: '/orders',
  updateOrders: '/orders',
  buyOrder: '/orders/buy',
};
const payment = {
  getPayPalUrl: '/payment',
  refund: '/payment/refund',
};
const user = {
  addProductRequest: 'users/addProduct',
};
export {baseUrl, auth, product, orders, payment, user};
