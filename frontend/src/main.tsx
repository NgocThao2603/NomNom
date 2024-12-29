import './configs/translation/index';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import RouterUrl from './routes';
import { AuthProvider } from './contexts/AuthContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <AuthProvider>
      <RouterUrl />
    </AuthProvider>
  </BrowserRouter>
);
