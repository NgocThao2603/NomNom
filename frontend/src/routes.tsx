import { Navigate, useRoutes } from 'react-router-dom';
import Layout from './layout/Layout';
import HomePage from './views/homepage/HomePage';
import CartPage from './views/cartpage/CartPage';
import OrderPage from './views/orderpage/OrderPage';

export default function RouterUrl() {
  return useRoutes([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: 'home',
          element: <HomePage />,
        },
        {
          path: 'cart',
          element: <CartPage />,
        },
        {
          path: 'order',
          element: <OrderPage />,
        },
        { path: '', element: <Navigate to={'/home'} /> },
      ],
    },
  ]);
}
