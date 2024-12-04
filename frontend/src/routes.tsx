import { Navigate, useRoutes } from 'react-router-dom';
import Layout from './layout/Layout';
import HomePage from './views/homepage/HomePage';
import SearchPage from './views/homepage/search/SearchPage';

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
        { path: '', element: <Navigate to={'/home'} /> },
      ],
    },
  ]);
}
