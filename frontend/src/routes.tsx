import { Navigate, useRoutes } from 'react-router-dom';
import Layout from './layout/Layout';
import HomePage from './views/homepage/HomePage';
import SearchPage from './views/homepage/search/SearchPage';
import FilterPage from './views/homepage/filter/FilterPage';
import DishDetail from './views/dish-detail/DishDetail';

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
        { path: '', element: <Navigate to={'/home'} /> },
      ],
    },
  ]);
}
