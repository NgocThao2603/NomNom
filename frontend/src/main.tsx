import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import RouterUrl from './routes';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <RouterUrl />
  </BrowserRouter>
);
