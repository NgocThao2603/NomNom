import { Navigate, useRoutes } from 'react-router-dom';
import Layout from './layout/Layout';
import HomePage from './views/homepage/HomePage';
import SearchPage from './views/homepage/search/SearchPage';
import FilterPage from './views/homepage/filter/FilterPage';
import CartPage from './views/cartpage/CartPage';
import OrderPage from './views/orderpage/OrderPage';
import DishDetail from './views/dish-detail/DishDetail';
<<<<<<< HEAD
import FavoritePage from './views/favoritepage/FavoritePage';
=======
import OrderHistory from './views/order-history/OrderHistory';
>>>>>>> e82c7a954e59990fa2490c4253c206089ce984de

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
          path: 'home/:keyword',
          element: <SearchPage />,
        },
        {
          path: '/home/filter',
          element: <FilterPage />,
        },
        {
          path: 'dish-detail/:id',
          element: <DishDetail />,
        },
        {
          path: 'cart',
          element: <CartPage />,
        },
        {
          path: 'order',
          element: <OrderPage />,
        },
        {
<<<<<<< HEAD
          path: 'favorites',
          element: <FavoritePage />,
=======
          path: 'order-history',
          element: <OrderHistory />,
>>>>>>> e82c7a954e59990fa2490c4253c206089ce984de
        },
        { path: '', element: <Navigate to={'/home'} /> },
      ],
    },
  ]);
}
