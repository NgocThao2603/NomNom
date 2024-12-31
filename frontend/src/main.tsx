import './configs/translation/index';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import RouterUrl from './routes';
import { AuthProvider } from './contexts/AuthContext';
import { ToastContainer } from 'react-toastify';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    <BrowserRouter>
      <AuthProvider>
        <RouterUrl />
      </AuthProvider>
    </BrowserRouter>
    <ToastContainer
      limit={3}
      theme="light"
      autoClose={2000}
      toastStyle={{
        fontSize: '0.875rem',
        fontWeight: 500,
      }}
    />
  </>
);
