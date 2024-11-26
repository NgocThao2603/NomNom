import { useRoutes } from 'react-router-dom';

export default function RouterUrl() {
  return useRoutes([
    {
      path: '/',
      element: <Layout />,
    },
  ]);
}
